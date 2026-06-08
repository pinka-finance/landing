"use client";

import { CreditCard, Hourglass, Receipt } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { useI18n } from "@/lib/i18n";

const items = [
  { icon: CreditCard, key: "fees" },
  { icon: Hourglass, key: "transfers" },
  { icon: Receipt, key: "platforms" },
] as const;

export function Problem() {
  const { t } = useI18n();
  return (
    <section
      id="problem"
      className="section-padding bg-sand"
      aria-labelledby="problem-heading"
    >
      <div className="container-content">
        <SectionReveal className="max-w-3xl">
          <span className="eyebrow">{t("problem.eyebrow")}</span>
          <h2 id="problem-heading" className="mt-4 text-display-lg">
            {t("problem.heading")}
          </h2>
          <p className="mt-5 text-lg text-inkSoft">{t("problem.intro")}</p>
        </SectionReveal>

        <div className="mt-12 sm:mt-14 grid md:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <SectionReveal
                key={it.key}
                delay={i * 0.06}
                className="card-base bg-white/80 hover:bg-white hover:shadow-soft border-ink/8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-coral/10 text-coral mb-5">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-xl font-display tracking-tight text-ink">
                  {t(`problem.cards.${it.key}.title`)}
                </h3>
                <p className="mt-2 text-inkSoft leading-relaxed">
                  {t(`problem.cards.${it.key}.body`)}
                </p>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.2} className="mt-10 sm:mt-12 text-center">
          <p className="font-display text-2xl sm:text-3xl text-ink">
            {t("problem.closerPre")}
            <span className="gradient-text">{t("problem.closerBrand")}</span>
            {t("problem.closerPost")}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
