# Nordic Circular Buildings - Project Roadmap

## Current Phase: Deep Case Study Development

### Immediate Focus: Flagship Case Studies

**Objective**: Create comprehensive, inspirational case studies focused on **materiality** - the practical details of how circular construction actually works.

#### Priority 1: KA13 (Kristian Augusts gate 13) - Flagship Case
The most documented circular building in Norway. Will serve as template for all other case studies.

**Target information depth:**
- Material sources (exact donor buildings/projects)
- Quantities (tonnes, m², pieces)
- Certification process (DNV, SINTEF, etc.)
- Cost comparisons (reused vs new)
- Logistics and storage solutions
- Technical testing and documentation
- Lessons learned and challenges

#### Priority 2-5: Secondary Deep Cases
Apply KA13 template to:
- KA23 (Kristian Augusts gate 23)
- Prosjekt Føniks (Bergen)
- Oksenøya Senter
- Vollebekk torg

---

## Planned Features

### A. Value Chain / Enablers Page (Priority: High)

**Purpose**: Document the ecosystem that makes circular construction possible.

**Content structure:**
```
/enablers or /value-chain

1. Material Banking Infrastructure
   - Sirkulær Ressurssentral (Oslo)
   - Resirqel / Ombygg (Oslo)
   - Role, capacity, pricing model

2. Digital Platforms
   - Loopfront (material marketplace)
   - BIM integration approaches

3. Testing & Certification Bodies
   - SINTEF (structural testing)
   - DNV (offshore steel certification)
   - Nordic Circles methodology

4. Program Frameworks
   - FutureBuilt criteria
   - BREEAM-NOR circular credits
   - EU CCRI pilot

5. Key Consultants & Specialists
   - Ombrukskartlegging specialists
   - Reuse-focused architects
   - Circular procurement advisors
```

**Data model addition:**
```json
{
  "enablers": [
    {
      "id": "sirkular_ressurssentral",
      "name": "Sirkulær Ressurssentral",
      "type": "material_bank",
      "services": ["storage", "inventory", "matching"],
      "location": "Oslo",
      "url": "https://ressurssentral.no",
      "projects_supplied": ["NO_ka13", "NO_ka23", ...],
      "key_people": [...],
      "business_model": "..."
    }
  ]
}
```

### B. Material Flow Visualization (Priority: Medium)

**Sankey diagram showing:**
- Donor buildings → Material banks → Recipient projects
- Material types and quantities
- Geographic flow

### C. Flagship Case Study Pages (Priority: High)

**Enhanced project pages for top 5-6 cases:**
- Full material inventory table
- Source traceability
- Photo documentation
- Cost/benefit analysis
- Replicability assessment

---

## Data Quality Tiers

| Tier | Criteria | Target |
|------|----------|--------|
| **Flagship** | Full material inventory, costs, certification docs | 5-6 projects |
| **Strong** | Verified metrics, multiple sources | 15+ projects |
| **Moderate** | Basic info, partial verification | Remaining |

---

## Research Priorities

### For Flagship Cases, we need:

1. **Material Specifics**
   - Exact quantities (tonnes, m², units)
   - Material condition/grade
   - Processing required

2. **Source Documentation**
   - Donor building name and location
   - Demolition contractor
   - Timeline (harvest → installation)

3. **Certification**
   - Testing performed
   - Standards applied (NS/EN)
   - Documentation provided

4. **Economics**
   - Purchase/acquisition cost
   - Processing/adaptation cost
   - Comparison to new equivalent
   - Total cost of ownership

5. **Logistics**
   - Storage location and duration
   - Transportation distances
   - Handling requirements

---

## Technical Implementation Notes

### Site Structure (Astro)
```
src/pages/
├── index.astro              # Overview with stats
├── projects/
│   └── [id].astro           # Project detail pages
├── enablers/
│   ├── index.astro          # Value chain overview
│   └── [id].astro           # Individual enabler pages
├── case-studies/
│   └── [id].astro           # Deep-dive flagship cases
├── materials/
│   └── index.astro          # Material type analysis
└── methodology.astro        # How we assess circularity
```

### Data Files
```
data/
├── projects/
│   └── norway.json          # All projects
├── enablers/
│   └── norway.json          # Value chain actors
├── case-studies/
│   └── ka13.json            # Detailed flagship data
├── materials/
│   └── flows.json           # Material flow data
```

---

## Timeline

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | KA13 flagship case study | 🔄 In Progress |
| **Phase 2** | 4-5 additional deep cases | Pending |
| **Phase 3** | Enablers/value chain page | Planned |
| **Phase 4** | Material flow visualization | Planned |
| **Phase 5** | Nordic expansion (Sweden) | Future |

---

*Document created: 2024-12-03*
*Last updated: 2024-12-03*
