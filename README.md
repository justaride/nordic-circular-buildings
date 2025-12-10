# Nordic Circular Buildings Database

A comprehensive research platform documenting public building projects in Nordic countries demonstrating high circularity and sustainability standards.

## Overview

This database catalogs circular building projects across the Nordic region (Norway, Sweden, Denmark, Finland, Iceland) since 2020, serving as a resource for researchers, industry professionals, and policymakers working on circular economic design in construction.

## Current Status (Phase 11 Complete)

| Country | Status | Verified Projects | Case Studies | Research Queue |
|---------|--------|-------------------|--------------|----------------|
| 🇳🇴 Norway | **Complete** | 25 | 7 | - |
| 🇸🇪 Sweden | **Full Coverage** | 5 | 5 | 5 |
| 🇩🇰 Denmark | **Full Coverage** | 5 | 5 | 5 |
| 🇫🇮 Finland | **Flagship Done** | 1 | 1 | 6 |
| 🇮🇸 Iceland | **Full Coverage** | 4 | 4 | - |

**Total: 40 verified projects + 22 case studies + 16 in research queue**

## Live Site

**https://justaride.github.io/nordic-circular-buildings/**

### Features
- Interactive map with all 40 verified projects
- Country-specific pages (`/no/`, `/se/`, `/dk/`, `/fi/`, `/is/`)
- Dynamic routing with research queue support
- Project detail pages with material flow visualization
- **22 detailed case study pages** across all 5 countries
- Cost comparison data (reused vs new materials)
- CO2 savings bar charts per material
- Clickable source citations with PDF page links
- 11 self-hosted PDFs (36MB) for reliable citations

## Norway Highlights

- **25 documented projects** across Oslo, Bærum, Asker, Bergen, and Trondheim
- **Reuse rates**: 50-97% by weight
- **CO2 reductions**: 28-97% vs conventional construction
- **Key programs**: FutureBuilt, BREEAM-NOR, EU CCRI
- **7 Case studies** with detailed documentation

### Notable Projects

| Project | Year | Key Achievement |
|---------|------|-----------------|
| KA13 | 2021 | 80% reuse, 45t steel (97% CO2), 96t hulldekker (89% CO2) - FLAGSHIP |
| KA23 | 2021 | 83% internal reuse, 55% total CO2 reduction, first protected building - FLAGSHIP |
| Grensen 9B | 2025 | 97.3% reuse, metro rails as staircase |
| Føniks | 2026 | 89% circularity index, near-100% target |
| Løren | 2025 | World's first ship steel structure |
| Oksenøya Senter | 2023 | 28-34% CO2 reduction, massivtre, Passivhus standard |

## Nordic Verified Projects

### Sweden (5 verified)
| Project | Year | Key Achievement |
|---------|------|-----------------|
| Förskolan Hoppet | 2021 | First fossil-free preschool, 62% CO2 reduction, NollCO2 pilot |
| **Kiruna Återbruket** | 2013+ | **98% material recovery, 45% CO2 reduction, city relocation** |
| Sara Kulturhus | 2021 | Carbon-negative, 9,095t CO2 stored in 12,200m³ timber |
| Lumi (Kv. Hugin) | 2024 | 80% concrete frame reuse, LEED Platinum, 43% CO2 reduction |
| Selma Lagerlöfs Center | 2019 | 92% interior reuse, 70% cost savings (9 MSEK), Design S Award |

### Denmark (5 verified)
| Project | Year | Key Achievement |
|---------|------|-----------------|
| Upcycle House | 2013 | Pioneer demo, 86% CO2 reduction, 86% recycled materials |
| Circle House | 2023 | Europe's first DfD social housing, 90% disassembly target |
| UN17 Village | 2024 | 535 units, DGNB Platinum, 1,600+ reused windows |
| Resource Rows | 2019 | 500+ reused windows, industrial upcycling methodology |
| **FBAB Seest** | 2019 | **FSC timber social housing, DGNB Gold, competition winner** |

### Iceland (4 verified)
| Project | Year | Key Achievement |
|---------|------|-----------------|
| Smiðja Parliament | 2023 | 80% material reuse, Iceland Design Awards 2024 |
| Umhverfisstofnun | 2019 | First Nordic Swan renovation in all Nordics, 94.4% waste sorting |
| Háteigsvegur 59 | 2024 | 53% CO2 reduction, 20% reused materials, Mies Award nomination 2026 |
| **Stöng Viking Ruins** | 2024 | **First heritage site with sustainability focus, 1957 shelter preserved** |

### Finland (1 verified + 6 in queue)
| Project | Year | Key Achievement |
|---------|------|-----------------|
| **Pikku-Finlandia** | 2022 | **World-leading DfD: 2,700m² fully demountable timber, relocating 2026** |

*Queue: Mustikkamaa Depot, Tikkurilan varasto, Koivukylä Sortti, Dance House, Tanssin talo, Uniarts*

## Data Structure

