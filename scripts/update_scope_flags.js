/**
 * Update scope flags based on Jan Thomas meeting feedback
 * and external research verification
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects/norway.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const scopeUpdates = {
  'NO_tradlab_tre': {
    scope_notes: {
      is_primary_scope: false,
      category: 'demonstration_project',
      notes: 'Museum pavilion/workshop at Norsk Folkemuseum - demonstration project for traditional crafts, not a functional public building. Valuable for material flow documentation (timber from Nedre Sem).'
    }
  },
  'NO_ressurssentral': {
    scope_notes: {
      is_primary_scope: false,
      category: 'enabling_infrastructure',
      notes: 'Material banking/distribution facility (4,500 m² tent from Regjeringskvartalet). Enables circular economy but is infrastructure, not a building with material circularity as end product.'
    }
  },
  'NO_hasle_tre': {
    scope_notes: {
      is_primary_scope: true,
      category: 'design_for_disassembly',
      notes: 'Private sector (Höegh Eiendom) but has public tenants (Bymiljøetaten). Primary focus is DfD rather than material reuse, but represents future circular potential. DOGA Award 2023.'
    }
  },
  'NO_construction_city': {
    scope_notes: {
      is_primary_scope: true,
      category: 'core',
      notes: 'Strong material circularity: 50% recycled/reused materials target, reused handrails→parquet, DfD design. Initial feedback mentioned "furniture reuse" but research confirms significant material circularity.'
    }
  }
};

// Apply updates
data.projects.forEach(project => {
  const update = scopeUpdates[project.id];
  if (update) {
    project.scope_notes = update.scope_notes;
    console.log(`Updated ${project.id}: ${update.scope_notes.category}`);
  }
});

// Update summary counts
const primaryScope = data.projects.filter(p =>
  !p.scope_notes || p.scope_notes.is_primary_scope !== false
).length;
const secondaryScope = data.projects.filter(p =>
  p.scope_notes && p.scope_notes.is_primary_scope === false
).length;

console.log('');
console.log('Summary:');
console.log(`  Primary scope projects: ${primaryScope}`);
console.log(`  Secondary scope projects: ${secondaryScope}`);

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('');
console.log('Scope flags updated successfully!');
