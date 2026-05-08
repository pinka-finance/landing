import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Kako pinka.finance prikuplja, koristi i čuva osobne podatke.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-32 pb-24">
        <article className="container-content max-w-3xl prose-content">
          <p className="eyebrow">Privacy</p>
          <h1 className="mt-4 text-display-md">Privacy Policy</h1>
          <p className="mt-3 text-sm text-inkMuted">Zadnje ažuriranje: 1. svibnja 2026.</p>

          <Section title="Tko smo">
            <p>
              Pinka je pre-launch projekt s ekipom u Zagrebu, Hrvatska. Operater web stranice
              je Founder Pinke (kontakt:{" "}
              <a href="mailto:hello@pinka.finance" className="link">
                hello@pinka.finance
              </a>
              ). Organizacijski subjekt će biti registriran prije javnog launcha — ova
              politika će se ažurirati s točnim podacima.
            </p>
          </Section>

          <Section title="Što prikupljamo">
            <ul>
              <li>
                <strong>Email adresa</strong> — kad se prijaviš na waitlist ili newsletter.
              </li>
              <li>
                <strong>Ime</strong> — opcionalno, ako ga sam(a) podijeliš.
              </li>
              <li>
                <strong>Role-specifični podaci</strong> — ovisno o tome jesi li donator,
                kreator/organizacija, investitor ili medij (npr. naziv organizacije, web
                link).
              </li>
              <li>
                <strong>Tehnički podaci</strong> — hash IP-a (sha-256, ne čuvamo plain IP) i
                user-agent niz, isključivo za otkrivanje zloupotrebe forme.
              </li>
            </ul>
          </Section>

          <Section title="Zašto prikupljamo">
            <p>
              Da te kontaktiramo kad budemo spremni za pilot ili javni launch. Da
              prioritiziramo razvoj prema profilu zainteresiranih (više kreatora? više
              investitora?). Da spriječimo automatske bot prijave.
            </p>
          </Section>

          <Section title="Kome ne prosljeđujemo">
            <p>
              Tvoje podatke ne prodajemo, ne licenciramo, ne razmjenjujemo s trećim stranama
              za marketing. Koristimo Resend (pružatelj email infrastrukture, EU/US sa
              Standard Contractual Clauses) za slanje transakcijske pošte i Vercel
              (hosting). Oba imaju svoje DPAs.
            </p>
          </Section>

          <Section title="Tvoja prava">
            <p>
              Po GDPR-u možeš zatražiti pristup, ispravak, brisanje ili prijenos svojih
              podataka. Pošalji email na{" "}
              <a href="mailto:hello@pinka.finance" className="link">
                hello@pinka.finance
              </a>{" "}
              i odgovorit ćemo u roku od 30 dana.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Trenutno ne koristimo analytics niti tracking cookies. Ako to dodamo prije
              launcha, ažurirat ćemo ovu politiku i dodati opt-in banner sukladno ePrivacy
              direktivi.
            </p>
          </Section>

          <p className="mt-12">
            <Link href="/" className="link">
              ← Nazad na početnu
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-inkSoft leading-relaxed [&_a.link]:text-coral [&_a.link]:underline-offset-2 [&_a.link:hover]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
