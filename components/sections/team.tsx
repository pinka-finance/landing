import { Mail, Linkedin, Code2 } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

export function Team() {
  return (
    <section
      id="team"
      className="section-padding bg-sand"
      aria-labelledby="team-heading"
    >
      <div className="container-content">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <SectionReveal>
            <FounderPortrait />
          </SectionReveal>
          <SectionReveal delay={0.1} className="max-w-xl">
            <span className="eyebrow">Tim</span>
            <h2 id="team-heading" className="mt-4 text-display-lg">
              Mali tim, velika nakana.
            </h2>
            <div className="mt-5 space-y-4 text-lg text-inkSoft leading-relaxed">
              <p>
                Pinku gradimo od kuhinje, ne od konferencijske dvorane. Iza projekta je tim
                koji godinama prati hrvatsku podcast scenu i blockchain prostor —
                <span className="text-ink"> članovi UBIK-a</span>, suradnici lokalnih kreatora,
                korisnici Monerium ekosistema od dana 1.
              </p>
              <p>
                Vjerujemo da se zero-fee donacije u eurima mogu napraviti pošteno — bez tokena,
                bez yield obećanja, bez „revolucionarnog“ pitching-a.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hello@pinka.finance"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-medium text-ink hover:border-ink/25 transition-colors focus-ring"
              >
                <Mail className="h-4 w-4" aria-hidden />
                hello@pinka.finance
              </a>
              <a
                href="https://www.linkedin.com/company/pinka-finance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-medium text-ink hover:border-ink/25 transition-colors focus-ring"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </div>

            <div className="mt-8 rounded-md border border-coral/30 bg-coral/[0.06] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-coral text-cream">
                  <Code2 className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-ink">Tražimo developere.</p>
                  <p className="mt-0.5 text-sm text-inkSoft">
                    TypeScript, EVM, fintech-friendly mindset.{" "}
                    <a
                      href="mailto:hello@pinka.finance?subject=Pinka%20%E2%80%94%20Developer%20uloga"
                      className="text-coral underline-offset-2 hover:underline"
                    >
                      Javi se →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function FounderPortrait() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-gradient-to-br from-coral/15 via-sandDeep to-teal/15 border border-ink/8">
      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full text-ink/15"
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#dots)" />
        </svg>
      </div>

      <div className="absolute inset-0 grid place-items-center p-6">
        <div className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cream shadow-soft border border-ink/10">
            <span className="font-display text-3xl text-coral">M</span>
          </div>
          <p className="mt-4 font-display text-xl text-ink">Founder</p>
          <p className="mt-0.5 text-sm text-inkMuted">Član UBIK-a · Zagreb</p>
        </div>
      </div>

      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ink shadow-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden />
        Pre-launch
      </div>
    </div>
  );
}
