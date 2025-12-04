#!/usr/bin/env python3
"""
Add CBC (Circular Buildings Coalition) scores to projects missing them.
Based on the Four Pathways methodology from PROJECT.md
"""

import json
from datetime import date

# Load data
with open('data/projects/norway.json', 'r') as f:
    data = json.load(f)

# Weights by project type
WEIGHTS = {
    'transformation': {'build_nothing_new': 0.40, 'build_for_longterm': 0.15, 'build_efficiently': 0.15, 'build_with_right_materials': 0.30},
    'renovation': {'build_nothing_new': 0.35, 'build_for_longterm': 0.20, 'build_efficiently': 0.15, 'build_with_right_materials': 0.30},
    'extension': {'build_nothing_new': 0.20, 'build_for_longterm': 0.25, 'build_efficiently': 0.25, 'build_with_right_materials': 0.30},
    'hybrid': {'build_nothing_new': 0.25, 'build_for_longterm': 0.20, 'build_efficiently': 0.20, 'build_with_right_materials': 0.35},
    'new_build': {'build_nothing_new': 0.00, 'build_for_longterm': 0.30, 'build_efficiently': 0.30, 'build_with_right_materials': 0.40},
    'infrastructure': {'build_nothing_new': 0.10, 'build_for_longterm': 0.25, 'build_efficiently': 0.25, 'build_with_right_materials': 0.40},
}

def get_grade(score):
    if score >= 80: return 'A'
    if score >= 60: return 'B'
    if score >= 40: return 'C'
    if score >= 20: return 'D'
    return 'E'

def get_quality_multiplier(project):
    """Determine quality multiplier based on documentation level"""
    sources = project.get('sources', [])
    verification = project.get('verification_status', '')
    data_quality = project.get('data_quality', '')

    # Third-party verified (LCA, EPD, BREEAM with detailed reports)
    has_lca = any('klimagass' in str(s).lower() or 'lca' in str(s).lower() for s in sources)
    has_breeam = any(c.get('name', '').startswith('BREEAM') for c in project.get('certifications', []))

    if verification == 'verified' and (has_lca or data_quality == 'strong'):
        return 1.2
    elif verification == 'verified' or has_breeam:
        return 1.1
    elif project.get('status') == 'planned':
        return 0.8
    else:
        return 1.0

def analyze_circular_features(project):
    """Analyze circular features to determine pathway scores"""
    features = project.get('circular_features', [])
    metrics = project.get('metrics', {})
    certifications = project.get('certifications', [])

    scores = {
        'build_nothing_new': {'score': 0, 'interventions': {}, 'notes': ''},
        'build_for_longterm': {'score': 0, 'interventions': {}, 'notes': ''},
        'build_efficiently': {'score': 0, 'interventions': {}, 'notes': ''},
        'build_with_right_materials': {'score': 0, 'interventions': {}, 'notes': ''}
    }

    # Analyze project type for Build Nothing New
    ptype = project.get('project_type_simple', project.get('project_type', 'new_build'))
    if ptype == 'transformation':
        scores['build_nothing_new']['interventions']['structure_preservation'] = 12
        scores['build_nothing_new']['interventions']['functional_transformation'] = 8
        scores['build_nothing_new']['interventions']['lifespan_extension'] = 8
        scores['build_nothing_new']['notes'] = 'Transformation project preserving existing structure'
    elif ptype == 'renovation':
        scores['build_nothing_new']['interventions']['structure_preservation'] = 10
        scores['build_nothing_new']['interventions']['lifespan_extension'] = 8
        scores['build_nothing_new']['notes'] = 'Renovation extending building lifespan'

    # Analyze features for material strategies
    reuse_features = [f for f in features if f.get('category') in ['material_reuse', 'component_reuse', 'adaptive_reuse']]
    dfd_features = [f for f in features if f.get('category') == 'design_for_disassembly' or 'disassembly' in str(f).lower()]
    biobased_features = [f for f in features if f.get('material_type') in ['timber', 'wood', 'CLT', 'glulam']]

    # Build with Right Materials scoring
    if reuse_features:
        structural_reuse = any('structural' in str(f).lower() or f.get('material_type') in ['steel', 'concrete', 'hulldekker'] for f in reuse_features)
        non_structural = len(reuse_features) - (1 if structural_reuse else 0)

        if structural_reuse:
            scores['build_with_right_materials']['interventions']['structural_reuse'] = min(12, 8 + len([f for f in reuse_features if f.get('material_type') in ['steel', 'concrete', 'hulldekker']]) * 2)
        if non_structural > 0:
            scores['build_with_right_materials']['interventions']['non_structural_reuse'] = min(8, 4 + non_structural)

        # Reuse quantity bonus
        circularity = metrics.get('circularity_rate', {}).get('value', 0)
        if circularity >= 80:
            scores['build_with_right_materials']['interventions']['reuse_quantity_bonus'] = 3
        elif circularity >= 50:
            scores['build_with_right_materials']['interventions']['reuse_quantity_bonus'] = 2
        elif circularity >= 30:
            scores['build_with_right_materials']['interventions']['reuse_quantity_bonus'] = 1

    if biobased_features:
        scores['build_with_right_materials']['interventions']['biobased_construction'] = min(10, 5 + len(biobased_features) * 2)
        scores['build_with_right_materials']['interventions']['carbon_storage'] = 2

    # Build for Long-term scoring
    if dfd_features or 'disassembly' in str(project).lower():
        scores['build_for_longterm']['interventions']['design_for_disassembly'] = 8
        scores['build_for_longterm']['notes'] = 'Design for disassembly features'

    # Check for material passport / Loopfront
    if 'loopfront' in str(project).lower() or 'material passport' in str(project).lower():
        scores['build_for_longterm']['interventions']['material_passport'] = 6

    # Flexibility
    if any('flexible' in str(f).lower() or 'adaptable' in str(f).lower() for f in features):
        scores['build_for_longterm']['interventions']['flexibility'] = 4

    # Build Efficiently scoring
    co2_reduction = metrics.get('co2_reduction', {}).get('percent', 0) or metrics.get('co2_reduction', {}).get('value', 0)
    if co2_reduction >= 50:
        scores['build_efficiently']['interventions']['material_efficiency'] = 7
    elif co2_reduction >= 30:
        scores['build_efficiently']['interventions']['material_efficiency'] = 5
    elif co2_reduction >= 10:
        scores['build_efficiently']['interventions']['material_efficiency'] = 3

    # Space efficiency for multi-use buildings
    building_types = project.get('building_type', [])
    if len(building_types) > 1:
        scores['build_efficiently']['interventions']['space_efficiency'] = min(8, 4 + len(building_types))
        scores['build_efficiently']['notes'] = f'Multi-use building: {", ".join(building_types)}'

    # Calculate pathway totals
    for pathway in scores:
        scores[pathway]['score'] = sum(scores[pathway]['interventions'].values())

    # Generate notes from features
    if reuse_features:
        materials = set(f.get('material_type', 'unknown') for f in reuse_features if f.get('material_type'))
        scores['build_with_right_materials']['notes'] = f'Reused materials: {", ".join(materials)}'

    return scores

