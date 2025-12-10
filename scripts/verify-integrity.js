#!/usr/bin/env node
/**
 * Data Integrity Verification Script
 * Checks all data files for consistency and completeness
 * Run: node scripts/verify-integrity.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let exitCode = 0;

console.log('=== Data Integrity Verification ===\n');

// 1. Verify country data files
const countries = ['norway', 'sweden', 'denmark', 'finland', 'iceland'];
const projectIssues = [];

countries.forEach(country => {
  const file = path.join(ROOT, 'data/projects', country + '.json');
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const actual = (data.projects || []).length;
    const declared = data.total_projects || 0;

    // Check count mismatch
    if (actual !== declared && actual > 0) {
      projectIssues.push(`${country}: declared=${declared}, actual=${actual}`);
    }

    // Check for duplicate IDs
    const ids = (data.projects || []).map(p => p.id);
    const seen = new Set();
    ids.forEach(id => {
      if (seen.has(id)) {
        projectIssues.push(`${country}: duplicate ID '${id}'`);
      }
      seen.add(id);
    });

    // Check required fields
    (data.projects || []).forEach(p => {
      if (!p.id) projectIssues.push(`${country}: project missing 'id'`);
      if (!p.name) projectIssues.push(`${country}: ${p.id || '?'} missing 'name'`);
      if (!p.location?.city) projectIssues.push(`${country}: ${p.id || '?'} missing 'location.city'`);
      if (p.is_public_sector === undefined) projectIssues.push(`${country}: ${p.id || '?'} missing 'is_public_sector'`);
    });

    console.log(`✓ ${country}: ${actual} projects`);
  } catch (e) {
    projectIssues.push(`${country}: ${e.message}`);
    console.log(`✗ ${country}: FAILED`);
  }
});

if (projectIssues.length > 0) {
  console.log('\n❌ Project data issues:');
  projectIssues.forEach(i => console.log(`   - ${i}`));
  exitCode = 1;
}

// 2. Verify case studies
console.log('\n--- Case Studies ---');
const caseStudiesDir = path.join(ROOT, 'data/case-studies');
const caseStudyIssues = [];

try {
  const files = fs.readdirSync(caseStudiesDir).filter(f => f.endsWith('.json'));
  files.forEach(file => {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(caseStudiesDir, file), 'utf8'));
      if (!data.project_id) caseStudyIssues.push(`${file}: missing 'project_id'`);
      if (!data.name) caseStudyIssues.push(`${file}: missing 'name'`);
      console.log(`✓ ${file}`);
    } catch (e) {
      caseStudyIssues.push(`${file}: ${e.message}`);
      console.log(`✗ ${file}: FAILED`);
    }
  });
} catch (e) {
  caseStudyIssues.push(`case-studies dir: ${e.message}`);
}

if (caseStudyIssues.length > 0) {
  console.log('\n❌ Case study issues:');
  caseStudyIssues.forEach(i => console.log(`   - ${i}`));
  exitCode = 1;
}

// 3. Verify synced data matches source
console.log('\n--- Sync Verification ---');
const syncIssues = [];

countries.forEach(country => {
  const source = path.join(ROOT, 'data/projects', country + '.json');
  const synced = path.join(ROOT, 'site/public/data', country + '.json');

  if (!fs.existsSync(synced)) {
    syncIssues.push(`${country}: not synced to site/public/data`);
    return;
  }

  try {
    const sourceData = fs.readFileSync(source, 'utf8');
    const syncedData = fs.readFileSync(synced, 'utf8');

    if (sourceData !== syncedData) {
      syncIssues.push(`${country}: source and synced files differ`);
    } else {
      console.log(`✓ ${country}: synced`);
    }
  } catch (e) {
    syncIssues.push(`${country}: ${e.message}`);
  }
});

if (syncIssues.length > 0) {
  console.log('\n⚠️  Sync issues (run npm run sync):');
  syncIssues.forEach(i => console.log(`   - ${i}`));
}

// 4. Summary
console.log('\n=== Summary ===');
const totalIssues = projectIssues.length + caseStudyIssues.length;
if (totalIssues === 0) {
  console.log('✓ All data integrity checks passed');
} else {
  console.log(`❌ ${totalIssues} issue(s) found`);
}

if (syncIssues.length > 0) {
  console.log(`⚠️  ${syncIssues.length} sync issue(s) - run 'npm run sync' in site/`);
}

process.exit(exitCode);
