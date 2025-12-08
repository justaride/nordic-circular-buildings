# Research Notes

This folder contains raw research notes and documentation for circular building projects across all Nordic countries.

## Folder Structure

```
research-notes/
├── README.md           # This file
├── norway/             # Norwegian project research
├── sweden/             # Swedish project research
├── denmark/            # Danish project research
├── finland/            # Finnish project research
└── iceland/            # Icelandic project research
```

## Processing Pipeline

```
1. Raw Research Notes (this folder)
       ↓
2. Source Verification
       ↓
3. Data Extraction → /data/projects/{country}.json
       ↓
4. Case Study Creation → /data/case-studies/
       ↓
5. Website Display → /site/public/data/
```

## Current Status

| Country | Raw Notes | Research Queue | Verified Projects |
|---------|-----------|----------------|-------------------|
| Norway | Complete | - | 22 |
| Sweden | Complete | 8 | 0 |
| Denmark | Complete | 9 | 0 |
| Finland | Complete | 7 | 0 |
| Iceland | Complete | 4 | 0 |

## Research Queue

Projects in the research queue have been identified from initial research but need:
- Source verification (minimum 2-3 independent sources)
- Quantified metrics (circularity %, CO2 reduction)
- Detailed material documentation
- Stakeholder identification

See `/data/projects/{country}.json` for current research queue entries.

## Data Quality Standards

### Strong Evidence (Ready for verification)
- 3+ independent sources
- Specific quantities with units
- Named donor buildings
- Official certifications verified

### Moderate Evidence (Research queue)
- 2-3 sources
- General quantities stated
- Some donor sources named

### Weak Evidence (Needs more research)
- Single source
- Vague quantities
- Unverified claims

## Initial Research Sources

### Norway
- FutureBuilt (futurebuilt.no)
- Entra Erfaringsrapporter
- SINTEF Byggforsk
- Ombygg.no
- Loopfront

### Sweden
- White Arkitekter
- Castellum reports
- SGBC (Swedish Green Building Council)
- IVL Svenska Miljöinstitutet

### Denmark
- GXN (Lendager Group)
- DGNB Denmark
- Circle House consortium
- Realdania

### Finland
- Helsinki City
- HSY Climate Info
- JKMM Architects
- Puuinfo

### Iceland
- Hringvangur
- Environment Agency of Iceland
- Studio Granda
- Nordic Swan Iceland

## Research Tools

For systematic research across Nordic countries:

- **`docs/NORDIC_RESEARCH_PLAN.md`** - Strategy, priorities, verification criteria
- **`docs/NORDIC_RESEARCH_PROMPTS.md`** - Copy-paste prompts for 20 priority projects

## Contributing

When adding research notes:
1. Create a markdown file in the appropriate country folder
2. Include source URLs and access dates
3. Note data quality level (strong/moderate/weak)
4. Flag any claims needing verification

---

*Last updated: 2025-12-08*
