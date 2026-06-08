// Translation catalogue for the pinka.finance landing page. Croatian (hr) is the
// source of truth and the default; English (en) is typed against it (`Messages`)
// so every key must exist in both. Leaf values are plain strings with optional
// {var} interpolation and **bold** / `code` markup rendered via <Rich/>. See
// lib/i18n/index.tsx for the runtime. Locale is chosen via ?lang= + localStorage.

export type Plural = { one: string; few?: string; many?: string; other: string };

export type Locale = "hr" | "en";

const hr = {
  seo: {
    title: "pinka — prikupljaj sredstva jednim skenom",
    description:
      "Pinka je onchain platforma za grupno financiranje. SEPA Instant + Monerium EURe — podržavatelji uplate skenom, a kreatori, udruge i timovi primaju sredstva izravno, bez kartičnih provizija.",
    ogImageAlt: "pinka — prikupljaj sredstva jednim skenom",
  },

  nav: {
    cta: "Pridruži se listi čekanja",
    ctaShort: "Lista čekanja",
    ariaLabel: "Glavna navigacija",
    homeAria: "pinka — početna",
    skipToContent: "Preskoči na sadržaj",
    viewApp: "Pogledaj pinka.io",
  },

  hero: {
    badge: "Pre-launch · Pilot Q3 2026",
    titleA: "Prikupljaj sredstva",
    titleHighlight: "jednim skenom.",
    titleB: "Bez naknada. U sekundi.",
    subtitle:
      "Pinka je onchain platforma za grupno financiranje. Spaja SEPA Instant i Monerium EURe pa podržavatelji uplate skenom, a kreatori, udruge i timovi primaju sredstva izravno — bez kartičnih provizija, bez čekanja, bez kompromisa.",
    cta: "Pridruži se listi čekanja",
    how: "Kako radi",
    statFee: "Provizija",
    statSpeed: "Brzina",
    statCoverage: "Pokrivenost",
  },

  mockup: {
    campaignTitle: "Obnova igrališta",
    campaignMeta: "Crowdfunding · 3.240 € od 5.000 €",
    support: "Podrži kampanju",
    scanInBank: "Skeniraj u svojoj banci.",
    recipientLine: "SEPA Instant · primatelj: Obnova igrališta",
    inYourBank: "U tvojoj banci",
    amount: "20,00 €",
    reference: "Obnova igrališta · referenca PK-2048",
    sent: "20,00 € poslano",
    arrived: "Stiglo u sekundi.",
    viewOnchain: "Vidi on-chain",
  },

  problem: {
    eyebrow: "Problem",
    heading: "Prikupljanje sredstava ne bi trebalo biti komplicirano.",
    intro:
      "Današnja infrastruktura kažnjava male kreatore, udruge i timove. Što manje primaš, to te provizija više boli.",
    cards: {
      fees: {
        title: "Kartični procesori uzimaju 2–5 %",
        body: "od svake uplate. Mali organizatori najviše gube — od 100 € prikupljenih, 5 € odlazi prije nego što išta vide.",
      },
      transfers: {
        title: "Bankovni prijenosi traju danima.",
        body: "Organizator ne zna kada će novac stići, a podržavatelj ne zna je li uopće pristigao. Povratna veza je razbijena.",
      },
      platforms: {
        title: "Postojeće platforme uzimaju 5–15 %.",
        body: "Patreon, GoFundMe, Kickstarter — svaka ima svoju proviziju, svaka traži svoj račun, svaka ima svoja pravila.",
      },
    },
    closerPre: "Zato gradimo ",
    closerBrand: "pinku",
    closerPost: ".",
  },

  how: {
    eyebrow: "Kako radi",
    heading: "Jednostavno za sve.",
    intro:
      "Iste tračnice, dvije strane: podržavatelj vidi QR i potvrdu, organizator vidi sredstva na računu — bez posrednika koji uzima dio na putu.",
    tabSupporter: "Za podržavatelje",
    tabCreator: "Za organizatore",
    supporterTitle: "Za podržavatelje",
    supporterSubtitle: "Tri koraka. Bez otvaranja računa.",
    creatorTitle: "Za kreatore, udruge i timove",
    creatorSubtitle: "Četiri koraka. Bez tehničke gimnastike.",
    supporter: {
      scan: {
        title: "Skeniraj QR kôd",
        body: "na stranici kampanje ili tamo gdje je organizator podijeli — telefonom, kao bilo koju drugu uplatu.",
      },
      confirm: {
        title: "Potvrdi u svojoj banci ili Revolutu",
        body: "iznos sam biraš. Bez otvaranja računa, bez kartice, bez novih aplikacija.",
      },
      settled: {
        title: "Uplata stigne u sekundi",
        body: "kampanji koju si odabrao. Ti dobiješ potvrdu, organizator dobije sredstva.",
      },
    },
    creator: {
      launch: {
        title: "Pokreni kampanju",
        body: "odaberi tip — donacija, crowdfunding, ulaznice, soft tokenizacija ili nekretnina — i postavi cilj.",
      },
      share: {
        title: "Pinka generira QR i poveznicu",
        body: "dijeli ih kako ti odgovara — na webu, u objavama, na društvenim mrežama ili uživo.",
      },
      onchain: {
        title: "Sredstva se prikupljaju on-chain",
        body: "javno, transparentno, u stvarnom vremenu. Ti i tvoja zajednica vidite isto stanje u istom trenu.",
      },
      withdraw: {
        title: "Podigni kad budeš spreman",
        body: "sredstvima upravlja tvoj Safe novčanik; isplata u SEPA u par klikova. Bez minimuma, bez obaveza.",
      },
    },
  },

  football: {
    eyebrow: "Primjer · nogomet",
    heading: "Krećemo tamo gdje je emocija najveća.",
    intro:
      "Amaterski nogomet je najjača lokalna zajednica u Hrvatskoj — i ona koja novac danas skuplja najteže: gotovinom, uplatnicama i privatnim računima. Klubovi već prikupljaju; Pinka to samo digitalizira, transparentno i bez provizija.",
    statClub: "klub",
    statStadium: "stadiona",
    statPitch: "igrališta",
    statCounty: "županija",
    mapNote:
      "Cijela hrvatska nogometna mreža, popisana i geolocirana iz HNS-a, SofaScorea, HR-nogometa i Registra udruga.",
    mapLink: "Vidi sve na karti",
    useCases: {
      memberships: {
        title: "Članarine",
        body: "Igrači, mladež i članovi plaćaju skenom — roditelj jednim QR-om, klub odmah vidi tko je uplatio.",
      },
      equipment: {
        title: "Oprema i putovanja",
        body: "Dresovi za pionire, put na turnir, lopte za sezonu — kampanja s ciljanim iznosom.",
      },
      renovation: {
        title: "Obnova igrališta",
        body: "Svlačionica, reflektori, tribina. Velika emotivna akcija cijelog mjesta, transparentno on-chain.",
      },
      tickets: {
        title: "Ulaznice",
        body: "Derbi ili event — prodaja ulaznica gdje svaka kupnja troši komad iz zalihe.",
      },
      donations: {
        title: "Donacije i dijaspora",
        body: "Jednokratno ili trajno, bez protučinidbe. Idealno za podršku iseljenika svom rodnom klubu.",
      },
      status: {
        title: "Navijački status",
        body: "On-chain potvrda članstva i podrške (badge). Pripadnost, ne vrijednosni papir — bez dividendi.",
      },
    },
    ctaLead: "Nogomet je tek jedan primjer.",
    ctaBody:
      " Isti rail radi za svaku zajednicu koja skuplja novac — sportske klubove, vatrogasce, kulturne udruge, škole, vjerske i lokalne inicijative, kreatore i dijasporu.",
    ctaButton: "Prijavi svoj klub",
  },

  podcast: {
    eyebrow: "Primjer · podcast",
    heading: "Mikropodrška koja zapravo dođe do kreatora.",
    intro:
      "Stripe i Patreon naplaćuju fiksni trošak po transakciji — pa mikronapojnice gube smisao: od donacije od 2 € nestane gotovo petina prije nego išta vidiš. Pinka koristi SEPA sken bez kartičnih provizija, pa i napojnica od 1 € po epizodi ostaje 1 €.",
    statFixedVal: "0,30 €",
    statFixed: "fiksna naknada po kartičnoj uplati",
    statLostVal: "~18 %",
    statLost: "nestane od napojnice od 2 €",
    statPatreonVal: "5–12 %",
    statPatreon: "Patreon provizija + obrada",
    statPinkaVal: "0 %",
    statPinka: "pinka — jedan SEPA sken",
    feeNote:
      "Procjena za karticu: 2,9 % + 0,30 € po transakciji. Što je iznos manji, to fiksni trošak boli više — zato su mikronapojnice na karticama gotovo besmislene.",
    feeLink: "Vidi punu usporedbu",
    nativeBadge: "Native integracija",
    nativeTitle: "Podrška izravno u playeru na domovina.ai",
    nativeBody:
      "Podcasti na domovina.ai dobivaju native pinka.io kampanje — slušatelji podrže epizodu jednim skenom bez napuštanja playera, uz plaćanje izravno kroz wallet.domovina.ai.",
    nativeLink: "Otvori domovina.ai",
    useCases: {
      tipPerEpisode: {
        title: "Napojnica po epizodi",
        body: "QR u opisu epizode, na YouTubeu ili u podcast aplikaciji. Slušatelj skenira i podrži — mikrodonacija od 1 € ostaje 1 €.",
      },
      membership: {
        title: "Mjesečna podrška",
        body: "Redovita podrška bez prisilnog terećenja kartice — slušatelj sam potvrđuje svaku uplatu. Bez zaboravljenih pretplata.",
      },
      exclusive: {
        title: "Bonus i ekskluziva",
        body: "On-chain badge otključava bonus epizode i zajednicu. Pripadnost, ne još jedan paywall.",
      },
      season: {
        title: "Crowdfunding sezone",
        body: "Nova oprema, gostovanja, produkcija — kampanja s ciljem koju zajednica prati u stvarnom vremenu.",
      },
      live: {
        title: "Live snimanja i ulaznice",
        body: "Snimanje uživo ili meetup — prodaja ulaznica gdje svaka kupnja troši komad iz zalihe.",
      },
      direct: {
        title: "Izravno, bez posrednika",
        body: "Sredstva idu na tvoj Safe novčanik, ne na račun platforme. Bez vendor lock-ina i zamrznutih isplata.",
      },
    },
    ctaLead: "Tvoja publika te već želi podržati.",
    ctaBody:
      " Pinka samo makne kartični trošak s puta — izgradi pinka.io kampanju za svoj podcast i podijeli QR u sljedećoj epizodi.",
    ctaButton: "Prijavi svoj podcast",
    ctaPreview: "Pogledaj pinka.io",
  },

  builtOn: {
    eyebrow: "Infrastruktura",
    heading: "Izgrađeno na ozbiljnoj infrastrukturi.",
    intro:
      "Ne gradimo od nule. Stojimo na licenciranim, u praksi dokazanim protokolima koji već pomiču milijarde eura kroz reguliranu mrežu.",
    partners: {
      monerium: {
        role: "Programabilni euro",
        body: "Licencirana EU institucija za izdavanje elektroničkog novca. Izdaje EURe — regulirani euro on-chain pod okvirom MiCA. Sve uplate i isplate idu kroz reguliranu infrastrukturu.",
      },
      safe: {
        role: "Sigurnost sredstava",
        body: "Industrijski standard za multisig upravljanje sredstvima. Ono što čuva milijarde u DeFi riznicama — to čuva i sredstva korisnika pinke.",
      },
      gnosis: {
        role: "Sloj za namiru",
        body: "Brz i jeftin EVM ekosustav optimiziran za stablecoin transakcije. EURe se kreće za sitne djeliće centa, u sekundi.",
      },
    },
    learnMore: "Saznaj više →",
  },

  transparency: {
    eyebrow: "Transparentnost",
    heading: "Bez skrivenih naknada. Evo kako se uzdržavamo.",
    p1: "Pinka ne uzima proviziju na prikupljena sredstva. Pri uplati podržavatelj može neobavezno dodati malu napojnicu platformi — te napojnice nas održavaju.",
    p2: "Naša riznica je javna on-chain (poveznica kad bude aktivna) i koristimo je za razvoj platforme te za prinos kroz regulirane DeFi protokole.",
    closerA: "100 % sredstava ide organizatoru kampanje.",
    closerB: "100 % transparentno. 0 % iznenađenja.",
    chartTitle: "Koliko od 100 € uplate stigne organizatoru",
    rows: {
      pinka: { name: "Pinka", note: "0 % obavezno · neobavezna napojnica" },
      stripe: { name: "Stripe + ručno", note: "~2,9 % + 0,30 € po transakciji" },
      patreon: { name: "Patreon", note: "5–12 % provizije + obrada plaćanja" },
      gofundme: { name: "GoFundMe", note: "provizija + poticaji na napojnicu" },
    },
    disclaimer:
      "Procjene; stvarni iznosi variraju ovisno o regiji, planu i vrsti kartice. Pinkin postotak ne uključuje neobavezne napojnice koje podržavatelj sam bira.",
  },

  roadmap: {
    eyebrow: "Plan razvoja",
    heading: "Što slijedi.",
    intro:
      "Krećemo malo i lokalno. Skaliramo kad korisnici kažu da je vrijeme — ne kad tablica kaže da je vrijeme.",
    items: {
      pilot: {
        q: "Q3 2026",
        title: "Pilot s prvih 5 klubova i organizacija",
        body: "Odabrana skupina amaterskih klubova i udruga. Svaku uvodimo ručno i slušamo svaku povratnu informaciju.",
      },
      open: {
        q: "Q4 2026",
        title: "Otvorene registracije",
        body: "Samostalna registracija za sve kreatore, udruge i timove u SEPA zoni.",
      },
      api: {
        q: "Q1 2027",
        title: "Javni API",
        body: "Platforme i organizacije integriraju pinku izravno u svoje tijekove rada.",
      },
      crossborder: {
        q: "Q2 2027",
        title: "Prekogranične SEPA uplate",
        body: "Podržavatelji iz cijele EU i EEA — bez tečajnih razlika, bez prepreka.",
      },
      beyond: {
        q: "Dalje",
        title: "Više valuta i mobilna aplikacija",
        body: "GBP, USD te izvorna iOS/Android aplikacija. Plan razvoja koji prati zajednica.",
      },
    },
  },

  team: {
    eyebrow: "Tim",
    heading: "Mali tim, velika nakana.",
    p1: "Pinku gradimo iz kuhinje, ne iz konferencijske dvorane. Iza projekta je tim koji godinama prati hrvatsku kreativnu i blockchain scenu — suradnici lokalnih kreatora i udruga te korisnici Monerium ekosustava od prvog dana.",
    p2: "Vjerujemo da se crowdfunding u eurima bez naknada može napraviti pošteno — bez tokena, bez obećanja prinosa, bez „revolucionarnih“ priča.",
    linkedin: "LinkedIn",
    hiringTitle: "Tražimo razvojne inženjere.",
    hiringBody: "TypeScript, EVM i sklonost fintechu. ",
    hiringLink: "Javi se →",
    portraitFounder: "Osnivač",
    portraitMeta: "Zagreb, Hrvatska",
    portraitBadge: "Pre-launch",
  },

  faq: {
    eyebrow: "Česta pitanja",
    heading: "Brza pitanja, kratki odgovori.",
    wallet: {
      q: "Trebam li kripto novčanik kao podržavatelj?",
      a: "Ne. Plaćaš preko svoje banke ili Revoluta kao bilo koju SEPA uplatu. Nema novih računa, nema novih aplikacija, nema priča o „seed phraseu“.",
    },
    types: {
      q: "Koje vrste kampanja mogu pokrenuti?",
      a: "Donacije, crowdfunding s ciljanim iznosom, prodaju ulaznica, soft tokenizaciju (on-chain potvrdu doprinosa — bez vrijednosnih papira i dividendi) te grupno financiranje nekretnina. Tip biraš pri pokretanju kampanje.",
    },
    regulated: {
      q: "Je li pinka regulirana?",
      a1: "Pinka surađuje s ",
      link: "Moneriumom",
      a2: ", licenciranom EU institucijom za izdavanje elektroničkog novca pod okvirom MiCA. Sve uplate i isplate prolaze kroz reguliranu infrastrukturu.",
    },
    cost: {
      q: "Koliko košta?",
      a: "0 % obavezno. Podržavatelj može neobavezno dodati napojnicu platformi (slično modelu Zeffyja). Kreatori, udruge i timovi ne plaćaju ništa.",
    },
    taxes: {
      q: "Kakvi porezi vrijede za primatelje?",
      a: "Standardni porezi za zemlju primatelja. Pinka generira potvrde i izvještaje za računovodstvo — onaj papir koji tvoj knjigovođa stvarno traži.",
    },
    custody: {
      q: "Što ako organizator ne podigne sredstva odmah?",
      a: "Sredstva sigurno stoje on-chain pod multisig kontrolom (Safe). Mogu se podići kad god organizator bude spreman — sutra, za mjesec ili za godinu. Ništa ne istječe.",
    },
    countries: {
      q: "Koje države podržavate?",
      a: "V1 je prvenstveno za EU/EEA SEPA zonu (uključujući Hrvatsku). Prekogranične uplate diljem cijele EU u planu su razvoja — Q2 2027.",
    },
    who: {
      q: "Tko stoji iza projekta?",
      a: "Mali tim iz Zagreba. Kontakt: ",
    },
    launch: {
      q: "Kad lansirate?",
      a1: "Q3 2026 — prvi pilot s odabranom skupinom od 5 kampanja. Otvorene registracije slijede u Q4. ",
      link: "Pridruži se listi čekanja",
      a2: " za rani pristup.",
    },
  },

  waitlistSection: {
    eyebrow: "Lista čekanja",
    heading: "Pridruži se prvom valu.",
    intro:
      "Pišemo svima koji se prijave čim budemo spremni. Najprije odabranoj skupini od pet kampanja, a zatim svima u SEPA zoni.",
    bullet1: "Bez spama. Najviše jedan e-mail po lansiranju.",
    bullet2: "Pilot pristup za prvih 5 kampanja i organizacija.",
    bullet3: "Izravan kontakt s timom za sva pitanja.",
  },

  footer: {
    tagline: "Prikupljaj sredstva jednim skenom. Bez naknada. U sekundi.",
    poweredBy: "Pokreće Monerium EURe, Safe i Gnosis Chain. Made in Croatia 🇭🇷.",
    colProduct: "Pinka",
    colResources: "Resursi",
    colConnect: "Poveži se",
    linkHow: "Kako radi",
    linkFootball: "Nogomet",
    linkPodcast: "Podcast",
    linkTech: "Tehnologija",
    linkRoadmap: "Plan razvoja",
    linkFaq: "Česta pitanja",
    linkPrivacy: "Privatnost",
    linkTerms: "Uvjeti",
    linkSecurity: "Sigurnost",
    copyright: "© {year} pinka.finance — Made in Croatia 🇭🇷",
    prelaunch: "Pinka je u pre-launch fazi. Sve specifikacije podložne su promjeni.",
    newsletter: "Newsletter",
    emailPlaceholder: "ti@primjer.hr",
    subscribe: "Prijavi",
    newsletterSuccess: "Hvala — javit ćemo se kad lansiramo.",
    errorRetry: "Pokušaj ponovno.",
    errorNetwork: "Mreža je trenutno nedostupna.",
  },

  form: {
    legend: "Tko si?",
    roleError: "Odaberi jednu opciju.",
    required: "obavezno",
    emailLabel: "Email",
    emailPlaceholder: "ti@primjer.hr",
    nameLabel: "Ime",
    namePlaceholder: "Marin",
    submit: "Pridruži se listi čekanja",
    submitting: "Spremam…",
    errorGeneric: "Nešto je pošlo po krivu. Pokušaj ponovno.",
    errorNetwork: "Mreža trenutno ne radi. Pokušaj ponovno za par sekundi.",
    privacyNote:
      "Tvoji podaci ostaju kod nas. Ne dijelimo ih, ne prodajemo i ne šaljemo spam. ",
    privacyLink: "Pravila privatnosti",
    successTitle: "Pridružio si se. ✓",
    successBody:
      "Poslali smo potvrdu na {email}. Vidimo se na lansiranju.",
    roles: {
      donor: {
        label: "Podržavatelj",
        description: "Želim podržavati kampanje, projekte i organizacije.",
      },
      creator: {
        label: "Klub / udruga / kreator",
        description: "Pokrećem kampanju i primam sredstva (npr. nogometni klub).",
      },
      investor: {
        label: "Investitor / Partner",
        description: "Pratim projekt iz fonda ili partnerstva.",
      },
      media: {
        label: "Medij / Community",
        description: "Pišem o projektu ili pokrivam scenu.",
      },
    },
    donor: {
      interestsLabel: "Što bi želio podržati?",
      interestsPlaceholder: "npr. lokalne udruge, kreatori, projekti, klubovi…",
      interestsHint: "Neobavezno — pomaže nam odrediti prioritete pilota.",
    },
    creator: {
      orgNameLabel: "Naziv kampanje / organizacije",
      linkLabel: "Web ili social",
      linkPlaceholder: "https://… ili @handle",
      audienceLabel: "Veličina zajednice",
      audiencePlaceholder: "npr. ~3.000 pratitelja / članova",
      typeLabel: "Vrsta",
      typePlaceholder: "Odaberi…",
      typeKreator: "Kreator / individualac",
      typeNeprofit: "Neprofitna organizacija",
      typeFirma: "Firma",
      typeDrugo: "Drugo",
    },
    investor: {
      fundNameLabel: "Naziv fonda / firme",
      fundLinkLabel: "Web",
      fundLinkPlaceholder: "https://…",
      typesLabel: "Tip ulaganja / suradnje",
    },
    media: {
      publicationLabel: "Naziv publikacije",
      coverageLabel: "Tip pokrivanja",
      coveragePlaceholder: "npr. članak, intervju, spomen u newsletteru…",
    },
  },

  dialog: {
    title: "Pridruži se listi čekanja.",
    description: "Javit ćemo se kad lansiramo prvi pilot. Bez spama.",
    close: "Zatvori",
  },

  validation: {
    emailInvalid: "Unesi ispravan email.",
    nameRequired: "Naziv je obavezan.",
    linkRequired: "Web ili social link je obavezan.",
    linkInvalid: "Unesi URL ili handle (npr. https://… ili @handle).",
    typeRequired: "Odaberi vrstu.",
    fundLinkRequired: "Web je obavezan.",
    fundLinkInvalid: "Unesi ispravan web URL.",
    investTypesMin: "Odaberi barem jednu opciju.",
    publicationRequired: "Naziv publikacije je obavezan.",
  },

  legal: {
    backHome: "← Nazad na početnu",
    updated: "Zadnje ažuriranje: 1. svibnja 2026.",
    privacy: {
      eyebrow: "Privatnost",
      title: "Pravila privatnosti",
      whoTitle: "Tko smo",
      whoA1:
        "Pinka je pre-launch projekt s ekipom u Zagrebu, Hrvatska. Operater web stranice je Founder Pinke (kontakt: ",
      whoA2:
        "). Organizacijski subjekt bit će registriran prije javnog lansiranja — ova politika će se ažurirati s točnim podacima.",
      collectTitle: "Što prikupljamo",
      collect1: "**Email adresa** — kad se prijaviš na waitlist ili newsletter.",
      collect2: "**Ime** — opcionalno, ako ga sam(a) podijeliš.",
      collect3:
        "**Podaci ovisni o ulozi** — ovisno o tome jesi li podržavatelj, kreator/organizacija, investitor ili medij (npr. naziv organizacije, web poveznica).",
      collect4:
        "**Tehnički podaci** — hash IP adrese (sha-256, ne čuvamo izvornu IP adresu) i niz user-agenta, isključivo za otkrivanje zlouporabe obrasca.",
      whyTitle: "Zašto prikupljamo",
      whyBody:
        "Da te kontaktiramo kad budemo spremni za pilot ili javno lansiranje. Da odredimo prioritete razvoja prema profilu zainteresiranih (više kreatora? više investitora?). Da spriječimo automatske prijave botova.",
      shareTitle: "Kome ne prosljeđujemo",
      shareBody:
        "Tvoje podatke ne prodajemo, ne licenciramo niti ih razmjenjujemo s trećim stranama u marketinške svrhe. Koristimo Resend (pružatelj e-mail infrastrukture, EU/US uz Standardne ugovorne klauzule) za slanje transakcijske pošte te Cloudflare (hosting i baza prijava). Oba imaju svoje ugovore o obradi podataka (DPA).",
      rightsTitle: "Tvoja prava",
      rightsA1:
        "Po GDPR-u možeš zatražiti pristup, ispravak, brisanje ili prijenos svojih podataka. Pošalji email na ",
      rightsA2: " i odgovorit ćemo u roku od 30 dana.",
      cookiesTitle: "Cookies",
      cookiesBody:
        "Trenutno ne koristimo analitičke ni kolačiće za praćenje. Ako ih dodamo prije lansiranja, ažurirat ćemo ovu politiku i dodati banner s privolom sukladno ePrivacy direktivi.",
    },
    terms: {
      eyebrow: "Uvjeti",
      title: "Uvjeti korištenja",
      prelaunchTitle: "Ovo je pre-launch stranica",
      prelaunchBody:
        "pinka.finance je u pre-launch fazi. Ova stranica služi za informiranje, prikupljanje prijava na listu čekanja i opisivanje budućeg proizvoda. Sve specifikacije, datumi i uvjeti podložni su promjeni dok ne lansiramo punu uslugu.",
      noAdviceTitle: "Bez financijskih savjeta",
      noAdviceBody:
        "Ništa na ovoj stranici nije financijski, porezni, pravni ili investicijski savjet. Ne nudimo investicijske proizvode niti jamčimo prinose. Doprinosi i donacije nisu ulaganja.",
      noTokenTitle: "Bez tokena",
      noTokenBody:
        "Pinka nema kripto token. Nema airdropa, nema pre-sale-a, nema ICO-a. Ako negdje vidiš nešto što tvrdi suprotno — to nije autentično.",
      securityTitle: "Sigurnosna pitanja",
      securityA1: "Ako pronađeš sigurnosni propust, javi se na ",
      securityA2: " u skladu s ",
      securityLink2: "SECURITY.md",
      securityA3: " politikom.",
      lawTitle: "Mjerodavno pravo",
      lawBody:
        "Hrvatsko pravo, nadležnost nadležnih sudova u Zagrebu. Ako neka odredba ne vrijedi, ostatak ostaje na snazi.",
    },
  },
};

