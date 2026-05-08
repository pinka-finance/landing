import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Uvjeti korištenja pinka.finance landing stranice.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-32 pb-24">
        <article className="container-content max-w-3xl">
          <p className="eyebrow">Terms</p>
          <h1 className="mt-4 text-display-md">Uvjeti korištenja</h1>
          <p className="mt-3 text-sm text-inkMuted">Zadnje ažuriranje: 1. svibnja 2026.</p>

          <Section title="Ovo je pre-launch stranica">
            <p>
              pinka.finance je u pre-launch fazi. Ova stranica služi za informiranje, kupljenje
              waitlist prijava i opisivanje budućeg proizvoda. Sve specifikacije, datumi i
              uvjeti podložni su promjeni dok ne lansiramo punu uslugu.
            </p>
          </Section>

          <Section title="Bez financijskih savjeta">
            <p>
              Ništa na ovoj stranici nije financijski, porezni, pravni ili investicijski
              savjet. Ne nudimo investicijske proizvode niti garantiramo prinose.
              Donacije nisu ulaganja.
            </p>
          </Section>

          <Section title="Bez tokena">
            <p>
              Pinka nema kripto token. Nema airdropa, nema pre-sale-a, nema ICO-a. Ako negdje
              vidiš nešto što tvrdi suprotno — to nije autentično.
            </p>
          </Section>

          <Section title="Sigurnosna pitanja">
            <p>
              Ako pronađeš sigurnosni propust, javi se na{" "}
              <a
                href="mailto:security@pinka.finance"
                className="text-coral underline-offset-2 hover:underline"
              >
                security@pinka.finance
              </a>{" "}
              u skladu s{" "}
              <a
                href="https://github.com/pinka-finance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral underline-offset-2 hover:underline"
              >
                SECURITY.md
              </a>{" "}
              politikom.
            </p>
          </Section>

          <Section title="Mjerodavno pravo">
            <p>
              Hrvatsko pravo, nadležnost nadležnih sudova u Zagrebu. Ako neka odredba ne
              vrijedi, ostatak ostaje na snazi.
            </p>
          </Section>

          <p className="mt-12">
            <Link href="/" className="text-coral underline-offset-2 hover:underline">
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
      <div className="mt-3 space-y-3 text-inkSoft leading-relaxed">{children}</div>
    </section>
  );
}
