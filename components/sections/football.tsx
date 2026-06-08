"use client";

import {
  Users,
  Shirt,
  Hammer,
  Ticket,
  Heart,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/waitlist/waitlist-dialog";
import { useI18n } from "@/lib/i18n";

const stats = [
  { value: "901", key: "statClub" },
  { value: "452", key: "statStadium" },
  { value: "7.163", key: "statPitch" },
  { value: "21", key: "statCounty" },
] as const;

const useCases = [
  { icon: Users, key: "memberships" },
  { icon: Shirt, key: "equipment" },
  { icon: Hammer, key: "renovation" },
  { icon: Ticket, key: "tickets" },
  { icon: Heart, key: "donations" },
  { icon: Sparkles, key: "status" },
] as const;

export function Football() {
  const { t } = useI18n();
  return (
    <section
      id="nogomet"
      className="section-padding bg-sand relative overflow-x-clip"
      aria-labelledby="football-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-teal/10 blur-3xl"
      />

      <div className="container-content relative">
        <SectionReveal className="max-w-3xl">
          <span className="eyebrow">{t("football.eyebrow")}</span>
          <h2 id="football-heading" className="mt-4 text-display-lg">
            {t("football.heading")}
          </h2>
          <p className="mt-5 text-lg text-inkSoft">{t("football.intro")}</p>
        </SectionReveal>

        {/* Market scale — from the DOMOVINA football map */}
        <SectionReveal delay={0.05} className="mt-10">
          <div className="rounded-lg border border-ink/8 bg-white/70 p-6 sm:p-8">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
              {stats.map((s) => (
                <div key={s.key} className="text-center sm:text-left">
                  <dt className="sr-only">{t(`football.${s.key}`)}</dt>
                  <dd>
                    <span className="block font-display text-3xl sm:text-4xl text-teal leading-none">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-sm text-inkMuted">
                      {t(`football.${s.key}`)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-inkMuted">
              <span>{t("football.mapNote")}</span>
              <a
                href="https://gis.domovina.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-teal underline-offset-4 hover:underline focus-ring rounded-sm shrink-0"
              >
                {t("football.mapLink")}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </p>
          </div>
        </SectionReveal>

        {/* What a club can run on Pinka */}
        <div className="mt-12 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <SectionReveal
                key={uc.key}
                delay={i * 0.05}
                className="card-base bg-white/80 hover:bg-white hover:shadow-soft border-ink/8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-teal/10 text-teal mb-5">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-display tracking-tight text-ink">
                  {t(`football.useCases.${uc.key}.title`)}
                </h3>
                <p className="mt-1.5 text-inkSoft leading-relaxed">
                  {t(`football.useCases.${uc.key}.body`)}
                </p>
              </SectionReveal>
            );
          })}
        </div>

        {/* Broader infrastructure + CTA */}
        <SectionReveal
          delay={0.15}
          className="mt-10 sm:mt-12 flex flex-col gap-5 rounded-lg border border-teal/20 bg-teal/[0.04] p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-2xl text-inkSoft leading-relaxed">
            <span className="font-display text-lg text-ink">{t("football.ctaLead")}</span>
            {t("football.ctaBody")}
          </p>
          <WaitlistDialog source="primary" initialRole="creator">
            <Button size="lg" className="shrink-0">
              {t("football.ctaButton")}
            </Button>
          </WaitlistDialog>
        </SectionReveal>
      </div>
    </section>
  );
}
