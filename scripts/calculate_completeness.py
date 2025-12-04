#!/usr/bin/env python3
"""
Calculate data completeness scores for all projects.
Generates objective, quantifiable scores based on 10 data categories.
"""

import json
from pathlib import Path
from datetime import date

ROOT = Path(__file__).parent.parent
NORWAY_JSON = ROOT / "data" / "projects" / "norway.json"

# Category weights (total = 100)
CATEGORIES = {
    'basic_info': {'max': 10, 'description': 'Name, location, coordinates, status, year, type'},
    'stakeholders': {'max': 10, 'description': 'Client, architect, contractor, consultants'},
    'metrics_co2': {'max': 15, 'description': 'CO2 reduction with baseline, kg/m²/year'},
    'metrics_circularity': {'max': 15, 'description': 'Reuse rate, circularity index'},
    'material_inventory': {'max': 15, 'description': 'Detailed material inventory with quantities (kg/tonnes)'},
    'cost_data': {'max': 10, 'description': 'Costs, savings, budget'},
    'sources_primary': {'max': 10, 'description': 'Primary sources (reports, LCA)'},
    'certifications': {'max': 5, 'description': 'BREEAM, FutureBuilt, etc.'},
    'narrative': {'max': 5, 'description': 'Driver, lessons learned, challenges'},
    'donor_sources': {'max': 5, 'description': 'Material origin documented'},
}

def get_grade(score):
    """Convert score to letter grade"""
    if score >= 80: return 'A'
    if score >= 60: return 'B'
    if score >= 40: return 'C'
    if score >= 20: return 'D'
    return 'E'

def score_basic_info(project):
    """Score: basic_info (max 10)"""
    score = 0
    has = []
    missing = []

    # Name (2 pts)
    if project.get('name'):
        score += 2
        has.append(f"Project name: {project['name']}")
    else:
        missing.append("Project name")

    # Location with coordinates (3 pts)
    loc = project.get('location', {})
    if loc.get('city'):
        score += 1
        has.append(f"City: {loc['city']}")
    else:
        missing.append("City")

    coords = loc.get('coordinates', {})
    if coords.get('lat') and coords.get('lng'):
        score += 2
        has.append(f"Coordinates: {coords['lat']}, {coords['lng']}")
    else:
        missing.append("Geographic coordinates")

    # Status (1 pt)
    if project.get('status'):
        score += 1
        has.append(f"Status: {project['status']}")
    else:
        missing.append("Project status")

    # Year (1 pt)
    if project.get('year_completed'):
        score += 1
        has.append(f"Year: {project['year_completed']}")
    else:
        missing.append("Completion year")

    # Size (1 pt)
    if project.get('size_sqm'):
        score += 1
        has.append(f"Size: {project['size_sqm']} m²")
    else:
        missing.append("Building size (m²)")

    return score, has, missing

def score_stakeholders(project):
    """Score: stakeholders (max 10)"""
    score = 0
    has = []
    missing = []

    # Client (3 pts)
    if project.get('client'):
        score += 3
        has.append(f"Client: {project['client']}")
    else:
        missing.append("Client/byggherre")

    # Architect (3 pts)
    if project.get('architect'):
        score += 3
        has.append(f"Architect: {project['architect']}")
    else:
        missing.append("Architect")

    # Contractor (2 pts)
    if project.get('contractor'):
        score += 2
        has.append(f"Contractor: {project['contractor']}")
    else:
        missing.append("Contractor/entreprenør")

    # Additional consultants in sources (2 pts)
    sources = project.get('sources', [])
    consultant_sources = [s for s in sources if s.get('type') in ['consultant', 'technical_report', 'klimagassregnskap']]
    if consultant_sources:
        score += 2
        has.append(f"{len(consultant_sources)} consultant/technical sources")
    else:
        missing.append("Technical consultants documented")

    return score, has, missing

