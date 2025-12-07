# Technical Debt Resolution Plan
> Nordic Circular Buildings Database - Kodeforbedringsplan

**Opprettet:** 2025-12-07
**Sist oppdatert:** 2025-12-07
**Status:** Fase 1-2 fullført

---

## Fremdriftsoversikt

| # | Problem | Alvorlighet | Status |
|---|---------|-------------|--------|
| 1 | Hardkodede verdier spredt i koden | Høy | ✅ Fullført |
| 2 | Ingen type-sikkerhet (any overalt) | Høy | ✅ Fullført |
| 3 | Manuell data-sync mellom mapper | Medium | ✅ Fullført |
| 4 | Inline scripts (500+ linjer) | Medium | ✅ Fullført |
| 5 | Scripts uten validering | Medium | ✅ Fullført |
| 6 | Eksterne CDN-avhengigheter | Lav | ⏳ Planlagt |
| 7 | Ingen CI/CD for data-kvalitet | Lav | ✅ Fullført |

---

## ✅ Fase 1: Kritiske fikser (FULLFØRT)

### 1.1 Fjern hardkodede verdier ✅

**Commit:** `9e143a9`

**Endrede filer:**
- `site/src/components/FilterPanel.astro` - Dynamisk count fra data
- `site/src/layouts/Layout.astro` - Dynamisk footer count
- `site/src/pages/index.astro` - Dynamisk prosjekttall
- `site/src/pages/about.astro` - Dynamisk dokumenttall
- `scripts/deep_gap_analysis.js` - Bruker `data.projects.length`
- `data/projects/norway.json` - Korrigert `total_projects: 25`

**Verifisering:**
```bash
grep -rE '\b2[345]\b.*project' site/src/ --include="*.astro"
# Returnerer kun historisk dokumentasjon (meeting-status.astro)
```

---

### 1.2 Implementer TypeScript-typer ✅

**Commit:** `9e143a9`

**Ny fil:** `site/src/types/project.ts` (270+ linjer)

**Interfaces opprettet:**
- `Project` - Hovedprosjekt-interface
- `CircularFeature` - Sirkulære materialegenskaper
- `CBCAssessment` - CBC-vurdering
- `DataCompleteness` - Datakvalitetsmåling
- `NorwayData` - Hoveddata-container
- 25+ støtte-interfaces

**Oppdaterte filer:**
| Fil | Endring |
|-----|---------|
| `FilterPanel.astro` | `any` → `Project` |
| `index.astro` | `any` → `Project[]` |
| `project/[id].astro` | Full typing |
| `about.astro` | `DataDepthResult` interface |
| `case-studies/[id].astro` | Lokale interfaces |

**Gjenværende `any` (sekundære sider):**
- `materials.astro` (5)
- `stakeholders.astro` (4)
- `enablers/index.astro` (3)

---

## ✅ Fase 2: Strukturelle forbedringer (FULLFØRT)

### 2.1 Automatisk data-sync ✅

**Commit:** `048e437`

**Ny fil:** `scripts/sync-data.js`
- Synkroniserer `/data/projects/*.json` → `/site/public/data/`
- Validerer JSON før kopiering
- Sjekker `total_projects` matcher faktisk antall

**Package.json oppdatert:**
```json
{
  "scripts": {
    "prebuild": "node ../scripts/sync-data.js && node ../scripts/validate-schema.js",
    "sync": "node ../scripts/sync-data.js",
    "validate": "node ../scripts/validate-schema.js"
  }
}
```

---

### 2.2 Refaktorer inline scripts ✅

**Commit:** `47881a7`

**Nye filer:** `site/src/scripts/`
```
site/src/scripts/
├── index.ts              # Hovedinitialisering
├── filters.ts            # Delt filterlogikk (DRY)
├── filter-manager.ts     # DOM-oppdatering for grid
├── sort-manager.ts       # Sorteringslogikk
├── comparison.ts         # Sammenligning
└── mobile-drawer.ts      # Mobil drawer
```

**Endringer:**
- Ekstrahert 325 linjer inline JavaScript fra `index.astro`
- Delt `matchesFilters()` funksjon (brukes av Map, Charts, Grid)
- TypeScript-typer for alle moduler
- Bundlet til 6.2KB minifisert

---

### 2.3 Schema-validering ✅

**Commit:** `048e437`

**Ny fil:** `scripts/validate-schema.js`

**Funksjonalitet:**
- Validerer mot `data/schema.json`
- Tre alvorlighetsnivåer:
  - ❌ Kritiske feil (blokkerer build)
  - 📊 Data gaps (advarsler)
  - ⚠️ Deprecation warnings

**Nåværende status:**
```
Validated 25 projects
📊 11 data gaps (missing architect, year_completed)
⚠️  50 deprecation warnings (project_type_simple, data_quality)
✓ Schema validation passed
```

---

## ⏳ Fase 3: Infrastruktur (DELVIS FULLFØRT)

### 3.1 Lokal bundling av eksterne libs

**Status:** Ikke startet

**Mål:**
- Fjerne CDN-avhengigheter (Leaflet, Chart.js)
- Bundle lokalt for offline-støtte

---

### 3.2 GitHub Actions CI ✅

**Commit:** `4841e35`

**Ny fil:** `.github/workflows/validate.yml`

**Funksjonalitet:**
- Kjører på alle PRs til `main`
- Kjører ved endringer i `data/`, `scripts/`, `site/src/`
- Validerer data-skjema før build
- Synkroniserer data før build
- Bygger site for å verifisere ingen brudd

**Workflow struktur:**
```yaml
jobs:
  validate:  # Kjører scripts direkte
    - validate-schema.js
    - sync-data.js
  build:     # Avhenger av validate
    - npm install
    - npm run build
```

---

## Implementeringslogg

| Dato | Fase | Commits | Beskrivelse |
|------|------|---------|-------------|
| 2025-12-07 | 1.1 | `9e143a9` | Fjernet hardkodede verdier |
| 2025-12-07 | 1.2 | `9e143a9` | TypeScript types |
| 2025-12-07 | 2.1 | `048e437` | Data-sync script |
| 2025-12-07 | 2.3 | `048e437` | Schema-validering |
| 2025-12-07 | 3.2 | `4841e35` | GitHub Actions CI |
| 2025-12-07 | 2.2 | `47881a7` | Inline scripts refaktorert |

---

## Neste steg

1. [x] Fase 2.2: Refaktorer inline scripts ✅
2. [ ] Fase 3.1: Bundle Leaflet/Chart.js lokalt
3. [x] Fase 3.2: GitHub Actions CI ✅
4. [ ] Fiks gjenværende `any` i sekundære sider
5. [ ] Fyll data gaps identifisert av validator
