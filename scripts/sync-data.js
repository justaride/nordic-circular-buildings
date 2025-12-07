#!/usr/bin/env node
/**
 * Data Sync Script
 * Synchronizes data from /data to /site/public/data
 * Run automatically before build via prebuild hook
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data', 'projects');
const SITE_DATA_DIR = path.join(ROOT, 'site', 'public', 'data');

// Files to sync
const FILES_TO_SYNC = [
  'norway.json'
];

console.log('🔄 Syncing data files...\n');

let hasErrors = false;

FILES_TO_SYNC.forEach(file => {
  const source = path.join(DATA_DIR, file);
  const dest = path.join(SITE_DATA_DIR, file);

  // Check source exists
  if (!fs.existsSync(source)) {
    console.error(`❌ Source not found: ${source}`);
    hasErrors = true;
    return;
  }

  // Validate JSON before copying
  try {
    const content = fs.readFileSync(source, 'utf8');
    const data = JSON.parse(content);

    // Basic validation
    if (!data.projects || !Array.isArray(data.projects)) {
      throw new Error('Invalid structure: missing projects array');
    }

    // Check total_projects matches actual count
    const actualCount = data.projects.length;
    if (data.total_projects !== actualCount) {
      console.warn(`⚠️  Warning: total_projects (${data.total_projects}) != actual count (${actualCount})`);
      console.warn('   Consider updating total_projects in source file');
    }

    // Ensure destination directory exists
    if (!fs.existsSync(SITE_DATA_DIR)) {
      fs.mkdirSync(SITE_DATA_DIR, { recursive: true });
    }

    // Copy file
    fs.copyFileSync(source, dest);
    console.log(`✓ ${file}: ${actualCount} projects synced`);

  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
    hasErrors = true;
  }
});

console.log('');

if (hasErrors) {
  console.error('❌ Sync failed with errors');
  process.exit(1);
} else {
  console.log('✓ Data sync complete');
}
