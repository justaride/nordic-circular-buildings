# Country Template: Nordic Circular Buildings Database

This document defines the standard structure for documenting circular building projects across all Nordic countries. Every country dataset should follow this template to ensure consistency and comparability.

---

## Country Data File Structure

Each country should have:
```
data/
├── projects/
│   ├── {country}.json           # Structured project data + research queue
│   ├── {country}_data_gaps.md   # Verification needs (optional)
│   └── {country}_sources.md     # Complete source citations (optional)
├── enablers/
│   └── {country}.json           # Policy enablers and programs
└── flows/
    └── {country}.json           # Material flow mappings
```

## Data Status Progression

Countries progress through three data statuses:

| Status | Description | UI Display |
|--------|-------------|------------|
| `initial_research` | Projects identified, not verified | Research queue view |
| `in_progress` | Active verification underway | Mixed view |
| `complete` | All projects fully documented | Full project list |

## Country JSON Root Structure

```json
{
  "country": "SE",
  "country_name": "Sweden",
  "last_updated": "2025-12-08",
  "total_projects": 0,
  "data_status": "initial_research",
  "summary": { ... },
  "research_queue": [ ... ],
  "projects": [ ... ]
}
```

### Research Queue Schema

For countries in `initial_research` or `in_progress` status:

```json
{
  "research_queue": [
    {
      "name": "Project Name",
      "city": "City",
      "year": 2024,
      "type": "school|office|housing|cultural|infrastructure|government",
      "highlight": "Brief key achievement description",
      "client": "Client Name (optional)",
      "architect": "Architect Firm (optional)",
      "circular_features": ["Feature 1", "Feature 2"],
      "source": "https://primary-source-url.com"
    }
  ]
}
```

Research queue items are promoted to full projects after verification.

---

## Project Schema (JSON)

Each project entry must include the following fields:

### Required Fields

```json
{
  "id": "NO_project_slug",
  "name": "Full Project Name",
  "country": "NO",
  "location": {
    "city": "Oslo",
    "municipality": "Oslo kommune",
    "address": "Street Address",
    "region": "Region/County",
    "coordinates": { "lat": 59.9139, "lng": 10.7522 }
  },
  "status": "completed|under_construction|planned",
  "year_completed": 2024,
  "building_type": "office|school|housing|sports_facility|care_facility|mixed_use|cultural|infrastructure|workshop",
  "size_sqm": 4000,
  "budget": {
    "amount": 150000000,
    "currency": "NOK",
    "excludes_vat": true
  },
  "client": "Client/Owner Name",
  "architect": "Architect Firm(s)",
  "contractor": "Main Contractor",
  "circularity_qualification": "Brief explanation of why this project qualifies",
  "primary_strategies": ["material_reuse", "adaptive_reuse", "design_for_disassembly", "upcycling"],
  "circular_features": [],
  "metrics": {},
  "certifications": [],
  "programs": [],
  "sources": [],
  "data_quality": "strong|moderate|weak",
  "verification_status": "verified|partially_verified|needs_verification",
  "last_updated": "2024-11-29"
}
```

---

## Circular Features Schema

Each circular feature should be documented as:

```json
{
  "category": "material_reuse|adaptive_reuse|upcycling|design_for_disassembly|recycled_content|low_carbon_materials|traditional_techniques|material_banking",
  "material_type": "concrete|steel|brick|timber|stone|glass|fixtures|insulation|other",
  "description": "Detailed description of the circular feature",
  "donor_source": {
    "name": "Source building/project name",
    "location": "City/Address",
    "type": "demolition|renovation|surplus|industrial_waste"
  },
  "quantity": {
    "value": 168,
    "unit": "tonnes|m2|m3|units",
    "description": "21 hollow-core concrete slabs"
  },
  "processing": "Description of how material was processed/prepared",
  "application": "How the material is used in the new building",
  "citations": [
    {
      "source": "Source Name",
      "url": "https://example.com",
      "accessed": "2024-11-29"
    }
  ]
}
```

