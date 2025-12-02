# Nordic Circular Buildings - Iteration 2 Plan

**Date:** 2025-11-30
**Based on:** Meeting with Jan Thomas after Iteration 1

---

## Executive Summary

Iteration 2 focuses on **sharpening the scope** to material circularity in public buildings, **deepening data quality** for priority projects, and **adding stakeholder export capabilities** for integration with Nordic Circle Construction ecosystem.

### Key Outcomes
1. Clear scope definition: **Material circularity** (not transformation, DfD, space optimization)
2. **6-7 deep-dive case studies** with full material-level data
3. **Project categorization**: Transformation vs New Build
4. **Stakeholder extraction**: Suppliers and property owners for mapping
5. **NRK Bygget** added as new project

---

## Part 1: Scope Clarification

### 1.1 What This Database IS

**Material circularity in public building projects:**
- Reuse of physical building materials (concrete, brick, steel, timber, stone)
- Quantified material flows (tonnes, m², units)
- Documented donor sources and recipient projects
- Measured circularity rates (% by weight)
- Cost comparisons where available

### 1.2 What This Database is NOT (Other Sirkularitet Types)

| Type | Description | Status |
|------|-------------|--------|
| **Transformation/Adaptive Reuse** | Reusing entire buildings | Mention but not primary focus |
| **Space Optimization** | Using space more efficiently | Out of scope |
| **Design for Disassembly** | Future material recovery | Secondary mention only |
| **Areal sirkularitet** | Better use of areas | Out of scope |

### 1.3 Projects to Review for Scope

| Project | Issue | Action |
|---------|-------|--------|
| TradLab TRE | Not a public building (museum workshop) | Flag as "demonstration project" or remove |
| Sirkulær Ressurssentral | Infrastructure, not building | Keep as "enabling infrastructure" category |
| HasleTre | Private office building (Höegh Eiendom) | Review if "public" criteria applies |
| Construction City | Furniture reuse, not material | Flag or reduce prominence |

---

## Part 2: Data Schema Updates

### 2.1 New Field: `project_type`

```json
"project_type": {
  "type": "string",
  "enum": ["new_build", "transformation"],
  "description": "Whether project is new construction or building transformation/rehabilitation"
}
```

**Classification criteria:**
- `new_build`: New construction using circular materials
- `transformation`: Rehabilitation/conversion of existing building

### 2.2 New Field: `is_public_sector`

```json
"is_public_sector": {
  "type": "boolean",
  "description": "True if client/owner is public sector (kommune, fylke, state)"
}
```

### 2.3 Enhanced `circular_features` Schema

Current structure is good but needs enforcement of:

```json
"circular_features": [{
  "category": "material_reuse",
  "material_type": "brick",           // REQUIRED for material_reuse
  "description": "...",
  "donor_source": {
    "name": "...",                     // REQUIRED
    "location": "...",
    "type": "demolition|surplus|preservation"
  },
  "quantity": {
    "value": 650,
    "unit": "m2|tonnes|units",        // REQUIRED
    "description": "..."
  },
  "supplier": {                        // NEW FIELD
    "name": "HØINE AS",
    "country": "NO",
    "role": "supplier|processor|logistics"
  },
  "cost_comparison": {                 // NEW FIELD (where available)
    "circular_cost": 1200000,
    "conventional_cost": 900000,
    "currency": "NOK",
    "notes": "30% premium but includes CE certification"
  }
}]
```

### 2.4 New Field: `project_url`

```json
"project_url": {
  "type": ["string", "null"],
  "format": "uri",
  "description": "Primary project page URL for 'Read more' link"
}
```

### 2.5 Enhanced `metrics` Schema

```json
"metrics": {
  "circularity_rate": {
    "value": 80,
    "unit": "percent",
    "measurement": "by_weight",
    "verified": true,
    "breakdown": [                     // NEW: material-level breakdown
      {"material": "concrete", "contribution_percent": 45},
      {"material": "steel", "contribution_percent": 25},
      {"material": "brick", "contribution_percent": 10}
    ]
  },
  "co2_reduction": {...},
  "cost_savings": {                    // NEW FIELD
    "amount": 500000,
    "currency": "NOK",
    "comparison": "vs_conventional"
  }
}
```

### 2.6 New Field: `narrative`

