# Case Study Data Collection Strategy
> Operasjonell plan for systematisk datainnsamling via desktop research og AI

**Opprettet:** 2025-12-07
**Mål:** Oppgradere alle 7 case studies til minimum Grade B (score 65+)

---

## 1. Gap-analyse Oppsummering

### Kritiske gap (alle prosjekter mangler)
| Gap | Prioritet | Kilde-strategi |
|-----|-----------|----------------|
| CO2-intensitet (kg CO2/m²/år) | Høy | Klimagassrapporter, LCA-dokumenter |
| Kostnadssammenligning | Høy | Prosjektrapporter, intervjuer, presentasjoner |
| Detaljert kostnadsfordeling | Medium | Erfaringsrapporter, studentoppgaver |

### Høyfrekvente gap (5/7 prosjekter)
| Gap | Prosjekter som mangler |
|-----|------------------------|
| Tekniske konsulenter | føniks, ka13, løren, nedre_sem, skur38 |
| Klimagassregnskap/rapport | føniks, ka23, løren, nedre_sem, skur38 |

### Medium gap (3-4/7 prosjekter)
| Gap | Prosjekter |
|-----|------------|
| CO2-reduksjon % | føniks, nedre_sem, treklang, skur38 |
| Materialvekt (kg/tonn) | nedre_sem, treklang, skur38 |
| Ombruksandel % | løren, treklang, skur38 |

---

## 2. Prosjektprioriteringsmatrise

| Prosjekt | Nåværende Score | Mål | Gap til mål | ROI* | Prioritet |
|----------|-----------------|-----|-------------|------|-----------|
| KA23 | 68 | 75 | 7 | Høy | 1 |
| Løren | 61 | 65 | 4 | Høy | 2 |
| Nedre Sem | 59 | 65 | 6 | Medium | 3 |
| Skur 38 | 58 | 65 | 7 | Medium | 4 |
| Treklang | 59 | 65 | 6 | Medium | 5 |
| Føniks | 50 | 55 | 5 | Lav | 6 |
| KA13 | 75 | 80 | 5 | Lav | 7 |

*ROI = Return on Investment (hvor mye poeng per forskningsinnsats)

---

## 3. Kildehierarki

### Tier 1: Primærkilder (høyest verdi)
1. **Erfaringsrapporter** (PDF) - FutureBuilt, prosjekteiere
2. **Klimagassregnskap** - NS 3720-rapporter
3. **Sirkularitetsrapporter** - Prosjektspesifikke
4. **Masteroppgaver/Bachelor** - NTNU, OsloMet, AHO

### Tier 2: Sekundærkilder
1. **FutureBuilt prosjektsider** - futurebuilt.no
2. **Miljødirektoratet Klimasats** - miljodirektoratet.no
3. **Statsbygg dokumenter** - statsbygg.no
4. **Arkitektkontor porteføljer** - prosjektbeskrivelser

### Tier 3: Tertiærkilder
1. **Fagpresse** - Byggfakta, Bygg.no, TU.no
2. **Foredrag/presentasjoner** - YouTube, Vimeo, SlideShare
3. **LinkedIn-poster** - prosjektledere, arkitekter
4. **Podkaster** - Byggcast, Fremtidens Bygg

---

## 4. AI Research Prompts

### 4.1 Søk etter Klimagassrapporter

```
PROMPT: Klimagassrapport-søk

Søk etter klimagassregnskap eller LCA-rapport for [PROSJEKTNAVN] i [BY].

Spesifikke søkestrenger:
- "[prosjektnavn] klimagassregnskap PDF"
- "[prosjektnavn] klimagassrapport NS 3720"
- "[prosjektnavn] LCA livsløpsanalyse"
- "[prosjektnavn] miljørapport CO2"
- "site:futurebuilt.no [prosjektnavn]"
- "site:miljodirektoratet.no klimasats [prosjektnavn]"

Returner:
1. Direkte lenke til PDF hvis funnet
2. CO2-reduksjon i % vs referanse
3. kg CO2/m²/år hvis oppgitt
4. Beregningsmetodikk (One Click LCA, SimaPro, etc.)
5. Rapport-forfatter og dato
```

### 4.2 Søk etter Kostnadsdata

```
PROMPT: Kostnadsdata-søk

Finn kostnadsdata for ombruksmaterialer i [PROSJEKTNAVN].

Søk etter:
- "[prosjektnavn] kostnad ombruk"
- "[prosjektnavn] pris gjenbruk vs nytt"
- "[prosjektnavn] økonomi sirkulær"
- "[prosjektnavn] budsjett materialer"
- "[prosjektnavn] masteroppgave økonomi"
- "site:diva-portal.org [prosjektnavn]" (nordiske masteroppgaver)

Data å hente:
1. Kostnad per kg/m² for ombrukte materialer
2. Sammenligning med nypris
3. Merkostnader/besparelser
4. Arbeids- og logistikkostnader
5. Testing- og sertifiseringskostnader
```

### 4.3 Søk etter Materialdata