def create_cbc_assessment(project):
    """Create full CBC assessment for a project"""
    ptype = project.get('project_type_simple', project.get('project_type', 'new_build'))
    if ptype not in WEIGHTS:
        ptype = 'new_build'

    weights = WEIGHTS[ptype]
    pathway_scores = analyze_circular_features(project)

    # Calculate weighted raw score
    raw_score = sum(
        pathway_scores[pathway]['score'] * weights[pathway]
        for pathway in weights
    )

    # Normalize to 0-100 scale (max possible ~41 points weighted)
    # Adjust based on what's achievable
    normalized_raw = min(100, raw_score * 2.5)

    quality_multiplier = get_quality_multiplier(project)
    final_score = min(100, normalized_raw * quality_multiplier)

    # Determine primary pathway
    pathway_weighted = {p: pathway_scores[p]['score'] * weights[p] for p in weights if weights[p] > 0}
    primary_pathway = max(pathway_weighted, key=pathway_weighted.get) if pathway_weighted else 'build_with_right_materials'

    secondary = [p for p in pathway_weighted if p != primary_pathway and pathway_scores[p]['score'] > 20]

    return {
        'pathway_scores': pathway_scores,
        'primary_pathway': primary_pathway,
        'secondary_pathways': secondary[:2],
        'total_score': {
            'raw_score': round(normalized_raw, 1),
            'quality_multiplier': quality_multiplier,
            'final_score': round(final_score, 1),
            'grade': get_grade(final_score)
        },
        'assessment_date': str(date.today()),
        'assessed_by': 'Nordic Circular Buildings Database',
        'methodology_version': 'CBC-2024-v1',
        'notes': f'Auto-assessed based on documented circular features'
    }

# Process projects
updated = 0
for project in data['projects']:
    if project.get('cbc_assessment') is None:
        pid = project['id']

        # Skip secondary scope projects
        if project.get('scope_notes', {}).get('is_primary_scope') == False:
            print(f'Skipping {pid} (secondary scope)')
            continue

        assessment = create_cbc_assessment(project)
        project['cbc_assessment'] = assessment

        grade = assessment['total_score']['grade']
        score = assessment['total_score']['final_score']
        print(f'Added CBC to {pid}: Grade {grade} ({score})')
        updated += 1

# Save updated data
with open('data/projects/norway.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'\nUpdated {updated} projects with CBC scores')
