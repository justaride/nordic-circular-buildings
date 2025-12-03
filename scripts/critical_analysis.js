/**
 * Kritisk analyse av Jan Thomas møte-implementering
 */

const data = require('../data/projects/norway.json');

console.log('=== KRITISK ANALYSE: JAN THOMAS MØTE ===');
console.log('');

// 1. Sjekk narrativ-dekning
const withNarrative = data.projects.filter(p => p.narrative);
const withDriver = data.projects.filter(p => p.narrative && p.narrative.driver);
const withLessons = data.projects.filter(p => p.narrative && p.narrative.lessons_learned);
const withChallenges = data.projects.filter(p => p.narrative && p.narrative.challenges && p.narrative.challenges.length > 0);

console.log('1. NARRATIV (driver/lessons/challenges):');
console.log('   Med narrative objekt:', withNarrative.length + '/23');
console.log('   Med driver:', withDriver.length + '/23');
console.log('   Med lessons_learned:', withLessons.length + '/23');
console.log('   Med challenges:', withChallenges.length + '/23');
console.log('   MANGLER narrative:');
data.projects.filter(p => !p.narrative).forEach(p => console.log('   - ' + p.name));
console.log('');

// 2. Sjekk CBC assessment
const withCBC = data.projects.filter(p => p.cbc_assessment);
console.log('2. CBC ASSESSMENT:');
console.log('   Med cbc_assessment:', withCBC.length + '/23');
if (withCBC.length > 0) {
  console.log('   Prosjekter:');
  withCBC.forEach(p => console.log('   - ' + p.name + ': Grade ' + p.cbc_assessment.total_score.grade));
}
console.log('');

// 3. Sjekk circularity breakdown
const withBreakdown = data.projects.filter(p => p.metrics && p.metrics.circularity_rate && p.metrics.circularity_rate.breakdown);
console.log('3. CIRCULARITY BREAKDOWN:');
console.log('   Med material breakdown:', withBreakdown.length + '/23');
console.log('   Prosjekter:');
withBreakdown.forEach(p => {
  const materials = p.metrics.circularity_rate.breakdown.map(b => b.material).join(', ');
  console.log('   - ' + p.name + ': ' + materials);
});
console.log('');

// 4. Sjekk supplier data
const projectsWithSuppliers = data.projects.filter(p =>
  p.circular_features && p.circular_features.some(f => f.supplier)
);
console.log('4. SUPPLIER DATA:');
console.log('   Prosjekter med supplier:', projectsWithSuppliers.length + '/23');
const noSupplier = data.projects.filter(p => !p.circular_features || !p.circular_features.some(f => f.supplier));
console.log('   MANGLER supplier:');
noSupplier.forEach(p => console.log('   - ' + p.name));
console.log('');

// 5. Sjekk cost comparison (JAN THOMAS PRIORITY)
const withCost = data.projects.filter(p =>
  (p.circular_features && p.circular_features.some(f => f.cost_comparison)) ||
  (p.metrics && p.metrics.cost_savings) ||
  (p.metrics && p.metrics.cost_notes)
);
console.log('5. COST DATA (Jan Thomas priority):');
console.log('   Med cost data:', withCost.length + '/23');
if (withCost.length > 0) {
  console.log('   Prosjekter:');
  withCost.forEach(p => {
    const notes = p.metrics && p.metrics.cost_notes;
    if (notes) {
      console.log('   - ' + p.name + ': ' + (notes.key_insight || notes.cost_comparison || 'has cost notes').substring(0, 60));
    }
  });
}
console.log('');

// 6. Sjekk quantity data
const withQuantity = data.projects.filter(p =>
  p.circular_features && p.circular_features.some(f => f.quantity && f.quantity.value)
);
console.log('6. QUANTITY DATA (tonnes/m²/units):');
console.log('   Med quantity:', withQuantity.length + '/23');
console.log('');

// 7. Out of scope flagging
const flagged = data.projects.filter(p => p.scope_notes && p.scope_notes.is_primary_scope === false);
console.log('7. SCOPE FLAGGING:');
console.log('   Flagget som sekundær scope:', flagged.length);
flagged.forEach(p => console.log('   - ' + p.name + ': ' + p.scope_notes.notes));
console.log('');

// 8. Project type (enhanced)
const projectTypes = {};
data.projects.forEach(p => {
  const type = typeof p.project_type === 'object' ? p.project_type.primary : p.project_type;
  projectTypes[type] = (projectTypes[type] || 0) + 1;
});
console.log('8. PROJECT TYPE (enhanced):');
Object.entries(projectTypes).forEach(([type, count]) => console.log('   ' + type + ': ' + count));

const withPreservation = data.projects.filter(p => p.project_type && p.project_type.preservation_percent);
console.log('   Med preservation_percent:', withPreservation.length + '/23');
console.log('');

// 9. Citations
const withCitations = data.projects.filter(p =>
  p.circular_features && p.circular_features.some(f => f.citations && f.citations.length > 0)
);
console.log('9. CITATIONS:');
console.log('   Prosjekter med citations:', withCitations.length + '/23');
console.log('');

// 10. Donor source
const withDonor = data.projects.filter(p =>
  p.circular_features && p.circular_features.some(f => f.donor_source && f.donor_source.name)
);
console.log('10. DONOR SOURCE:');
console.log('   Med donor_source:', withDonor.length + '/23');
console.log('');

// SUMMARY GAP ANALYSIS
console.log('');
console.log('=== GAP ANALYSE ===');
console.log('');
console.log('KRITISKE GAPS:');
console.log('');
console.log('1. COST DATA (' + withCost.length + '/23)');
console.log('   Jan Thomas sa: "Hva kostet det? Hva sparte de?"');
if (withCost.length < 6) {
  console.log('   Status: Ikke implementert på noen prosjekter');
  console.log('   Anbefaling: Prioriter research på Tier 1 prosjekter');
} else {
  console.log('   Status: ✅ Tier 1 prosjekter har cost notes');
  console.log('   Neste steg: Utvid til flere prosjekter');
}
console.log('');
console.log('2. NARRATIVE GAPS (' + (23 - withNarrative.length) + ' prosjekter mangler)');
console.log('   Jan Thomas sa: "Hva var driveren? Hva var lessons learned?"');
console.log('');
console.log('3. CBC ASSESSMENT (' + withCBC.length + '/23)');
console.log('   CBC Framework implementert i schema men ' + (23 - withCBC.length) + ' prosjekter mangler scoring');
console.log('');
console.log('4. MATERIAL BREAKDOWN (' + withBreakdown.length + '/23)');
console.log('   Jan Thomas sa: "Hva består sirkulariteten i?"');
console.log('');

// Anbefalinger
console.log('=== ANBEFALINGER FOR NESTE STEG ===');
console.log('');
if (withCost.length < 10) {
  console.log('A) PRIORITET 1: Utvid cost data til flere prosjekter');
  console.log('   - ' + withCost.length + '/23 har cost notes');
}
console.log('');
console.log('B) PRIORITET 2: Fullfør CBC assessment');
console.log('   - Score de resterende ' + (23 - withCBC.length) + ' prosjektene');
console.log('');
if ((23 - withNarrative.length) > 0) {
  console.log('C) PRIORITET 3: Narrative for alle prosjekter');
  console.log('   - ' + (23 - withNarrative.length) + ' prosjekter mangler narrative');
} else {
  console.log('C) NARRATIVE: ✅ Alle 23 prosjekter har narrative');
}
