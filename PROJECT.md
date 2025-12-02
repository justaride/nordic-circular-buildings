# Nordic Circular Buildings Database

## Project Overview

A comprehensive research platform documenting **material circularity in public building projects** in Nordic countries (since 2020). The platform serves as an interactive database with filtering, search, and comparison tools for researchers, industry professionals, and stakeholders in circular construction.

### Scope Clarification (Iteration 2)

**This database focuses specifically on MATERIAL CIRCULARITY:**
- Reuse of physical building materials (concrete, brick, steel, timber, stone)
- Quantified material flows (tonnes, m², units)
- Documented donor sources and recipient projects
- Measured circularity rates (% by weight)
- Supplier/provider documentation

**Other forms of circularity (out of primary scope):**
- Transformation/adaptive reuse (building-level) → mentioned but not primary
- Space optimization (areal sirkularitet) → out of scope
- Design for Disassembly → secondary mention only

---

## Target Audience

- Researchers in sustainable architecture/construction
- Industry professionals (architects, builders, developers)
- Policymakers and government stakeholders
- Circular economy design practitioners

---

## Scope

**Minimum 5 verified projects per country:**
- Denmark (DK)
- Finland (FI)
- Iceland (IS)
- Norway (NO) - **23 projects documented**
- Sweden (SE)

---

## Platform Features Roadmap

### Phase 1: Data Foundation ✅
- [x] Define project data schema
- [x] Create country template structure
- [x] Process Norway research (23 projects)
- [x] Verify sources (89% of 38 URLs verified)
- [x] Document data gaps

### Phase 2: Interactive Platform ✅
- [x] Initialize Git repository
- [x] Set up Astro 5 web framework
- [x] Implement database with filtering/search
- [x] Build country-based navigation
- [x] Create project comparison tools
- [x] Interactive map (Leaflet)
- [x] Charts (Chart.js)
- [x] Deploy to GitHub Pages

