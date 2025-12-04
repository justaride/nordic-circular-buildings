# Nordic Circular Buildings - Project Status

**Last Updated:** 2025-12-04

---

## Executive Summary

The Nordic Circular Buildings database has completed **Phase 3** - establishing a comprehensive research platform documenting circular construction in Norway with:

- **25 projects** documented in the main database
- **6 deep-dive case studies** with verified citations
- **11 self-hosted PDFs** (36MB total)
- **30+ enablers** across 9 categories
- **Operational website** at justaride.github.io/nordic-circular-buildings

---

## What Has Been Completed

### Phase 1-2: Case Study Development ✅

| Project | Tier | Report Type | Pages | Key Metrics | PDF Hosted |
|---------|------|-------------|-------|-------------|------------|
| **KA13** | Flagship | Erfaringsrapport | 116 | 80% circ, 45t steel, 96t hulldekker | ✅ 15MB |
| **KA23** | Flagship | Erfaringsrapport | 19+15 | 83% reuse, 55% CO2, 53% ombrukbarhet | ✅ 1.4MB |
| **Nedre Sem** | Strong | Sirk+Klima+Betong+Plast | 19+16+29+8 | 48% SI, 100% recycled agg | ✅ 6.3MB |
| **Løren** | Tier 2 | Klimasats slutt+del | 8+6 | 4,620kg CO2 saved | ✅ 207KB |
| **Føniks** | Tier 2 | Presentation | 17 | 89% SI, 2600 items | ✅ 9.5MB |
| **Skur 38** | Tier 2 | FutureBuilt rapport | 34+2 | 167t CO2, 112t reused | ✅ 2.7MB |

**Total: 11 PDFs, 36MB hosted on GitHub Pages**

### Phase 3: Enablers & Value Chain ✅

Created `data/enablers/norway.json` with 9 categories:

| Category | Count | Key Actors |
|----------|-------|------------|
| Material Banks | 3 | Sirkulær Ressurssentral, Ombygg, Resirqel |
| Digital Platforms | 1 | Loopfront (220k+ objects tracked) |
| Testing & Certification | 3 | SINTEF, Treteknisk, DNV |
| Program Frameworks | 4 | FutureBuilt, Klimasats, BREEAM-NOR, Enova |
| Consultants | 4 | Asplan Viak, Multiconsult, MAD, LINK |
| Contractors | 3 | Veidekke, Seltor, HENT |
| Standards | 4 | NS 3720, NS 3682, TEK17, DOK |
| Research Networks | 3 | REBUS, Ti-ReX, Nordic Sustainable Construction |

Plus: 7 documented material flows, 4 emerging roles from Swedish research.

### Website Features ✅

- Dashboard with filtering, search, CBC grading
- Project detail pages with material inventories
- **NEW: /enablers page** with value chain ecosystem
- Stakeholders directory with export
- Data gaps analysis
- Compare projects side-by-side

---

## Current Data Quality

### Projects with Deep Documentation (6)

| ID | Name | Circularity | Has Case Study | Has Hosted PDF |
|----|------|-------------|----------------|----------------|
| NO_ka13 | KA13 | 80% | ✅ flagship | ✅ |
| NO_ka23 | KA23 | 50%* | ✅ flagship | ✅ |
| NO_nedre_sem | Nedre Sem Låve | 50% | ✅ strong | ✅ (4 docs) |
| NO_loren | Løren aktivitetspark | - | ✅ tier2 | ✅ (2 docs) |
| NO_foniks | Prosjekt Føniks | 89% | ✅ tier2 | ✅ |
| NO_skur38 | Skur 38 | - | ✅ tier2 | ✅ |

*KA23 shows 50% in main DB but case study documents 83% internal reuse

### Projects with Circularity Data but No Case Study (4)

| ID | Name | Circularity | Gap |
|----|------|-------------|-----|
| NO_grensen9b | Grensen 9B | 97.3% | Need erfaringsrapport |
| NO_nostebukten | Nøstebukten | 70% | Need detailed report |
| NO_treklang | Treklang/Oksenøya | - | Need FutureBuilt report |
| NO_hoyblokken | Høyblokken | - | Need ombruksrapport |

### Projects Needing Documentation (15)

Basic info only, no detailed circularity data:
- NO_eikeli, NO_ruselokka, NO_tradlab_tre, NO_ressurssentral
- NO_oslo_legevakt, NO_sophies_minde, NO_hasle_tre, NO_construction_city
- NO_nidarvoll_sunnland, NO_stovner_bad, NO_stovner_torg, NO_voldslokka
- NO_lilleborg, NO_nrk_normannslokka, NO_vollebekk_torg

---

## Planned Work (Phase 4+)

### Phase 4: Material Flow Visualization (Priority: High)

**Objective:** Interactive Sankey diagram showing material flows

**Internal Steps:**
1. Create `data/materials/flows.json` with quantities
2. Implement D3.js Sankey visualization
3. Add to site as `/materials` or `/flows` page
4. Link donor buildings → material banks → recipient projects

**Data Already Available:**
- 7 flows documented in enablers.json
- KA13→KA23 window/door transfers
- R6→KA13 steel transfers
- Nydalshøgda→Løren facade materials
- Multiple→Skur38 transfers

### Phase 5: Additional Case Studies (Priority: High)

**Target Projects:**

1. **Grensen 9B** - 97.3% circularity (highest in database!)
   - Need: Erfaringsrapport or detailed project documentation
   - Contact: DOGA (building owner)