def score_metrics_co2(project):
    """Score: metrics_co2 (max 15)"""
    score = 0
    has = []
    missing = []

    metrics = project.get('metrics', {})

    # CO2/GHG reduction percentage (6 pts) - check both co2_reduction and ghg_reduction
    co2 = metrics.get('co2_reduction', {}) or metrics.get('ghg_reduction', {})
    if isinstance(co2, dict):
        pct = co2.get('percent') or co2.get('value')
        if pct:
            score += 6
            has.append(f"CO2/GHG reduction: {pct}%")

            # Baseline documented (3 pts)
            if co2.get('baseline') or co2.get('description') or co2.get('note'):
                score += 3
                baseline = co2.get('baseline') or co2.get('description') or co2.get('note', 'documented')
                has.append(f"CO2 baseline: {str(baseline)[:50]}")
            else:
                missing.append("CO2 reduction baseline/methodology")
        else:
            missing.append("CO2 reduction percentage")
    elif isinstance(co2, (int, float)):
        score += 6
        has.append(f"CO2 reduction: {co2}%")
        missing.append("CO2 reduction baseline/methodology")
    else:
        missing.append("CO2 reduction data")

    # kg CO2/m²/year (6 pts)
    co2_kg = metrics.get('co2_kg_m2_year')
    if co2_kg:
        score += 6
        if isinstance(co2_kg, dict):
            has.append(f"CO2 intensity: {co2_kg.get('project', 'documented')} kg/m²/year")
        else:
            has.append(f"CO2 intensity: {co2_kg} kg/m²/year")
    else:
        missing.append("CO2 intensity (kg CO2/m²/year)")

    return score, has, missing

def score_metrics_circularity(project):
    """Score: metrics_circularity (max 15)"""
    score = 0
    has = []
    missing = []

    metrics = project.get('metrics', {})

    # Circularity/reuse rate (8 pts)
    circ = metrics.get('circularity_rate', {})
    reuse = metrics.get('reuse_rate', {})

    if circ.get('value') or circ.get('percent'):
        val = circ.get('value') or circ.get('percent')
        score += 8
        has.append(f"Circularity rate: {val}%")
    elif reuse.get('value') or reuse.get('percent'):
        val = reuse.get('value') or reuse.get('percent')
        score += 8
        has.append(f"Reuse rate: {val}%")
    else:
        # Check in circular_features for quantities
        features = project.get('circular_features', [])
        has_quantities = any(f.get('quantity') for f in features)
        if has_quantities:
            score += 4
            has.append("Material quantities documented (partial)")
            missing.append("Overall circularity/reuse rate percentage")
        else:
            missing.append("Circularity/reuse rate")

    # Material weight data (7 pts)
    features = project.get('circular_features', [])
    weight_features = [f for f in features if f.get('quantity') and isinstance(f.get('quantity'), dict) and f['quantity'].get('unit') in ['kg', 'tonnes', 'tonn', 't']]

    if weight_features:
        score += 7
        total_items = len(weight_features)
        has.append(f"{total_items} materials with weight data (kg/tonnes)")
    else:
        # Partial credit for count-based quantities
        count_features = [f for f in features if f.get('quantity') and isinstance(f.get('quantity'), dict)]
        if count_features:
            score += 3
            has.append(f"{len(count_features)} materials with quantities (units/items)")
            missing.append("Material weights in kg/tonnes")
        else:
            missing.append("Quantified material data")

    return score, has, missing

