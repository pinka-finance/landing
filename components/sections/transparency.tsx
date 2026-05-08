"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/section-reveal";
import { cn } from "@/lib/utils";

const platforms = [
  { name: "Pinka", percent: 100, accent: "coral", note: "0% obavezno · opcionalna napojnica" },
  { name: "Stripe + manual", percent: 96.5, accent: "neutral", note: "~2.9% + €0.30 po transakciji" },
  { name: "Patreon", percent: 91, accent: "neutral", note: "5–12% platform fee + payment processing" },
  { name: "GoFundMe", percent: 87, accent: "neutral", note: "transaction + tip prompts" },
];

export function Transparency() {
  return (
    <section
      id="transparency"
      className="section-padding bg-sand"
      aria-labelledby="transparency-heading"
    >
      <div className="container-content">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
          <SectionReveal className="max-w-xl">
            <span className="eyebrow">Transparentnost</span>
            <h2 id="transparency-heading" className="mt-4 text-display-lg">
              Bez skrivenih naknada. Evo kako se uzdržavamo.
            </h2>
            <div className="mt-6 space-y-5 text-lg text-inkSoft leading-relaxed">
              <p>
                Pinka ne uzima proviziju s donacija. Pri uplati donator opcionalno može
                dodati malu napojnicu platformi — ti tipovi nas održavaju.
              </p>
              <p>
                Naš treasury je javan on-chain (link kad bude live), i koristimo ga za razvoj
                platforme i prinos preko reguliranih DeFi protokola.
              </p>
              <p className="font-display text-xl text-ink">
                100% donacija ide kreatoru ili organizaciji.
                <br />
                100% transparentno. 0% iznenađenja.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="rounded-lg border border-ink/8 bg-white/80 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-wider text-inkMuted">
                Koliko ide kreatoru od 100 € donacije
              </p>
              <ul className="mt-5 space-y-4">
                {platforms.map((p, i) => (
                  <li key={p.name}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          p.accent === "coral" ? "text-coral" : "text-ink"
                        )}
                      >
                        {p.name}
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
                    <p className="mt-1.5 text-xs text-inkMuted">{p.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-inkMuted leading-relaxed">
                Procjene; stvarne brojke variraju ovisno o regiji, planu i tipu kartice. Pinka
                postotak isključuje opcionalne napojnice koje donator sam bira.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
