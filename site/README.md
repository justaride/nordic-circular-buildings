# Nordic Circular Buildings - Astro Site

The web frontend for the Nordic Circular Buildings database, built with Astro 5 and Tailwind CSS.

## Overview

This site provides an interactive platform for exploring circular building projects across all Nordic countries (Norway, Sweden, Denmark, Finland, Iceland).

## Features

- **Nordic Overview Dashboard** - Country cards, interactive map, statistics
- **Country Pages** - Dynamic routing for `/no/`, `/se/`, `/dk/`, `/fi/`, `/is/`
- **Research Queue Display** - Countries in research phase show pending projects
- **Project Detail Pages** - Full material data, citations, metrics
- **Case Studies** - 7 deep-dive analyses with PDF source links
- **Interactive Map** - Leaflet with project markers and clustering
- **Charts** - Chart.js visualizations for statistics
- **Stakeholder Export** - JSON/CSV export of suppliers and clients

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5.16 |
| Styling | Tailwind CSS 4.1 |
| Type Safety | TypeScript |
| Maps | Leaflet 1.9.4 (bundled) |
| Charts | Chart.js (bundled) |

## Project Structure

```
site/
├── src/
│   ├── types/
│   │   └── project.ts           # TypeScript interfaces (300+ lines)
│   ├── pages/
│   │   ├── index.astro          # Nordic dashboard
│   │   ├── [country]/index.astro # Dynamic country routing
│   │   ├── project/[id].astro   # Project detail
│   │   ├── case-studies/        # Case study pages
│   │   ├── materials.astro      # Material analysis
│   │   ├── flows.astro          # Material flows
│   │   ├── enablers/            # Policy enablers
│   │   └── stakeholders.astro   # Stakeholder export
│   ├── components/
│   │   ├── FilterPanel.astro    # Project filtering
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro         # Site layout with nav
│   ├── scripts/
│   │   ├── index.ts             # Main initialization
│   │   ├── filters.ts           # Filter logic
│   │   ├── filter-manager.ts    # DOM updates
│   │   ├── sort-manager.ts      # Sorting
│   │   ├── comparison.ts        # Project comparison
│   │   ├── mobile-drawer.ts     # Mobile menu
│   │   └── vendors.ts           # Leaflet/Chart.js
│   └── styles/
│       └── global.css           # Global styles
└── public/
    ├── data/
    │   ├── norway.json          # 22 verified projects
    │   ├── sweden.json          # 8 research queue
    │   ├── denmark.json         # 9 research queue
    │   ├── finland.json         # 7 research queue
    │   └── iceland.json         # 4 research queue
    └── docs/                    # Source PDFs
```

## Commands

All commands run from the `site/` directory:

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site (runs sync + validate) |
| `npm run preview` | Preview production build |
| `npm run sync` | Sync data from `/data` to `/public/data` |
| `npm run validate` | Validate JSON against schema |

## Data Flow

```
/data/projects/*.json
       ↓
npm run sync (prebuild)
       ↓
/site/public/data/*.json
       ↓
Astro imports at build time
       ↓
Static HTML pages
```

## Country Routing

Dynamic routing handles all Nordic countries:

```typescript
// site/src/pages/[country]/index.astro
export async function getStaticPaths() {
  return [
    { params: { country: 'no' } },  // Norway
    { params: { country: 'se' } },  // Sweden
    { params: { country: 'dk' } },  // Denmark
    { params: { country: 'fi' } },  // Finland
    { params: { country: 'is' } },  // Iceland
  ];
}
```

Countries with `data_status: 'initial_research'` display their research queue instead of verified projects.

## TypeScript Types

Key interfaces in `src/types/project.ts`:

- `CountryData` - Generic country data structure
- `Project` - Full project with all fields
- `ResearchQueueItem` - Lightweight research queue entry
- `CountryMeta` - Country metadata (code, name, flag, slug)
- `CircularFeature` - Material reuse documentation
- `CBCAssessment` - Circular Building Coalition scoring

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on push to `main`.

**Live site:** https://justaride.github.io/nordic-circular-buildings/

---

*Last updated: 2025-12-08*
