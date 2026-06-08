"use client";

import { ShieldCheck, Lock, Network } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { useI18n } from "@/lib/i18n";

const partners = [
  { name: "Monerium", icon: ShieldCheck, key: "monerium", href: "https://monerium.com" },
  { name: "Safe", icon: Lock, key: "safe", href: "https://safe.global" },
  { name: "Gnosis Chain", icon: Network, key: "gnosis", href: "https://www.gnosis.io" },
] as const;

export function BuiltOn() {
  const { t } = useI18n();
  return (
    <section
      id="built-on"
      className="section-padding bg-teal text-cream relative overflow-hidden"
      aria-labelledby="built-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-20 h-[480px] w-[480px] rounded-full bg-cream/[0.04] blur-3xl"
      />

      <div className="container-content relative">
        <SectionReveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-cream/90">
            {t("builtOn.eyebrow")}
          </span>
          <h2 id="built-heading" className="mt-4 text-display-lg text-cream">
            {t("builtOn.heading")}
          </h2>
          <p className="mt-5 text-lg text-cream/75">{t("builtOn.intro")}</p>
        </SectionReveal>

        <div className="mt-12 sm:mt-14 grid md:grid-cols-3 gap-4 sm:gap-5">
          {partners.map((p, i) => {
            const Icon = p.icon;
            return (
              <SectionReveal
                key={p.name}
                delay={i * 0.06}
                className="rounded-lg border border-cream/12 bg-cream/[0.03] p-6 sm:p-7 transition-colors hover:bg-cream/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cream/10 text-cream mb-5">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-xs uppercase tracking-wider text-cream/60">
                  {t(`builtOn.partners.${p.key}.role`)}
                </p>
                <h3 className="mt-1 font-display text-2xl tracking-tight text-cream">
                  {p.name}
                </h3>
                <p className="mt-2 text-cream/75 leading-relaxed">
                  {t(`builtOn.partners.${p.key}.body`)}
                </p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-cream/90 underline-offset-4 hover:underline focus-ring rounded-sm"
                >
                  {t("builtOn.learnMore")}
                </a>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