```
data/
├── schema.json              # JSON schema definition
├── projects/
│   ├── norway.json          # 25 verified projects
│   ├── sweden.json          # 5 verified + 5 research queue
│   ├── denmark.json         # 5 verified + 5 research queue
│   ├── finland.json         # 1 verified + 6 research queue
│   └── iceland.json         # 4 verified
├── enablers/                # Policy enablers per country
├── flows/                   # Material flow mappings
└── case-studies/            # 22 comprehensive case studies
    ├── ka13_flagship.json   # Norway (7)
    ├── forskolan_hoppet_flagship.json  # Sweden (5)
    ├── upcycle_house_flagship.json     # Denmark (5)
    ├── hateigsvegur59_flagship.json    # Iceland (4)
    └── pikku_finlandia_flagship.json   # Finland (1)
```

## Project Schema

Each project includes:
- Location with coordinates (map-ready)
- Circular features with donor sources
- Quantified metrics (CO2, waste, reuse rates)
- Certifications and program affiliations
- **Verified source citations with page-level PDF links**

## Circular Strategy Categories

1. **Material Reuse** - Components from donor buildings
2. **Adaptive Reuse** - Building transformation/preservation
3. **Upcycling** - Waste materials → building components
4. **Design for Disassembly** - Future material recovery
5. **Material Banking** - Storage/redistribution infrastructure

## Tech Stack

| Component | Technology | Status |
|-----------|------------|--------|
| Framework | Astro 5.16 | ✅ |
| Styling | Tailwind CSS 4.1 | ✅ |
| Type Safety | TypeScript | ✅ |
| Maps | Leaflet (bundled) | ✅ |
| Charts | Chart.js (bundled) | ✅ |
| Validation | JSON Schema | ✅ |
| CI/CD | GitHub Actions | ✅ |
| Deployment | GitHub Pages | ✅ |

### Development

```bash
cd site
npm install
npm run dev       # Start dev server
npm run build     # Build with validation
npm run validate  # Run schema validation
npm run sync      # Sync data files
```

## Roadmap

### Completed (Phase 11)
- ✅ Norway: 25 verified projects with full documentation
- ✅ Nordic expansion: Data templates for SE/DK/FI/IS
- ✅ Dynamic country routing (`/no/`, `/se/`, `/dk/`, `/fi/`, `/is/`)
- ✅ Research queue display for countries in research phase
- ✅ **22 case studies** with deep material traceability (all 5 countries)
- ✅ Nordic research plan and prompts for SE/DK/FI/IS
- ✅ **Phase 8: 10 Nordic projects verified** (DK: 4, IS: 3, SE: 3)
- ✅ **Phase 9: 3 more projects verified** (SE: +1, FI: +1, IS: +1)
- ✅ **Phase 10: Nordic expansion** (Kiruna, FBAB Seest, Pikku-Finlandia LCA)
- ✅ **Phase 11: 15 Nordic case studies** (SE: 5, DK: 5, IS: 4, FI: 1)
- ✅ **Sources library created** with 50+ primary documents
- ✅ **All 5 Nordic countries have verified projects AND case studies**

### Next Priorities
- 🔄 Norway case study expansion (18 projects without, incl. Grensen 9B at 97.3%)
- 🔄 Research queue promotion (16 projects pending verification)
- 🔄 Data consistency sync (case study metrics → project files)
- 🔄 Swedish/Danish enablers documentation

### Planned
- [ ] Material flow visualization (Sankey diagram)
- [ ] REST API for external access
- [ ] Community contribution system

## Research Documentation

For expanding the database to other Nordic countries, see:
- `docs/NORDIC_RESEARCH_PLAN.md` - Strategy, priorities, source hierarchy
- `docs/NORDIC_RESEARCH_PROMPTS.md` - Copy-paste ready prompts per country
- `docs/NORDIC_RESEARCH_PROCESSING.md` - Phase 2 processing plan and results
- `docs/NORDIC_SOURCES_LIBRARY.md` - Curated library of 50+ primary sources
- `docs/NORDIC_DATA_GAPS_PROMPTS.md` - **Targeted search prompts for missing data**

## Contributing

This is a research project with ongoing data collection. Contributions welcome for:
- Additional project documentation
- Source verification
- Nordic country research expansion

## License

Research data. See individual source citations for original content attribution.

---

## Research Notes Status

All primary research notes have been processed. Phase 11 complete with comprehensive case studies for all countries.

| Country | Verified | Case Studies | Queue | Status |
|---------|----------|--------------|-------|--------|
| 🇳🇴 Norway | 25 | 7 | - | ✅ Complete |
| 🇸🇪 Sweden | 5 | 5 | 5 | ✅ Full coverage |
| 🇩🇰 Denmark | 5 | 5 | 5 | ✅ Full coverage |
| 🇫🇮 Finland | 1 | 1 | 6 | ✅ Flagship done |
| 🇮🇸 Iceland | 4 | 4 | - | ✅ Full coverage |
| **Total** | **40** | **22** | **16** | |

**Phase 10-11 Additions (2025-12-10):**
- 🇸🇪 **Kiruna Återbruket** - 98% material recovery, 45% CO2 reduction
- 🇩🇰 **FBAB Seest** - FSC timber, DGNB Gold
- 🇫🇮 **Pikku-Finlandia LCA** - Full Aalto thesis data integrated
- **15 new case studies** across SE/DK/IS/FI

See `docs/STATUS.md` and `docs/ROADMAP.md` for detailed project status.

---

*Last updated: 2025-12-10*
