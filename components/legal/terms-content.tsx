"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function TermsContent() {
  const { t } = useI18n();
  return (
    <article className="container-content max-w-3xl">
      <p className="eyebrow">{t("legal.terms.eyebrow")}</p>
      <h1 className="mt-4 text-display-md">{t("legal.terms.title")}</h1>
      <p className="mt-3 text-sm text-inkMuted">{t("legal.updated")}</p>

      <Section title={t("legal.terms.prelaunchTitle")}>
        <p>{t("legal.terms.prelaunchBody")}</p>
      </Section>

      <Section title={t("legal.terms.noAdviceTitle")}>
        <p>{t("legal.terms.noAdviceBody")}</p>
      </Section>

      <Section title={t("legal.terms.noTokenTitle")}>
        <p>{t("legal.terms.noTokenBody")}</p>
      </Section>

      <Section title={t("legal.terms.securityTitle")}>
        <p>
          {t("legal.terms.securityA1")}
          <a
            href="mailto:security@pinka.finance"
            className="text-coral underline-offset-2 hover:underline"
          >
            security@pinka.finance
          </a>
          {t("legal.terms.securityA2")}
          <a
            href="https://github.com/pinka-finance"
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral underline-offset-2 hover:underline"
          >
            {t("legal.terms.securityLink2")}
          </a>
          {t("legal.terms.securityA3")}
        </p>
      </Section>

      <Section title={t("legal.terms.lawTitle")}>
        <p>{t("legal.terms.lawBody")}</p>
      </Section>

      <p className="mt-12">
        <Link href="/" className="text-coral underline-offset-2 hover:underline">
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
      <div className="mt-3 space-y-3 text-inkSoft leading-relaxed">{children}</div>
    </section>
  );
}
