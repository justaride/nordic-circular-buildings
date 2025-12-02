/**
 * Update missing source URLs based on web search results
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects/norway.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Find and update projects with missing URLs
data.projects.forEach(project => {
  switch (project.id) {
    case 'NO_ka13':
      // Update KA13 erfaringsrapport with actual URL
      if (project.sources) {
        const erfaring = project.sources.find(s => s.name && s.name.includes('erfaringsrapport'));
        if (erfaring) {
          erfaring.url = 'https://entra.no/storage/uploads/article-documents/ka13-erfaringsrapport-ombruk-rev1-250120-kl-1211.pdf';
          erfaring.name = 'KA13 Erfaringsrapport Ombruk (116 sider)';
        }
        // Add English version as additional source
        project.sources.push({
          name: 'KA13 Experience Report (English)',
          type: 'report',
          url: 'https://www.entra.no/vare-eiendommer/alle-eiendommer/kristian-augusts-gate-13/_/attachment/inline/31ec37c5-5944-4338-a4db-826336969f42:8fd12a6e4418e59f3ffe7be9916e27b7e0239d8f/20230113_KA13_erfaringsrapport_engelsk.pdf'
        });
        // Add Insenti article
        project.sources.push({
          name: 'Insenti - Erfaringsrapport fra sirkulærprosjektet KA13',
          type: 'article',
          url: 'https://insenti.no/erfaringsrapport-fra-sirkulaerprosjektet-ka13/'
        });
      }
      break;

    case 'NO_eikeli':
      // Update Bærum kommune source
      if (project.sources) {
        const baerum = project.sources.find(s => s.name && s.name.includes('Bærum'));
        if (baerum) {
          baerum.url = 'https://www.baerum.kommune.no/tjenester/klima-og-miljo/klimaklok/futurebuilt/';
          baerum.name = 'Bærum kommune FutureBuilt';
        }
        // Add more sources
        project.sources.push({
          name: 'Byggmesteren - Norges første skole i ombrukstegl',
          type: 'article',
          url: 'https://byggmesteren.as/2021/12/16/norges-forste-skole-i-ombrukstegl/'
        });
        project.sources.push({
          name: 'HØINE - Eikeli VGS',
          type: 'supplier',
          url: 'https://www.hoine.no/eikeli-vgs'
        });
        project.sources.push({
          name: 'Peab - Første store prosjekt med ombrukstegl',
          type: 'press_release',
          url: 'https://peab.no/presserom/nyheter-og-pressemeldinger/forste-store-prosjekt-med-ombrukstegl/'
        });
        project.sources.push({
          name: 'Norconsult - Eikeli videregående skole',
          type: 'consultant',
          url: 'https://norconsult.no/prosjekter/eikeli-videregaaende-skole/'
        });
      }
      break;

    case 'NO_loren':
      // Update Oslo kommune/Oslobygg source
      if (project.sources) {
        const oslobygg = project.sources.find(s => s.name && s.name.includes('Oslobygg'));
        if (oslobygg) {
          oslobygg.url = 'https://www.mynewsdesk.com/no/oslobygg-kf/pressreleases/naa-kommer-loeren-aktivitetspark-og-flerbrukshall-3237097';
          oslobygg.name = 'Oslobygg KF Pressemelding';
        }
        const klimaoslo = project.sources.find(s => s.name && s.name.includes('Klimaoslo'));
        if (klimaoslo) {
          klimaoslo.url = 'https://www.klimaoslo.no/ombruk-av-bygningsmaterialer-gir-klimagevinst/';
          klimaoslo.name = 'KlimaOslo - Ombruk av bygningsmaterialer';
        }
        const nordic = project.sources.find(s => s.name && s.name.includes('Nordic Circles'));
        if (nordic) {
          nordic.url = 'https://www.metalsupply.no/article/view/1101878/ombruk_av_stal_fra_skip_ingen_ler_av_nordic_circles_lenger';
          nordic.name = 'MetalSupply - Nordic Circles metodologi';
        }
        // Add more sources
        project.sources.push({
          name: 'Fremtidens Byggenæring - Unikt pilotprosjekt',
          type: 'article',
          url: 'https://www.fremtidensbygg.no/unikt-pilotprosjekt-for-gjenbruk-pa-loren/'
        });
        project.sources.push({
          name: 'Byggfakta Nyheter - Betydelige CO2-kutt',
          type: 'article',
          url: 'https://byggfaktanyheter.no/bygging-av-ny-flerbrukshall-pa-loren-bidrar-med-betydelige-kutt-i-co2-utslipp/'
        });
        project.sources.push({
          name: 'PIR2 Arkitekter - Løren aktivitetspark',
          type: 'architect',
          url: 'https://pir2.no/prosjekter/loren-aktivitetspark-og-flerbrukshall'
        });
        project.sources.push({
          name: 'Miljødirektoratet Klimasats 2022',
          type: 'government',
          url: 'https://www.miljodirektoratet.no/ansvarsomrader/klima/for-myndigheter/kutte-utslipp-av-klimagasser/klimasats/2022/loren-aktivitetspark-og-flerbrukshall/'
        });
        project.sources.push({
          name: 'Statsbygg - Stål fra skip blir grønne bærebjelker',
          type: 'government',
          url: 'https://www.statsbygg.no/nyheter/stal-fra-skip-blir-gronne-baerebjelker'
        });
        project.sources.push({
          name: 'Stålbygg - Ombruk av skip og offshore konstruksjoner',
          type: 'industry',
          url: 'https://stalbygg.stalforbund.no/baerekraft-2/ombruk-av-offshore-konstruksjoner/'
        });
      }
      break;

    case 'NO_treklang':
      // Update Bærum kommune source
      if (project.sources) {
        const baerum = project.sources.find(s => s.name && s.name.includes('Bærum'));
        if (baerum) {
          baerum.url = 'https://www.baerum.kommune.no/om-barum-kommune/organisasjon/om-eiendom-i-baerum-kommune/prosjekter-eiendom/oksenoya-senter/';
          baerum.name = 'Bærum kommune Eiendom - Oksenøya senter';
        }
        const futurebuilt = project.sources.find(s => s.name && s.name.includes('FutureBuilt'));
        if (futurebuilt) {
          futurebuilt.url = 'https://www.futurebuilt.no/Forbildeprosjekter?conID=258211';
          futurebuilt.name = 'FutureBuilt - Treklang Oksenøyveien';
        }
        // Add more sources
        project.sources.push({
          name: 'Bærum kommune SmartCity - Oksenøya senter',
          type: 'government',
          url: 'https://www.baerum.kommune.no/politikk-og-samfunn/samfunnsutvikling/smartcity/smart-kommune/oksenoya-senter/'
        });
        project.sources.push({
          name: 'Grønn Byggallianse - Oksenøya skole BREEAM',
          type: 'certification',
          url: 'https://byggalliansen.no/kunnskapssenter/kunnskapssenter-prosjekter/breeam-sertifiserte-prosjekter/oksenoya-skole/'
        });
        project.sources.push({
          name: 'Veidekke - Oksenøya Centre',
          type: 'contractor',
          url: 'https://www.veidekke.com/projects/oksenoya-centre/'
        });
      }
      break;

    case 'NO_nostebukten':
      // Update FutureBuilt intensjonsavtale source
      if (project.sources) {
        const futurebuilt = project.sources.find(s => s.name && s.name.includes('intensjonsavtale'));
        if (futurebuilt) {
          futurebuilt.url = 'https://www.bergen.kommune.no/hvaskjer/tema/futurebuilt-i-bergen/forbildeprosjekter-i-bergen/nostebukten-brygge';
          futurebuilt.name = 'Bergen kommune FutureBuilt - Nøstebukten Brygge';
        }
        // Add more sources
        project.sources.push({
          name: 'EnergiAktuelt - 70% gjenbruk når TV2-hovedkvarter blir leiligheter',
          type: 'article',
          url: 'https://www.energiaktuelt.no/maalet-er-70-prosent-gjenbruk-naar-tv2-hovedkvarter-blir-nye-leiligheter.6663351-610318.html'
        });
        project.sources.push({
          name: 'Bygg.no - 96 FutureBuilt-boliger i Bergen',
          type: 'article',
          url: 'https://www.bygg.no/skal-bygge-96-futurebuilt-boliger-i-bergen/1551584!/'
        });
      }
      break;
  }
});

// Update last_updated
data.last_updated = '2025-12-02';

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('Sources updated successfully!');
console.log('');
console.log('Summary of updates:');
console.log('- NO_ka13: Added KA13 erfaringsrapport URL + English version + Insenti');
console.log('- NO_eikeli: Added Bærum kommune + Byggmesteren + HØINE + Peab + Norconsult');
console.log('- NO_loren: Added Oslobygg + KlimaOslo + Nordic Circles + 6 more sources');
console.log('- NO_treklang: Added Bærum kommune + FutureBuilt + SmartCity + Veidekke');
console.log('- NO_nostebukten: Added FutureBuilt Bergen + EnergiAktuelt + Bygg.no');
