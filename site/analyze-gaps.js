const data = require('./public/data/norway.json');

const analysis = data.projects.map(p => {
  const missing = [];

  if (!p.size_sqm) missing.push('Size (m²)');
  if (!p.budget) missing.push('Budget');
  if (!p.metrics?.circularity_rate) missing.push('Circularity %');
  if (!p.metrics?.co2_reduction) missing.push('CO₂ Reduction');
  if (!p.architect) missing.push('Architect');
  if (!p.contractor) missing.push('Contractor');
  if (!p.year_completed || p.year_completed === null || typeof p.year_completed === 'string') missing.push('Exact Completion Date');

  const hasCirc = p.metrics?.circularity_rate ? p.metrics.circularity_rate.value + '%' : null;
  const hasCO2 = p.metrics?.co2_reduction ?
    (p.metrics.co2_reduction.percent ? p.metrics.co2_reduction.percent + '%' :
     p.metrics.co2_reduction.absolute_tonnes ? p.metrics.co2_reduction.absolute_tonnes + 't' : 'partial') : null;

  return {
    id: p.id,
    name: p.name,
    status: p.status,
    dataQuality: p.data_quality,
    missing,
    hasCirc,
    hasCO2,
    missingCount: missing.length
  };
}).filter(p => p.missingCount > 0).sort((a,b) => b.missingCount - a.missingCount);

console.log('=== PROJECTS WITH MISSING METRICS ===\n');
analysis.forEach(p => {
  console.log(`${p.name}`);
  console.log(`  Status: ${p.status} | Quality: ${p.dataQuality}`);
  console.log(`  Has: Circ=${p.hasCirc || '—'} | CO₂=${p.hasCO2 || '—'}`);
  console.log(`  Missing (${p.missingCount}): ${p.missing.join(', ')}`);
  console.log('');
});

// Summary
const noCirc = data.projects.filter(p => !p.metrics?.circularity_rate).length;
const noCO2 = data.projects.filter(p => !p.metrics?.co2_reduction).length;
const noBudget = data.projects.filter(p => !p.budget).length;
const noSize = data.projects.filter(p => !p.size_sqm).length;
const noArch = data.projects.filter(p => !p.architect).length;
const noContr = data.projects.filter(p => !p.contractor).length;

console.log('=== SUMMARY OF GAPS ===');
console.log(`Missing Circularity %: ${noCirc}/22 projects`);
console.log(`Missing CO₂ Reduction: ${noCO2}/22 projects`);
console.log(`Missing Budget: ${noBudget}/22 projects`);
console.log(`Missing Size: ${noSize}/22 projects`);
console.log(`Missing Architect: ${noArch}/22 projects`);
console.log(`Missing Contractor: ${noContr}/22 projects`);
