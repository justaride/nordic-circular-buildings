# Nordic Circular Buildings - Project Roadmap

## Current Phase: Deep Case Study Development

### Immediate Focus: Flagship Case Studies

**Objective**: Create comprehensive, inspirational case studies focused on **materiality** - the practical details of how circular construction actually works.

#### Priority 1: KA13 (Kristian Augusts gate 13) - Flagship Case ✅ COMPLETE
The most documented circular building in Norway. Serves as template for all other case studies.

**Achieved:**
- ✅ Material sources (exact donor buildings/projects)
- ✅ Quantities (tonnes, m², pieces)
- ✅ Certification process (SINTEF testing documented)
- ✅ Cost comparisons (reused vs new)
- ✅ Logistics and storage solutions
- ✅ Technical testing and documentation
- ✅ Lessons learned and challenges
- ✅ **Verified page-level citations** (all 5 materials verified against PDF)
- ✅ **Self-hosted PDF** for reliable citation links

**Verified Material Citations:**
| Material | Section | Pages | Quote |
|----------|---------|-------|-------|
| Steel (45t) | 4.2 Stålkonstruksjoner | 54-58 | "Ca. 70% av stålkonstruksjonene i KA13 er ombruksstål" |
| Hulldekker (96t) | 4.6 Hulldekker | 63-67 | "21 stk. hulldekker (type HD265)" |
| Staircase | 4.7 Intern Trapp | 67 | "Ståltrapp mellom 8. og 9. etg." |
| Windows (30 stk) | 2.4 Vinduer i tilbygg | 16-18 | "28 stk. vinduer fra Turbinveien 15" |
| Sanitary (116 stk) | 5.2 Sanitærutstyr | 69 | Full inventory table |

#### Priority 2-5: Secondary Deep Cases
Apply KA13 template to:
- KA23 (Kristian Augusts gate 23)
- Prosjekt Føniks (Bergen)
- Oksenøya Senter
- Vollebekk torg

---

## Completed Features

### A. Citation Traceability System ✅
- Self-hosted PDF documents on GitHub Pages
- Page-level anchors (`#page=54`) for direct navigation
- Verified quotes from source documents
- Section references matching document structure

### B. Material Flow Visualization ✅
- Cost comparison boxes (amber) showing reused vs new prices
- CO2 savings bars (teal) with percentage and tonnes saved
- Summary "CO2 Savings by Material" chart
- Donor source details with processing information

### C. Project Detail Pages ✅
- Full material inventory with quantities
- Source traceability with clickable citations
- Cost/benefit display
- Environmental impact visualization

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

### B. Sankey Material Flow Diagram (Priority: Medium)

**Visualization showing:**
- Donor buildings → Material banks → Recipient projects
- Material types and quantities
- Geographic flow

### C. Additional Flagship Cases (Priority: High)

**Apply KA13 methodology to:**
- Verify all citations against source documents
- Host relevant PDFs locally
- Add cost comparison data
- Include CO2 savings per material

---

## Data Quality Tiers

| Tier | Criteria | Current Count |
|------|----------|---------------|
| **Flagship** | Full material inventory, costs, verified citations | 1 (KA13) |
| **Strong** | Verified metrics, multiple sources | 10+ projects |
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

6. **Citation Verification** ✅ NEW
   - PDF page numbers verified against source
   - Quotes extracted from original text
   - Self-hosted documents for reliability

---

## Technical Implementation Notes

### Site Structure (Astro)
```
src/pages/
├── index.astro              # Overview with stats
├── projects/
│   └── [id].astro           # Project detail pages (enhanced)
├── enablers/
│   ├── index.astro          # Value chain overview (planned)
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
│   └── ka13_flagship.json   # Detailed flagship data (v2.0)
├── materials/
│   └── flows.json           # Material flow data

site/public/
├── data/
│   └── norway.json          # Site data source
└── docs/
    └── ka13-erfaringsrapport-ombruk-rev1-250120-kl-1211.pdf  # Source PDF (15MB)
```

---

## Progress Timeline

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | KA13 flagship case study | ✅ Complete |
| **Phase 1b** | Citation verification & PDF hosting | ✅ Complete |
| **Phase 1c** | Cost & CO2 visualization | ✅ Complete |
| **Phase 2** | 4-5 additional deep cases | 🔄 Next |
| **Phase 3** | Enablers/value chain page | Planned |
| **Phase 4** | Material flow visualization | Planned |
| **Phase 5** | Nordic expansion (Sweden) | Future |

---

*Document created: 2024-12-03*
*Last updated: 2025-12-03*
