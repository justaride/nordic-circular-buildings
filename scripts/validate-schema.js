#!/usr/bin/env node
/**
 * Schema Validation Script
 * Validates project data against JSON schema
 * Checks for common data integrity issues
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SCHEMA_PATH = path.join(ROOT, 'data', 'schema.json');
const DATA_PATH = path.join(ROOT, 'data', 'projects', 'norway.json');

console.log('🔍 Validating data against schema...\n');

// Load schema and data
let schema, data;
try {
  schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
} catch (err) {
  console.error(`❌ Failed to load files: ${err.message}`);
  process.exit(1);
}

const projects = data.projects;
const errors = [];      // Critical structural errors (fail build)
const dataIssues = [];  // Missing data (warning only)
const warnings = [];    // Deprecated fields, suggestions

// Strictly required fields (structural)
const strictlyRequired = ['id', 'name', 'country', 'location', 'status', 'is_public_sector'];

// Desired fields (data completeness - warn only)
const desiredFields = ['year_completed', 'building_type', 'client', 'architect', 'circular_features', 'metrics'];

// Valid enum values
const validCountries = ['NO', 'SE', 'DK', 'FI', 'IS'];
const validStatuses = ['completed', 'under_construction', 'planned', 'operational'];
const validProjectTypes = ['renovation', 'transformation', 'extension', 'hybrid', 'new_build'];
const validBuildingTypes = [
  'office', 'school', 'housing', 'residential', 'sports_facility', 'care_facility',
  'healthcare', 'mixed_use', 'cultural', 'infrastructure', 'workshop',
  'government', 'media_facility'
];

// Validate each project
projects.forEach((project, index) => {
  const prefix = `Project ${index + 1} (${project.id || 'NO_ID'})`;

  // Check strictly required fields (errors)
  strictlyRequired.forEach(field => {
    if (project[field] === undefined || project[field] === null) {
      errors.push(`${prefix}: Missing required field '${field}'`);
    }
  });

  // Check desired fields (data issues - warnings)
  desiredFields.forEach(field => {
    if (project[field] === undefined || project[field] === null) {
      dataIssues.push(`${prefix}: Missing '${field}'`);
    }
  });

  // Validate country enum
  if (project.country && !validCountries.includes(project.country)) {
    errors.push(`${prefix}: Invalid country '${project.country}'`);
  }

  // Validate status enum
  if (project.status && !validStatuses.includes(project.status)) {
    errors.push(`${prefix}: Invalid status '${project.status}'`);
  }

  // Validate building_type enum
  if (project.building_type && !validBuildingTypes.includes(project.building_type)) {
    errors.push(`${prefix}: Invalid building_type '${project.building_type}'`);
  }

  // Validate project_type.primary enum
  if (project.project_type?.primary && !validProjectTypes.includes(project.project_type.primary)) {
    errors.push(`${prefix}: Invalid project_type.primary '${project.project_type.primary}'`);
  }

  // Check ID format (should be COUNTRY_slug)
  if (project.id && !project.id.match(/^[A-Z]{2}_[a-z0-9_]+$/)) {
    warnings.push(`${prefix}: ID format should be 'XX_slug' (e.g., 'NO_project_name')`);
  }

  // Check for location.coordinates
  if (!project.location?.coordinates?.lat || !project.location?.coordinates?.lng) {
    warnings.push(`${prefix}: Missing coordinates`);
  }

  // Check circular_features has content
  if (!project.circular_features || project.circular_features.length === 0) {
    warnings.push(`${prefix}: No circular_features defined`);
  }

  // Check data_completeness exists
  if (!project.data_completeness) {
    warnings.push(`${prefix}: Missing data_completeness scoring`);
  }

  // Check for deprecated fields still in use
  if (project.project_type_simple) {
    warnings.push(`${prefix}: Using deprecated 'project_type_simple' field`);
  }
  if (project.data_quality) {
    warnings.push(`${prefix}: Using deprecated 'data_quality' field`);
  }
});

// Check for duplicate IDs
const ids = projects.map(p => p.id);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicates.length > 0) {
  errors.push(`Duplicate project IDs found: ${[...new Set(duplicates)].join(', ')}`);
}

// Check total_projects header matches
if (data.total_projects !== projects.length) {
  errors.push(`Header total_projects (${data.total_projects}) doesn't match actual count (${projects.length})`);
}

// Output results
console.log(`Validated ${projects.length} projects\n`);

// Data issues (missing optional but desired data)
if (dataIssues.length > 0) {
  console.log(`📊 ${dataIssues.length} data gaps (consider filling):`);
  dataIssues.slice(0, 5).forEach(w => console.log(`   ${w}`));
  if (dataIssues.length > 5) {
    console.log(`   ... and ${dataIssues.length - 5} more`);
  }
  console.log('');
}

// Deprecation warnings
if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} deprecation warnings:`);
  warnings.slice(0, 5).forEach(w => console.log(`   ${w}`));
  if (warnings.length > 5) {
    console.log(`   ... and ${warnings.length - 5} more`);
  }
  console.log('');
}

// Critical errors
if (errors.length > 0) {
  console.log(`❌ ${errors.length} critical errors:`);
  errors.forEach(e => console.log(`   ${e}`));
  console.log('');
  console.error('Validation failed - fix critical errors before build');
  process.exit(1);
} else {
  console.log('✓ Schema validation passed (no critical errors)');
}
