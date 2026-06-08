"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/section-reveal";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const platforms = [
  { key: "pinka", percent: 100, accent: "coral" },
  { key: "stripe", percent: 96.5, accent: "neutral" },
  { key: "patreon", percent: 91, accent: "neutral" },
  { key: "gofundme", percent: 87, accent: "neutral" },
] as const;

export function Transparency() {
  const { t } = useI18n();
  return (
    <section
      id="transparency"
      className="section-padding bg-sand"
      aria-labelledby="transparency-heading"
    >
      <div className="container-content">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
          <SectionReveal className="max-w-xl">
            <span className="eyebrow">{t("transparency.eyebrow")}</span>
            <h2 id="transparency-heading" className="mt-4 text-display-lg">
              {t("transparency.heading")}
            </h2>
            <div className="mt-6 space-y-5 text-lg text-inkSoft leading-relaxed">
              <p>{t("transparency.p1")}</p>
              <p>{t("transparency.p2")}</p>
              <p className="font-display text-xl text-ink">
                {t("transparency.closerA")}
                <br />
                {t("transparency.closerB")}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="rounded-lg border border-ink/8 bg-white/80 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-wider text-inkMuted">
                {t("transparency.chartTitle")}
              </p>
              <ul className="mt-5 space-y-4">
                {platforms.map((p, i) => (
                  <li key={p.key}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          p.accent === "coral" ? "text-coral" : "text-ink"
                        )}
                      >
                        {t(`transparency.rows.${p.key}.name`)}
                      </span>
                      <span
                        className={cn(
                          "font-display text-xl",
                          p.accent === "coral" ? "text-coral" : "text-ink"
                        )}
                      >
                        {p.percent}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-ink/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.percent}%` }}
                        transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-40px" }}
                        className={cn(
                          "h-full rounded-full",
                          p.accent === "coral"
                            ? "bg-coral"
                            : "bg-ink/40"
                        )}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-inkMuted">
                      {t(`transparency.rows.${p.key}.note`)}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-inkMuted leading-relaxed">
                {t("transparency.disclaimer")}
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
