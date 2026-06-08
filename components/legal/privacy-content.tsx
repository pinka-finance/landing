"use client";

import Link from "next/link";
import { useI18n, Rich } from "@/lib/i18n";

export function PrivacyContent() {
  const { t } = useI18n();
  return (
    <article className="container-content max-w-3xl prose-content">
      <p className="eyebrow">{t("legal.privacy.eyebrow")}</p>
      <h1 className="mt-4 text-display-md">{t("legal.privacy.title")}</h1>
      <p className="mt-3 text-sm text-inkMuted">{t("legal.updated")}</p>

      <Section title={t("legal.privacy.whoTitle")}>
        <p>
          {t("legal.privacy.whoA1")}
          <a href="mailto:hello@pinka.finance" className="link">
            hello@pinka.finance
          </a>
          {t("legal.privacy.whoA2")}
        </p>
      </Section>

      <Section title={t("legal.privacy.collectTitle")}>
        <ul>
          <li>
            <Rich>{t("legal.privacy.collect1")}</Rich>
          </li>
          <li>
            <Rich>{t("legal.privacy.collect2")}</Rich>
          </li>
          <li>
            <Rich>{t("legal.privacy.collect3")}</Rich>
          </li>
          <li>
            <Rich>{t("legal.privacy.collect4")}</Rich>
          </li>
        </ul>
      </Section>

      <Section title={t("legal.privacy.whyTitle")}>
        <p>{t("legal.privacy.whyBody")}</p>
      </Section>

      <Section title={t("legal.privacy.shareTitle")}>
        <p>{t("legal.privacy.shareBody")}</p>
      </Section>

      <Section title={t("legal.privacy.rightsTitle")}>
        <p>
          {t("legal.privacy.rightsA1")}
          <a href="mailto:hello@pinka.finance" className="link">
            hello@pinka.finance
          </a>
          {t("legal.privacy.rightsA2")}
        </p>
      </Section>

      <Section title={t("legal.privacy.cookiesTitle")}>
        <p>{t("legal.privacy.cookiesBody")}</p>
      </Section>

      <p className="mt-12">
        <Link href="/" className="link">
          {t("legal.backHome")}
        </Link>
      </p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-inkSoft leading-relaxed [&_a.link]:text-coral [&_a.link]:underline-offset-2 [&_a.link:hover]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
