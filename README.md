# Nordic Circular Buildings Database

A comprehensive research platform documenting public building projects in Nordic countries demonstrating high circularity and sustainability standards.

## Overview

This database catalogs circular building projects across the Nordic region (Norway, Sweden, Denmark, Finland, Iceland) since 2020, serving as a resource for researchers, industry professionals, and policymakers working on circular economic design in construction.

## Current Status

| Country | Projects | Status |
|---------|----------|--------|
| Norway | 24 | Complete with source verification |
| Sweden | - | Pending research |
| Denmark | - | Pending research |
| Finland | - | Pending research |
| Iceland | - | Pending research |

## Norway Highlights

- **24 documented projects** across Oslo, Bærum, Asker, Bergen, and Trondheim
- **Reuse rates**: 50-97% by weight
- **CO2 reductions**: 70-97% vs conventional construction
- **Key programs**: FutureBuilt, BREEAM-NOR, EU CCRI
- **1 Flagship case study** with full material documentation (KA13)

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
```

## Project Schema

Each project includes:
- Location with coordinates (map-ready)
- Circular features with donor sources
- Quantified metrics (CO2, waste, reuse rates)
- Certifications and program affiliations
- Source citations with verification status

## Circular Strategy Categories

1. **Material Reuse** - Components from donor buildings
2. **Adaptive Reuse** - Building transformation/preservation
3. **Upcycling** - Waste materials → building components
4. **Design for Disassembly** - Future material recovery
5. **Material Banking** - Storage/redistribution infrastructure

## Live Site

**https://justaride.github.io/nordic-circular-buildings/**

## Tech Stack

- Framework: Astro
- Styling: Tailwind CSS
- Maps: Leaflet + CartoDB
- Deployment: GitHub Pages

## Flagship Case Studies

Deep-dive documentation with full material traceability:

| Project | Data Source | Key Metrics |
|---------|-------------|-------------|
| KA13 | 116-page Erfaringsrapport | Steel: 45t (97% CO2), Hulldekker: 96t (89% CO2), 116 sanitary items |

See `data/case-studies/` and `docs/ROADMAP.md` for methodology.

## Contributing

This is a research project with ongoing data collection. Contributions welcome for:
- Additional project documentation
- Source verification
- Other Nordic country research

## License

Research data. See individual source citations for original content attribution.

---

*Last updated: 2024-12-03*
