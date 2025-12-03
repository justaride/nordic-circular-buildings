/**
 * Add narrative to remaining 5 projects
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects/norway.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const narrativeUpdates = {
  'NO_oslo_legevakt': {
    narrative: {
      driver: 'Statsbygg and Oslo kommune aimed to create a healthcare facility with minimal environmental impact, utilizing reused structural concrete from the R4 building in Regjeringskvartalet.',
      lessons_learned: 'Healthcare buildings can incorporate reused structural elements when properly tested and documented. Coordination with major demolition projects unlocks material availability.',
      challenges: ['Strict healthcare building requirements', 'Coordinating with R4 demolition timeline', 'Material certification for healthcare use']
    }
  },
  'NO_nidarvoll_sunnland': {
    narrative: {
      driver: 'Trondheim kommune sought to demonstrate circular principles in school construction, using reused materials from local demolition projects to reduce climate impact.',
      lessons_learned: 'Public schools can be built with significant reused content when municipality has clear circular economy ambitions and appropriate procurement framework.',
      challenges: ['Coordinating with local demolition timelines', 'Meeting school safety requirements with reused materials', 'Developing local supply chain for circular materials']
    }
  },
  'NO_stovner_bad': {
    narrative: {
      driver: 'Oslo kommune wanted to replicate Løren\'s success with ship steel reuse in another municipal facility, proving the Nordic Circles methodology is scalable and replicable across building types.',
      lessons_learned: 'Ship steel reuse methodology can be applied across different building types including aquatic centers. Chlorine-resistant coatings are essential for pool environments.',
      challenges: ['Pool environment corrosion requirements', 'Coordinating with Nordic Circles supply chain', 'Ensuring structural integrity in high-humidity environment']
    }
  },
  'NO_voldslokka': {
    narrative: {
      driver: 'The sports park needed flexible, adaptable structures that could evolve with community needs. Design for disassembly allows reconfiguration without demolition waste.',
      lessons_learned: 'Sports facilities benefit significantly from DfD approach - equipment and structures can be moved, upgraded or replaced as user needs change over time.',
      challenges: ['Outdoor exposure weathering requirements', 'Balancing multiple user group needs', 'Long-term flexibility planning with uncertain future uses']
    }
  },
  'NO_nrk_normannslokka': {
    narrative: {
      driver: 'NRK\'s new headquarters competition was won by concept "Sirkulær", making explicit circularity the core design principle with 70% material reuse ambition for 50,000 m² media facility.',
      lessons_learned: 'Major public clients can use design competitions to drive circular innovation. Ambitions set at tender stage become binding project requirements.',
      challenges: ['Project still in planning - challenges will emerge during implementation', 'Meeting complex broadcast facility requirements with reused materials', 'Sourcing sufficient reused materials for 50,000 m² building']
    }
  }
};

// Apply updates
data.projects.forEach(project => {
  const update = narrativeUpdates[project.id];
  if (update && !project.narrative) {
    project.narrative = update.narrative;
    console.log(`Added narrative to ${project.id}: ${project.name}`);
  }
});

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('');
console.log('Remaining narratives added!');

const withNarrative = data.projects.filter(p => p.narrative).length;
console.log(`Projects with narrative: ${withNarrative}/23`);