```
PROMPT: Materialinventar-søk

Finn detaljert materialinventar for [PROSJEKTNAVN].

Søkestrenger:
- "[prosjektnavn] materialbruk tonn"
- "[prosjektnavn] ombruk stål betong"
- "[prosjektnavn] sirkulær materialbruk"
- "[prosjektnavn] gjenbrukte materialer mengde"
- "[arkitekt] [prosjektnavn] materialer"

Data å dokumentere:
1. Materialtype (stål, betong, tre, etc.)
2. Mengde (tonn, m², m³, stk)
3. Prosentandel av total
4. Donorkilde (hvor kommer det fra)
5. Bearbeidingsmetode
```

### 4.4 Søk etter Stakeholder-info

```
PROMPT: Prosjektteam-søk

Finn prosjektteamet for [PROSJEKTNAVN].

Søkestrenger:
- "[prosjektnavn] prosjekterende"
- "[prosjektnavn] RIB RIV RIE"
- "[prosjektnavn] rådgivende ingeniør"
- "[prosjektnavn] miljørådgiver"
- "[byggherre] [prosjektnavn] team"

Roller å finne:
1. RIB (Rådgivende ingeniør bygg)
2. RIV (VVS)
3. RIE (Elektro)
4. Miljørådgiver
5. Ombruksrådgiver
6. BREEAM-rådgiver
```

### 4.5 Akademisk søk

```
PROMPT: Akademisk litteratur-søk

Finn masteroppgaver og forskningsartikler om [PROSJEKTNAVN].

Databaser å søke:
1. NTNU Open - ntnuopen.ntnu.no
2. OsloMet ODA - oda.oslomet.no
3. BORA UiB - bora.uib.no
4. DiVA Portal - diva-portal.org
5. Google Scholar - scholar.google.com

Søkestrenger:
- "[prosjektnavn] masteroppgave"
- "[prosjektnavn] thesis circular"
- "ombruk [materialtype] Norge masteroppgave"
- "reuse [building type] Norway thesis"

Verdifull info fra akademiske kilder:
- Detaljerte kostnadsanalyser
- Prosessbeskrivelser
- Intervjuer med prosjektdeltakere
- LCA-beregninger
- Barriere- og suksessfaktoranalyser
```

---

## 5. Prosjektspesifikke Forskningsplaner

### 5.1 KA23 (Prioritet 1)
**Mål:** 68 → 75 (+7 poeng)

| Data som trengs | Kildestrategi | Estimert innsats |
|-----------------|---------------|------------------|
| Materialvekt (kg/tonn) | Höegh Eiendom erfaringsrapport | 30 min |
| Klimagassregnskap | FutureBuilt / Multiconsult | 45 min |
| Kostnadsdata | Erfaringsrapport, artikler | 60 min |

**Konkrete søk:**
```
1. "Kristian Augusts gate 23" klimagassrapport filetype:pdf
2. "KA23" "Höegh Eiendom" erfaringsrapport
3. site:futurebuilt.no "Kristian Augusts gate 23"
4. "KA23" ombruk kostnad materialbruk
```

---

### 5.2 Løren (Prioritet 2)
**Mål:** 61 → 65 (+4 poeng)

| Data som trengs | Kildestrategi | Estimert innsats |
|-----------------|---------------|------------------|
| Ombruksandel % | Klimasats-rapport, Oslo kommune | 30 min |
| Klimagassregnskap | Miljødirektoratet | 45 min |
| Tekniske konsulenter | Pir II, Oslobygg | 20 min |

**Konkrete søk:**
```
1. "Løren aktivitetspark" klimasats sluttrapport filetype:pdf
2. site:miljodirektoratet.no "Løren" ombruk
3. "Løren flerbrukshall" sirkulær materialbruk
4. "Pir II" "Løren" prosjektteam
```

---

### 5.3 Nedre Sem (Prioritet 3)
**Mål:** 59 → 65 (+6 poeng)

| Data som trengs | Kildestrategi | Estimert innsats |
|-----------------|---------------|------------------|
| CO2-reduksjon % | FutureBuilt, Asker kommune | 45 min |
| Materialvekt | Holar Arkitekter, Stiltre | 30 min |
| Klimagassregnskap | Multiconsult/Asplan Viak | 45 min |

**Konkrete søk:**
```
1. "Nedre Sem" låve klimagassrapport
2. "Nedre Sem" Asker sirkulær ombruk tonn
3. site:futurebuilt.no "Nedre Sem"
4. "Holar Arkitekter" "Nedre Sem" materialer
```

---

### 5.4 Skur 38 (Prioritet 4)
**Mål:** 58 → 65 (+7 poeng)

| Data som trengs | Kildestrategi | Estimert innsats |
|-----------------|---------------|------------------|
| CO2-reduksjon % | Oslo Havn, FutureBuilt | 45 min |
| Ombruksandel % | Hille Melbye, Oslo Havn | 30 min |
| Materialvekt | Erfaringsrapport | 45 min |

**Konkrete søk:**
```
1. "Skur 38" Oslo Havn klimagassrapport
2. "Skur 38" ombruk prosent sirkulær
3. site:oslohavn.no "Skur 38"
4. "Hille Melbye" "Skur 38" prosjekt
```

