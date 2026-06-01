# Pinka × amaterski nogomet — strateški brief

> Zašto su nogometni klubovi (i posebno amaterski) idealna prva vertikala za Pinku, i kako iz toga nastaje pravi B2C fintech na reguliranom SEPA → EURe → Safe railu.

## TL;DR

Amaterski nogomet je emocionalno najjača, financijski najpodzastupljenija zajednica u Hrvatskoj. Postoji **901 klub** kroz svih 8 liga (od HNL-a do 3. ŽNL-a), **100 % geolociranih**, u svih **21 županiji**, plus **452 stadiona** i **7.163 igrališta** — sve već popisano, verificirano i vizualizirano u DOMOVINA projektima (`klubovi.domovina.ai`, `gis.domovina.ai`). Klubovi su pravne osobe (94 % ima OIB iz Registra udruga), imaju recurring novčane tokove (članarine, oprema, putovanja, obnova igrališta), a danas to rješavaju gotovinom, papirnatim uplatnicama i privatnim računima — bez ikakvog modernog, transparentnog alata bez provizija.

Pinka tu nije „još jedan crowdfunding”. Pinka je **platni i fintech sloj** koji svaki klub pretvara u distribucijski čvor: onboardaš klub (B2B), klub dovodi svoje igrače, roditelje, članove i navijače (B2C). Svaki klub = desetci do stotine krajnjih korisnika. 700+ amaterskih klubova → realno desetci tisuća ljudi koji već redovito plaćaju nešto svom klubu.

## Tržišni podaci (izvor: DOMOVINA karta hrvatskog nogometa)

| Entitet | Broj | Napomena |
|---|---:|---|
| Nogometni klubovi | **901** | svih 8 liga, 100 % geolocirano |
| — od toga amaterski (tier 5–8) | **~700** | dugi rep, bez ikakvog fintech alata |
| Stadioni | **452** | OSM `leisure=stadium` |
| Igrališta (tereni) | **7.163** | OSM `leisure=pitch + sport=soccer` |
| Županije pokrivene | **21 / 21** | + Grad Zagreb |
| JLS / naselja na karti | 556 / 6.759 | šira DOMOVINA GIS baza |

Bogatstvo kontakata (spremno za onboarding/outreach):

| Polje | Pokrivenost |
|---|---:|
| Geolokacija (lat/lng) | 901 (100 %) |
| OIB (Registar udruga) | 847 (94 %) |
| Adresa | 894 (99 %) |
| E-mail | 617 (68 %) |
| Telefon | 508 (56 %) |
| Web | 393 (44 %) |
| Puni kontakt (e-mail+tel+adresa+web) | **222 (25 %)** ← idealni piloti |

Izvori agregacije: **SofaScore, HNS Semafor, HR-nogomet, Registar udruga RH, OpenStreetMap**. Verificirano AI subagentima (overall 93/100), idempotentno regenerabilno iz javnih izvora.

## Zašto baš nogometni klubovi (i amaterski)

1. **Emocija = konverzija.** Crowdfunding živi od pripadnosti. Nijedna druga lokalna zajednica nema toliku, generacijsku, mjesnu lojalnost kao klub. „Za moj klub” pali tamo gdje „za platformu” ne pali.
2. **Recurring novčani tokovi već postoje.** Klub ne treba uvjeravati da skuplja novac — već skuplja, samo loše: gotovinom, uplatnicama, privatnim IBAN-om predsjednika. Pinka samo digitalizira postojeći tok bez provizije.
3. **Ogroman, podzastupljen long-tail.** Vrh (HNL) ima alate i sponzore. ~700 amaterskih klubova nema ništa — to je bijela površina bez konkurencije.
4. **Pravne osobe s OIB-om.** 94 % klubova ima OIB i zapis u Registru udruga → čist KYC/legal anchor: Safe se veže na provjerenu pravnu osobu, a ne na pojedinca.
5. **Spremna GTM baza.** Ne krećemo od nule: 901 klub s lokacijom, kontaktom i identifikatorima već postoji; 222 kluba imaju puni kontakt za odmah-pilot.
6. **B2B2C flywheel.** Onboarding kluba je B2B (jedan ugovor, jedan Safe), ali isporuka je B2C (svaki član skenira i plati). Klub je besplatni distribucijski kanal do svojih ljudi.

