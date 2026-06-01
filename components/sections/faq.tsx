"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionReveal } from "@/components/section-reveal";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Trebam li kripto novčanik kao podržavatelj?",
    a: (
      <>
        Ne. Plaćaš preko svoje banke ili Revoluta kao bilo koju SEPA uplatu. Nema novih
        računa, nema novih aplikacija, nema priča o „seed phraseu“.
      </>
    ),
  },
  {
    q: "Koje vrste kampanja mogu pokrenuti?",
    a: (
      <>
        Donacije, crowdfunding s ciljanim iznosom, prodaju ulaznica, soft tokenizaciju
        (on-chain potvrdu doprinosa — bez vrijednosnih papira i dividendi) te grupno
        financiranje nekretnina. Tip biraš pri pokretanju kampanje.
      </>
    ),
  },
  {
    q: "Je li pinka regulirana?",
    a: (
      <>
        Pinka surađuje s{" "}
        <a
          href="https://monerium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral underline-offset-2 hover:underline"
        >
          Moneriumom
        </a>
        , licenciranom EU institucijom za izdavanje elektroničkog novca pod okvirom MiCA. Sve
        uplate i isplate prolaze kroz reguliranu infrastrukturu.
      </>
    ),
  },
  {
    q: "Koliko košta?",
    a: (
      <>
        0 % obavezno. Podržavatelj može neobavezno dodati napojnicu platformi (slično modelu
        Zeffyja). Kreatori, udruge i timovi ne plaćaju ništa.
      </>
    ),
  },
  {
    q: "Kakvi porezi vrijede za primatelje?",
    a: (
      <>
        Standardni porezi za zemlju primatelja. Pinka generira potvrde i izvještaje za
        računovodstvo — onaj papir koji tvoj knjigovođa stvarno traži.
      </>
    ),
  },
  {
    q: "Što ako organizator ne podigne sredstva odmah?",
    a: (
      <>
        Sredstva sigurno stoje on-chain pod multisig kontrolom (Safe). Mogu se podići kad god
        organizator bude spreman — sutra, za mjesec ili za godinu. Ništa ne istječe.
      </>
    ),
  },
  {
    q: "Koje države podržavate?",
    a: (
      <>
        V1 je prvenstveno za EU/EEA SEPA zonu (uključujući Hrvatsku). Prekogranične uplate
        diljem cijele EU u planu su razvoja — Q2 2027.
      </>
    ),
  },
  {
    q: "Tko stoji iza projekta?",
    a: (
      <>
        Mali tim iz Zagreba, članovi UBIK-a (Hrvatske udruge za blockchain i kriptovalute).
        Kontakt:{" "}
        <a
          href="mailto:hello@pinka.finance"
          className="text-coral underline-offset-2 hover:underline"
        >
          hello@pinka.finance
        </a>
        .
      </>
    ),
  },
  {
    q: "Kad lansirate?",
    a: (
      <>
        Q3 2026 — prvi pilot s odabranom skupinom od 5 kampanja. Otvorene registracije
        slijede u Q4.
        <a href="#waitlist" className="text-coral underline-offset-2 hover:underline ml-1">
          Pridruži se listi čekanja
        </a>{" "}
        za rani pristup.
      </>
    ),
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-padding bg-cream" aria-labelledby="faq-heading">
      <div className="container-content max-w-3xl">
        <SectionReveal>
          <span className="eyebrow">Česta pitanja</span>
          <h2 id="faq-heading" className="mt-4 text-display-lg">
            Brza pitanja, kratki odgovori.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.05} className="mt-10">
          <Accordion type="single" collapsible className="border-t border-ink/10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </div>
    </section>
  );
}
