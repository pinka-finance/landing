"use client";

import { SectionReveal } from "@/components/section-reveal";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { useI18n } from "@/lib/i18n";

export function WaitlistSection() {
  const { t } = useI18n();
  return (
    <section
      id="waitlist"
      className="section-padding bg-sand relative overflow-hidden"
      aria-labelledby="waitlist-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-coral/15 blur-3xl"
      />

      <div className="container-content relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <SectionReveal className="max-w-xl lg:sticky lg:top-32">
            <span className="eyebrow">{t("waitlistSection.eyebrow")}</span>
            <h2 id="waitlist-heading" className="mt-4 text-display-lg">
              {t("waitlistSection.heading")}
            </h2>
            <p className="mt-5 text-lg text-inkSoft leading-relaxed">
              {t("waitlistSection.intro")}
            </p>
            <ul className="mt-8 space-y-3 text-base text-inkSoft">
              <BulletItem>{t("waitlistSection.bullet1")}</BulletItem>
              <BulletItem>{t("waitlistSection.bullet2")}</BulletItem>
              <BulletItem>{t("waitlistSection.bullet3")}</BulletItem>
            </ul>
          </SectionReveal>

          <SectionReveal
            delay={0.1}
            className="rounded-lg border border-ink/8 bg-white/85 p-6 sm:p-8 shadow-soft"
          >
            <WaitlistForm source="primary" />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
        aria-hidden
      />
      <span>{children}</span>
    </li>
  );
}