2. **Treklang/Oksenøya Senter** - Bærum Kommune
   - Need: FutureBuilt ombruksrapport
   - Contact: FutureBuilt / Bærum Kommune

3. **Nøstebukten Sjøfront** - 70% circularity
   - Need: Detailed ombruksrapport
   - Contact: Project developer

4. **Høyblokken Y-blokka** - Major government project
   - Need: Statsbygg ombruksdokumentasjon
   - Contact: Statsbygg

### Phase 6: Nordic Expansion (Future)

**Sweden:**
- Swedish research already integrated (Ericsson 2024 barriers study)
- Identify Swedish FutureBuilt-equivalent projects
- Potential: Malmö, Stockholm circular pilots

**Denmark/Finland:**
- Map equivalent programs and projects
- Identify research contacts

---

## Documents to Retrieve Externally

### Priority 1: High-Value Missing Reports

| Document | Project | Contact | Why Important |
|----------|---------|---------|---------------|
| Grensen 9B erfaringsrapport | Grensen 9B | DOGA | 97% circularity - highest |
| Treklang FutureBuilt rapport | Oksenøya | Bærum Kommune | Mass timber reuse |
| Nøstebukten ombruksrapport | Nøstebukten | Developer | 70% circularity |
| Høyblokken dokumentasjon | Y-blokka | Statsbygg | Government flagship |

### Priority 2: Supporting Documents

| Document | Purpose | Source |
|----------|---------|--------|
| NS 3682 draft | Hulldekker standard | Standard Norge |
| FutureBuilt 2024 årsrapport | Program metrics | FutureBuilt |
| Loopfront case studies | Platform impact data | Loopfront |
| SINTEF reuse guidelines | Testing methodology | SINTEF |

### Priority 3: Research & Context

| Document | Purpose | Source |
|----------|---------|--------|
| REBUS final report | Research findings | SINTEF/NTNU |
| Ti-ReX project docs | Timber certification | SINTEF |
| Nordic Circles methodology | Assessment framework | Nordic cooperation |
| BREEAM-NOR v6.1 Mat credits | Certification details | Grønn Byggallianse |

---

## Internal Work Remaining

### Data Structure Updates

1. **Sync case studies to main database**
   - Update NO_ka23 circularity from 50% to 83%
   - Add CO2 reduction values where available
   - Add SI-index values to metrics

2. **Standardize metrics across projects**
   - Ensure consistent circularity_rate calculation method
   - Add methodology field to each metric

3. **Link enablers to projects**
   - Add enabler references to project JSON
   - Show which enablers supported each project

### Site Improvements

1. **Case study pages** (`/case-studies/[id]`)
   - Deep-dive pages for flagship/strong cases
   - Full material inventory tables
   - Citation links to hosted PDFs

2. **Materials page** (`/materials`)
   - Analysis by material type (steel, concrete, timber, etc.)
   - Which projects use which materials
   - Quantities and CO2 savings by type

3. **Methodology page** (`/methodology`)
   - How circularity is calculated
   - Data quality tiers explained
   - CBC grading methodology

---

## Repository Structure

```
nordic-circular-buildings/
├── data/
│   ├── projects/
│   │   └── norway.json           # 25 projects
│   ├── case-studies/
│   │   ├── ka13_flagship.json    # 962 lines
│   │   ├── ka23_flagship.json    # 720 lines
│   │   ├── nedre_sem_strong.json # 711 lines
│   │   ├── loren_tier2.json      # 232 lines
│   │   ├── foniks_tier2.json     # 226 lines
│   │   └── skur38_tier2.json     # 706 lines
│   ├── enablers/
│   │   └── norway.json           # 30+ enablers
│   └── research/
│       └── swedish_reuse_barriers_2024.json
├── site/
│   ├── public/
│   │   ├── data/norway.json      # Site data
│   │   └── docs/                 # 11 PDFs (36MB)
│   └── src/pages/
│       ├── index.astro           # Dashboard
│       ├── enablers/index.astro  # NEW
│       ├── stakeholders.astro
│       ├── data-gaps.astro
│       └── project/[id].astro
└── docs/
    ├── ROADMAP.md
    └── STATUS.md                 # This file
```

---

## Contact Points for External Documents

| Organization | Contact Type | For |
|--------------|--------------|-----|
| **FutureBuilt** | erfaringsrapporter@futurebuilt.no | Project reports |
| **Statsbygg** | post@statsbygg.no | Government projects |
| **DOGA** | post@doga.no | Grensen 9B |
| **Bærum Kommune** | postmottak@baerum.kommune.no | Oksenøya/Treklang |
| **SINTEF** | building@sintef.no | Testing methodology |
| **Grønn Byggallianse** | post@byggalliansen.no | BREEAM-NOR docs |
| **Loopfront** | kontakt@loopfront.com | Platform data |
| **Standard Norge** | info@standard.no | NS 3682 status |

---

## Success Metrics

### Current Achievement
- 6/25 projects (24%) have deep documentation
- 11 source PDFs hosted
- 30+ enablers documented
- Website operational

### Target (Phase 4-5)
- 10/25 projects (40%) with deep documentation
- Add 4 more case studies (Grensen, Treklang, Nøstebukten, Høyblokken)
- Material flow visualization live
- 50+ enablers with cross-references

### Long-term (Phase 6+)
- Expand to Sweden, Denmark, Finland
- 50+ projects total
- Standardized Nordic comparison
- Research publication potential

---

*Status document created: 2025-12-04*