```json
"narrative": {
  "driver": "What was the motivation? Why did they pursue circularity?",
  "lessons_learned": "What worked? What didn't? Key takeaways.",
  "challenges": ["procurement", "certification", "logistics"]
}
```

---

## Part 3: Project Prioritization

### 3.1 Priority Criteria (in order)

1. **Has quantified circularity rate (%)** - TOP PRIORITY
2. **Is public sector project**
3. **Has material-level quantities (tonnes, m², units)**
4. **Has donor source documentation**
5. **Has supplier information**
6. **Material diversity** (prefer variety over multiple brick projects)

### 3.2 Tier 1: Deep-Dive Cases (6-7 projects)

These will receive full documentation effort:

| Project | Circularity | Material Type | Public | Priority Score |
|---------|-------------|---------------|--------|----------------|
| **KA13** | 80% | Concrete, glass, steel, stone | Yes (Entra) | ★★★★★ |
| **Grensen 9B** | 97.3% | Concrete, steel (metro), timber | Yes (OPF/PKH) | ★★★★★ |
| **Prosjekt Føniks** | 89% | Concrete, steel, fixtures | Private | ★★★★☆ |
| **Nedre Sem låve** | 50% | Stone, brick, timber | Yes (Asker) | ★★★★☆ |
| **Eikeli VGS** | N/A | Brick (CE-certified) | Yes (Viken) | ★★★★☆ |
| **Løren aktivitetspark** | N/A | Steel (ship), concrete | Yes (Oslo) | ★★★★☆ |
| **NRK Bygget** | TBD | TBD | Yes (NRK) | ★★★☆☆ |

### 3.3 Material Diversity Check

Current material coverage:
- **Brick**: Eikeli, Ruseløkka, Sophies Minde, Nedre Sem, Nøstebukten
- **Concrete (hollow-core)**: KA13, Oslo Legevakt
- **Steel (ship)**: Løren, Stovner Bad
- **Steel (metro)**: Grensen 9B
- **Timber**: Nedre Sem, TradLab TRE, Nøstebukten
- **Stone**: Nedre Sem, KA13, Oslo Legevakt

**Best case per material for deep-dive:**
| Material | Best Case | Rationale |
|----------|-----------|-----------|
| Brick | Eikeli VGS | CE-certified, quantified, scalable |
| Concrete | KA13 | 168t, SINTEF-tested, documented |
| Ship steel | Løren | World first, methodology documented |
| Timber | Nedre Sem | Inter-project flow, quantified |
| Stone | Nedre Sem | Meticulous documentation |

### 3.4 Tier 2: Standard Documentation

Remaining projects maintain current documentation level.

---

## Part 4: Data Fixes

### 4.1 Immediate Corrections

| Project | Field | Current | Correct |
|---------|-------|---------|---------|
| Eikeli VGS | Supplier location | "Denmark" in donor_source | HØINE AS is Norwegian company, brick sourced from Denmark |

**Fix description:**
```json
// Current (incorrect implication):
"donor_source": {"name": "Danish demolition brick via HØINE AS", "location": "Denmark"}

// Corrected:
"donor_source": {"name": "Reclaimed Danish brick", "location": "Denmark", "type": "demolition"},
"supplier": {"name": "HØINE AS", "country": "NO", "role": "supplier"}
```

### 4.2 Missing Project URLs

Add `project_url` to all projects. Priority sources:
1. FutureBuilt project page
2. Client/owner project page
3. Architect portfolio
4. News article with comprehensive coverage

---

## Part 5: New Project Research

### 5.1 NRK Bygget

**Research tasks:**
1. Confirm circular ambitions for new NRK headquarters
2. Find material circularity targets (not just energy/environmental)
3. Identify specific materials planned for reuse
4. Document client (NRK), location (likely Ensjø or Økern area)
5. Find sources and project URL

**Expected fields:**
- Location: Oslo (confirm address)
- Status: Planned/Under construction
- Client: NRK (public broadcaster)
- Building type: office/media_facility
- Circular features: TBD

---

## Part 6: UI/UX Changes

### 6.1 Project Type Badge

Add visual badge on ProjectCard:
- `NEW BUILD` - Blue badge
- `TRANSFORMATION` - Green badge

### 6.2 Sorting Priority

Default sort order:
1. Projects WITH circularity % (descending by %)
2. Projects without % (by year)

Add sort option: "Circularity rate (highest first)"

### 6.3 Project Links

Add "Read more →" link on project detail pages pointing to `project_url`

