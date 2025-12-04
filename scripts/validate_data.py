#!/usr/bin/env python3
"""
Comprehensive validation script for Nordic Circular Buildings Database.
Checks data consistency, valid ranges, URL formats, and cross-references.
"""

import json
import re
from pathlib import Path
from collections import defaultdict
from urllib.parse import urlparse

ROOT = Path(__file__).parent.parent
NORWAY_JSON = ROOT / "data" / "projects" / "norway.json"
CASE_STUDIES_DIR = ROOT / "data" / "case-studies"

class ValidationResult:
    def __init__(self):
        self.errors = []
        self.warnings = []
        self.info = []

    def error(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)

    def add_info(self, msg):
        self.info.append(msg)

    @property
    def has_errors(self):
        return len(self.errors) > 0

def validate_coordinates(coords, project_id):
    """Validate geographic coordinates"""
    errors = []
    if not coords:
        return ["Missing coordinates"]

    lat = coords.get('lat')
    lng = coords.get('lng')

    if lat is None or lng is None:
        errors.append("Incomplete coordinates (missing lat or lng)")
    else:
        # Norway bounds (approximately)
        if not (57 <= lat <= 72):
            errors.append(f"Latitude {lat} outside Norway range (57-72)")
        if not (4 <= lng <= 32):
            errors.append(f"Longitude {lng} outside Norway range (4-32)")

    return errors

def validate_metrics(metrics, project_id):
    """Validate metrics structure and values"""
    errors = []

    if not metrics:
        return []

    # CO2 reduction validation
    if 'co2_reduction' in metrics:
        co2 = metrics['co2_reduction']
        if isinstance(co2, dict):
            pct = co2.get('percent')
            if pct is not None:
                if not isinstance(pct, (int, float)):
                    errors.append(f"co2_reduction.percent is not numeric: {pct}")
                elif pct < 0 or pct > 100:
                    errors.append(f"co2_reduction.percent={pct} out of range (0-100)")
        elif isinstance(co2, (int, float)):
            if co2 < 0 or co2 > 100:
                errors.append(f"co2_reduction={co2} out of range (0-100)")

    # Circularity rate validation
    if 'circularity_rate' in metrics:
        circ = metrics['circularity_rate']
        if isinstance(circ, dict):
            val = circ.get('value')
            if val is not None and isinstance(val, (int, float)):
                if val < 0 or val > 100:
                    errors.append(f"circularity_rate.value={val} out of range (0-100)")

    return errors

def validate_cbc_assessment(cbc, project_id):
    """Validate CBC assessment structure"""
    errors = []

    if not cbc:
        return []

    valid_grades = ['A', 'B', 'C', 'D', 'E']
    valid_pathways = ['build_nothing_new', 'build_for_longterm', 'build_efficiently', 'build_with_right_materials']

    # Check grade
    total_score = cbc.get('total_score', {})
    grade = total_score.get('grade')
    if grade and grade not in valid_grades:
        errors.append(f"Invalid CBC grade: {grade}")

    # Check score range
    final_score = total_score.get('final_score')
    if final_score is not None:
        if not isinstance(final_score, (int, float)) or final_score < 0 or final_score > 100:
            errors.append(f"CBC final_score={final_score} invalid (should be 0-100)")

    # Check pathway scores
    pathway_scores = cbc.get('pathway_scores', {})
    for pathway, data in pathway_scores.items():
        if pathway not in valid_pathways:
            errors.append(f"Unknown CBC pathway: {pathway}")

    # Check primary pathway
    primary = cbc.get('primary_pathway')
    if primary and primary not in valid_pathways:
        errors.append(f"Invalid primary_pathway: {primary}")

    return errors

def validate_url(url):
    """Basic URL format validation"""
    if not url:
        return True

    # Local paths are valid
    if url.startswith('/docs/') or url.startswith('local:'):
        return True

    # Skip plain text references (like journal names)
    if ' ' in url and not url.startswith('http'):
        return True

    try:
        result = urlparse(url)
        return all([result.scheme in ['http', 'https'], result.netloc])
    except:
        return False

