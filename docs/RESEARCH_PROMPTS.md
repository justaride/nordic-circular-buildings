# AI Research Prompts - Copy-Paste Ready
> Konkrete prompts for systematisk datainnsamling

---

## Quick Start Prompt

Bruk denne for å starte en forskningssesjon:

```
Du er en forskningsassistent som hjelper meg å samle data om sirkulære byggeprosjekter i Norge.

Jeg jobber med en database over case studies og trenger å fylle data-gap.

For hvert prosjekt jeg spør om, søk etter:
1. Klimagassregnskap/LCA-rapporter (CO2-reduksjon %)
2. Materialinventar med mengder (tonn, m², stk)
3. Kostnadsdata (ombruk vs nytt)
4. Prosjektteam (konsulenter, rådgivere)
5. Erfaringsrapporter eller masteroppgaver

Returner data i dette formatet:
- Verdi: [tall med enhet]
- Kilde: [navn på dokument/nettsted]
- URL: [direkte lenke]
- Sidetall: [hvis PDF]
- Verifisert: [ja/nei/delvis]
```

---

## Prosjektspesifikke Prompts

### KA23 - Kristian Augusts gate 23

```
Søk etter data om Kristian Augusts gate 23 (KA23) i Oslo.

Byggherre: Höegh Eiendom
Arkitekt: Arcasa Arkitekter
Status: Ferdigstilt 2022

Jeg trenger spesifikt:
1. Klimagassregnskap - finnes det en rapport fra Multiconsult eller annen?
2. Materialvekt - hvor mange tonn ombrukte materialer totalt?
3. Kostnadssammenligning - hva kostet ombruk vs nytt?
4. Detaljert materialfordeling med mengder

Søk på:
- "Kristian Augusts gate 23" klimagassrapport
- "KA23" Höegh erfaringsrapport
- site:futurebuilt.no "KA23"
- "KA23" ombruk materialbruk tonn
```

---

### Løren Aktivitetspark

```
Søk etter data om Løren aktivitetspark og flerbrukshall i Oslo.

Byggherre: Oslo kommune / Oslobygg KF
Arkitekt: Pir II
Status: Under bygging, ferdig 2025

Jeg trenger spesifikt:
1. Samlet ombruksandel i prosent
2. Klimasats-sluttrapport fra Miljødirektoratet
3. Tekniske konsulenter (RIB, RIV, RIE, miljørådgiver)
4. Detaljert oversikt over skipsstål-mengder

Søk på:
- "Løren aktivitetspark" klimasats filetype:pdf
- site:miljodirektoratet.no "Løren" ombruk
- "Løren flerbrukshall" sirkulær
- "Pir II" "Løren" prosjektteam rådgiver
```

---

### Nedre Sem Låve

```
Søk etter data om Nedre Sem låve i Asker.

Byggherre: Asker kommune
Arkitekt: Holar Arkitekter
Status: Ferdigstilt 2024

Jeg trenger spesifikt:
1. CO2-reduksjon i prosent vs referanse
2. Materialvekt for ombrukte materialer (tonn)
3. Klimagassregnskap eller miljørapport
4. Detaljer om Stiltre-prosessering av tømmer

Søk på:
- "Nedre Sem" låve klimagassrapport
- "Nedre Sem" Asker ombruk tonn
- site:futurebuilt.no "Nedre Sem"
- "Holar Arkitekter" "Nedre Sem"
- "Stiltre" Nedre Sem tømmer
```

---

### Skur 38

```
Søk etter data om Skur 38 på Sørenga/Bjørvika i Oslo.

Byggherre: Oslo Havn KF
Arkitekt: Hille Melbye Arkitekter
Status: Ferdigstilt 2022

Jeg trenger spesifikt:
1. CO2-reduksjon i prosent
2. Samlet ombruksandel (% av materialer)
3. Materialvekt for bevarte/ombrukte elementer
4. Klimagassregnskap eller miljørapport

Søk på:
- "Skur 38" klimagassrapport Oslo Havn
- "Skur 38" ombruk prosent sirkulær
- site:oslohavn.no "Skur 38"
- "Hille Melbye" "Skur 38" miljø
```

---

### Oksenøya Senter (Treklang)

```
Søk etter data om Oksenøya Senter / Treklang i Bærum.

Byggherre: Bærum kommune
Arkitekt: Arkitektgruppen Lille Frøen + Arkitema
Status: Ferdigstilt 2022-2023

Jeg trenger spesifikt:
1. CO2-reduksjon i prosent (fra klimagassrapportene)
2. Samlet ombruksandel for hele anlegget
3. Donorkilder for ombrukte materialer
4. Detaljer om massivtre-konstruksjon

Søk på:
- "Oksenøya senter" klimagassrapport filetype:pdf
- "Treklang" Bærum ombruk materialer
- site:baerum.kommune.no "Oksenøya"
- "Oksenøya" FutureBuilt sirkulær
```

---

### Prosjekt Føniks

