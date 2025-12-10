# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nordic Circular Buildings Database - a research platform documenting public building projects demonstrating material circularity across Nordic countries.

**Current State (Phase 11 Complete):**
- **40 verified projects** across 5 countries (NO: 25, SE: 5, DK: 5, IS: 4, FI: 1)
- **22 comprehensive case studies** (NO: 7, SE: 5, DK: 5, IS: 4, FI: 1)
- **16 research queue projects** (SE: 5, DK: 5, FI: 6)
- Data stored as JSON, rendered via Astro static site on GitHub Pages

**Next Priorities:**
1. Norway case study expansion (18 projects without case studies, including Grensen 9B at 97.3%)
2. Research queue promotion (verify and add projects from queue)
3. Data consistency sync (case study metrics → project files)
4. Swedish/Danish enablers documentation

## Commands

### Development (run from `site/` directory)
```bash
cd site
npm install           # Install dependencies
npm run dev           # Start dev server at localhost:4321
npm run build         # Build with prebuild validation + sync
npm run validate      # Validate schema only
npm run sync          # Sync data files only
```

### Validation scripts (run from root)
```bash
node scripts/validate-schema.js   # Validate norway.json against schema
node scripts/sync-data.js         # Copy data files to site/public/data/
node scripts/verify-integrity.js  # Full integrity check (data + case studies + sync)
```

### Build pipeline
`npm run build` in `site/` triggers:
1. `prebuild` → `sync-data.js` + `validate-schema.js`
2. `astro build` → static site to `site/dist/`

## Architecture

```
data/
├── schema.json              # JSON Schema for projects
├── projects/                # Country data files (40 verified total)
│   ├── norway.json          # 25 verified projects
│   ├── sweden.json          # 5 verified + 5 queue
│   ├── denmark.json         # 5 verified + 5 queue
│   ├── iceland.json         # 4 verified
│   └── finland.json         # 1 verified + 6 queue
├── case-studies/            # 22 comprehensive case studies
│   ├── ka13_flagship.json   # Norway flagships
│   ├── forskolan_hoppet_flagship.json  # Sweden
│   ├── upcycle_house_flagship.json     # Denmark
│   ├── hateigsvegur59_flagship.json    # Iceland
│   ├── pikku_finlandia_flagship.json   # Finland
│   └── ... (22 files total)
├── enablers/                # Policy enablers (currently norway.json only)
└── flows/                   # Material flow mappings

site/                        # Astro 5.16 + Tailwind 4.1
├── src/
│   ├── pages/
│   │   ├── index.astro      # Homepage with map
│   │   ├── [country]/index.astro  # Dynamic country routes (/no/, /se/, etc.)
│   │   ├── project/[id].astro     # Project detail pages
│   │   └── case-studies/[id].astro
│   ├── components/          # Map.astro, Charts.astro, etc.
│   └── layouts/Layout.astro
├── public/data/             # Synced from data/projects/ at build
└── astro.config.mjs         # GitHub Pages config (base: /nordic-circular-buildings)

scripts/
├── validate-schema.js       # Schema validation with errors/warnings
├── sync-data.js             # Data sync to site/public/data/
└── verify-integrity.js      # Full integrity check (data + case studies + sync)
```

## Data Schema

Projects follow `data/schema.json`. Key required fields:
- `id`: Format `XX_project_slug` (e.g., `NO_ka13`)
- `country`: Enum `NO|SE|DK|FI|IS`
- `status`: Enum `completed|under_construction|planned|operational`
- `is_public_sector`: Boolean
- `location.city` and `location.coordinates`
- `circular_features[]` with category, material_type, donor_source
- `metrics.circularity_rate`, `metrics.co2_reduction`
- `data_completeness.score` and `grade` (A-E)

### Project Types (CBC Framework)
- `renovation`: Same function, upgraded
- `transformation`: New function
- `extension`: Vertical/horizontal addition
- `hybrid`: New + preserved elements
- `new_build`: Entirely new

### Circular Feature Categories
`material_reuse`, `design_for_disassembly`, `recycled_content`, `adaptive_reuse`, `low_carbon_materials`, `upcycling`, `material_banking`

## GitHub Actions

- `.github/workflows/deploy.yml`: Deploy to GitHub Pages on push to main
- `.github/workflows/validate.yml`: Validate + build on PR and data changes

## URL Structure

Site deploys to: `https://justaride.github.io/nordic-circular-buildings/`

Routes:
- `/` - Homepage with interactive map
- `/no/`, `/se/`, `/dk/`, `/fi/`, `/is/` - Country pages
- `/project/{id}/` - Project details
- `/case-studies/` and `/case-studies/{id}/`

Note: `trailingSlash: 'always'` in astro.config.mjs - all URLs end with `/`.

## Research Expansion

For adding Nordic countries beyond Norway, see:
- `docs/NORDIC_RESEARCH_PLAN.md` - Verification criteria and source hierarchy
- `docs/NORDIC_RESEARCH_PROMPTS.md` - Copy-paste research prompts

Verification requirements for promoting research queue to verified:
- 2+ independent sources
- Quantified reuse rate OR CO2 reduction
- Named architect and client
- Confirmed completion year
