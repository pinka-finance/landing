"use client";

import { SectionReveal } from "@/components/section-reveal";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type MilestoneData = {
  quarter: string;
  title: string;
  body: string;
  state: "next" | "future";
};

const milestoneKeys = [
  { key: "pilot", state: "next" as const },
  { key: "open", state: "future" as const },
  { key: "api", state: "future" as const },
  { key: "crossborder", state: "future" as const },
  { key: "beyond", state: "future" as const },
];

export function Roadmap() {
  const { t } = useI18n();
  const milestones: MilestoneData[] = milestoneKeys.map((m) => ({
    quarter: t(`roadmap.items.${m.key}.q`),
    title: t(`roadmap.items.${m.key}.title`),
    body: t(`roadmap.items.${m.key}.body`),
    state: m.state,
  }));

  return (
    <section
      id="roadmap"
      className="section-padding bg-cream"
      aria-labelledby="roadmap-heading"
    >
      <div className="container-content">
        <SectionReveal className="max-w-3xl">
          <span className="eyebrow">{t("roadmap.eyebrow")}</span>
          <h2 id="roadmap-heading" className="mt-4 text-display-lg">
            {t("roadmap.heading")}
          </h2>
          <p className="mt-5 text-lg text-inkSoft">{t("roadmap.intro")}</p>
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
}: MilestoneData) {
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
