# Technical Debt Resolution Plan
> Nordic Circular Buildings Database - Kodeforbedringsplan

**Opprettet:** 2025-12-07
**Status:** Utkast - Venter godkjenning

---

## Oversikt over identifiserte problemer

| # | Problem | Alvorlighet | Estimert innsats |
|---|---------|-------------|------------------|
| 1 | Hardkodede verdier spredt i koden | Høy | Lav |
| 2 | Ingen type-sikkerhet (any overalt) | Høy | Medium |
| 3 | Manuell data-sync mellom mapper | Medium | Lav |
| 4 | Inline scripts (500+ linjer) | Medium | Medium |
| 5 | Scripts uten validering | Medium | Medium |
| 6 | Eksterne CDN-avhengigheter | Lav | Lav |
| 7 | Ingen CI/CD for data-kvalitet | Lav | Medium |

---

## Fase 1: Kritiske fikser (Høy prioritet)

### 1.1 Fjern hardkodede verdier

**Berørte filer:**
- `site/src/components/FilterPanel.astro:4` → `count: 23`
- `site/src/layouts/Layout.astro:87` → `25 Verified Projects`
- `site/src/pages/index.astro:105` → `24 projects documented`
- `scripts/deep_gap_analysis.js:229` → `total_projects: 23`

**Løsning:**
```javascript
// Erstatt hardkodede verdier med dynamisk beregning
const totalProjects = norwayData.projects.length;
```

**Akseptansekriterier:**
- [ ] Ingen hardkodede prosjekttall i kodebasen
- [ ] Grep for `/\b2[345]\b.*project/i` returnerer 0 treff i src/

---

### 1.2 Implementer TypeScript-typer

**Ny fil:** `site/src/types/project.ts`

```typescript
export interface Project {
  id: string;
  name: string;
  country: 'NO' | 'SE' | 'DK' | 'FI' | 'IS';
  project_type: ProjectType;
  is_public_sector: boolean;
  location: Location;
  status: 'completed' | 'under_construction' | 'planned' | 'operational';
  year_completed: number | string;
  building_type: BuildingType;
  size_sqm?: number;
  budget?: Budget;
  client: string;
  architect: string | string[];
  contractor?: string;
  circular_features: CircularFeature[];
  metrics: Metrics;
  cbc_assessment?: CBCAssessment;
  data_completeness?: DataCompleteness;
  narrative?: Narrative;
  // ...
}

export interface CircularFeature {
  category: string;
  material_type?: string;
  description: string;
  donor_source?: DonorSource;
  quantity?: Quantity;
  citations?: Citation[];
  supplier?: Supplier;
}

// ... flere interfaces
```

**Akseptansekriterier:**
- [ ] Alle `any` erstattet med konkrete typer
- [ ] TypeScript strict mode aktivert
- [ ] Ingen type-feil ved build

---

## Fase 2: Strukturelle forbedringer

### 2.1 Automatisk data-sync

**Ny fil:** `scripts/sync-data.js`

```javascript
#!/usr/bin/env node
/**
 * Synkroniserer data fra /data til /site/public/data
 * Kjøres automatisk før build
 */
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '../data/projects/norway.json');
const DEST = path.join(__dirname, '../site/public/data/norway.json');

// Valider JSON før kopiering
const data = JSON.parse(fs.readFileSync(SOURCE, 'utf8'));
console.log(`Syncing ${data.projects.length} projects...`);

fs.copyFileSync(SOURCE, DEST);
console.log('Data sync complete.');
```

**Oppdater `site/package.json`:**
```json
{
  "scripts": {
    "prebuild": "node ../scripts/sync-data.js",
    "build": "astro build"
  }
}
```

**Akseptansekriterier:**
- [ ] `npm run build` synkroniserer data automatisk
- [ ] Feil i JSON stopper build
- [ ] Commit-hook validerer sync

---

### 2.2 Refaktorer inline scripts

**Ny mappestruktur:**
```
site/src/
├── scripts/
│   ├── filter-manager.ts      # FilterPanel logikk
│   ├── project-grid.ts        # Sortering/visning
│   ├── map-controller.ts      # Leaflet-initialisering
│   └── comparison.ts          # Sammenligning-funksjonalitet
```

**Eksempel refaktorering:**

