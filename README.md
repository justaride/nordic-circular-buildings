# Nordic Circular Buildings Database

A comprehensive research platform documenting public building projects in Nordic countries demonstrating high circularity and sustainability standards.

## Overview

This database catalogs circular building projects across the Nordic region (Norway, Sweden, Denmark, Finland, Iceland) since 2020, serving as a resource for researchers, industry professionals, and policymakers working on circular economic design in construction.

## Current Status

| Country | Projects | Case Studies | Status |
|---------|----------|--------------|--------|
| Norway | 25 | 7 | Complete with verified source citations |
| Sweden | - | - | Pending research |
| Denmark | - | - | Pending research |
| Finland | - | - | Pending research |
| Iceland | - | - | Pending research |

## Norway Highlights

- **25 documented projects** across Oslo, Bærum, Asker, Bergen, and Trondheim
- **Reuse rates**: 50-97% by weight
- **CO2 reductions**: 28-97% vs conventional construction
- **Key programs**: FutureBuilt, BREEAM-NOR, EU CCRI
- **7 Case studies** with detailed documentation (KA13, KA23, Føniks, Løren, Nedre Sem, Skur 38, Oksenøya Senter)

### Notable Projects

| Project | Year | Key Achievement |
|---------|------|-----------------|
| KA13 | 2021 | 80% reuse, 45t steel (97% CO2), 96t hulldekker (89% CO2) - FLAGSHIP |
| KA23 | 2021 | 83% internal reuse, 55% total CO2 reduction, first protected building - FLAGSHIP |
| Grensen 9B | 2025 | 97.3% reuse, metro rails as staircase |
| Føniks | 2026 | 89% circularity index, near-100% target |
| Løren | 2025 | World's first ship steel structure |
| Oksenøya Senter | 2023 | 28-34% CO2 reduction, massivtre, Passivhus standard |

## Data Structure

```
data/
├── schema.json              # JSON schema definition
├── projects/
│   ├── norway.json          # 25 projects with full detail
│   ├── norway_sources.md    # Source citations
│   └── norway_data_gaps.md  # Data quality notes
├── case-studies/
│   ├── ka13_flagship.json   # Deep-dive flagship case (KA13)
│   ├── ka23_flagship.json   # Deep-dive flagship case (KA23)
│   ├── foniks_tier2.json    # Tier 2 case study
│   ├── loren_tier2.json     # Tier 2 case study
│   ├── nedre_sem_strong.json # Strong documentation case
│   ├── skur38_tier2.json    # Tier 2 case study
│   └── oksenoya_senter.json # Tier 1 case study (new)
docs/
└── ROADMAP.md               # Project roadmap and planned features
site/
└── public/docs/             # Source PDFs for direct citation links
```

## Project Schema

Each project includes:
- Location with coordinates (map-ready)
- Circular features with donor sources
- Quantified metrics (CO2, waste, reuse rates)
- Certifications and program affiliations
- **Verified source citations with page-level PDF links**

## Citation Traceability

All material data includes traceable citations:
- Direct links to source PDFs hosted on the site
- Page-level anchors (e.g., `#page=54`) for immediate verification
- Original quotes from source documents
- Section references matching document structure

### Verified Citations (KA13)

| Material | Section | Pages | Verified |
|----------|---------|-------|----------|
| Steel (45t) | 4.2 Stålkonstruksjoner | 54-58 | ✅ |
| Hulldekker (96t) | 4.6 Hulldekker | 63-67 | ✅ |
| Staircase | 4.7 Intern Trapp | 67 | ✅ |
| Windows (30 stk) | 2.4 Vinduer i tilbygg | 16-18 | ✅ |
| Sanitary (116 stk) | 5.2 Sanitærutstyr | 69 | ✅ |

## Circular Strategy Categories

1. **Material Reuse** - Components from donor buildings
2. **Adaptive Reuse** - Building transformation/preservation
3. **Upcycling** - Waste materials → building components
4. **Design for Disassembly** - Future material recovery
5. **Material Banking** - Storage/redistribution infrastructure

## Live Site

**https://justaride.github.io/nordic-circular-buildings/**

### Features
- Interactive map with all 25 projects
- Project detail pages with material flow visualization
- 7 detailed case study pages
- Cost comparison data (reused vs new materials)
- CO2 savings bar charts per material
- Clickable source citations with PDF page links

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
npm run dev      # Start dev server
npm run build    # Build with validation
npm run validate # Run schema validation
```

## Case Studies

Deep-dive documentation with full material traceability:

| Project | Tier | Key Metrics | Citation Status |
|---------|------|-------------|-----------------|
| KA13 | FLAGSHIP | Steel: 45t (97% CO2), Hulldekker: 96t (89% CO2), 116 sanitary items | ✅ All verified |
| KA23 | FLAGSHIP | 83% internal reuse (10,519t), 55% total CO2 reduction, 53% ombrukbarhet | ✅ All verified |
| Føniks | TIER_2 | 89% circularity target, windows 1,400 NOK/m² vs 4,000 new | ✅ Verified |
| Løren | TIER_2 | World's first ship steel building structure | ✅ Verified |
| Nedre Sem | STRONG | 50% circularity, Stiltre timber processing | ✅ Verified |
| Skur 38 | TIER_2 | Heritage transformation, metro rails as staircase | ✅ Verified |
| Oksenøya Senter | TIER_1 | 28-34% CO2 reduction, 22,870 m², massivtre | ✅ Climate reports |

See `data/case-studies/` and `docs/ROADMAP.md` for methodology.

## Contributing

This is a research project with ongoing data collection. Contributions welcome for:
- Additional project documentation
- Source verification
- Other Nordic country research

## License

Research data. See individual source citations for original content attribution.

---

*Last updated: 2025-12-04*