export type Messages = typeof hr;

const en: Messages = {
  seo: {
    title: "pinka — raise funds with a single scan",
    description:
      "Pinka is an onchain platform for group funding. SEPA Instant + Monerium EURe — supporters pay with a scan, and creators, clubs and teams receive funds directly, with no card fees.",
    ogImageAlt: "pinka — raise funds with a single scan",
  },

  nav: {
    cta: "Join the waitlist",
    ctaShort: "Waitlist",
    ariaLabel: "Main navigation",
    homeAria: "pinka — home",
    skipToContent: "Skip to content",
    viewApp: "View pinka.io",
  },

  hero: {
    badge: "Pre-launch · Pilot Q3 2026",
    titleA: "Raise funds",
    titleHighlight: "with a single scan.",
    titleB: "No fees. In seconds.",
    subtitle:
      "Pinka is an onchain platform for group funding. It combines SEPA Instant and Monerium EURe, so supporters pay with a scan and creators, clubs and teams receive funds directly — no card fees, no waiting, no compromises.",
    cta: "Join the waitlist",
    how: "How it works",
    statFee: "Fee",
    statSpeed: "Speed",
    statCoverage: "Coverage",
  },

  mockup: {
    campaignTitle: "Pitch renovation",
    campaignMeta: "Crowdfunding · €3,240 of €5,000",
    support: "Support a campaign",
    scanInBank: "Scan in your banking app.",
    recipientLine: "SEPA Instant · recipient: Pitch renovation",
    inYourBank: "In your bank",
    amount: "€20.00",
    reference: "Pitch renovation · reference PK-2048",
    sent: "€20.00 sent",
    arrived: "Arrived in a second.",
    viewOnchain: "View on-chain",
  },

  problem: {
    eyebrow: "Problem",
    heading: "Raising money shouldn’t be complicated.",
    intro:
      "Today’s infrastructure punishes small creators, clubs and teams. The less you take in, the more the fees hurt.",
    cards: {
      fees: {
        title: "Card processors take 2–5 %",
        body: "of every payment. Small organisers lose the most — of €100 raised, €5 is gone before they see a thing.",
      },
      transfers: {
        title: "Bank transfers take days.",
        body: "The organiser doesn’t know when the money will arrive, and the supporter doesn’t know if it arrived at all. The feedback loop is broken.",
      },
      platforms: {
        title: "Existing platforms take 5–15 %.",
        body: "Patreon, GoFundMe, Kickstarter — each has its own cut, each demands its own account, each has its own rules.",
      },
    },
    closerPre: "That’s why we’re building ",
    closerBrand: "pinka",
    closerPost: ".",
  },

  how: {
    eyebrow: "How it works",
    heading: "Simple for everyone.",
    intro:
      "Same rails, two sides: the supporter sees a QR and a confirmation, the organiser sees funds in their account — with no middleman taking a slice along the way.",
    tabSupporter: "For supporters",
    tabCreator: "For organisers",
    supporterTitle: "For supporters",
    supporterSubtitle: "Three steps. No account to open.",
    creatorTitle: "For creators, clubs and teams",
    creatorSubtitle: "Four steps. No technical gymnastics.",
    supporter: {
      scan: {
        title: "Scan the QR code",
        body: "on the campaign page or wherever the organiser shares it — on your phone, like any other payment.",
      },
      confirm: {
        title: "Confirm in your bank or Revolut",
        body: "you choose the amount. No account to open, no card, no new apps.",
      },
      settled: {
        title: "The payment lands in seconds",
        body: "to the campaign you chose. You get a confirmation, the organiser gets the funds.",
      },
    },
    creator: {
      launch: {
        title: "Launch a campaign",
        body: "pick a type — donation, crowdfunding, tickets, soft tokenisation or real estate — and set a goal.",
      },
      share: {
        title: "Pinka generates a QR and a link",
        body: "share them however suits you — on the web, in posts, on social media or in person.",
      },
      onchain: {
        title: "Funds are raised on-chain",
        body: "publicly, transparently, in real time. You and your community see the same balance at the same moment.",
      },
      withdraw: {
        title: "Withdraw when you’re ready",
        body: "your Safe wallet holds the funds; payout to SEPA in a few clicks. No minimums, no obligations.",
      },
    },
  },

  football: {
    eyebrow: "Example · football",
    heading: "We start where the emotion runs highest.",
    intro:
      "Amateur football is the strongest local community in Croatia — and the one that has the hardest time collecting money today: in cash, via paper slips and private accounts. Clubs already raise funds; Pinka simply makes it digital, transparent and fee-free.",
    statClub: "clubs",
    statStadium: "stadiums",
    statPitch: "pitches",
    statCounty: "counties",
    mapNote:
      "The entire Croatian football network, mapped and geolocated from HNS, SofaScore, HR-nogomet and the Associations Registry.",
    mapLink: "See it all on the map",
    useCases: {
      memberships: {
        title: "Memberships",
        body: "Players, youth and members pay by scan — a parent with one QR, the club instantly sees who paid.",
      },
      equipment: {
        title: "Gear and travel",
        body: "Kits for the youth squad, a trip to a tournament, balls for the season — a campaign with a target amount.",
      },
      renovation: {
        title: "Pitch renovation",
        body: "Locker room, floodlights, stands. A big emotional drive for the whole town, transparent on-chain.",
      },
      tickets: {
        title: "Tickets",
        body: "Derby or event — ticket sales where each purchase draws down a piece from stock.",
      },
      donations: {
        title: "Donations and diaspora",
        body: "One-off or recurring, with nothing expected back. Ideal for emigrants supporting their home club.",
      },
      status: {
        title: "Supporter status",
        body: "On-chain proof of membership and support (a badge). Belonging, not a security — no dividends.",
      },
    },
    ctaLead: "Football is just one example.",
    ctaBody:
      " The same rail works for any community that raises money — sports clubs, fire brigades, cultural associations, schools, religious and local initiatives, creators and the diaspora.",
    ctaButton: "Register your club",
  },

  podcast: {
    eyebrow: "Example · podcast",
    heading: "Micro-support that actually reaches the creator.",
    intro:
      "Stripe and Patreon charge a fixed fee per transaction — so micro-tips stop making sense: nearly a fifth of a €2 donation is gone before you see a cent. Pinka uses a SEPA scan with no card fees, so even a €1 tip per episode stays €1.",
    statFixedVal: "€0.30",
    statFixed: "fixed fee per card payment",
    statLostVal: "~18 %",
    statLost: "lost from a €2 tip",
    statPatreonVal: "5–12 %",
    statPatreon: "Patreon fee + processing",
    statPinkaVal: "0 %",
    statPinka: "pinka — one SEPA scan",
    feeNote:
      "Card estimate: 2.9 % + €0.30 per transaction. The smaller the amount, the more the fixed fee hurts — which is why card micro-tips are almost pointless.",
    feeLink: "See the full comparison",
    nativeBadge: "Native integration",
    nativeTitle: "Support right inside the player on domovina.ai",
    nativeBody:
      "Podcasts on domovina.ai get native pinka.io campaigns — listeners support an episode with a single scan without leaving the player, paying directly through wallet.domovina.ai.",
    nativeLink: "Open domovina.ai",
    useCases: {
      tipPerEpisode: {
        title: "Tip per episode",
        body: "A QR in the episode description, on YouTube or in the podcast app. A listener scans and supports — a €1 micro-tip stays €1.",
      },
      membership: {
        title: "Monthly support",
        body: "Recurring support with no forced card charge — the listener approves each payment themselves. No forgotten subscriptions.",
      },
      exclusive: {
        title: "Bonus and exclusives",
        body: "An on-chain badge unlocks bonus episodes and the community. Belonging, not yet another paywall.",
      },
      season: {
        title: "Season crowdfunding",
        body: "New gear, guests, production — a goal-based campaign the community follows in real time.",
      },
      live: {
        title: "Live recordings and tickets",
        body: "A live recording or meetup — ticket sales where each purchase draws down from stock.",
      },
      direct: {
        title: "Direct, no middleman",
        body: "Funds go to your Safe wallet, not a platform’s account. No vendor lock-in and no frozen payouts.",
      },
    },
    ctaLead: "Your audience already wants to support you.",
    ctaBody:
      " Pinka just takes the card fee out of the way — build a pinka.io campaign for your podcast and share the QR in your next episode.",
    ctaButton: "Register your podcast",
    ctaPreview: "View pinka.io",
  },

  builtOn: {
    eyebrow: "Infrastructure",
    heading: "Built on serious infrastructure.",
    intro:
      "We’re not building from scratch. We stand on licensed, battle-tested protocols that already move billions of euros across a regulated network.",
    partners: {
      monerium: {
        role: "Programmable euro",
        body: "A licensed EU electronic money institution. It issues EURe — a regulated euro on-chain under the MiCA framework. Every payment and payout runs through regulated infrastructure.",
      },
      safe: {
        role: "Custody security",
        body: "The industry standard for multisig fund management. What safeguards billions in DeFi treasuries safeguards pinka users’ funds too.",
      },
      gnosis: {
        role: "Settlement layer",
        body: "A fast, cheap EVM ecosystem optimised for stablecoin transactions. EURe moves for tiny fractions of a cent, in seconds.",
      },
    },
    learnMore: "Learn more →",
  },

  transparency: {
    eyebrow: "Transparency",
    heading: "No hidden fees. Here’s how we sustain ourselves.",
    p1: "Pinka takes no cut of the funds you raise. At payment time the supporter can optionally add a small tip to the platform — those tips keep us running.",
    p2: "Our treasury is public on-chain (link once it’s live) and we use it to develop the platform and to earn yield through regulated DeFi protocols.",
    closerA: "100 % of funds go to the campaign organiser.",
    closerB: "100 % transparent. 0 % surprises.",
    chartTitle: "How much of a €100 payment reaches the organiser",
    rows: {
      pinka: { name: "Pinka", note: "0 % mandatory · optional tip" },
      stripe: { name: "Stripe + manual", note: "~2.9 % + €0.30 per transaction" },
      patreon: { name: "Patreon", note: "5–12 % fee + payment processing" },
      gofundme: { name: "GoFundMe", note: "fee + tip prompts" },
    },
    disclaimer:
      "Estimates; actual amounts vary by region, plan and card type. Pinka’s percentage excludes the optional tips the supporter chooses.",
  },

  roadmap: {
    eyebrow: "Roadmap",
    heading: "What’s next.",
    intro:
      "We start small and local. We scale when users say it’s time — not when a spreadsheet says it’s time.",
    items: {
      pilot: {
        q: "Q3 2026",
        title: "Pilot with the first 5 clubs and organisations",
        body: "A selected group of amateur clubs and associations. We onboard each one by hand and listen to every piece of feedback.",
      },
      open: {
        q: "Q4 2026",
        title: "Open registrations",
        body: "Self-serve sign-up for every creator, club and team in the SEPA zone.",
      },
      api: {
        q: "Q1 2027",
        title: "Public API",
        body: "Platforms and organisations integrate pinka directly into their own workflows.",
      },
      crossborder: {
        q: "Q2 2027",
        title: "Cross-border SEPA payments",
        body: "Supporters from across the EU and EEA — no exchange-rate spreads, no friction.",
      },
      beyond: {
        q: "Beyond",
        title: "More currencies and a mobile app",
        body: "GBP, USD and a native iOS/Android app. A roadmap the community helps shape.",
      },
    },
  },

  team: {
    eyebrow: "Team",
    heading: "Small team, big intent.",
    p1: "We build pinka from the kitchen table, not a conference room. Behind the project is a team that has followed Croatia’s creative and blockchain scene for years — collaborators with local creators and associations, and Monerium ecosystem users from day one.",
    p2: "We believe fee-free euro crowdfunding can be done honestly — no token, no promised yields, no “revolutionary” stories.",
    linkedin: "LinkedIn",
    hiringTitle: "We’re hiring engineers.",
    hiringBody: "TypeScript, EVM and a soft spot for fintech. ",
    hiringLink: "Get in touch →",
    portraitFounder: "Founder",
    portraitMeta: "Zagreb, Croatia",
    portraitBadge: "Pre-launch",
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Quick questions, short answers.",
    wallet: {
      q: "Do I need a crypto wallet as a supporter?",
      a: "No. You pay through your bank or Revolut like any SEPA payment. No new accounts, no new apps, no talk of a “seed phrase”.",
    },
    types: {
      q: "What kinds of campaigns can I run?",
      a: "Donations, goal-based crowdfunding, ticket sales, soft tokenisation (an on-chain proof of contribution — no securities, no dividends) and group real-estate funding. You pick the type when you launch a campaign.",
    },
    regulated: {
      q: "Is pinka regulated?",
      a1: "Pinka works with ",
      link: "Monerium",
      a2: ", a licensed EU electronic money institution under the MiCA framework. Every payment and payout runs through regulated infrastructure.",
    },
    cost: {
      q: "How much does it cost?",
      a: "0 % mandatory. The supporter can optionally add a tip to the platform (similar to Zeffy’s model). Creators, clubs and teams pay nothing.",
    },
    taxes: {
      q: "What taxes apply to recipients?",
      a: "Standard taxes for the recipient’s country. Pinka generates receipts and accounting reports — the paperwork your bookkeeper actually asks for.",
    },
    custody: {
      q: "What if the organiser doesn’t withdraw right away?",
      a: "The funds sit safely on-chain under multisig control (Safe). They can be withdrawn whenever the organiser is ready — tomorrow, in a month, or in a year. Nothing expires.",
    },
    countries: {
      q: "Which countries do you support?",
      a: "V1 is primarily for the EU/EEA SEPA zone (including Croatia). Cross-border payments across the whole EU are on the roadmap — Q2 2027.",
    },
    who: {
      q: "Who’s behind the project?",
      a: "A small team from Zagreb. Contact: ",
    },
    launch: {
      q: "When do you launch?",
      a1: "Q3 2026 — the first pilot with a selected group of 5 campaigns. Open registrations follow in Q4. ",
      link: "Join the waitlist",
      a2: " for early access.",
    },
  },

  waitlistSection: {
    eyebrow: "Waitlist",
    heading: "Join the first wave.",
    intro:
      "We email everyone who signs up as soon as we’re ready. First the selected group of five campaigns, then everyone in the SEPA zone.",
    bullet1: "No spam. At most one email per launch.",
    bullet2: "Pilot access for the first 5 campaigns and organisations.",
    bullet3: "Direct line to the team for any questions.",
  },

  footer: {
    tagline: "Raise funds with a single scan. No fees. In seconds.",
    poweredBy: "Powered by Monerium EURe, Safe and Gnosis Chain. Made in Croatia 🇭🇷.",
    colProduct: "Pinka",
    colResources: "Resources",
    colConnect: "Connect",
    linkHow: "How it works",
    linkFootball: "Football",
    linkPodcast: "Podcast",
    linkTech: "Technology",
    linkRoadmap: "Roadmap",
    linkFaq: "FAQ",
    linkPrivacy: "Privacy",
    linkTerms: "Terms",
    linkSecurity: "Security",
    copyright: "© {year} pinka.finance — Made in Croatia 🇭🇷",
    prelaunch: "Pinka is in pre-launch. All specifications are subject to change.",
    newsletter: "Newsletter",
    emailPlaceholder: "you@example.com",
    subscribe: "Subscribe",
    newsletterSuccess: "Thanks — we’ll be in touch when we launch.",
    errorRetry: "Please try again.",
    errorNetwork: "The network is currently unavailable.",
  },

  form: {
    legend: "Who are you?",
    roleError: "Pick one option.",
    required: "required",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    nameLabel: "Name",
    namePlaceholder: "Marin",
    submit: "Join the waitlist",
    submitting: "Saving…",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "The network is down right now. Try again in a few seconds.",
    privacyNote:
      "Your data stays with us. We don’t share it, sell it or send spam. ",
    privacyLink: "Privacy policy",
    successTitle: "You’re in. ✓",
    successBody: "We’ve sent a confirmation to {email}. See you at launch.",
    roles: {
      donor: {
        label: "Supporter",
        description: "I want to support campaigns, projects and organisations.",
      },
      creator: {
        label: "Club / association / creator",
        description: "I run a campaign and receive funds (e.g. a football club).",
      },
      investor: {
        label: "Investor / Partner",
        description: "I follow the project from a fund or partnership.",
      },
      media: {
        label: "Media / Community",
        description: "I write about the project or cover the scene.",
      },
    },
    donor: {
      interestsLabel: "What would you like to support?",
      interestsPlaceholder: "e.g. local associations, creators, projects, clubs…",
      interestsHint: "Optional — it helps us prioritise the pilot.",
    },
    creator: {
      orgNameLabel: "Campaign / organisation name",
      linkLabel: "Web or social",
      linkPlaceholder: "https://… or @handle",
      audienceLabel: "Community size",
      audiencePlaceholder: "e.g. ~3,000 followers / members",
      typeLabel: "Type",
      typePlaceholder: "Choose…",
      typeKreator: "Creator / individual",
      typeNeprofit: "Non-profit organisation",
      typeFirma: "Company",
      typeDrugo: "Other",
    },
    investor: {
      fundNameLabel: "Fund / company name",
      fundLinkLabel: "Web",
      fundLinkPlaceholder: "https://…",
      typesLabel: "Type of investment / collaboration",
    },
    media: {
      publicationLabel: "Publication name",
      coverageLabel: "Type of coverage",
      coveragePlaceholder: "e.g. article, interview, newsletter mention…",
    },
  },

  dialog: {
    title: "Join the waitlist.",
    description: "We’ll reach out when we launch the first pilot. No spam.",
    close: "Close",
  },

  validation: {
    emailInvalid: "Enter a valid email.",
    nameRequired: "A name is required.",
    linkRequired: "A web or social link is required.",
    linkInvalid: "Enter a URL or handle (e.g. https://… or @handle).",
    typeRequired: "Pick a type.",
    fundLinkRequired: "Web is required.",
    fundLinkInvalid: "Enter a valid web URL.",
    investTypesMin: "Pick at least one option.",
    publicationRequired: "A publication name is required.",
  },

  legal: {
    backHome: "← Back home",
    updated: "Last updated: 1 May 2026.",
    privacy: {
      eyebrow: "Privacy",
      title: "Privacy Policy",
      whoTitle: "Who we are",
      whoA1:
        "Pinka is a pre-launch project with a team in Zagreb, Croatia. The website operator is the Pinka Founder (contact: ",
      whoA2:
        "). A legal entity will be registered before public launch — this policy will be updated with the exact details.",
      collectTitle: "What we collect",
      collect1: "**Email address** — when you sign up to the waitlist or newsletter.",
      collect2: "**Name** — optional, if you choose to share it.",
      collect3:
        "**Role-dependent data** — depending on whether you’re a supporter, creator/organisation, investor or media (e.g. organisation name, web link).",
      collect4:
        "**Technical data** — a hash of your IP address (sha-256; we don’t store the raw IP) and the user-agent string, solely to detect form abuse.",
      whyTitle: "Why we collect it",
      whyBody:
        "To contact you when we’re ready for the pilot or public launch. To prioritise development based on the profile of those interested (more creators? more investors?). To prevent automated bot sign-ups.",
      shareTitle: "Who we don’t pass it to",
      shareBody:
        "We don’t sell, license or exchange your data with third parties for marketing. We use Resend (email infrastructure provider, EU/US under Standard Contractual Clauses) to send transactional mail, and Cloudflare (hosting and the sign-up database). Both have their own data processing agreements (DPAs).",
      rightsTitle: "Your rights",
      rightsA1:
        "Under GDPR you can request access, rectification, erasure or portability of your data. Email ",
      rightsA2: " and we’ll respond within 30 days.",
      cookiesTitle: "Cookies",
      cookiesBody:
        "We currently use no analytics or tracking cookies. If we add them before launch, we’ll update this policy and add a consent banner in line with the ePrivacy Directive.",
    },
    terms: {
      eyebrow: "Terms",
      title: "Terms of Service",
      prelaunchTitle: "This is a pre-launch page",
      prelaunchBody:
        "pinka.finance is in pre-launch. This page is for information, collecting waitlist sign-ups and describing the future product. All specifications, dates and terms are subject to change until we launch the full service.",
      noAdviceTitle: "No financial advice",
      noAdviceBody:
        "Nothing on this page is financial, tax, legal or investment advice. We don’t offer investment products or guarantee returns. Contributions and donations are not investments.",
      noTokenTitle: "No token",
      noTokenBody:
        "Pinka has no crypto token. No airdrop, no pre-sale, no ICO. If you see anything claiming otherwise — it’s not authentic.",
      securityTitle: "Security issues",
      securityA1: "If you find a security vulnerability, reach out to ",
      securityA2: " in line with the ",
      securityLink2: "SECURITY.md",
      securityA3: " policy.",
      lawTitle: "Governing law",
      lawBody:
        "Croatian law, jurisdiction of the competent courts in Zagreb. If any provision is invalid, the rest remains in force.",
    },
  },
};

export const messages: Record<Locale, Messages> = { hr, en };