### 6.4 Filter Updates

Add filter checkbox:
- [ ] Show only projects with quantified circularity

### 6.5 Stakeholder Export

New page or section: `/stakeholders`

**Export capabilities:**
1. All suppliers of circular materials (CSV/JSON)
2. All property owners/clients (CSV/JSON)
3. Material type → supplier mapping

---

## Part 7: Implementation Tasks

### Phase A: Schema & Data Updates

| # | Task | Priority | Est. Effort |
|---|------|----------|-------------|
| A1 | Update `schema.json` with new fields | HIGH | 30 min |
| A2 | Add `project_type` to all 22 projects | HIGH | 1 hr |
| A3 | Add `is_public_sector` to all projects | HIGH | 30 min |
| A4 | Add `project_url` to all projects | HIGH | 2 hr |
| A5 | Fix HØINE AS data (Eikeli) | HIGH | 15 min |
| A6 | Add `supplier` field to circular_features | MEDIUM | 2 hr |
| A7 | Research and add NRK Bygget | MEDIUM | 2 hr |
| A8 | Flag/remove out-of-scope projects | MEDIUM | 30 min |

### Phase B: Deep-Dive Data Enhancement

| # | Task | Priority | Est. Effort |
|---|------|----------|-------------|
| B1 | KA13 deep-dive: material breakdown, costs | HIGH | 3 hr |
| B2 | Grensen 9B deep-dive | HIGH | 2 hr |
| B3 | Prosjekt Føniks deep-dive | HIGH | 2 hr |
| B4 | Nedre Sem deep-dive | MEDIUM | 2 hr |
| B5 | Eikeli VGS deep-dive | MEDIUM | 2 hr |
| B6 | Løren deep-dive | MEDIUM | 2 hr |
| B7 | Add narrative (driver, lessons) to Tier 1 | MEDIUM | 3 hr |

### Phase C: UI Implementation

| # | Task | Priority | Est. Effort |
|---|------|----------|-------------|
| C1 | Add project type badge to ProjectCard | HIGH | 30 min |
| C2 | Update default sort (circularity first) | HIGH | 30 min |
| C3 | Add "Read more" link on detail pages | HIGH | 30 min |
| C4 | Add circularity filter checkbox | MEDIUM | 30 min |
| C5 | Create stakeholder export page | MEDIUM | 2 hr |

### Phase D: Documentation

| # | Task | Priority | Est. Effort |
|---|------|----------|-------------|
| D1 | Update PROJECT.md with iteration 2 scope | HIGH | 1 hr |
| D2 | Update site About page with scope clarity | HIGH | 30 min |
| D3 | Document stakeholder export format | MEDIUM | 30 min |

---

## Part 8: Success Criteria

### Iteration 2 Progress:

1. [x] All 23 projects have `project_type` (transformation/new_build) - **9 transformation, 14 new_build**
2. [x] All projects have `is_public_sector` boolean - **16 public, 7 private**
3. [x] All projects have `project_url` - **23/23 complete**
4. [x] HØINE AS data corrected - **Norwegian supplier, Danish brick clarified**
5. [x] NRK Bygget added - **Project #23, winning concept "Sirkulær"**
6. [x] 6-7 Tier 1 projects have enhanced material-level data - **6 projects with narrative, breakdown, detailed metrics**
7. [x] UI shows project type badge - **Blue for new_build, green for transformation**
8. [x] Sorting prioritizes projects with circularity % - **Default sort by circularity**
9. [x] Project detail pages have "Read more" links - **Links to project_url**
10. [x] Stakeholder export available - **New /stakeholders page with JSON/CSV export**

---

## Part 9: Future Considerations (Out of Scope for Iteration 2)

- Cost comparison data (requires report deep-dives)
- Full narrative (driver/lessons) for all projects
- Nordic country expansion (SE, DK, FI, IS)
- CMS or contribution workflow
- Images/visual documentation
- API for external access

---

## Appendix A: Project Classification Reference

### New Build Projects (use circular materials in new construction)

1. Eikeli VGS - New school wing with reclaimed brick
2. Løren aktivitetspark - New sports facility with ship steel
3. Nøstebukten Brygge - New housing with donor building materials
4. Oslo Legevakt - New healthcare facility
5. Construction City - New office hub
6. Nidarvoll/Sunnland - New schools with reused materials
7. Stovner Bad - New swimming facility with ship steel
8. Voldsløkka - New sports park with DfD steel

