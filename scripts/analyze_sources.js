const data = require('../data/projects/norway.json');

let totalSources = 0;
let sourcesWithUrl = 0;
let totalCitations = 0;
let citationsWithUrl = 0;
let projectsWithMissingSources = [];

data.projects.forEach(p => {
  const sources = p.sources || [];
  const citations = p.circular_features?.flatMap(f => f.citations || []) || [];

  totalSources += sources.length;
  sourcesWithUrl += sources.filter(s => s.url).length;
  totalCitations += citations.length;
  citationsWithUrl += citations.filter(c => c.url).length;

  const missingUrls = sources.filter(s => !s.url);
  if (missingUrls.length > 0) {
    projectsWithMissingSources.push({
      name: p.name,
      id: p.id,
      missing: missingUrls.map(s => s.name || s.type)
    });
  }
});

console.log('=== SAMMENDRAG ===');
console.log('Totalt sources:', totalSources);
console.log('Sources med URL:', sourcesWithUrl, '(' + Math.round(sourcesWithUrl/totalSources*100) + '%)');
console.log('Sources uten URL:', totalSources - sourcesWithUrl);
console.log('');
console.log('Totalt citations:', totalCitations);
console.log('Citations med URL:', citationsWithUrl, '(' + (totalCitations > 0 ? Math.round(citationsWithUrl/totalCitations*100) : 0) + '%)');
console.log('');
console.log('=== PROSJEKTER MED MANGLENDE SOURCE-URLer ===');
projectsWithMissingSources.forEach(p => {
  console.log('');
  console.log(p.name + ' (' + p.id + ')');
  p.missing.forEach(m => console.log('  - ' + m));
});

console.log('\n=== VIKTIGE UNDERLAGSDOKUMENTER SOM MANGLER ===');
console.log('');
console.log('1. KA13 Erfaringsrapport (116 sider) - Entras detaljerte rapport');
console.log('   Søk: Entra KA13 erfaringsrapport PDF');
console.log('');
console.log('2. FutureBuilt Forbildeprosjekt-sider - flere mangler direkte lenker');
console.log('   Base: https://www.futurebuilt.no/Forbildeprosjekter');
console.log('');
console.log('3. Oslobygg/Oslo kommune prosjektsider');
console.log('   Søk: oslobygg.no + prosjektnavn');
console.log('');
console.log('4. Nordic Circles metodologi-dokumentasjon');
console.log('   Søk: Nordic Circles ship steel certification');