## Pinka proizvodi za klub (mapirani na postojeće tipove kampanja)

| Potreba kluba | Pinka tip | Kako izgleda |
|---|---|---|
| **Članarine** (igrači, mladež, članovi) | crowdfunding / recurring | roditelj skenira QR jednom mjesečno; klub vidi tko je platio |
| **Oprema i putovanja** mladih ekipa | crowdfunding (cilj) | „dresovi za pionire”, „put na turnir” s ciljanim iznosom |
| **Obnova igrališta / svlačionice / reflektora** | crowdfunding (cilj) | velika emotivna kampanja cijelog mjesta, transparentno on-chain |
| **Ulaznice za derbi / event** | ulaznice (inventar) | svaka kupnja troši komad iz zalihe |
| **Donacije** zajednice i iseljenika | donacija | jednokratno ili trajno, bez protučinidbe; idealno za dijasporu |
| **Navijački / članski status** | soft tokenizacija | on-chain potvrda članstva/podrške (badge), NIJE vrijednosni papir |
| **Udruženo lokalno sponzorstvo** | crowdfunding / donacija | više malih sponzora u zajednički Safe, transparentna namjena |

Sve ide na **Safe multisig** kluba (npr. predsjednik + blagajnik), **0 % obavezne provizije**, **SEPA Instant** ulaz, **EURe** namira na Gnosisu, javno provjerljivo — što članovima daje povjerenje koje gotovina i privatni IBAN nikad ne daju.

## Go-to-market (faze)

1. **Pilot (Q3 2026):** 5 odabranih amaterskih klubova iz baze (target: onih 222 s punim kontaktom), ručni onboarding, jedna live kampanja po klubu (npr. oprema ili obnova).
2. **Regionalno širenje:** krećemo od najgušćih županija (Osječko-baranjska 90, Brodsko-posavska 57, Međimurska 55) — efekt susjedstva i lokalnog medija.
3. **Self-serve:** klub se sam prijavi preko karte (`/klub/:slug` već postoji kao deep-link), poveže Safe, pokrene kampanju.
4. **Mreža članova → B2C:** svaki onboardani klub donosi svoje članove; ti isti ljudi dalje koriste Pinku i izvan kluba.

## Šira infrastruktura (nogomet je samo početak)

Isti rail (SEPA → EURe → Safe, 0 % provizije, on-chain transparentnost) radi za **svaku zajednicu koja skuplja novac**: ostali sportski klubovi, vatrogasna društva, kulturne udruge, škole i roditeljska vijeća, vjerske zajednice, lokalne inicijative, dijaspora. Nogomet je emocionalni „beachhead” koji dokazuje model; DOMOVINA GIS baza (556 JLS, 6.759 naselja) je karta za širenje na sve njih.

## Veza s DOMOVINA podacima

- **`klubovi.domovina.ai`** — SQLite katalog 901 kluba (kontakt, OIB, lige, stadion); izravan izvor za onboarding listu i KYC anchor.
- **`gis.domovina.ai`** — interaktivna karta (MapLibre, Cloudflare Pages) s klubovima/stadionima/igralištima i deep-linkovima `/klub/:slug` — savršena ulazna točka „nađi svoj klub → podrži/pokreni”.
- Obje baze su naše, verificirane i regenerabilne — to je trajna konkurentska prednost (proprietarni, čisti podaci o cijeloj hrvatskoj nogometnoj infrastrukturi).

---

*Brief sastavljen iz istraživanja repozitorija `klubovi.domovina.ai` i `karta-hrvatske/apps/karta-web` (DOMOVINA), 2026-06-02.*
