/**
 * Add cost data and narrative to projects based on research
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects/norway.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const updates = {
  // COST DATA UPDATES
  'NO_ka13': {
    budget: 304000000, // 304 MNOK total investment
    cost_notes: {
      total_investment: '304 MNOK (incl. property value)',
      cost_comparison: 'Reuse was neither simple nor cheap to implement - goal was to prove feasibility. Higher upfront costs but creating replicable procedures.',
      co2_savings_vs_new: '70% overall, 89-98% for individual reused elements',
      source: 'Entra Erfaringsrapport 2021'
    }
  },
  'NO_grensen9b': {
    budget: null,
    cost_notes: {
      cost_comparison: 'Did not cost more than an ordinary rehabilitation - 97% reuse at same cost as conventional',
      key_insight: '"Knekt koden for lønnsom ombruk" - cracked the code for profitable reuse',
      co2_savings_vs_new: '93% vs new build',
      source: 'MAD Arkitekter / Storebrand Bærekraftspris 2024'
    }
  },
  'NO_foniks': {
    budget: null,
    cost_notes: {
      window_cost: '1,400 NOK/m² for reused windows vs 4,000 NOK/m² for new (65% savings)',
      cost_comparison: 'Expected to deliver building cheaper than rehabilitation with new materials. Many partners offering discounted or free materials.',
      key_insight: 'Actual cost difficult to determine - learning phase. Future projects will not be as cheap due to donated materials.',
      co2_savings_vs_new: '~90% possible with rehabilitation + reuse',
      source: 'Loopfront Blog / DNB Nyheter'
    }
  },
  'NO_loren': {
    budget: 301600000, // 301.6 MNOK incl. MVA
    cost_notes: {
      contract_sum: '160 MNOK excl. MVA',
      total_with_mva: '301.6 MNOK',
      ship_steel_savings: '97% lower climate footprint than conventional steel, ~90% CO2 savings',
      key_insight: 'World first: upcycled ship steel in load-bearing construction',
      source: 'Oslobygg / Nordic Circles'
    }
  },
  'NO_eikeli': {
    budget: null,
    cost_notes: {
      cost_comparison: 'Reused brick is now competitive with new quality brick - "ikke lenger dyrere enn ny kvalitetstegl"',
      labor_note: 'More labor-intensive, thus more expensive work, but savings on material cost balance out',
      environmental_savings: '106 tonnes waste avoided, 26.5 tonnes CO2 saved (equiv. Oslo-Copenhagen 265 times)',
      key_insight: 'First large-scale CE-certified reused brick project in Norway',
      source: 'Peab / HØINE / Byggmesteren'
    }
  },
  'NO_nedre_sem': {
    budget: 150000000, // Estimated total ~150 MNOK
    cost_notes: {
      contract_sum: '104 MNOK excl. MVA (Veidekke contract)',
      key_insight: '50% circularity achieved - first circular building project for Asker kommune',
      source: 'Asker Kommune / Mercell'
    }
  },

  // NARRATIVE UPDATES for projects without narrative
  'NO_treklang': {
    narrative: {
      driver: 'Bærum kommune wanted to demonstrate that large-scale timber construction with high environmental ambitions is achievable for public buildings. The project combines kindergarten, school and sports facilities in one integrated complex.',
      lessons_learned: 'Design for disassembly requires early planning and coordination between all parties. Material choices must account for future flexibility.',
      challenges: ['Coordinating multiple functions in single building', 'Meeting BREEAM Excellent requirements', 'Timber construction at scale']
    }
  },
  'NO_ruselokka': {
    narrative: {
      driver: 'Oslo kommune aimed to build a climate-neutral school while preserving local heritage. The old school materials - 4,500 bricks, timber beams, and granite blocks - were carefully salvaged for reuse.',
      lessons_learned: 'Heritage materials require careful documentation and testing. Dynamic glass reduces energy consumption significantly.',
      challenges: ['Preserving historic elements while meeting modern standards', 'CE-certification of reused materials', 'Tight urban construction site']
    }
  },
  'NO_tradlab_tre': {
    narrative: {
      driver: 'Norsk Folkemuseum wanted to create a living demonstration of traditional craft techniques using reused materials, specifically the timber donated from Nedre Sem låve.',
      lessons_learned: 'Traditional techniques like "kubb" (wooden blocks in clay) can be applied with modern materials. Inter-project material flow creates valuable connections.',
      challenges: ['Working within protected museum environment', 'Adapting old timber to new construction', 'Training in traditional techniques']
    }
  },
  'NO_ressurssentral': {
    narrative: {
      driver: 'Oslo needed centralized infrastructure for material reuse at scale. The tent itself is reused from Regjeringskvartalet demolition - a fitting symbol.',
      lessons_learned: 'Material banking requires partnerships across the construction industry. Location in active development area (Hovinbyen) is key for material flow.',
      challenges: ['Temporary use permit limitations (until 2025)', 'Scaling operations', 'Quality assurance of diverse materials']
    }
  },
  'NO_legevakt': {
    narrative: {
      driver: 'Statsbygg and Oslo kommune aimed to create a healthcare facility with minimal environmental impact using reused materials from the government quarter.',
      lessons_learned: 'Healthcare buildings can incorporate reused structural elements when properly tested and documented.',
      challenges: ['Strict healthcare building requirements', 'Coordinating with R4 demolition timeline', 'Material certification for healthcare use']
    }
  },
  'NO_hasle_tre': {
    narrative: {
      driver: 'Höegh Eiendom wanted to prove that demountable office buildings are commercially viable. The goal was 50% lower emissions than conventional construction.',
      lessons_learned: 'Design for disassembly adds minimal cost when planned from the start. The building can be taken apart and materials reused at end of life.',
      challenges: ['Developing demountable connections', 'Insurance and certification for DfD', 'Market acceptance of non-permanent construction']
    }
  },
  'NO_construction_city': {
    narrative: {
      driver: 'OBOS wanted Construction City to exemplify circular construction for the entire building industry. With 103,000 m², it demonstrates that scale is not a barrier to circularity.',
      lessons_learned: '50% recycled/reused material target is achievable in large commercial projects. The Wasteless initiative shows industry collaboration potential.',
      challenges: ['Coordinating multiple contractors on circularity goals', 'Sourcing sufficient reused materials at scale', 'Design for future disassembly of large complex']
    }
  },
  'NO_nidarvoll': {
    narrative: {
      driver: 'Trondheim kommune sought to demonstrate circular principles in school construction, using materials from local demolition projects.',
      lessons_learned: 'Public schools can be built with significant reused content when municipality has clear ambitions and procurement framework.',
      challenges: ['Coordinating with local demolition timelines', 'Meeting school safety requirements with reused materials']
    }
  },
  'NO_stovner': {
    narrative: {
      driver: 'Oslo kommune wanted to follow Løren\'s success with ship steel in another municipal facility, proving the methodology is replicable.',
      lessons_learned: 'Ship steel reuse methodology from Nordic Circles can be applied across different building types.',
      challenges: ['Pool environment material requirements', 'Coordinating with Nordic Circles supply chain']
    }
  },
  'NO_voldsloekka': {
    narrative: {
      driver: 'The sports park needed flexible, adaptable structures. Design for disassembly allows reconfiguration as community needs change.',
      lessons_learned: 'Sports facilities benefit from DfD approach - equipment and structures can be moved or upgraded without demolition.',
      challenges: ['Outdoor exposure requirements', 'Multiple user group needs', 'Long-term flexibility planning']
    }
  },
  'NO_nrk': {
    narrative: {
      driver: 'NRK\'s new headquarters competition was won by "Sirkulær" concept, with explicit circularity targets including 70% reuse ambition.',
      lessons_learned: 'Major public clients can use procurement to drive circular innovation. Competition format allows ambitious concepts.',
      challenges: ['Planned project - challenges will emerge during implementation', 'Meeting broadcast facility requirements with reused materials']
    }
  }
};

// Apply updates
data.projects.forEach(project => {
  const update = updates[project.id];
  if (!update) return;

  // Add budget if available
  if (update.budget !== undefined) {
    project.budget = update.budget;
  }

  // Add cost_notes to metrics
  if (update.cost_notes) {
    project.metrics = project.metrics || {};
    project.metrics.cost_notes = update.cost_notes;
    console.log(`Added cost data to ${project.id}`);
  }

  // Add narrative if not exists
  if (update.narrative && !project.narrative) {
    project.narrative = update.narrative;
    console.log(`Added narrative to ${project.id}`);
  }
});

// Update last_updated
data.last_updated = '2025-12-03';

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('');
console.log('Cost and narrative updates completed!');

// Summary
const withCost = data.projects.filter(p => p.metrics && p.metrics.cost_notes).length;
const withNarrative = data.projects.filter(p => p.narrative).length;
console.log(`Projects with cost notes: ${withCost}/23`);
console.log(`Projects with narrative: ${withNarrative}/23`);