### Transformation Projects (rehabilitate existing buildings)

1. KA13 - 1960s office transformed
2. Skur 38 - 1915 warehouse transformed
3. Nedre Sem - 1887 barn transformed
4. Treklang - N/A (new build but DfD focus)
5. Ruseløkka - New build replacing old school
6. TradLab TRE - New workshop (donor: Nedre Sem)
7. Grensen 9B - 1978 office transformed
8. Sophies Minde - Hospital transformation
9. KA23 - 1950 office transformed
10. Prosjekt Føniks - 1969 office transformed
11. Høyblokken - 1958 government building transformed
12. Lilleborg skole - 1898-1917 school complex transformed

### Infrastructure (enabling category)

1. Sirkulær Ressurssentral - Material banking facility

---

## Appendix B: Supplier Extraction Preview

Based on current data, extractable suppliers:

| Supplier | Material | Projects | Country |
|----------|----------|----------|---------|
| HØINE AS | Brick | Eikeli VGS | NO |
| AF Offshore Decom | Steel (ship) | Løren | NO |
| Nordic Circles | Steel methodology | Løren, Stovner | NO |
| Bewi | Insulation (fish box EPS) | Nedre Sem | NO |
| Unicon | Low-carbon concrete | Skur 38 | NO |
| Protekno | Facade insulation | Skur 38 | NO |
| Resirqel/Ombygg | Material validation | Multiple | NO |
| Loopfront | Material platform | Multiple | NO |

---

*Last updated: 2025-12-02*

---

## Iteration 3 Status (COMPLETE)

Iteration 3 was completed on **2025-12-02**. Key achievements:

### Completed Tasks

| Task | Status | Details |
|------|--------|---------|
| Nøstebukten Brygge breakdown | ✅ | 55% brick, 35% timber, 10% other |
| KA23 breakdown | ✅ | 5 material categories + GHG data |
| Skur 38 narrative | ✅ | driver, lessons, challenges |
| Sophies Minde narrative | ✅ | + WSP stakeholder |
| Høyblokken narrative | ✅ | + 4 new sources |
| Lilleborg skole narrative | ✅ | + size/budget data |
| Grensen 9B enhancement | ✅ | size, 99% netto null, 4 stakeholders |
| Føniks narrative update | ✅ | Fremtidens Bygg research |
| Nedre Sem budget update | ✅ | 150 MNOK, Stiltre info |

### Metrics Improvement

| Metric | Before (Iter 2) | After (Iter 3) | Change |
|--------|-----------------|----------------|--------|
| Projects with narrative | 6 | **12** | +100% |
| Projects with breakdown | 4 | **6** | +50% |
| Projects with suppliers | 7 | **10** | +43% |

---

## Iteration 4: CBC Four Pathways Framework (Current)

**Date Started:** 2025-12-02
**Methodology Source:** Circular Buildings Coalition "Four Circular Building Pathways" (2024)

### 4.1 Framework Overview

The CBC framework provides a standardized methodology for assessing circularity across four strategic pathways:

| Pathway | Description | CO2e Reduction Potential |
|---------|-------------|-------------------------|
| **Build Nothing New** | Renovation, transformation, extend existing buildings | 68 Mt (12%) |
| **Build for Long-term** | Design for disassembly, material passports, flexibility | 2 Mt (0.4%) |
| **Build Efficiently** | Space optimization, material efficiency, vertical extension | 259 Mt (46%) |
| **Build with Right Materials** | Reuse, recycled content, biobased materials | 240 Mt (42%) |

**Total potential by 2050:** 569 Mt CO2e reduction (84% vs baseline)

### 4.2 Schema Updates Implemented

**Enhanced `project_type` Object:**
```json
"project_type": {
  "primary": "transformation",  // 5 options
  "preservation_percent": 85,   // 0-100
  "description": "1960s office transformed to modern workplace"
}
```

**5 Project Type Categories:**
| Type | Definition | Example |
|------|------------|---------|
| `renovation` | Same function, upgraded to modern standards | School renovation |
| `transformation` | New function in existing building | Office → housing |
| `extension` | Vertical/horizontal addition to existing | Rooftop extension |
| `hybrid` | New construction with preserved elements | New + historic facade |
| `new_build` | Entirely new construction | New school building |

