"use client";

import { Mail, Linkedin, Code2 } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { useI18n, Rich } from "@/lib/i18n";

export function Team() {
  const { t } = useI18n();
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
            <span className="eyebrow">{t("team.eyebrow")}</span>
            <h2 id="team-heading" className="mt-4 text-display-lg">
              {t("team.heading")}
            </h2>
            <div className="mt-5 space-y-4 text-lg text-inkSoft leading-relaxed [&_strong]:font-normal [&_strong]:text-ink">
              <p>
                <Rich>{t("team.p1")}</Rich>
              </p>
              <p>{t("team.p2")}</p>
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
                {t("team.linkedin")}
              </a>
            </div>

            <div className="mt-8 rounded-md border border-coral/30 bg-coral/[0.06] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-coral text-cream">
                  <Code2 className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-ink">{t("team.hiringTitle")}</p>
                  <p className="mt-0.5 text-sm text-inkSoft">
                    {t("team.hiringBody")}
                    <a
                      href="mailto:hello@pinka.finance?subject=Pinka%20%E2%80%94%20Razvojna%20uloga"
                      className="text-coral underline-offset-2 hover:underline"
                    >
                      {t("team.hiringLink")}
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
  const { t } = useI18n();
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
          <p className="mt-4 font-display text-xl text-ink">{t("team.portraitFounder")}</p>
          <p className="mt-0.5 text-sm text-inkMuted">{t("team.portraitMeta")}</p>
        </div>
      </div>

      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ink shadow-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden />
        {t("team.portraitBadge")}
      </div>
    </div>
  );
}
