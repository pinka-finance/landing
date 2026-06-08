"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionReveal } from "@/components/section-reveal";
import { useI18n } from "@/lib/i18n";

export function FAQ() {
  const { t } = useI18n();

  const link = "text-coral underline-offset-2 hover:underline";
  const faqs: { q: string; a: React.ReactNode }[] = [
    { q: t("faq.wallet.q"), a: t("faq.wallet.a") },
    { q: t("faq.types.q"), a: t("faq.types.a") },
    {
      q: t("faq.regulated.q"),
      a: (
        <>
          {t("faq.regulated.a1")}
          <a href="https://monerium.com" target="_blank" rel="noopener noreferrer" className={link}>
            {t("faq.regulated.link")}
          </a>
          {t("faq.regulated.a2")}
        </>
      ),
    },
    { q: t("faq.cost.q"), a: t("faq.cost.a") },
    { q: t("faq.taxes.q"), a: t("faq.taxes.a") },
    { q: t("faq.custody.q"), a: t("faq.custody.a") },
    { q: t("faq.countries.q"), a: t("faq.countries.a") },
    {
      q: t("faq.who.q"),
      a: (
        <>
          {t("faq.who.a")}
          <a href="mailto:hello@pinka.finance" className={link}>
            hello@pinka.finance
          </a>
          .
        </>
      ),
    },
    {
      q: t("faq.launch.q"),
      a: (
        <>
          {t("faq.launch.a1")}
          <a href="#waitlist" className={link}>
            {t("faq.launch.link")}
          </a>
          {t("faq.launch.a2")}
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="section-padding bg-cream" aria-labelledby="faq-heading">
      <div className="container-content max-w-3xl">
        <SectionReveal>
          <span className="eyebrow">{t("faq.eyebrow")}</span>
          <h2 id="faq-heading" className="mt-4 text-display-lg">
            {t("faq.heading")}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.05} className="mt-10">
          <Accordion type="single" collapsible className="border-t border-ink/10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </div>
    </section>
  );
}
