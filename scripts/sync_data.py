#!/usr/bin/env python3
"""
Sync script for Nordic Circular Buildings Database.
Copies norway.json from data/projects to site/public/data and validates structure.
"""

import json
import shutil
from pathlib import Path
from datetime import datetime

# Paths
ROOT = Path(__file__).parent.parent
SOURCE = ROOT / "data" / "projects" / "norway.json"
DEST = ROOT / "site" / "public" / "data" / "norway.json"

def validate_project(project, idx):
    """Validate a single project has required fields"""
    required = ['id', 'name', 'country', 'location', 'status']
    errors = []

    for field in required:
        if field not in project:
            errors.append(f"Project {idx}: Missing required field '{field}'")

    # Check location has coordinates
    if 'location' in project:
        loc = project['location']
        if 'coordinates' not in loc:
            errors.append(f"Project {project.get('id', idx)}: Missing coordinates")
        elif loc['coordinates']:
            coords = loc['coordinates']
            if 'lat' not in coords or 'lng' not in coords:
                errors.append(f"Project {project.get('id', idx)}: Incomplete coordinates")

    # Check for invalid metrics
    if 'metrics' in project:
        metrics = project['metrics']
        if 'co2_reduction' in metrics:
            co2 = metrics['co2_reduction']
            if isinstance(co2, dict) and 'percent' in co2:
                pct = co2['percent']
                if isinstance(pct, (int, float)) and (pct < 0 or pct > 100):
                    errors.append(f"Project {project.get('id', idx)}: CO2 reduction {pct}% out of valid range 0-100")

    return errors

def validate_case_study_links(data):
    """Ensure all case studies reference valid project IDs"""
    errors = []
    project_ids = {p['id'] for p in data['projects']}

    case_studies_dir = ROOT / "data" / "case-studies"
    if case_studies_dir.exists():
        for cs_file in case_studies_dir.glob("*.json"):
            try:
                with open(cs_file) as f:
                    cs = json.load(f)
                pid = cs.get('project_id')
                if pid and pid not in project_ids:
                    errors.append(f"Case study {cs_file.name}: project_id '{pid}' not found in norway.json")
            except json.JSONDecodeError as e:
                errors.append(f"Case study {cs_file.name}: Invalid JSON - {e}")

    return errors

def sync():
    """Main sync function"""
    print(f"Nordic Circular Buildings Data Sync")
    print(f"=" * 50)
    print(f"Source: {SOURCE}")
    print(f"Dest:   {DEST}")
    print()

    # Load source data
    if not SOURCE.exists():
        print(f"ERROR: Source file not found: {SOURCE}")
        return False

    with open(SOURCE) as f:
        data = json.load(f)

    projects = data.get('projects', [])
    print(f"Found {len(projects)} projects")

    # Validate all projects
    all_errors = []
    for idx, project in enumerate(projects):
        errors = validate_project(project, idx)
        all_errors.extend(errors)

    # Validate case study links
    cs_errors = validate_case_study_links(data)
    all_errors.extend(cs_errors)

    if all_errors:
        print(f"\nValidation Errors ({len(all_errors)}):")
        for error in all_errors:
            print(f"  - {error}")
        print()
    else:
        print("Validation: All checks passed")

    # Create destination directory if needed
    DEST.parent.mkdir(parents=True, exist_ok=True)

    # Copy file
    shutil.copy2(SOURCE, DEST)
    print(f"\nSynced: {SOURCE.name} -> {DEST}")

    # Report stats
    print(f"\nProject Statistics:")

    # Count by status
    by_status = {}
    for p in projects:
        status = p.get('status', 'unknown')
        by_status[status] = by_status.get(status, 0) + 1
    for status, count in sorted(by_status.items()):
        print(f"  {status}: {count}")

    # Count by project type
    by_type = {}
    for p in projects:
        ptype = p.get('project_type_simple', 'unknown')
        by_type[ptype] = by_type.get(ptype, 0) + 1
    print(f"\nBy Type:")
    for ptype, count in sorted(by_type.items()):
        print(f"  {ptype}: {count}")

    # Count CBC grades
    by_grade = {}
    for p in projects:
        cbc = p.get('cbc_assessment', {})
        grade = cbc.get('total_score', {}).get('grade', 'N/A')
        by_grade[grade] = by_grade.get(grade, 0) + 1
    print(f"\nCBC Grades:")
    for grade in ['A', 'B', 'C', 'D', 'E', 'N/A']:
        if grade in by_grade:
            print(f"  {grade}: {by_grade[grade]}")

    # Data completeness grades
    dc_grades = {}
    dc_scores = []
    for p in projects:
        dc = p.get('data_completeness', {})
        grade = dc.get('grade', 'N/A')
        dc_grades[grade] = dc_grades.get(grade, 0) + 1
        if dc.get('score'):
            dc_scores.append(dc['score'])

    print(f"\nData Completeness Grades:")
    for grade in ['A', 'B', 'C', 'D', 'E', 'N/A']:
        if grade in dc_grades:
            print(f"  {grade}: {dc_grades[grade]}")
    if dc_scores:
        print(f"  Average score: {sum(dc_scores)/len(dc_scores):.1f}/100")

    print(f"\nSync completed at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    return len(all_errors) == 0

if __name__ == "__main__":
    import sys
    success = sync()
    sys.exit(0 if success else 1)