```typescript
// site/src/scripts/filter-manager.ts
import type { Project, FilterState } from '../types';

export class FilterManager {
  private state: FilterState = { country: ['NO'], /* ... */ };

  constructor(private projects: Project[]) {
    this.bindEvents();
  }

  filter(): Project[] {
    return this.projects.filter(p => this.matchesFilters(p));
  }

  private matchesFilters(project: Project): boolean {
    // Konsolidert filterlogikk
  }
}
```

**Akseptansekriterier:**
- [ ] Ingen `<script>` blokker over 50 linjer
- [ ] All forretningslogikk i separate filer
- [ ] Testbar kode

---

### 2.3 Schema-validering

**Ny fil:** `scripts/validate-schema.js`

```javascript
const Ajv = require('ajv');
const schema = require('../data/schema.json');
const data = require('../data/projects/norway.json');

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

data.projects.forEach((project, i) => {
  if (!validate(project)) {
    console.error(`Project ${project.id} failed validation:`);
    console.error(validate.errors);
    process.exit(1);
  }
});

console.log(`All ${data.projects.length} projects valid.`);
```

**Akseptansekriterier:**
- [ ] Validering kjører i CI
- [ ] Alle prosjekter passerer schema
- [ ] Feil rapporteres med prosjekt-ID

---

## Fase 3: Infrastruktur

### 3.1 Lokal bundling av eksterne libs

**Oppdater:** `site/package.json`
```json
{
  "dependencies": {
    "leaflet": "^1.9.4",
    "chart.js": "^4.4.0"
  }
}
```

**Oppdater:** `Layout.astro`
```astro
---
import 'leaflet/dist/leaflet.css';
---
<script>
  import L from 'leaflet';
  import Chart from 'chart.js/auto';
  // ...
</script>
```

**Akseptansekriterier:**
- [ ] Ingen eksterne CDN-kall
- [ ] Leaflet og Chart.js bundlet
- [ ] Fungerer offline

---

### 3.2 GitHub Actions CI

**Ny fil:** `.github/workflows/validate.yml`

```yaml
name: Validate Data & Build

on:
  push:
    paths:
      - 'data/**'
      - 'site/**'
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci
        working-directory: ./site

      - name: Validate schema
        run: node scripts/validate-schema.js

      - name: Type check
        run: npm run typecheck
        working-directory: ./site

      - name: Build
        run: npm run build
        working-directory: ./site

      - name: Check hardcoded values
        run: |
          ! grep -rE '\b2[345]\b.*(project|prosjekt)' site/src/ --include="*.astro" --include="*.ts"
```

**Akseptansekriterier:**
- [ ] CI kjører på alle PRs
- [ ] Build feiler ved schema-feil
- [ ] Hardkodede verdier blokkeres

---

## Implementeringsrekkefølge

```
Uke 1: Fase 1 (Kritiske fikser)
├── 1.1 Fjern hardkodede verdier
└── 1.2 TypeScript-typer (start)

Uke 2: Fase 1 + 2
├── 1.2 TypeScript-typer (ferdigstill)
├── 2.1 Data-sync script
└── 2.3 Schema-validering

Uke 3: Fase 2 + 3
├── 2.2 Refaktorer inline scripts
├── 3.1 Lokal bundling
└── 3.2 GitHub Actions CI
```

---

## Risiko og mitigering

| Risiko | Sannsynlighet | Konsekvens | Mitigering |
|--------|---------------|------------|------------|
| TypeScript-migrering brekker build | Medium | Høy | Inkrementell migrering, `strict: false` først |
| Data-sync introduserer bugs | Lav | Medium | Automatiske tester, git diff review |
| Refaktorering av scripts | Medium | Medium | Feature branch, manuell testing |

---

## Suksesskriterier

Ved fullført plan:

1. **Null hardkodede prosjekttall** i kildekode
2. **100% type-dekning** på Project-relaterte interfaces
3. **Automatisk data-sync** ved build
4. **CI pipeline** som validerer alle endringer
5. **Inline scripts < 50 linjer** per fil
6. **Ingen eksterne CDN-kall** i produksjon

---

## Neste steg

- [ ] Godkjenn plan
- [ ] Opprett feature branch: `tech-debt/phase-1`
- [ ] Start med 1.1 (hardkodede verdier) - lavest risiko, raskest gevinst
