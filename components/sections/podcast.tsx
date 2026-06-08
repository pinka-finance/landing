"use client";

import {
  Mic,
  Repeat,
  Sparkles,
  Rocket,
  Ticket,
  ShieldCheck,
  ArrowUpRight,
  PlugZap,
} from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/waitlist/waitlist-dialog";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const stats = [
  { key: "statFixed" },
  { key: "statLost" },
  { key: "statPatreon" },
  { key: "statPinka", highlight: true },
] as const;

const useCases = [
  { icon: Mic, key: "tipPerEpisode" },
  { icon: Repeat, key: "membership" },
  { icon: Sparkles, key: "exclusive" },
  { icon: Rocket, key: "season" },
  { icon: Ticket, key: "live" },
  { icon: ShieldCheck, key: "direct" },
] as const;

export function Podcast() {
  const { t } = useI18n();
  return (
    <section
      id="podcast"
      className="section-padding bg-cream relative overflow-x-clip"
      aria-labelledby="podcast-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-coral/10 blur-3xl"
      />

      <div className="container-content relative">
        <SectionReveal className="max-w-3xl">
          <span className="eyebrow">{t("podcast.eyebrow")}</span>
          <h2 id="podcast-heading" className="mt-4 text-display-lg">
            {t("podcast.heading")}
          </h2>
          <p className="mt-5 text-lg text-inkSoft">{t("podcast.intro")}</p>
        </SectionReveal>

        {/* The fee problem, in numbers */}
        <SectionReveal delay={0.05} className="mt-10">
          <div className="rounded-lg border border-ink/8 bg-white/70 p-6 sm:p-8">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
              {stats.map((s) => (
                <div key={s.key} className="text-center sm:text-left">
                  <dt className="sr-only">{t(`podcast.${s.key}`)}</dt>
                  <dd>
                    <span
                      className={cn(
                        "block font-display text-3xl sm:text-4xl leading-none",
                        "highlight" in s && s.highlight ? "text-coral" : "text-ink"
                      )}
                    >
                      {t(`podcast.${s.key}Val`)}
                    </span>
                    <span className="mt-1 block text-sm text-inkMuted">
                      {t(`podcast.${s.key}`)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-inkMuted">
              <span>{t("podcast.feeNote")}</span>
              <a
                href="#transparency"
                className="inline-flex items-center gap-1 font-medium text-coral underline-offset-4 hover:underline focus-ring rounded-sm shrink-0"
              >
                {t("podcast.feeLink")}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </p>
          </div>
        </SectionReveal>

        {/* Native integration with the DOMOVINA podcast ecosystem */}
        <SectionReveal delay={0.1} className="mt-5">
          <div className="rounded-lg border border-teal/20 bg-teal/[0.04] p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
                <PlugZap className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <span className="inline-flex items-center rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-teal">
                  {t("podcast.nativeBadge")}
                </span>
                <h3 className="mt-2 font-display text-lg sm:text-xl tracking-tight text-ink">
                  {t("podcast.nativeTitle")}
                </h3>
                <p className="mt-1.5 max-w-2xl text-inkSoft leading-relaxed">
                  {t("podcast.nativeBody")}
                </p>
              </div>
            </div>
            <a
              href="https://domovina.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-teal underline-offset-4 hover:underline focus-ring rounded-sm shrink-0 sm:self-start"
            >
              {t("podcast.nativeLink")}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </SectionReveal>

        {/* What a podcaster can run on Pinka */}
        <div className="mt-12 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <SectionReveal
                key={uc.key}
                delay={i * 0.05}
                className="card-base bg-white/80 hover:bg-white hover:shadow-soft border-ink/8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-coral/10 text-coral mb-5">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-display tracking-tight text-ink">
                  {t(`podcast.useCases.${uc.key}.title`)}
                </h3>
                <p className="mt-1.5 text-inkSoft leading-relaxed">
                  {t(`podcast.useCases.${uc.key}.body`)}
                </p>
              </SectionReveal>
            );
          })}
        </div>

        {/* CTA */}
        <SectionReveal
          delay={0.15}
          className="mt-10 sm:mt-12 flex flex-col gap-5 rounded-lg border border-coral/20 bg-coral/[0.04] p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-2xl text-inkSoft leading-relaxed">
            <span className="font-display text-lg text-ink">{t("podcast.ctaLead")}</span>
            {t("podcast.ctaBody")}
          </p>
          <div className="flex flex-col items-stretch gap-2 sm:items-end shrink-0">
            <WaitlistDialog source="primary" initialRole="creator">
              <Button size="lg" className="w-full sm:w-auto">
                {t("podcast.ctaButton")}
              </Button>
            </WaitlistDialog>
            <a
              href="https://pinka.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-sm font-medium text-teal hover:text-teal-700 transition-colors focus-ring rounded-md px-2 py-1"
            >
              {t("podcast.ctaPreview")}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
