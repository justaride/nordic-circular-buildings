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
- Norway (NO) - **25 projects documented**
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

### Phase 4: Iteration 4 - CBC Scoring Framework ✅ (2025-12-02)

**CBC Four Pathways Assessment Framework**

Based on analysis of the Circular Buildings Coalition "Four Circular Pathways" (2024) document, we've implemented a comprehensive scoring methodology:

**The Four Pathways:**
1. **Build Nothing New** - Renovation, transformation, extend existing buildings (68 Mt CO2e potential)
2. **Build for Long-term** - Design for disassembly, material passports, flexibility (2 Mt CO2e potential)
3. **Build Efficiently** - Space optimization, material efficiency, vertical extension (259 Mt CO2e potential)
4. **Build with Right Materials** - Reuse, recycled, biobased materials (240 Mt CO2e potential)

**Implementation Status:**
- [x] Schema updated with `cbc_assessment` object
- [x] `project_type` enhanced with 5 categories + preservation %
- [x] Migrated 23 projects to new format
- [x] Added CBC scores to 6 Tier 1 projects (4x Grade A, 2x Grade B)
- [x] Updated UI with pathway filtering and CBC badges

**CBC Scores Implemented:**
- [x] KA13 - Grade A (89.1)
- [x] Grensen 9B - Grade A (91.5)
- [x] Føniks - Grade A (87.2)
- [x] Løren - Grade A (82.4)
- [x] Eikeli - Grade B (74.8)
- [x] Nedre Sem - Grade B (78.3)

### Phase 5: Iteration 5 - Gap Closure ✅ (2025-12-03)

**Completed:**
- [x] ALL 23 projects now have narrative (driver, lessons_learned, challenges)
- [x] 6 Tier 1 projects have cost data with key insights
- [x] Scope verification completed (TradLab TRE & Sirkulær Ressurssentral flagged as secondary)
- [x] 117 sources (100% with URLs), 43 citations
- [x] /data-gaps analysis page created with full information availability assessment

**Cost Data Added:**
- KA13: 304 MNOK total investment, proving feasibility
- Grensen 9B: "Knekt koden for lønnsom ombruk" - same cost as conventional
- Føniks: Windows 1,400 NOK/m² vs 4,000 NOK/m² new (65% savings)
- Løren: 301.6 MNOK, 97% lower climate footprint on ship steel
- Eikeli: Reused brick now competitive with new quality brick
- Nedre Sem: 104 MNOK contract (Veidekke)

**Scope Decisions:**
- TradLab TRE → Secondary (museum demonstration project)
- Sirkulær Ressurssentral → Secondary (enabling infrastructure)
- HasleTre → Primary (DfD focus, DOGA Award 2023)
- Construction City → Primary (50% material reuse target)

### Phase 6: Document Analysis ✅ (2025-12-04)

**Completed:**
- [x] Oksenøya Senter klimagassrapporter (skole, barnehage, BBS) → New case study created
- [x] KA23 Ombruksvurdering + Klimagassberegninger → Confirmed existing data
- [x] Oslo kommune Loopfront sluttrapport → Key insights extracted

**Remaining:**
- [ ] Ruseløkka skole documents (3 PDFs)
- [ ] Bærum kommune årsrapporter (2 PDFs)

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

## Current Data Status (2025-12-07)

### Norway: 25 Projects

| Metric | Current | Target | Progress |
|--------|---------|--------|----------|
| Total projects | **25** | 25-30 | **100%** ✅ |
| Case studies | **7** | 6-7 | **100%** ✅ |
| With architect | **25** | 25 | **100%** ✅ |
| With year_completed | **25** | 25 | **100%** ✅ |
| With circularity % | 7 | 15+ | 47% |
| With narrative | **25** | 25 | **100%** ✅ |
| With material breakdown | **7** | 10+ | **70%** |
| With supplier data | **10** | 25 | **40%** |
| With cost comparison | **7** | 5+ | **140%** ✅ |
| With budget data | **12** | 15+ | **80%** |
| Schema validation | **0 errors** | 0 | **100%** ✅ |

### Data Completeness by Project Type

| Type | Count | With Narrative | With Breakdown |
|------|-------|----------------|----------------|
| Transformation | 9 | **9** ✅ | 6 |
| New Build | 16 | **16** ✅ | 1 |

