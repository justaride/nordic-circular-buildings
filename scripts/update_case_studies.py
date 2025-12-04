#!/usr/bin/env python3
"""
Update case studies with data_completeness from norway.json
and sync tier designations with completeness grades.
"""

import json
from pathlib import Path
from datetime import date

ROOT = Path(__file__).parent.parent
NORWAY_JSON = ROOT / "data" / "projects" / "norway.json"
CASE_STUDIES_DIR = ROOT / "data" / "case-studies"

# Mapping from completeness grade to case study tier
GRADE_TO_TIER = {
    'A': 'FLAGSHIP',
    'B': 'TIER_2',  # Strong documentation
    'C': 'TIER_1',  # Moderate
    'D': 'BASIC',
    'E': 'INCOMPLETE'
}

def load_projects():
    """Load all projects from norway.json"""
    with open(NORWAY_JSON) as f:
        data = json.load(f)
    return {p['id']: p for p in data['projects']}

def update_case_study(cs_path, projects):
    """Update a single case study file"""
    with open(cs_path) as f:
        cs = json.load(f)

    project_id = cs.get('project_id')
    if not project_id:
        print(f"  ⚠️  No project_id in {cs_path.name}")
        return False

    project = projects.get(project_id)
    if not project:
        print(f"  ⚠️  Project {project_id} not found in norway.json")
        return False

    # Get completeness from project
    dc = project.get('data_completeness', {})
    if not dc:
        print(f"  ⚠️  No data_completeness for {project_id}")
        return False

    # Update case study with completeness data
    cs['data_completeness'] = {
        'score': dc.get('score'),
        'grade': dc.get('grade'),
        'category_scores': dc.get('category_scores'),
        'has': dc.get('has', []),
        'missing': dc.get('missing', []),
        'upgrade_path': dc.get('upgrade_path'),
        'synced_from_project': True,
        'sync_date': str(date.today())
    }

    # Update tier based on grade
    old_tier = cs.get('case_study_tier', 'unknown')
    grade = dc.get('grade', 'C')
    new_tier = GRADE_TO_TIER.get(grade, 'TIER_1')

    # Special case: if it was FLAGSHIP and has excellent docs, keep it
    if old_tier in ['FLAGSHIP', 'flagship'] and grade in ['A', 'B']:
        new_tier = 'FLAGSHIP'
    elif old_tier == 'STRONG' and grade in ['A', 'B']:
        new_tier = 'STRONG'

    cs['case_study_tier'] = new_tier

    # Update data quality note
    cs['data_quality_note'] = f"Data completeness: {dc.get('score')}/100 (Grade {grade}). {len(dc.get('has', []))} data points documented, {len(dc.get('missing', []))} gaps identified."

    # Update last_updated
    cs['last_updated'] = str(date.today())

    # Add/update why_tier explanation in executive_summary
    if 'executive_summary' in cs:
        score = dc.get('score', 0)
        missing_count = len(dc.get('missing', []))

        if new_tier == 'FLAGSHIP':
            why = f"Completeness score {score}/100 (Grade {grade}). Comprehensive documentation with {len(dc.get('has', []))} verified data points."
        elif new_tier == 'STRONG':
            why = f"Completeness score {score}/100 (Grade {grade}). Strong documentation. {missing_count} data gaps: {', '.join(dc.get('missing', [])[:3])}"
        elif new_tier == 'TIER_2':
            why = f"Completeness score {score}/100 (Grade {grade}). Good documentation level. Upgrade path: {dc.get('upgrade_path', 'N/A')}"
        else:
            why = f"Completeness score {score}/100 (Grade {grade}). {missing_count} gaps identified. {dc.get('upgrade_path', '')}"

        cs['executive_summary']['why_tier'] = why

    # Save updated case study
    with open(cs_path, 'w') as f:
        json.dump(cs, f, indent=2, ensure_ascii=False)

    print(f"  ✅ {cs_path.name}: {old_tier} → {new_tier} (Grade {grade}, Score {dc.get('score')})")
    return True

def main():
    print("Updating Case Studies with Data Completeness")
    print("=" * 60)

    projects = load_projects()
    print(f"Loaded {len(projects)} projects\n")

    updated = 0
    for cs_path in sorted(CASE_STUDIES_DIR.glob("*.json")):
        if update_case_study(cs_path, projects):
            updated += 1

    print(f"\n{'=' * 60}")
    print(f"Updated {updated} case studies")

    # Summary
    print("\nCase Study Summary:")
    for cs_path in sorted(CASE_STUDIES_DIR.glob("*.json")):
        with open(cs_path) as f:
            cs = json.load(f)
        dc = cs.get('data_completeness', {})
        tier = cs.get('case_study_tier', 'N/A')
        score = dc.get('score', 'N/A')
        grade = dc.get('grade', 'N/A')
        print(f"  {cs_path.stem:<25} | {tier:<10} | Grade {grade} ({score})")

if __name__ == "__main__":
    main()