---

### 5.5 Treklang/Oksenøya (Prioritet 5)
**Mål:** 59 → 65 (+6 poeng)

| Data som trengs | Kildestrategi | Estimert innsats |
|-----------------|---------------|------------------|
| CO2-reduksjon % | Klimagassrapporter (finnes!) | 30 min |
| Ombruksandel % | Bærum kommune, FutureBuilt | 45 min |
| Donorkilder | Veidekke, arkitekter | 30 min |

**Konkrete søk:**
```
1. "Oksenøya senter" klimagassrapport filetype:pdf
2. "Treklang" Bærum ombruk sirkulær
3. site:baerum.kommune.no "Oksenøya"
4. "Arkitektgruppen Lille Frøen" Oksenøya materialer
```

---

### 5.6 Føniks (Prioritet 6)
**Mål:** 50 → 55 (+5 poeng)

| Data som trengs | Kildestrategi | Estimert innsats |
|-----------------|---------------|------------------|
| Entreprenør | Frydenbø Eiendom, FutureBuilt | 15 min |
| Budsjett | Pressemeldinger, artikler | 30 min |
| CO2-reduksjon % | Artec AS, FutureBuilt | 45 min |

**Konkrete søk:**
```
1. "Prosjekt Føniks" Bergen entreprenør
2. "Føniks" Damsgårdsveien budsjett investering
3. site:futurebuilt.no "Føniks"
4. "Artec" "Føniks" Bergen sirkulær
```

---

## 6. Arbeidsflyt for Datainnsamling

### Steg 1: Primærkilde-søk (per prosjekt)
```
1. Åpne WebSearch med prosjektspesifikke søkestrenger
2. Prioriter PDF-dokumenter fra offisielle kilder
3. Last ned og lagre relevante dokumenter
4. Logg kilde i sources-array med URL og dato
```

### Steg 2: Datautvinning fra PDF
```
1. Les PDF med Read-verktøy
2. Søk etter nøkkelord: "CO2", "klimagass", "ombruk", "tonn", "prosent"
3. Ekstraher tabeller med materialdata
4. Noter sidetall for siteringer
```

### Steg 3: Datavalidering
```
1. Kryssjekk tall mot andre kilder
2. Verifiser beregningsmetodikk
3. Sjekk datering (nyeste data prioriteres)
4. Flagg usikre verdier med "~" eller "ca."
```

### Steg 4: JSON-oppdatering
```
1. Oppdater relevante felt i case-study JSON
2. Legg til siteringer med page_url
3. Oppdater data_completeness.score
4. Kjør validate-schema.js for å verifisere
```

---

## 7. Kvalitetskriterier

### Akseptabel datakvalitet
| Felt | Minimum krav |
|------|--------------|
| CO2-reduksjon | % med kilde og baseline |
| Materialvekt | Tonn med +/- 10% nøyaktighet |
| Ombruksandel | % med målemetode (vekt/volum/kostnad) |
| Kostnader | NOK med årstall og omfang |

### Siteringskrav
- Alle kvantitative data må ha kilde
- Sidetall for PDF-kilder
- URL med aksessdato
- Forfatter/organisasjon

---

## 8. Tidsestimat

| Prosjekt | Estimert tid | Forventet score-økning |
|----------|--------------|------------------------|
| KA23 | 2-3 timer | +5-7 poeng |
| Løren | 1.5-2 timer | +3-4 poeng |
| Nedre Sem | 2-3 timer | +4-6 poeng |
| Skur 38 | 2-3 timer | +5-7 poeng |
| Treklang | 2-3 timer | +4-6 poeng |
| Føniks | 1.5-2 timer | +3-5 poeng |
| KA13 | 1-2 timer | +3-5 poeng |

**Total estimert innsats:** 12-18 timer

---

## 9. Suksesskriterier

### Fase 1 mål (etter første iterasjon)
- [ ] Alle prosjekter har klimagassregnskap-referanse
- [ ] Minst 5/7 prosjekter har CO2-reduksjon %
- [ ] Minst 4/7 prosjekter har materialvekt-data
- [ ] Gjennomsnittlig score økt fra 61 til 65+

### Fase 2 mål (stretch)
- [ ] Alle prosjekter har kostnadsdata
- [ ] Alle prosjekter har komplett stakeholder-liste
- [ ] Minst 3 prosjekter på Grade A (80+)

---

## 10. Verktøy og Ressurser

### AI-verktøy
- **Claude Code**: PDF-lesing, websøk, dataekstraksjon
- **WebSearch**: Bredt søk etter kilder
- **WebFetch**: Hente spesifikke sider

### Søkemotorer
- Google Scholar (akademisk)
- Google med site:-operator
- Bing (for norske kilder)

### Nøkkelnettsteder
- futurebuilt.no
- miljodirektoratet.no/klimasats
- statsbygg.no
- standard.no
- diva-portal.org
- ntnuopen.ntnu.no

---

*Dokumentet oppdateres fortløpende med resultater og justeringer*