### Case Studies (Deep-Dive Documentation)

| Project | Tier | Circularity | Key Achievement |
|---------|------|-------------|-----------------|
| KA13 | FLAGSHIP | 80% | 45t steel (97% CO2), 96t hulldekker (89% CO2), full Erfaringsrapport |
| KA23 | FLAGSHIP | 69% | First protected building transformation, 83% internal reuse |
| Føniks | TIER_2 | 89% | Near-100% target, 1400 NOK/m² window savings |
| Løren | TIER_2 | — | World's first ship steel structure |
| Nedre Sem | STRONG | 50% | Stiltre timber processing from existing buildings |
| Skur 38 | TIER_2 | — | Heritage transformation, metro rails as staircase |
| Oksenøya Senter | TIER_1 | — | 28-34% CO2 reduction, massivtre, Passivhus |

### Additional Enhanced Projects

| Project | Circularity | Narrative | Breakdown | Suppliers |
|---------|-------------|-----------|-----------|-----------|
| Grensen 9B | 97.3% | ✅ | ✅ | ✅ (4) |
| Eikeli | — | ✅ | — | ✅ |
| Nøstebukten Brygge | 70% | ✅ | ✅ | — |
| Sophies Minde | — | ✅ | — | ✅ |
| Høyblokken | — | ✅ | — | — |
| Lilleborg skole | — | ✅ | — | — |

### Tier 2 Projects (Standard Documentation)

All 25 projects now have complete narrative (driver, lessons_learned, challenges).

Remaining data needs:
- Material quantities for 18 projects
- Supplier identification for 15 projects
- CBC assessment for 19 projects

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
│   ├── sync-data.js             # Data sync (prebuild)
│   ├── validate-schema.js       # Schema validation (prebuild)
│   ├── analyze_gaps.js          # Gap analysis script
│   ├── add_suppliers.js         # Supplier data script
│   └── enhance_tier1.js         # Tier 1 enhancement script
│
├── site/                        # Astro 5 website
│   ├── src/
│   │   ├── types/
│   │   │   └── project.ts           # TypeScript interfaces (270+ lines)
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
| Type Safety | TypeScript interfaces | ✅ Live |
| Build Validation | sync-data.js + validate-schema.js | ✅ Live |
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

### 2025-12-07 - Tier System Overhaul & Code Quality
**Case Study Tier System**
- Fixed case-insensitive tier matching (FLAGSHIP/TIER_1/TIER_2 now work)
- Added Tier 1 as new category (purple, score 55-64) between Strong and Tier 2
- Synced JSON tier values with actual data_completeness scores
- Added explicit tier explanation linking to data completeness scoring
- Each case study now displays score (e.g., "Flagship 75/100")

**Tier Reassignments Based on Score**
- KA23: TIER_2 → STRONG (score 68)
- Løren: TIER_2 → TIER_1 (score 61)
- Føniks: TIER_1 → TIER_2 (score 50)

**Code Quality Fixes**
- Fixed 3 TypeScript errors in `filters.ts`
- Removed deprecated `data_gaps` field from NO_nrk_normannslokka
- All 25 projects now pass validation with 0 errors

### 2025-12-07 - Technical Debt Resolution (ALL PHASES COMPLETE)
**Phase 1: Critical Fixes**
- Created TypeScript interfaces (`types/project.ts`) - 30+ interfaces, 270+ lines
- Removed hardcoded project counts across all components
- Added types to secondary pages (materials, stakeholders, enablers)

**Phase 2: Structural Improvements**
- Added automatic data sync (`scripts/sync-data.js`) as prebuild hook
- Added schema validation (`scripts/validate-schema.js`) with 3 severity levels
- Refactored 500+ lines of inline JavaScript into 6 TypeScript modules

**Phase 3: Infrastructure**
- Bundled Leaflet and Chart.js locally (removed CDN dependencies)
- Added GitHub Actions CI workflow for PR validation

**Data Quality**
- Filled 11 data gaps (architect, year_completed)
- Removed 50 deprecated field warnings
- All 25 projects now pass schema validation

See `TECHNICAL_DEBT_PLAN.md` for detailed implementation log

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

*Last updated: 2025-12-07*
