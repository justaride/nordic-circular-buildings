/**
 * Add more citations and sources to projects
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects/norway.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Additional sources and citations per project
const updates = {
  'NO_skur38': {
    sources: [
      {
        name: 'KS Eksempelbanken - Skur 38 gjenbruk',
        type: 'government',
        url: 'https://www.ks.no/fagomrader/samfunnsutvikling/miljo/sirkular-okonomi/veileder-for-sirkular-okonomi/eksempelbanken/skur-38--gjenbruk-av-byggematerialer/'
      },
      {
        name: 'iark - Oslo Havn Skur 38',
        type: 'architect',
        url: 'https://iark.no/prosjekter/oslo-havn-skur38'
      }
    ],
    citations: {
      'timber': [
        {
          source: 'KS Eksempelbanken',
          url: 'https://www.ks.no/fagomrader/samfunnsutvikling/miljo/sirkular-okonomi/veileder-for-sirkular-okonomi/eksempelbanken/skur-38--gjenbruk-av-byggematerialer/',
          quote: '171 tonn CO2-ekvivalenter redusert gjennom gjenbruk av byggematerialer'
        },
        {
          source: 'Open House Oslo',
          url: 'https://openhouseoslo.no/havneskuret-som-ble-miljoforbilde/',
          quote: 'Spileveggen i kantina satt sammen av mahogny treverk fra den gamle fjerdeetasjen'
        }
      ]
    }
  },
  'NO_ka23': {
    sources: [
      {
        name: 'Höegh Eiendom - Ombruksreise KA23',
        type: 'owner',
        url: 'https://hoegheiendom.no/tema/var-ombruksreise-til-et-fullskala-sirkulaert-bygg-med-vernestatus'
      },
      {
        name: 'Sweco - KA23 Norges første sirkulære bygg med vernestatus',
        type: 'consultant',
        url: 'https://www.sweco.no/aktuelt/nyheter/ka23-norges-forste-sirkulaere-bygg-med-vernestatus/'
      },
      {
        name: 'Norsk Byggbransje - KA23',
        type: 'article',
        url: 'https://norskbyggebransje.no/ostlandet/ka-23'
      }
    ],
    citations: {
      'mixed': [
        {
          source: 'Höegh Eiendom',
          url: 'https://hoegheiendom.no/stedsutvikling/ka23',
          quote: '50% materialer og bygningsdeler ombrukt eller ombrukbare'
        },
        {
          source: 'Sweco',
          url: 'https://www.sweco.no/aktuelt/nyheter/ka23-norges-forste-sirkulaere-bygg-med-vernestatus/',
          quote: '85% reduksjon i materialbruk, 66% lavere klimagassutslipp totalt'
        }
      ]
    }
  },
  'NO_hoyblokken': {
    sources: [
      {
        name: 'Skanska - Høyblokken Regjeringskvartalet',
        type: 'contractor',
        url: 'https://www.skanska.no/hva-vi-gjor/prosjekter/244828/Regjeringskvartalet-Hoyblokken'
      },
      {
        name: 'Regjeringen.no - Om byggeprosjektet',
        type: 'government',
        url: 'https://www.regjeringen.no/no/tema/plan-bygg-og-eiendom/regjeringskvartalet/nytt-RKV/id712726/'
      },
      {
        name: 'Bygg.no - BREEAM Excellent sertifisering',
        type: 'article',
        url: 'https://www.bygg.no/oslo-regjeringskvartalet-skanska/hoyblokken-sertifisert-til-breeam-excellent/2709518'
      }
    ],
    citations: {
      'concrete': [
        {
          source: 'Regjeringen.no',
          url: 'https://www.regjeringen.no/no/dokumenter/meld.-st.-21-20182019/id2641647/?ch=5',
          quote: 'Bevaring av Høyblokken ivaretar historisk kontinuitet - modernismens inntog i Norge'
        },
        {
          source: 'Bygg.no',
          url: 'https://www.bygg.no/oslo-regjeringskvartalet-skanska/hoyblokken-sertifisert-til-breeam-excellent/2709518',
          quote: 'BREEAM Excellent med blågrønt tak, sjøvannsvarmepumpe og etterisolering'
        }
      ]
    }
  },
  'NO_sophies_minde': {
    sources: [
      {
        name: 'Gemini - SINTEF murstein-testing',
        type: 'research',
        url: 'https://gemini.no/2024/03/mye-mur-kan-ombrukes-i-verneverdig-bygg/'
      },
      {
        name: 'TU.no - Gammel mur får nytt liv',
        type: 'article',
        url: 'https://www.tu.no/artikler/sikrer-at-gammel-mur-kan-fa-nytt-liv-i-verneverdig-bygg/544782'
      },
      {
        name: 'Enerhaugen Arkitektkontor - Sophies Minde',
        type: 'architect',
        url: 'https://enerhaugen.com/pf/sophiesminde/'
      }
    ],
    citations: {
      'brick': [
        {
          source: 'SINTEF Gemini',
          url: 'https://gemini.no/2024/03/mye-mur-kan-ombrukes-i-verneverdig-bygg/',
          quote: '8000 teglstein demontert og klargjort for ombruk - SINTEF-testing viste 70% høyere trykkfasthet enn tommelfingerregel'
        },
        {
          source: 'SINTEF (English)',
          url: 'https://www.sintef.no/en/latest-news/2024/bringing-old-brickwork-back-to-life-in-heritage-buildings/',
          quote: 'Comprehensive test program on brickwork samples weighing several hundred kilos'
        }
      ]
    }
  },
  'NO_nostebukten': {
    sources: [
      {
        name: 'OBOS - Nøstebukten Brygge ombruk',
        type: 'owner',
        url: 'https://www.obos.no/temasider/omrade/et-eksempel-pa-hvordan-vi-skal-bygge-i-framtiden-5hes1id13g'
      },
      {
        name: 'LAB Entreprenør - Nøstebukten Brygge',
        type: 'contractor',
        url: 'https://lab.no/prosjekter/nostebukten-brygge/'
      },
      {
        name: 'EGD Holding - TV2 ombruk',
        type: 'developer',
        url: 'https://egd.no/ambisiose-mal-for-ombruk-nar-tv2-hovedkvarter-blir-nye-leiligheter/'
      }
    ],
    citations: {
      'timber': [
        {
          source: 'OBOS',
          url: 'https://www.obos.no/temasider/omrade/et-eksempel-pa-hvordan-vi-skal-bygge-i-framtiden-5hes1id13g',
          quote: '1200 kubikk tre og 2800 tonn tegl identifisert via 3D-skanning'
        },
        {
          source: 'Bygg.no',
          url: 'https://www.bygg.no/bergen-bolig-boligbygging/slik-skal-70-prosent-av-tv2s-gamle-hovedkontor-fa-nytt-liv/2745586',
          quote: 'Gulvbord bearbeides til utvendig kledning - males i historiske farger'
        }
      ]
    }
  },
  'NO_ruselokka': {
    sources: [
      {
        name: 'Norsk Byggbransje - Ruseløkka FutureBuilt',
        type: 'article',
        url: 'https://norskbyggebransje.no/ostlandet/ruselokka-skole-oslo'
      },
      {
        name: 'Beer Sten - Ruseløkka Skole',
        type: 'supplier',
        url: 'https://www.beersten.no/prosjekter/ruselokka-skole'
      },
      {
        name: 'Glass & Fasade - Dynamiske glass',
        type: 'article',
        url: 'https://www.glassogfasade.no/dynamiske-glass-i-klimanoytral-skole/'
      }
    ],
    citations: {
      'brick': [
        {
          source: 'Ruseløkka skole nettside',
          url: 'https://ruselokka.osloskolen.no/om-skolen/nye-ruselokka-skole/slik-blir-nye-ruselokka-skole/',
          quote: '4500 resirkulerbare murstein, trebjelker og granittblokker sikret fra gammel skole'
        },
        {
          source: 'Norsk Byggbransje',
          url: 'https://norskbyggebransje.no/ostlandet/ruselokka-skole-oslo',
          quote: 'Granitt fra gammel trapp og grunnmur gjenbrukt i uteområdet'
        }
      ]
    }
  }
};

// Apply updates
data.projects.forEach(project => {
  const update = updates[project.id];
  if (!update) return;

  // Add new sources
  if (update.sources) {
    project.sources = project.sources || [];
    update.sources.forEach(newSource => {
      // Check if source already exists
      const exists = project.sources.some(s => s.url === newSource.url);
      if (!exists) {
        project.sources.push(newSource);
      }
    });
  }

  // Add citations to circular_features
  if (update.citations && project.circular_features) {
    project.circular_features.forEach(feature => {
      const citations = update.citations[feature.material_type];
      if (citations) {
        feature.citations = citations;
      }
      // Also check for 'mixed' category for general citations
      if (!feature.citations && update.citations['mixed']) {
        feature.citations = update.citations['mixed'];
      }
    });
  }
});

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('Additional citations added successfully!');
console.log('');
console.log('Projects updated:');
Object.keys(updates).forEach(id => {
  const update = updates[id];
  const sourceCount = update.sources ? update.sources.length : 0;
  const citationMaterials = update.citations ? Object.keys(update.citations).join(', ') : 'none';
  console.log(`  ${id}: +${sourceCount} sources, citations for: ${citationMaterials}`);
});
