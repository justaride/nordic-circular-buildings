/**
 * Add citations to circular_features with specific source URLs
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects/norway.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Citation updates per project
const citationUpdates = {
  'NO_ka13': {
    // Concrete slabs from R4
    'concrete': [
      {
        source: 'Anskaffelser.no - Ombruk hos Statsbygg og Entra',
        url: 'https://anskaffelser.no/verktoy/eksempler/ombruk-av-byggematerialer-hos-statsbygg-og-entra',
        quote: '168 tonn betong i form av store betongelementer (hulldekker) ble flyttet fra Regjeringskvartalet til Tullinløkka'
      },
      {
        source: 'NRK - Gjenbruk fra regjeringskvartalet',
        url: 'https://www.nrk.no/norge/her-gjenbrukes-deler-av-regjeringskvartalet-_-men-dagens-regler-gjor-det-vanskelig-1.15104239',
        quote: 'Hulldekkeelementene ble skjært løs og heist ut fra R4 i november 2019'
      },
      {
        source: 'Heidelberg Materials Prefab - Ombruk av hulldekker',
        url: 'https://www.prefab.heidelbergmaterials.no/no/gjenbruk_hulldekker',
        quote: '21 hulldekker fra Regjeringskvartalet installert i plan 5 til 8'
      }
    ],
    // Glass from Kværnerbyen
    'glass': [
      {
        source: 'KA13 Erfaringsrapport (Entra)',
        url: 'https://entra.no/storage/uploads/article-documents/ka13-erfaringsrapport-ombruk-rev1-250120-kl-1211.pdf',
        quote: 'Vinduer fra feilbestilling i Kværnerbyen sparte 90% produksjonsutslipp'
      }
    ]
  },
  'NO_grensen9b': {
    'steel': [
      {
        source: 'Bygg.no - T-baneskinner til bærende konstruksjoner',
        url: 'https://anlegg.bygg.no/bygg-gjenbruk-miljo/bruker-t-baneskinner-til-baerende-konstruksjoner/237776',
        quote: 'Gamle t-baneskinner fra Sporveien brukes som bærende konstruksjon i trappene'
      },
      {
        source: 'MAD Arkitekter - Grensen 9B',
        url: 'https://mad.no/prosjekter/grensen-9b/',
        quote: 'Skinnekonstruksjonen alene har gitt en miljøbesparelse på 1,2 tonn CO₂'
      },
      {
        source: 'Grønn Byggallianse - Månedens prosjekt',
        url: 'https://www.mynewsdesk.com/no/byggalliansen/news/maanedens-prosjekt-grensen-9b-oslo-500531',
        quote: '97.3% av eksisterende bygningsmasse over terreng er gjenbrukt (etter vekt)'
      }
    ]
  },
  'NO_foniks': {
    'concrete': [
      {
        source: 'Bergen Kommune FutureBuilt - Betonggulv blir heis',
        url: 'https://www.bergen.kommune.no/hvaskjer/tema/futurebuilt-i-bergen/hva-skjer/betonggulv-blir-ny-heis-i-forbildeprosjektet-foniks',
        quote: 'Betong skjæres ut fra gulvet og blir ny heissjakt med T-formet struktur'
      },
      {
        source: 'DNB Nyheter - Føniks verdensrekord',
        url: 'https://www.dnb.no/dnbnyheter/no/samfunn/frydenbo-foniks',
        quote: '100% ombruk ambisjon - heis fra Hellas, toalett fra Tinghuset'
      },
      {
        source: 'Loopfront Blog - Frydenbø',
        url: 'https://blog.loopfront.com/no/blog/frydenb%C3%B8',
        quote: '2600 bygningselementer registrert i ombruksdatabasen Loopfront'
      }
    ]
  },
  'NO_loren': {
    'steel': [
      {
        source: 'Nordic Circles - Løren prosjekt',
        url: 'https://www.nordiccircles.com/projects-lren-aktivitetspark-og-flerbrukshall',
        quote: 'Verdens første byggeprosjekt med oppsirkulert skipsstål som bærende konstruksjon'
      },
      {
        source: 'KlimaOslo - Stål fra skip i nytt bygg',
        url: 'https://www.klimaoslo.no/ombruk-av-bygningsmaterialer-gir-klimagevinst/',
        quote: '90% klimagassbesparelse sammenlignet med nytt stål'
      },
      {
        source: 'Estate Nyheter - Curlew FPSO',
        url: 'https://www.estatenyheter.no/dette-skipsvraket-blir-en-viktig-ingrediens-i-den-nye-flerbrukshallen-i-oslo/416324',
        quote: 'Curlew FPSO opererte i Nordsjøen i 20 år før pensjonering'
      },
      {
        source: 'Byggfakta Nyheter - Nordic Circles',
        url: 'https://byggfaktanyheter.no/nordic-circles-gir-skipsstal-nytt-liv/',
        quote: '97% lavere klimafotavtrykk enn vanlig stål'
      }
    ]
  },
  'NO_eikeli': {
    'brick': [
      {
        source: 'Byggmesteren - Norges første skole i ombrukstegl',
        url: 'https://byggmesteren.as/2021/12/16/norges-forste-skole-i-ombrukstegl/',
        quote: '650 kvm CE-merket ombrukstegl - Norges første større bygg'
      },
      {
        source: 'HØINE - Eikeli VGS',
        url: 'https://www.hoine.no/eikeli-vgs',
        quote: 'Dansk ombrukstegl levert til fasade på nytt tilbygg'
      },
      {
        source: 'Peab - Ombrukstegl',
        url: 'https://peab.no/presserom/nyheter-og-pressemeldinger/forste-store-prosjekt-med-ombrukstegl/',
        quote: 'Spart 106 tonn avfall og 26,5 tonn CO2'
      }
    ]
  },
  'NO_nedre_sem': {
    'stone': [
      {
        source: 'Husbanken - Nedre Sem',
        url: 'https://www.husbanken.no/byggeskikk/prosjekter/nedre-sem-laave/',
        quote: '1887 steinfjøs transformert til forsamlingshus'
      },
      {
        source: 'Arkitektur.no - Nedre Sem',
        url: 'https://www.arkitektur.no/prosjekter/naering/nedre-sem-laave/',
        quote: '50% sirkulære materialer - stein, tegl, treverk'
      }
    ]
  }
};

// Update citations in circular_features
data.projects.forEach(project => {
  const updates = citationUpdates[project.id];
  if (!updates || !project.circular_features) return;

  project.circular_features.forEach(feature => {
    const materialCitations = updates[feature.material_type];
    if (materialCitations) {
      feature.citations = materialCitations;
    }
  });
});

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('Citations added successfully!');
console.log('');
console.log('Projects updated:');
Object.keys(citationUpdates).forEach(id => {
  const materials = Object.keys(citationUpdates[id]);
  console.log(`  ${id}: ${materials.join(', ')}`);
});
