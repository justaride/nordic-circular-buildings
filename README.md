# Nordic Circular Buildings Database

A comprehensive research platform documenting public building projects in Nordic countries demonstrating high circularity and sustainability standards.

## Overview

This database catalogs circular building projects across the Nordic region (Norway, Sweden, Denmark, Finland, Iceland) since 2020, serving as a resource for researchers, industry professionals, and policymakers working on circular economic design in construction.

## Current Status

| Country | Status | Verified Projects | Research Queue |
|---------|--------|-------------------|----------------|
| 🇳🇴 Norway | **Complete** | 22 | - |
| 🇸🇪 Sweden | Research Phase | 0 | 8 |
| 🇩🇰 Denmark | Research Phase | 0 | 9 |
| 🇫🇮 Finland | Research Phase | 0 | 7 |
| 🇮🇸 Iceland | Research Phase | 0 | 4 |

**Total: 22 verified + 28 in research queue = 50 documented projects**

## Live Site

**https://justaride.github.io/nordic-circular-buildings/**

### Features
- Interactive map with all projects
- Country-specific pages (`/no/`, `/se/`, `/dk/`, `/fi/`, `/is/`)
- Dynamic routing with research queue support
- Project detail pages with material flow visualization
- 7 detailed case study pages
- Cost comparison data (reused vs new materials)
- CO2 savings bar charts per material
- Clickable source citations with PDF page links

## Norway Highlights

- **22 documented projects** across Oslo, Bærum, Asker, Bergen, and Trondheim
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

## Nordic Research Queue

### Sweden (8 projects)
- Förskolan Hoppet - First fossil-free circular preschool (~70% CO2 reduction)
- Selma Lagerlöfs Center - 82% reuse, DGNB Platinum
- Lumi - DGNB Platinum, climate-positive office
- Sara Kulturhus - World's tallest timber, 5,000 m³ CLT

### Denmark (9 projects)
- Resource Rows - Upcycle Studios, 1,400 reused windows
- Circle House - Europe's first circular social housing
- UN17 Village - 535 homes, 1,600+ reused windows
- Upcycle House - 86% reused/recycled materials

### Finland (7 projects)
- Mustikkamaa Reused-Materials Depot - First building from mostly reused materials
- Pikku-Finlandia - 2,700 m² fully demountable
- Dance House Helsinki - Nokia Cable Factory adaptive reuse

### Iceland (4 projects)
- Háteigsvegur 59 - 40% CO2 reduction, Mies Award nomination
- Smiðja Parliament - Stone from hospital demolition
- Stöng Viking Ruins Shelter - 1957 shelter preserved

## Data Structure

```
data/
├── schema.json              # JSON schema definition
├── projects/
│   ├── norway.json          # 22 verified projects
│   ├── sweden.json          # 8 research queue
│   ├── denmark.json         # 9 research queue
│   ├── finland.json         # 7 research queue
│   └── iceland.json         # 4 research queue
├── enablers/                # Policy enablers per country
├── flows/                   # Material flow mappings
└── case-studies/            # Deep-dive case studies
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

### Completed
- ✅ Norway: 22 verified projects with full documentation
- ✅ Nordic expansion: Data templates for SE/DK/FI/IS
- ✅ Dynamic country routing (`/no/`, `/se/`, `/dk/`, `/fi/`, `/is/`)
- ✅ Research queue display for countries in research phase
- ✅ 7 case studies with deep material traceability

### In Progress
- 🔄 Verify and promote research queue projects to verified status
- 🔄 Deep-dive case studies for Swedish/Danish flagships

### Planned
- [ ] REST API for external access
- [ ] Integration with Nordic Circle Construction stakeholder map
- [ ] Community contribution system

## Contributing

This is a research project with ongoing data collection. Contributions welcome for:
- Additional project documentation
- Source verification
- Nordic country research expansion

## License

Research data. See individual source citations for original content attribution.

---

*Last updated: 2025-12-08*