def score_material_inventory(project):
    """Score: material_inventory (max 15)"""
    score = 0
    has = []
    missing = []

    features = project.get('circular_features', [])

    if not features:
        missing.append("Circular features/material inventory")
        return score, has, missing

    # Number of documented materials (5 pts)
    num_materials = len(features)
    if num_materials >= 5:
        score += 5
        has.append(f"{num_materials} circular features documented")
    elif num_materials >= 3:
        score += 3
        has.append(f"{num_materials} circular features documented")
    elif num_materials >= 1:
        score += 1
        has.append(f"{num_materials} circular feature(s) documented")

    # Material types diversity (3 pts)
    material_types = set(f.get('material_type') for f in features if f.get('material_type'))
    if len(material_types) >= 4:
        score += 3
        has.append(f"Material types: {', '.join(sorted(material_types))}")
    elif len(material_types) >= 2:
        score += 2
        has.append(f"Material types: {', '.join(sorted(material_types))}")
    elif len(material_types) >= 1:
        score += 1
    else:
        missing.append("Material type classification")

    # Quantities with units (4 pts)
    with_quantities = [f for f in features if f.get('quantity') and f['quantity'].get('value')]
    if len(with_quantities) >= 3:
        score += 4
        has.append(f"{len(with_quantities)} materials with quantified amounts")
    elif len(with_quantities) >= 1:
        score += 2
        has.append(f"{len(with_quantities)} material(s) with quantified amounts")
    else:
        missing.append("Material quantities (values with units)")

    # Citations/sources for materials (3 pts)
    with_citations = [f for f in features if f.get('citations')]
    if len(with_citations) >= 2:
        score += 3
        has.append(f"{len(with_citations)} materials with source citations")
    elif len(with_citations) >= 1:
        score += 1
        has.append(f"{len(with_citations)} material with source citation")
    else:
        missing.append("Source citations for materials")

    return score, has, missing

def score_cost_data(project):
    """Score: cost_data (max 10)"""
    score = 0
    has = []
    missing = []

    # Budget (3 pts)
    if project.get('budget'):
        score += 3
        budget = project['budget']
        if isinstance(budget, dict):
            has.append(f"Budget: {budget.get('amount', 'documented')} {budget.get('currency', '')}")
        else:
            has.append(f"Budget: {budget}")
    else:
        missing.append("Project budget")

    # Cost savings documented (4 pts)
    metrics = project.get('metrics', {})
    features = project.get('circular_features', [])

    has_cost_savings = False
    # Check metrics
    if metrics.get('cost_savings') or metrics.get('cost_reduction'):
        has_cost_savings = True
        score += 4
        has.append("Cost savings documented in metrics")

    # Check features for cost data
    if not has_cost_savings:
        for f in features:
            if f.get('cost') or f.get('savings') or 'NOK' in str(f) or 'kr' in str(f).lower():
                has_cost_savings = True
                score += 4
                has.append("Cost data in material features")
                break

    if not has_cost_savings:
        missing.append("Cost savings/comparison data")

    # Cost breakdown (3 pts)
    notes = project.get('notes', '')
    if 'budsjett' in notes.lower() or 'kost' in notes.lower() or 'økonomi' in notes.lower():
        score += 2
        has.append("Cost information in notes")
    else:
        missing.append("Detailed cost breakdown")

    return score, has, missing

def score_sources_primary(project):
    """Score: sources_primary (max 10)"""
    score = 0
    has = []
    missing = []

    sources = project.get('sources', [])

    if not sources:
        missing.append("Source documentation")
        return score, has, missing

    # Primary sources (5 pts)
    primary = [s for s in sources if s.get('type') == 'primary']
    if len(primary) >= 2:
        score += 5
        has.append(f"{len(primary)} primary sources")
    elif len(primary) >= 1:
        score += 3
        has.append(f"{len(primary)} primary source")
    else:
        missing.append("Primary source documentation")

    # Technical reports/klimagassregnskap (3 pts)
    technical = [s for s in sources if
                 s.get('type') in ['technical_report', 'klimagassregnskap'] or
                 'klimagass' in s.get('name', '').lower() or
                 'erfaringsrapport' in s.get('name', '').lower()]
    if technical:
        score += 3
        has.append(f"Technical reports: {', '.join(t.get('name', 'unnamed')[:30] for t in technical[:2])}")
    else:
        missing.append("Technical report/klimagassregnskap")

    # Total source count (2 pts)
    if len(sources) >= 4:
        score += 2
        has.append(f"Total {len(sources)} sources documented")
    elif len(sources) >= 2:
        score += 1
        has.append(f"Total {len(sources)} sources documented")

    return score, has, missing