---

## Metrics Schema

```json
{
  "circularity_rate": {
    "value": 80,
    "unit": "percent",
    "measurement": "by_weight|by_volume|by_value",
    "verified": true,
    "citation": "Source URL"
  },
  "co2_reduction": {
    "percent": 70,
    "absolute_tonnes": 171,
    "comparison_basis": "vs_conventional|vs_reference|vs_new_construction",
    "citation": "Source URL"
  },
  "waste_diverted": {
    "tonnes": 106,
    "description": "Materials diverted from landfill",
    "citation": "Source URL"
  },
  "virgin_materials_avoided": {
    "percent": 80,
    "description": "Reduction in new material consumption"
  },
  "construction_site": {
    "fossil_free": true,
    "emission_free_percent": 90,
    "waste_per_sqm_kg": 20
  }
}
```

---

## Stakeholders Schema

```json
{
  "other_stakeholders": [
    {
      "role": "reuse_coordinator|reuse_advisor|testing|supplier|funding|regulatory",
      "name": "Organization/Person Name",
      "organization": "Company Name",
      "url": "https://example.com",
      "contribution": "Description of their role"
    }
  ]
}
```

---

## Certifications & Programs Schema

```json
{
  "certifications": [
    {
      "name": "BREEAM-NOR",
      "level": "Excellent|Outstanding|Very Good|Good|Pass",
      "year": 2024,
      "verified": true
    }
  ],
  "programs": [
    {
      "name": "FutureBuilt",
      "designation": "Forbildeprosjekt|Pilot|Innovation Pilot",
      "year_joined": 2020
    }
  ],
  "awards": [
    {
      "name": "DOGA Hedersmerke",
      "year": 2021,
      "category": "Design and Architecture"
    }
  ]
}
```

---

## Source Documentation Schema

```json
{
  "sources": [
    {
      "type": "primary|secondary|official|media|academic",
      "category": "client|architect|contractor|government|certification|program|research|media",
      "name": "Source Name/Title",
      "organization": "Publishing Organization",
      "url": "https://example.com/source",
      "date": "2024-01-15",
      "accessed": "2024-11-29",
      "language": "no|en|sv|da|fi|is"
    }
  ],
  "documentation_quality": {
    "level": "strong|moderate|weak",
    "criteria_met": [
      "Multiple independent sources",
      "Specific quantities documented",
      "Named donor buildings",
      "Verified certifications"
    ],
    "limitations": [
      "Budget not publicly disclosed",
      "Some quantities estimated"
    ],
    "source_count": 8,
    "verification_notes": "Additional notes on documentation quality"
  }
}
```

---

## Project Categories (Circular Strategies)

Projects must demonstrate at least one of these documented strategies:

### 1. Material Reuse
Direct reuse of building components from donor buildings:
- Structural elements (concrete slabs, steel beams, timber)
- Facade materials (brick, stone, cladding)
- Interior elements (doors, windows, fixtures, flooring)
- Building systems (HVAC, electrical, plumbing)

### 2. Adaptive Reuse
Transformation of existing buildings:
- Structural preservation (keeping concrete/steel frame)
- Heritage building conversion
- Change of use (warehouse → office, barn → housing)

### 3. Upcycling
Transformation of waste materials into building components:
- Industrial waste → insulation (fish boxes → EPS)
- Demolition concrete → aggregate
- Ship steel → structural elements

### 4. Design for Disassembly (DfD)
New construction designed for future material recovery:
- Reversible connections (bolted vs welded)
- Modular systems
- Material passports
- Documented assembly for future disassembly

### 5. Material Banking
Systematic storage and redistribution of materials:
- Municipal reuse warehouses
- Material exchange platforms
- Coordinated demolition-construction logistics

---

## Verification Standards

### Strong Evidence
- ≥3 independent sources
- Specific quantities with units
- Named donor buildings with locations
- Official certifications verified
- Published reports or case studies

