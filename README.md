# Nordic Circular Buildings Database

A comprehensive research platform documenting public building projects in Nordic countries demonstrating high circularity and sustainability standards.

## Overview

This database catalogs circular building projects across the Nordic region (Norway, Sweden, Denmark, Finland, Iceland) since 2020, serving as a resource for researchers, industry professionals, and policymakers working on circular economic design in construction.

## Current Status

| Country | Projects | Status |
|---------|----------|--------|
| Norway | 22 | Complete with source verification |
| Sweden | - | Pending research |
| Denmark | - | Pending research |
| Finland | - | Pending research |
| Iceland | - | Pending research |

## Norway Highlights

- **22 documented projects** across Oslo, Bærum, Asker, Bergen, and Trondheim
- **Reuse rates**: 50-97% by weight
- **CO2 reductions**: 70-93% vs conventional construction
- **Key programs**: FutureBuilt, BREEAM-NOR, EU CCRI

### Notable Projects

| Project | Year | Key Achievement |
|---------|------|-----------------|
| KA13 | 2021 | 80% material reuse, 168t concrete from Regjeringskvartalet |
| Grensen 9B | 2025 | 97.3% reuse, metro rails as staircase |
| Føniks | 2026 | 89% circularity index, near-100% target |
| Løren | 2025 | World's first ship steel structure |

## Data Structure

```
data/
├── schema.json              # JSON schema definition
└── projects/
    ├── norway.json          # 22 projects with full detail
    ├── norway_sources.md    # Source citations
    ├── norway_data_gaps.md  # Data quality notes
    └── norway_source_verification.md
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

## Planned Features

- [ ] Interactive map visualization
- [ ] Filtering and search interface
- [ ] Project comparison tools
- [ ] CO2 savings charts
- [ ] REST API for external access

## Tech Stack (Planned)

- Framework: Next.js or Astro
- Styling: Tailwind CSS
- Maps: Mapbox/Leaflet
- Charts: D3.js
- Deployment: Vercel

## Contributing

This is a research project with ongoing data collection. Contributions welcome for:
- Additional project documentation
- Source verification
- Other Nordic country research

## License

Research data. See individual source citations for original content attribution.

---

*Last updated: 2024-11-29*