def score_certifications(project):
    """Score: certifications (max 5)"""
    score = 0
    has = []
    missing = []

    certs = project.get('certifications', [])
    programs = project.get('programs', [])

    # BREEAM or similar (2 pts)
    breeam = [c for c in certs if 'BREEAM' in c.get('name', '')]
    if breeam:
        score += 2
        level = breeam[0].get('level', '')
        has.append(f"BREEAM {level}" if level else "BREEAM certified")

    # FutureBuilt or similar program (2 pts)
    futurebuilt = [p for p in programs if 'FutureBuilt' in p.get('name', '')]
    if futurebuilt:
        score += 2
        designation = futurebuilt[0].get('designation', '')
        has.append(f"FutureBuilt {designation}" if designation else "FutureBuilt")

    # Energy standard (1 pt)
    if project.get('energy_standard'):
        score += 1
        has.append(f"Energy: {project['energy_standard'][:30]}")

    if score == 0:
        missing.append("Certifications (BREEAM, FutureBuilt, etc.)")

    return score, has, missing

def score_narrative(project):
    """Score: narrative (max 5)"""
    score = 0
    has = []
    missing = []

    narrative = project.get('narrative', {})

    # Driver (2 pts)
    if narrative.get('driver'):
        score += 2
        has.append("Project driver/motivation documented")
    else:
        missing.append("Project driver/motivation")

    # Lessons learned (2 pts)
    if narrative.get('lessons_learned'):
        score += 2
        has.append("Lessons learned documented")
    else:
        missing.append("Lessons learned")

    # Challenges (1 pt)
    if narrative.get('challenges'):
        score += 1
        has.append(f"{len(narrative['challenges'])} challenges documented")
    else:
        missing.append("Challenges documented")

    return score, has, missing

def score_donor_sources(project):
    """Score: donor_sources (max 5)"""
    score = 0
    has = []
    missing = []

    features = project.get('circular_features', [])

    if not features:
        missing.append("Material donor sources")
        return score, has, missing

    # Features with donor_source (3 pts)
    with_donor = [f for f in features if f.get('donor_source')]
    if len(with_donor) >= 3:
        score += 3
        donors = set(f['donor_source'].get('name', 'unknown') for f in with_donor)
        has.append(f"Donor sources: {', '.join(list(donors)[:3])}")
    elif len(with_donor) >= 1:
        score += 1
        has.append(f"{len(with_donor)} material(s) with donor source")
    else:
        missing.append("Material donor sources")

    # Donor type documented (2 pts)
    with_type = [f for f in with_donor if f.get('donor_source', {}).get('type')]
    if with_type:
        score += 2
        types = set(f['donor_source']['type'] for f in with_type)
        has.append(f"Donor types: {', '.join(types)}")
    elif with_donor:
        missing.append("Donor source type classification")

    return score, has, missing

def calculate_completeness(project):
    """Calculate full completeness score for a project"""

    category_scores = {}
    all_has = []
    all_missing = []

    # Calculate each category
    scorers = [
        ('basic_info', score_basic_info),
        ('stakeholders', score_stakeholders),
        ('metrics_co2', score_metrics_co2),
        ('metrics_circularity', score_metrics_circularity),
        ('material_inventory', score_material_inventory),
        ('cost_data', score_cost_data),
        ('sources_primary', score_sources_primary),
        ('certifications', score_certifications),
        ('narrative', score_narrative),
        ('donor_sources', score_donor_sources),
    ]

    for category, scorer in scorers:
        score, has, missing = scorer(project)
        # Cap at max
        max_score = CATEGORIES[category]['max']
        category_scores[category] = min(score, max_score)
        all_has.extend(has)
        all_missing.extend(missing)

    total_score = sum(category_scores.values())
    grade = get_grade(total_score)

    # Generate upgrade path
    upgrade_path = generate_upgrade_path(category_scores, grade, all_missing)

    return {
        'score': total_score,
        'grade': grade,
        'category_scores': category_scores,
        'has': all_has,
        'missing': all_missing,
        'upgrade_path': upgrade_path,
        'calculated_date': str(date.today())
    }

