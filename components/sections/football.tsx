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

const stats = [
  { value: "901", label: "klub" },
  { value: "452", label: "stadiona" },
  { value: "7.163", label: "igrališta" },
  { value: "21", label: "županija" },
];

const useCases = [
  {
    icon: Users,
    title: "Članarine",
    body: "Igrači, mladež i članovi plaćaju skenom — roditelj jednim QR-om, klub odmah vidi tko je uplatio.",
  },
  {
    icon: Shirt,
    title: "Oprema i putovanja",
    body: "Dresovi za pionire, put na turnir, lopte za sezonu — kampanja s ciljanim iznosom.",
  },
  {
    icon: Hammer,
    title: "Obnova igrališta",
    body: "Svlačionica, reflektori, tribina. Velika emotivna akcija cijelog mjesta, transparentno on-chain.",
  },
  {
    icon: Ticket,
    title: "Ulaznice",
    body: "Derbi ili event — prodaja ulaznica gdje svaka kupnja troši komad iz zalihe.",
  },
  {
    icon: Heart,
    title: "Donacije i dijaspora",
    body: "Jednokratno ili trajno, bez protučinidbe. Idealno za podršku iseljenika svom rodnom klubu.",
  },
  {
    icon: Sparkles,
    title: "Navijački status",
    body: "On-chain potvrda članstva i podrške (badge). Pripadnost, ne vrijednosni papir — bez dividendi.",
  },
];

export function Football() {
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
          <span className="eyebrow">Vertikala · nogomet</span>
          <h2 id="football-heading" className="mt-4 text-display-lg">
            Krećemo tamo gdje je emocija najveća.
          </h2>
          <p className="mt-5 text-lg text-inkSoft">
            Amaterski nogomet je najjača lokalna zajednica u Hrvatskoj — i ona koja novac
            danas skuplja najteže: gotovinom, uplatnicama i privatnim računima. Klubovi već
            prikupljaju; Pinka to samo digitalizira, transparentno i bez provizija.
          </p>
        </SectionReveal>

        {/* Market scale — from the DOMOVINA football map */}
        <SectionReveal delay={0.05} className="mt-10">
          <div className="rounded-lg border border-ink/8 bg-white/70 p-6 sm:p-8">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl sm:text-4xl text-teal leading-none">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-sm text-inkMuted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-inkMuted">
              <span>
                Cijela hrvatska nogometna mreža, popisana i geolocirana iz HNS-a, SofaScorea,
                HR-nogometa i Registra udruga.
              </span>
              <a
                href="https://gis.domovina.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-teal underline-offset-4 hover:underline focus-ring rounded-sm shrink-0"
              >
                Vidi sve na karti
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
                key={uc.title}
                delay={i * 0.05}
                className="card-base bg-white/80 hover:bg-white hover:shadow-soft border-ink/8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-teal/10 text-teal mb-5">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-display tracking-tight text-ink">{uc.title}</h3>
                <p className="mt-1.5 text-inkSoft leading-relaxed">{uc.body}</p>
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
            <span className="font-display text-lg text-ink">Nogomet je tek početak.</span>{" "}
            Isti rail radi za svaku zajednicu koja skuplja novac — sportske klubove,
            vatrogasce, kulturne udruge, škole, vjerske i lokalne inicijative, dijasporu.
          </p>
          <WaitlistDialog source="primary" initialRole="creator">
            <Button size="lg" className="shrink-0">
              Prijavi svoj klub
            </Button>
          </WaitlistDialog>
        </SectionReveal>
      </div>
    </section>
  );
}