```
Søk etter data om Prosjekt Føniks i Bergen.

Byggherre: Frydenbø Eiendom
Arkitekt: Artec AS
Status: Under bygging, ferdig 2025-2026

Jeg trenger spesifikt:
1. Entreprenør - hvem bygger?
2. Budsjett/investeringssum
3. CO2-reduksjon vs referanse
4. Materialvekt for ombrukte komponenter

Søk på:
- "Prosjekt Føniks" Bergen entreprenør
- "Føniks" Damsgårdsveien budsjett
- "Frydenbø Eiendom" "Føniks" investering
- site:futurebuilt.no "Føniks"
```

---

### KA13 - Kristian Augusts gate 13

```
Søk etter supplerende data om KA13 i Oslo.

Vi har allerede 116-siders erfaringsrapport. Trenger:
1. CO2-intensitet (kg CO2/m²/år) - finnes dette i rapporten?
2. Kostnadssammenligning for stål og hulldekker
3. Tekniske konsulenter utover de dokumenterte
4. Masteroppgaver som analyserer prosjektet

Søk på:
- "KA13" masteroppgave NTNU OsloMet
- "Kristian Augusts gate 13" LCA
- "KA13" kostnad ombruksstål
- site:ntnuopen.ntnu.no "KA13"
```

---

## Generiske Søkeprompts

### For Klimagassdata

```
Søk etter klimagassregnskap for [PROSJEKTNAVN] i [BY].

Prioriter kilder i denne rekkefølgen:
1. Offisielle prosjektrapporter (PDF)
2. FutureBuilt prosjektsider
3. Miljødirektoratet Klimasats
4. Kommunale dokumenter
5. Fagpresseartikler

Returner:
- CO2-reduksjon: X% vs [referanse]
- Metodikk: [One Click LCA / SimaPro / annet]
- Beregningsår: [årstall]
- Kilde: [navn og URL]
```

---

### For Materialdata

```
Finn materialinventar for [PROSJEKTNAVN].

For hvert materiale, dokumenter:
- Type: [stål/betong/tre/etc.]
- Mengde: [tonn/m²/m³/stk]
- Andel av total: [%]
- Donorkilde: [hvor kommer det fra]
- Bearbeiding: [hvordan ble det prosessert]

Prioriter verifiserbare tall fra offisielle rapporter.
```

---

### For Kostnadsdata

```
Søk etter kostnadsdata for ombruk i [PROSJEKTNAVN].

Informasjon jeg trenger:
1. Kostnad ombrukt materiale (NOK/kg eller NOK/m²)
2. Kostnad tilsvarende nytt materiale
3. Merkostnad/besparelse i prosent
4. Hva er inkludert (demontering, transport, testing, etc.)

Kilder å sjekke:
- Erfaringsrapporter
- Masteroppgaver
- Presentasjoner fra prosjektteam
- Intervjuer i fagpresse
```

---

### For Akademiske Kilder

```
Søk etter akademisk litteratur om [PROSJEKTNAVN] eller [TEMAET].

Databaser:
1. NTNU Open (ntnuopen.ntnu.no)
2. OsloMet ODA (oda.oslomet.no)
3. Google Scholar
4. DiVA Portal (nordiske universiteter)

Søkestrenger:
- "[prosjektnavn] masteroppgave"
- "[prosjektnavn] thesis"
- "ombruk byggematerialer Norge"
- "circular construction Norway case"

For hver relevant oppgave, noter:
- Tittel og forfatter
- Institusjon og år
- Relevante kapitler/sidetall
- Nøkkelfunn for vårt prosjekt
```

---

## Validerings-Prompt

Bruk denne etter datainnsamling:

```
Jeg har samlet følgende data for [PROSJEKTNAVN]:

[Lim inn data]

Vennligst:
1. Sjekk om tallene virker rimelige
2. Identifiser motstridende informasjon
3. Vurder kildekvaliteten (primær/sekundær/tertiær)
4. Foreslå flere kilder som kan verifisere dataene
5. Flagg data som trenger ytterligere bekreftelse
```

---

## Output-Format for JSON

Når data er samlet og validert, bruk dette formatet:

```json
{
  "field_updated": "metrics.co2_reduction.value",
  "new_value": 55,
  "unit": "percent",
  "source": {
    "name": "Klimagassrapport KA23",
    "url": "https://example.com/rapport.pdf",
    "page": "23",
    "quote": "Prosjektet oppnådde 55% CO2-reduksjon vs referansebygg",
    "accessed": "2025-12-07"
  },
  "confidence": "high",
  "notes": "Beregnet med One Click LCA etter NS 3720:2018"
}
```

---

## Checkliste per Prosjekt

Etter forskning, verifiser at du har:

- [ ] CO2-reduksjon (%) med kilde
- [ ] Ombruksandel (%) med målemetode
- [ ] Minst 2 materialer med vekt (tonn)
- [ ] Minst 1 kostnadssammenligning
- [ ] Komplett prosjektteam
- [ ] Minst 3 verifiserte kilder
- [ ] Alle data har sitering

---

*Bruk disse promptene systematisk for hvert prosjekt. Start med høyest prioritet (KA23) og jobb nedover listen.*
