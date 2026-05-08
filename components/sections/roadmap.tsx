import { SectionReveal } from "@/components/section-reveal";
import { cn } from "@/lib/utils";

const milestones = [
  {
    quarter: "Q3 2026",
    title: "Pilot s prvih 5 podcasta",
    body: "Curated cohort. Mi ručno onboardamo svaki tim, slušamo svaki feedback.",
    state: "next" as const,
  },
  {
    quarter: "Q4 2026",
    title: "Open registration",
    body: "Self-serve onboarding za sve kreatore i organizacije u SEPA zoni.",
    state: "future" as const,
  },
  {
    quarter: "Q1 2027",
    title: "Public API",
    body: "Hosting platforme i organizacije integriraju pinku direktno u svoje workflowe.",
    state: "future" as const,
  },
  {
    quarter: "Q2 2027",
    title: "Cross-border SEPA donacije",
    body: "Donatori iz cijele EU i EEA — bez tečajnih razlika, bez friction-a.",
    state: "future" as const,
  },
  {
    quarter: "Beyond",
    title: "Više valuta i mobile app",
    body: "GBP, USD, native iOS/Android aplikacija. Roadmap koji prati zajednica.",
    state: "future" as const,
  },
];

export function Roadmap() {
  return (
    <section
      id="roadmap"
      className="section-padding bg-cream"
      aria-labelledby="roadmap-heading"
    >
      <div className="container-content">
        <SectionReveal className="max-w-3xl">
          <span className="eyebrow">Roadmap</span>
          <h2 id="roadmap-heading" className="mt-4 text-display-lg">
            Što slijedi.
          </h2>
          <p className="mt-5 text-lg text-inkSoft">
            Krećemo malo i lokalno. Skaliramo kad korisnici kažu da je vrijeme — ne kad
            tablica kaže da je vrijeme.
          </p>
        </SectionReveal>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block mt-16 relative">
          <div aria-hidden className="absolute left-0 right-0 top-9 h-px bg-ink/10" />
          <ol className="grid grid-cols-5 gap-4 relative">
            {milestones.map((m, i) => (
              <SectionReveal key={m.quarter} delay={i * 0.06}>
                <Milestone {...m} />
              </SectionReveal>
            ))}
          </ol>
        </div>

        {/* Mobile vertical timeline */}
        <ol className="lg:hidden mt-12 space-y-6 relative">
          <span aria-hidden className="absolute left-3.5 top-2 bottom-2 w-px bg-ink/10" />
          {milestones.map((m, i) => (
            <SectionReveal key={m.quarter} delay={i * 0.04}>
              <li className="relative pl-12">
                <span
                  className={cn(
                    "absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-cream",
                    m.state === "next" ? "border-coral" : "border-ink/20"
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      m.state === "next" ? "bg-coral" : "bg-ink/30"
                    )}
                  />
                </span>
                <p className="text-xs font-medium uppercase tracking-wider text-inkMuted">
                  {m.quarter}
                </p>
                <h3 className="mt-1 font-display text-xl tracking-tight">{m.title}</h3>
                <p className="mt-1 text-inkSoft leading-relaxed">{m.body}</p>
              </li>
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Milestone({
  quarter,
  title,
  body,
  state,
}: (typeof milestones)[number]) {
  return (
    <li className="relative">
      <span
        className={cn(
          "relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full border-2 bg-cream",
          state === "next" ? "border-coral" : "border-ink/20"
        )}
        aria-hidden
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            state === "next" ? "bg-coral" : "bg-ink/30"
          )}
        />
      </span>
      <div className="mt-5 text-center">
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-wider",
            state === "next" ? "text-coral-700" : "text-inkMuted"
          )}
        >
          {quarter}
        </p>
        <h3 className="mt-1 font-display text-lg tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm text-inkSoft leading-relaxed">{body}</p>
      </div>
    </li>
  );
}