### Moderate Evidence
- 2-3 sources
- General quantities stated
- Some donor sources named
- Certifications claimed but not independently verified

### Weak Evidence
- Single source
- Vague quantities ("significant reuse")
- Donor sources not specified
- Claims without documentation

---

## Data Quality Indicators

Each project should be assessed for:

| Indicator | Strong | Moderate | Weak |
|-----------|--------|----------|------|
| Circularity rate | Exact % with methodology | Approximate % | "High reuse" |
| CO2 savings | Tonnes with calculation | Percentage estimate | "Reduced emissions" |
| Material quantities | Specific tonnage/m² | Range or estimate | "Multiple tonnes" |
| Donor buildings | Named with addresses | Named without detail | "Various sources" |
| Budget | Published amount | Range given | Not disclosed |
| Timeline | Exact dates | Year only | Approximate |

---

## Country Summary Statistics

Each country file should include aggregate statistics:

```json
{
  "summary": {
    "total_projects": 22,
    "geographic_distribution": {
      "Oslo": 14,
      "Bærum": 2,
      "Asker": 1,
      "Bergen": 2,
      "Trondheim": 1
    },
    "by_status": {
      "completed": 15,
      "under_construction": 5,
      "planned": 2
    },
    "by_building_type": {
      "office": 5,
      "school": 6,
      "housing": 2,
      "sports_facility": 3,
      "mixed_use": 4,
      "infrastructure": 1,
      "other": 1
    },
    "by_strategy": {
      "material_reuse": 18,
      "adaptive_reuse": 10,
      "upcycling": 6,
      "design_for_disassembly": 4,
      "material_banking": 1
    },
    "aggregate_metrics": {
      "total_co2_saved_tonnes": 500,
      "total_waste_diverted_tonnes": 3000,
      "reuse_rate_range": "50-97%"
    },
    "key_programs": ["FutureBuilt"],
    "regulatory_milestones": []
  }
}
```

---

## File Naming Conventions

- Country codes: `NO`, `SE`, `DK`, `FI`, `IS`
- Project IDs: `{COUNTRY}_{project_slug}` (e.g., `NO_ka13`, `SE_sara_kulturhus`)
- Slugs: lowercase, underscores, no special characters
- Dates: ISO 8601 format (`2024-11-29`)

---

---

## TypeScript Interfaces

Key TypeScript interfaces are defined in `site/src/types/project.ts`:

```typescript
// Country codes
export type CountryCode = 'NO' | 'SE' | 'DK' | 'FI' | 'IS';
export type CountrySlug = 'no' | 'se' | 'dk' | 'fi' | 'is';

// Generic country data interface
export interface CountryData {
  country: CountryCode;
  country_name: string;
  last_updated: string;
  total_projects: number;
  data_status?: 'initial_research' | 'in_progress' | 'complete';
  summary: DataSummary;
  research_queue?: ResearchQueueItem[];
  projects: Project[];
}

// Research queue item (lightweight)
export interface ResearchQueueItem {
  name: string;
  city: string;
  year: number | string;
  type: string;
  highlight: string;
  client?: string;
  architect?: string;
  circular_features?: string[];
  source: string;
}

// Country metadata for navigation
export interface CountryMeta {
  code: CountryCode;
  name: string;
  name_local: string;
  flag: string;
  slug: string;
  project_count: number;
  data_status: 'initial_research' | 'in_progress' | 'complete';
}
```

---

## Current Implementation Status

| Country | Code | Slug | Data Status | Projects | Research Queue |
|---------|------|------|-------------|----------|----------------|
| Norway | NO | no | complete | 22 | - |
| Sweden | SE | se | initial_research | 0 | 8 |
| Denmark | DK | dk | initial_research | 0 | 9 |
| Finland | FI | fi | initial_research | 0 | 7 |
| Iceland | IS | is | initial_research | 0 | 4 |

---

*Template Version: 2.0 | Last Updated: 2025-12-08*