### Phase 3: Iteration 2 - Data Deepening ✅
- [x] Add project_type field (9 transformation, 14 new_build)
- [x] Add is_public_sector field (16 public, 7 private)
- [x] Add project_url links (23/23 complete)
- [x] Enhance 6 priority projects with deep material data (KA13, Grensen 9B, Føniks, Løren, Eikeli, Nedre Sem)
- [x] Add supplier information to circular_features (7 projects with suppliers)
- [x] Research and add NRK Bygget (Project #23)
- [x] Fix data issues (HØINE AS corrected, scope flags added)
- [x] Create stakeholder export (/stakeholders page with JSON/CSV)
- [x] UI: project type badges, circularity-first sorting, Read more links
- [x] Add narrative fields (driver, lessons_learned, challenges) to 6 Tier 1 projects
- [x] Add material contribution breakdown with progress bars on detail pages
- [x] Create Meeting Status & Research Plan page (/meeting-status)

### Phase 3.5: Iteration 3 - Gap Filling ✅ (2025-12-02)

**Priority 1: Projects with circularity % but missing breakdown**
- [x] Nøstebukten Brygge (70%) - added breakdown (55% brick, 35% timber, 10% other)
- [x] KA23 (50%) - added breakdown (5 material categories)

**Priority 2: Public transformation projects missing narrative**
- [x] Skur 38 - added driver, lessons_learned, challenges
- [x] Sophies Minde - added narrative + WSP stakeholder
- [x] Høyblokken - added narrative + 4 new sources
- [x] Lilleborg skole - added narrative + size/budget data

**Priority 3: Fill quantity gaps for Tier 1 projects**
- [x] Grensen 9B - added size (3500m²), 99% netto null, 4 stakeholders (Sporveien, Nasjonalmuseet, Munchmuseet, Ombygg)
- [x] Føniks - updated narrative from Fremtidens Bygg research
- [x] Nedre Sem - updated budget (150 MNOK), added Stiltre processing info

**Priority 4: Supplier identification**
- [x] Added 3 new suppliers (Sporveien, WSP, Loopfront partnerships)
- [ ] 13 projects still missing supplier data

**Priority 5: Cost comparison (stretch goal)**
- [ ] 0/23 projects have cost comparison data

### Phase 4: Iteration 4 - CBC Scoring Framework (Current)

**NEW: CBC Four Pathways Assessment Framework**

Based on analysis of the Circular Buildings Coalition "Four Circular Pathways" (2024) document, we've implemented a comprehensive scoring methodology:

**The Four Pathways:**
1. **Build Nothing New** - Renovation, transformation, extend existing buildings (68 Mt CO2e potential)
2. **Build for Long-term** - Design for disassembly, material passports, flexibility (2 Mt CO2e potential)
3. **Build Efficiently** - Space optimization, material efficiency, vertical extension (259 Mt CO2e potential)
4. **Build with Right Materials** - Reuse, recycled, biobased materials (240 Mt CO2e potential)

**Implementation Status:**
- [x] Schema updated with `cbc_assessment` object
- [x] `project_type` enhanced with 5 categories + preservation %
- [ ] Migrate existing 23 projects to new format
- [ ] Add CBC scores to Tier 1 projects
- [ ] Update UI with pathway filtering

**Priority 1: CBC Assessment for Tier 1 Projects**
- [ ] KA13 (transformation, 80% circularity)
- [ ] Grensen 9B (transformation, 97.3% circularity)
- [ ] Føniks (transformation, 89% circularity)
- [ ] Løren (new_build, ship steel reuse)
- [ ] Eikeli (new_build, CE-certified brick)
- [ ] Nedre Sem (transformation, 50% circularity)

**Priority 2: Add narrative to remaining 11 projects**
- [ ] Treklang, Ruseløkka, TradLab TRE, Ressurssentral
- [ ] Oslo Legevakt, HasleTre, Construction City
- [ ] Nidarvoll/Sunnland, Stovner Bad, Voldsløkka, NRK

**Priority 3: Identify suppliers for 13 projects**

**Priority 4: Cost comparison research**

### Phase 5: Nordic Expansion (Future)
- [ ] Process Sweden research
- [ ] Process Denmark research
- [ ] Process Finland research
- [ ] Process Iceland research

### Phase 6: API & Integrations (Future)
- [ ] REST API for external access
- [ ] Integration with Nordic Circle Construction stakeholder map
- [ ] Community contribution system

---

## CBC Scoring Methodology

### Scoring Framework (0-100 per pathway)

| Pathway | Interventions | Max Points |
|---------|---------------|------------|
| Build Nothing New | Structure preservation (15), Functional transformation (10), Lifespan extension (10) | 35 |
| Build for Long-term | Design for disassembly (12), Material passport (8), Flexibility (5) | 25 |
| Build Efficiently | Space efficiency (8), Material efficiency (7), Vertical extension (10) | 25 |
| Build with Right Materials | Structural reuse (12), Non-structural reuse (8), Reuse bonus (3), Recycled (5), Biobased (10), Carbon storage (3) | 41 |

### Weighting by Project Type

| Project Type | Build Nothing New | Long-term | Efficiently | Right Materials |
|--------------|-------------------|-----------|-------------|-----------------|
| Transformation | 40% | 15% | 15% | 30% |
| Renovation | 35% | 20% | 15% | 30% |
| Extension | 20% | 25% | 25% | 30% |
| Hybrid | 25% | 20% | 20% | 35% |
| New Build | 0% | 30% | 30% | 40% |

### Grade Scale

| Grade | Score Range | Description |
|-------|-------------|-------------|
| A | 80-100 | Exceptional circularity across multiple pathways |
| B | 60-79 | Strong implementation of circular strategies |
| C | 40-59 | Moderate circular implementation |
| D | 20-39 | Limited circular features |
| E | 0-19 | Minimal circularity |

### Quality Multiplier

| Documentation Level | Multiplier |
|--------------------|------------|
| Third-party verified (LCA, EPD) | 1.3 |
| Quantified with sources | 1.2 |
| Documented but unverified | 1.1 |
| Claimed without documentation | 1.0 |
| Target only (planned) | 0.8 |

---

## Current Data Status (2025-12-02)

### Norway: 23 Projects

| Metric | Current | Target | Progress |
|--------|---------|--------|----------|
| Total projects | 23 | 25-30 | 77% |
| With circularity % | 6 | 15+ | 40% |
| With narrative | **12** | 23 | **52%** |
| With material breakdown | **6** | 10+ | **60%** |
| With supplier data | **10** | 23 | **43%** |
| With cost comparison | 0 | 5+ | 0% |

### Data Completeness by Project Type

| Type | Count | With Narrative | With Breakdown |
|------|-------|----------------|----------------|
| Transformation | 9 | **10** | 6 |
| New Build | 14 | 2 | 0 |

### Tier 1 Projects (Deep-Dive Complete)

| Project | Circularity | Narrative | Breakdown | Suppliers |
|---------|-------------|-----------|-----------|-----------|
| KA13 | 80% | ✅ | ✅ | ✅ |
| Grensen 9B | 97.3% | ✅ | ✅ | ✅ (4) |
| Føniks | 89% | ✅ | ✅ | ✅ |
| Løren | — | ✅ | — | ✅ |
| Eikeli | — | ✅ | — | ✅ |
| Nedre Sem | 50% | ✅ | ✅ | ✅ |

### Tier 1.5 Projects (Iteration 3 Enhanced)

| Project | Circularity | Narrative | Breakdown | Suppliers |
|---------|-------------|-----------|-----------|-----------|
| Nøstebukten Brygge | 70% | ✅ | ✅ | — |
| KA23 | 50% | ✅ | ✅ | ✅ (3) |
| Skur 38 | — | ✅ | — | ✅ |
| Sophies Minde | — | ✅ | — | ✅ |
| Høyblokken | — | ✅ | — | — |
| Lilleborg skole | — | ✅ | — | — |

### Tier 2 Projects (Standard Documentation)

Remaining 11 projects have basic documentation but need:
- Narrative (driver, lessons learned)
- Material quantities where missing
- Supplier identification

---

## Project Structure

```
Public Circular Buildings/
├── PROJECT.md                    # This file - project overview
├── ITERATION_2_PLAN.md          # Iteration 2 detailed plan
├── MEETING_STATUS.md            # Meeting feedback tracking
├── README.md                     # Repository readme
│
├── data/
│   ├── schema.json              # JSON schema definition
│   └── projects/
│       ├── norway.json          # Structured project data (23 projects)
│       ├── norway_sources.md    # Complete source citations
│       ├── norway_data_gaps.md  # Verification checklist
│       └── [other countries]    # (pending)
│
├── scripts/
│   ├── analyze_gaps.js          # Gap analysis script
│   ├── add_suppliers.js         # Supplier data script
│   └── enhance_tier1.js         # Tier 1 enhancement script
│
├── site/                        # Astro 5 website
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.astro          # Dashboard
│   │   │   ├── stakeholders.astro   # Stakeholder export
│   │   │   ├── meeting-status.astro # Status & research plan
│   │   │   ├── about.astro          # About page
│   │   │   └── project/[id].astro   # Project detail
│   │   ├── components/
│   │   └── layouts/
│   └── public/
│       └── data/norway.json     # Synced data for site
│
└── docs/
    ├── COUNTRY_TEMPLATE.md      # Standard template for all countries
    └── METHODOLOGY.md           # Research methodology
```

---

## Technical Stack

| Component | Technology | Status |
|-----------|------------|--------|
| Framework | Astro 5.16.3 | ✅ Live |
| Styling | Tailwind CSS 4.1.17 | ✅ Live |
| Data | JSON files | ✅ Live |
| Maps | Leaflet 1.9.4 | ✅ Live |
| Charts | Chart.js | ✅ Live |
| Deployment | GitHub Pages | ✅ Live |
| Version Control | Git/GitHub | ✅ Live |

---

## Key Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/` | Project list with filters, map, charts |
| Project Detail | `/project/[id]` | Full project information |
| Stakeholders | `/stakeholders` | Supplier/client export (JSON/CSV) |
| Status | `/meeting-status` | Meeting feedback, gap analysis, research plan |
| About | `/about` | Project information |

---

## Deliverables for Nordic Innovation (February 2025)

1. **Case catalog**: 25-30 documented circular building projects
2. **Deep-dive cases**: 6-7 projects with full material-level data ✅
3. **Stakeholder mapping**: Exportable supplier and client lists ✅
4. **Interactive platform**: Searchable, filterable database ✅
5. **Research plan**: AI prompts and sources for iteration 3 ✅

---

## Research Sources

### Primary Sources
- FutureBuilt (futurebuilt.no)
- Entra Erfaringsrapporter (entra.no)
- SINTEF Byggforsk (sintef.no)

### Secondary Sources
- Arkitektur N (arkitektur.no)
- Byggfakta (byggfaktanyheter.no)
- DOGA (doga.no)
- Ombygg (ombygg.no)
- Loopfront (loopfront.com)
- Ressurssentral (ressurssentral.no)

---

## Quick Links

- **Live Site**: https://justaride.github.io/nordic-circular-buildings
- **GitHub Repo**: https://github.com/justaride/nordic-circular-buildings
- **Meeting Status**: `/meeting-status` (gap analysis + research prompts)
- **Stakeholder Export**: `/stakeholders`

---

## Changelog

### 2025-12-02 - Iteration 4: CBC Framework
- Added CBC Four Pathways assessment methodology based on Circular Buildings Coalition (2024) report
- Enhanced `project_type` schema with 5 categories (renovation, transformation, extension, hybrid, new_build)
- Added `preservation_percent` field for quantifying structure preservation
- Implemented `cbc_assessment` object with pathway scores, interventions, and grading
- Defined scoring weights per project type and quality multipliers

### 2025-12-02 - Iteration 3: Gap Filling
- Added material breakdown to 6 projects
- Added narrative to 12 projects (from 6)
- Added suppliers to 10 projects (from 7)

### 2025-11-30 - Iteration 2: Data Deepening
- Added project_type, is_public_sector, project_url fields
- Created 6 Tier 1 deep-dive projects
- Added stakeholder export page

### 2025-11-29 - Iteration 1: Platform Launch
- Deployed Astro site to GitHub Pages
- 23 Norwegian projects documented
- Map, charts, filtering implemented

---

*Last updated: 2025-12-02*