def generate_upgrade_path(category_scores, grade, missing):
    """Generate actionable upgrade path"""

    if grade == 'A':
        return "Flagship documentation level achieved. Maintain with updates as project progresses."

    # Find weakest categories
    sorted_cats = sorted(category_scores.items(), key=lambda x: x[1] / CATEGORIES[x[0]]['max'])
    weakest = sorted_cats[:3]

    suggestions = []

    for cat, score in weakest:
        max_score = CATEGORIES[cat]['max']
        pct = score / max_score * 100

        if pct < 50:
            if cat == 'metrics_co2':
                suggestions.append("Obtain klimagassregnskap/LCA report")
            elif cat == 'metrics_circularity':
                suggestions.append("Document reuse/circularity percentage")
            elif cat == 'material_inventory':
                suggestions.append("Add material weights (kg/tonnes)")
            elif cat == 'cost_data':
                suggestions.append("Document cost savings from reuse")
            elif cat == 'sources_primary':
                suggestions.append("Add primary source documentation")
            elif cat == 'donor_sources':
                suggestions.append("Document material origin/donor buildings")

    if grade == 'B':
        return f"To reach Grade A: {'; '.join(suggestions[:2])}"
    elif grade == 'C':
        return f"To reach Grade B: {'; '.join(suggestions[:2])}"
    elif grade == 'D':
        return f"Priority improvements: {'; '.join(suggestions[:2])}"
    else:
        return f"Basic documentation needed: {'; '.join(suggestions[:3])}"

def main():
    """Process all projects"""
    print("Data Completeness Calculator")
    print("=" * 60)

    # Load data
    with open(NORWAY_JSON) as f:
        data = json.load(f)

    projects = data.get('projects', [])
    print(f"Processing {len(projects)} projects...\n")

    results = []
    grade_counts = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0}

    for project in projects:
        pid = project.get('id', 'unknown')
        completeness = calculate_completeness(project)

        # Add to project
        project['data_completeness'] = completeness

        grade = completeness['grade']
        score = completeness['score']
        grade_counts[grade] += 1

        results.append({
            'id': pid,
            'name': project.get('name', 'Unknown'),
            'score': score,
            'grade': grade,
            'missing_count': len(completeness['missing'])
        })

        print(f"  {grade} ({score:3d}) | {pid[:25]:<25} | {len(completeness['missing'])} gaps")

    # Sort by score
    results.sort(key=lambda x: x['score'], reverse=True)

    print("\n" + "=" * 60)
    print("Grade Distribution:")
    for grade in ['A', 'B', 'C', 'D', 'E']:
        count = grade_counts[grade]
        bar = '█' * count
        print(f"  {grade}: {count:2d} {bar}")

    avg_score = sum(r['score'] for r in results) / len(results)
    print(f"\nAverage score: {avg_score:.1f}")

    # Save updated data
    with open(NORWAY_JSON, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\nUpdated {NORWAY_JSON}")
    print("\nTop 5 most complete:")
    for r in results[:5]:
        print(f"  {r['grade']} ({r['score']}) - {r['name']}")

    print("\nBottom 5 needing improvement:")
    for r in results[-5:]:
        print(f"  {r['grade']} ({r['score']}) - {r['name']} ({r['missing_count']} gaps)")

if __name__ == "__main__":
    main()
