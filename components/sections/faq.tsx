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
    q: "Trebam li kripto wallet kao donator?",
    a: (
      <>
        Ne. Plaćaš preko svoje banke ili Revoluta kao bilo koju SEPA uplatu. Nema novih
        računa, nema novih aplikacija, nema „seed phrase“ priča.
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
        , licenciranom EU institucijom elektroničkog novca pod MiCA okvirom. Sve uplate i
        isplate prolaze kroz reguliranu infrastrukturu.
      </>
    ),
  },
  {
    q: "Koliko košta?",
    a: (
      <>
        0% obavezno. Donator opcionalno može dodati napojnicu platformi (slično Zeffy
        modelu). Kreatori i organizacije ne plaćaju ništa.
      </>
    ),
  },
  {
    q: "Kakvi porezi vrijede za primatelje?",
    a: (
      <>
        Standardni porezi za zemlju primatelja. Pinka generira potvrde i izvještaje za
        računovodstvo — onaj papir koji tvoja knjigovođa stvarno traži.
      </>
    ),
  },
  {
    q: "Što ako organizacija ne podigne donacije odmah?",
    a: (
      <>
        Donacije sjede sigurno on-chain pod multisig kontrolom (Safe). Mogu se podići kad god
        organizacija bude spremna — sutra, za mjesec ili za godinu. Ništa ne istječe.
      </>
    ),
  },
  {
    q: "Koje države podržavate?",
    a: (
      <>
        V1 je primarno za EU/EEA SEPA zonu (uključujući Hrvatsku). Cross-border donacije
        diljem cijele EU su u roadmapu — Q2 2027.
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
        Q3 2026 — prvi pilot s curated cohort od 5 podcasta. Open registration slijedi u Q4.
        <a href="#waitlist" className="text-coral underline-offset-2 hover:underline ml-1">
          Pridruži se waitlist-u
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
          <span className="eyebrow">FAQ</span>
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
