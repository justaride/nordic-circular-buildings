# Nordic Circular Buildings Database

A comprehensive research platform documenting public building projects in Nordic countries demonstrating high circularity and sustainability standards.

## Overview

This database catalogs circular building projects across the Nordic region (Norway, Sweden, Denmark, Finland, Iceland) since 2020, serving as a resource for researchers, industry professionals, and policymakers working on circular economic design in construction.

## Current Status

| Country | Projects | Status |
|---------|----------|--------|
| Norway | 24 | Complete with verified source citations |
| Sweden | - | Pending research |
| Denmark | - | Pending research |
| Finland | - | Pending research |
| Iceland | - | Pending research |

## Norway Highlights

- **24 documented projects** across Oslo, Bærum, Asker, Bergen, and Trondheim
- **Reuse rates**: 50-97% by weight
- **CO2 reductions**: 70-97% vs conventional construction
- **Key programs**: FutureBuilt, BREEAM-NOR, EU CCRI
- **1 Flagship case study** with full material documentation and verified citations (KA13)

### Notable Projects

| Project | Year | Key Achievement |
|---------|------|-----------------|
| KA13 | 2021 | 80% reuse, 45t steel (97% CO2), 96t hulldekker (89% CO2) - FLAGSHIP |
| Grensen 9B | 2025 | 97.3% reuse, metro rails as staircase |
| Føniks | 2026 | 89% circularity index, near-100% target |
| Løren | 2025 | World's first ship steel structure |

## Data Structure

```
data/
├── schema.json              # JSON schema definition
├── projects/
│   ├── norway.json          # 24 projects with full detail
│   ├── norway_sources.md    # Source citations
│   └── norway_data_gaps.md  # Data quality notes
├── case-studies/
│   └── ka13_flagship.json   # Deep-dive flagship case (v2.0)
docs/
└── ROADMAP.md               # Project roadmap and planned features
site/
└── public/docs/             # Source PDFs for direct citation links
    └── ka13-erfaringsrapport-ombruk-rev1-250120-kl-1211.pdf
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
- Interactive map with all 24 projects
- Project detail pages with material flow visualization
- Cost comparison data (reused vs new materials)
- CO2 savings bar charts per material
- Clickable source citations with PDF page links

## Tech Stack

- Framework: Astro
- Styling: Tailwind CSS
- Maps: Leaflet + CartoDB
- Deployment: GitHub Pages
- Source Documents: Self-hosted PDFs with page anchors

## Flagship Case Studies

Deep-dive documentation with full material traceability:

| Project | Data Source | Key Metrics | Citation Status |
|---------|-------------|-------------|-----------------|
| KA13 | 116-page Erfaringsrapport (hosted locally) | Steel: 45t (97% CO2), Hulldekker: 96t (89% CO2), 116 sanitary items | ✅ All verified |

See `data/case-studies/` and `docs/ROADMAP.md` for methodology.

## Contributing

This is a research project with ongoing data collection. Contributions welcome for:
- Additional project documentation
- Source verification
- Other Nordic country research

## License

Research data. See individual source citations for original content attribution.

---

*Last updated: 2025-12-03*