**New `cbc_assessment` Object:**
```json
"cbc_assessment": {
  "pathway_scores": {
    "build_nothing_new": { "score": 85, "interventions": {...} },
    "build_for_longterm": { "score": 60, "interventions": {...} },
    "build_efficiently": { "score": 45, "interventions": {...} },
    "build_with_right_materials": { "score": 75, "interventions": {...} }
  },
  "primary_pathway": "build_nothing_new",
  "total_score": {
    "raw_score": 68.5,
    "quality_multiplier": 1.2,
    "final_score": 82.2,
    "grade": "A"
  },
  "methodology_version": "CBC-2024-v1"
}
```

### 4.3 Scoring Methodology

**Intervention Points (normalized to 0-100 per pathway):**

| Pathway | Intervention | Max Points |
|---------|--------------|------------|
| Build Nothing New | Structure preservation | 15 |
| | Functional transformation | 10 |
| | Lifespan extension | 10 |
| Build for Long-term | Design for disassembly | 12 |
| | Material passport | 8 |
| | Flexibility | 5 |
| Build Efficiently | Space efficiency | 8 |
| | Material efficiency | 7 |
| | Vertical extension | 10 |
| Build with Right Materials | Structural reuse | 12 |
| | Non-structural reuse | 8 |
| | Reuse quantity bonus (>30%) | 3 |
| | Recycled content | 5 |
| | Biobased construction | 10 |
| | Carbon storage | 3 |

**Weighting by Project Type:**

| Type | Nothing New | Long-term | Efficiently | Right Materials |
|------|-------------|-----------|-------------|-----------------|
| Transformation | 40% | 15% | 15% | 30% |
| Renovation | 35% | 20% | 15% | 30% |
| Extension | 20% | 25% | 25% | 30% |
| Hybrid | 25% | 20% | 20% | 35% |
| New Build | 0% | 30% | 30% | 40% |

**Quality Multiplier:**
- Third-party verified: 1.3
- Quantified with sources: 1.2
- Documented: 1.1
- Claimed: 1.0
- Target only: 0.8

**Grade Scale:**
- A: 80+ | B: 60-79 | C: 40-59 | D: 20-39 | E: <20

### 4.4 Implementation Tasks

| # | Task | Status | Priority |
|---|------|--------|----------|
| 4.1 | Update schema.json with CBC assessment | ✅ DONE | HIGH |
| 4.2 | Update schema.json with enhanced project_type | ✅ DONE | HIGH |
| 4.3 | Migrate existing projects to new format | ⏳ PENDING | HIGH |
| 4.4 | Score Tier 1 projects with CBC methodology | ⏳ PENDING | HIGH |
| 4.5 | Update UI with pathway filters | ⏳ PENDING | MEDIUM |
| 4.6 | Add CBC grade display on project cards | ⏳ PENDING | MEDIUM |
| 4.7 | Create CBC assessment guide | ⏳ PENDING | LOW |

### 4.5 Example Assessment: KA13

**Project:** KA13 (Kristian Augusts gate 13)
**Type:** Transformation (1960s office → modern workplace)
**Preservation:** ~85%

| Pathway | Score | Key Interventions |
|---------|-------|-------------------|
| Build Nothing New | 90 | Structure preserved, function transformed, +40yr lifespan |
| Build for Long-term | 55 | Material passport, documented for future |
| Build Efficiently | 40 | Some space optimization |
| Build with Right Materials | 80 | 168t reused concrete, steel, glass, stone |

**Calculation:**
- Raw: (90×0.40) + (55×0.15) + (40×0.15) + (80×0.30) = 36 + 8.25 + 6 + 24 = **74.25**
- Quality multiplier: 1.2 (SINTEF-verified)
- Final: 74.25 × 1.2 = **89.1 → Grade A**

---

## Next Steps

See the following resources for next steps:

- **[Meeting Status Page](/meeting-status)** - Gap analysis & research plan
- **[PROJECT.md](./PROJECT.md)** - Phase 4: CBC Framework roadmap
- **[Stakeholders Page](/stakeholders)** - Supplier and client export

### Remaining Priority Areas:
1. Migrate 23 projects to new `project_type` object format
2. Score Tier 1 projects with CBC methodology
3. Add narrative to remaining 11 projects
4. Identify suppliers for remaining 13 projects
5. Research cost comparison data (stretch goal)
6. Consider adding 2-7 more Norwegian projects to reach 25-30 target