def validate_project(project, idx, result: ValidationResult):
    """Validate a single project"""
    pid = project.get('id', f'index_{idx}')

    # Required fields
    required = ['id', 'name', 'country', 'location', 'status']
    for field in required:
        if field not in project:
            result.error(f"[{pid}] Missing required field: {field}")

    # ID format
    if 'id' in project:
        if not re.match(r'^NO_[a-z0-9_]+$', project['id']):
            result.warn(f"[{pid}] ID doesn't follow convention NO_<name>")

    # Location validation
    if 'location' in project:
        loc = project['location']
        coord_errors = validate_coordinates(loc.get('coordinates'), pid)
        for err in coord_errors:
            result.error(f"[{pid}] {err}")

    # Metrics validation
    metric_errors = validate_metrics(project.get('metrics', {}), pid)
    for err in metric_errors:
        result.error(f"[{pid}] {err}")

    # CBC validation
    cbc_errors = validate_cbc_assessment(project.get('cbc_assessment'), pid)
    for err in cbc_errors:
        result.error(f"[{pid}] {err}")

    # Year validation (allow string dates for planned projects)
    year = project.get('year_completed')
    status = project.get('status', '')
    if year:
        if isinstance(year, int):
            if year < 2000 or (year > 2026 and status != 'planned'):
                result.warn(f"[{pid}] Unusual year_completed: {year}")
        # String years like "2022-2023" or "2025 (planned)" are acceptable

    # URL validation
    project_url = project.get('project_url')
    if project_url and not validate_url(project_url):
        result.warn(f"[{pid}] Invalid project_url format")

    # Source URL validation
    for source in project.get('sources', []):
        url = source.get('url')
        if url and not validate_url(url):
            result.warn(f"[{pid}] Invalid source URL: {url[:50]}...")

    # Check for duplicate IDs (accumulate for later check)
    return pid

def validate_case_studies(project_ids, result: ValidationResult):
    """Validate all case studies"""
    if not CASE_STUDIES_DIR.exists():
        result.add_info("No case studies directory found")
        return

    for cs_file in CASE_STUDIES_DIR.glob("*.json"):
        try:
            with open(cs_file) as f:
                cs = json.load(f)

            cs_id = cs.get('case_study_id', cs_file.stem)

            # Check project_id reference
            pid = cs.get('project_id')
            if pid:
                if pid not in project_ids:
                    result.error(f"Case study [{cs_id}]: project_id '{pid}' not found in norway.json")
            else:
                result.warn(f"Case study [{cs_id}]: Missing project_id")

            # Check required fields
            if 'name' not in cs:
                result.warn(f"Case study [{cs_id}]: Missing name")

            if 'case_study_tier' not in cs:
                result.warn(f"Case study [{cs_id}]: Missing tier")

        except json.JSONDecodeError as e:
            result.error(f"Case study {cs_file.name}: Invalid JSON - {e}")

def validate_data_consistency(data, result: ValidationResult):
    """Check overall data consistency"""

    projects = data.get('projects', [])

    # Check for duplicate IDs
    ids = [p.get('id') for p in projects]
    seen = set()
    for pid in ids:
        if pid in seen:
            result.error(f"Duplicate project ID: {pid}")
        seen.add(pid)

    # Check project count in metadata vs actual
    meta_count = data.get('metadata', {}).get('total_projects')
    if meta_count and meta_count != len(projects):
        result.warn(f"Metadata says {meta_count} projects but found {len(projects)}")

    # Check for projects without CBC
    no_cbc = [p['id'] for p in projects if not p.get('cbc_assessment')]
    if no_cbc:
        result.add_info(f"{len(no_cbc)} projects without CBC assessment")

    # Check data quality distribution
    quality_dist = defaultdict(int)
    for p in projects:
        q = p.get('data_quality', 'unknown')
        quality_dist[q] += 1
    result.add_info(f"Data quality distribution: {dict(quality_dist)}")

def main():
    print("Nordic Circular Buildings Data Validation")
    print("=" * 60)

    result = ValidationResult()

    # Load main data file
    if not NORWAY_JSON.exists():
        print(f"ERROR: {NORWAY_JSON} not found")
        return 1

    try:
        with open(NORWAY_JSON) as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON in norway.json: {e}")
        return 1

    projects = data.get('projects', [])
    result.add_info(f"Loaded {len(projects)} projects from norway.json")

    # Validate each project
    project_ids = set()
    for idx, project in enumerate(projects):
        pid = validate_project(project, idx, result)
        project_ids.add(pid)

    # Validate case studies
    validate_case_studies(project_ids, result)

    # Overall consistency
    validate_data_consistency(data, result)

    # Print results
    print(f"\nInfo:")
    for msg in result.info:
        print(f"  - {msg}")

    if result.warnings:
        print(f"\nWarnings ({len(result.warnings)}):")
        for msg in result.warnings:
            print(f"  ⚠️  {msg}")

    if result.errors:
        print(f"\nErrors ({len(result.errors)}):")
        for msg in result.errors:
            print(f"  ❌ {msg}")
    else:
        print(f"\n✅ No errors found")

    print(f"\n{'=' * 60}")
    print(f"Summary: {len(result.errors)} errors, {len(result.warnings)} warnings")

    return 1 if result.has_errors else 0

if __name__ == "__main__":
    import sys
    sys.exit(main())
