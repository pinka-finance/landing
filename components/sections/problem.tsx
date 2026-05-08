import { CreditCard, Hourglass, Receipt } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

const items = [
  {
    icon: CreditCard,
    title: "Kartični procesori uzimaju 2–5%",
    body: "od svake donacije. Mali kreatori najviše gube — od 100 € prikupljenih, 5 € odlazi prije nego što išta vide.",
  },
  {
    icon: Hourglass,
    title: "Bankovni transferi traju danima.",
    body: "Kreator ne zna kada će novac stići, a donator ne zna je li uopće pristigao. Povratna petlja je razbijena.",
  },
  {
    icon: Receipt,
    title: "Postojeće platforme uzimaju 5–15%.",
    body: "Patreon, GoFundMe, Buy Me a Coffee — svaka ima svoju proviziju, svaka traži svoj račun, svaka ima svoja pravila.",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      className="section-padding bg-sand"
      aria-labelledby="problem-heading"
    >
      <div className="container-content">
        <SectionReveal className="max-w-3xl">
          <span className="eyebrow">Problem</span>
          <h2 id="problem-heading" className="mt-4 text-display-lg">
            Donacije ne bi trebale biti komplicirane.
          </h2>
          <p className="mt-5 text-lg text-inkSoft">
            Današnja infrastruktura kažnjava male kreatore i organizacije. Što manje primaš, to
            te provizija više boli.
          </p>
        </SectionReveal>

        <div className="mt-12 sm:mt-14 grid md:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <SectionReveal
                key={it.title}
                delay={i * 0.06}
                className="card-base bg-white/80 hover:bg-white hover:shadow-soft border-ink/8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-coral/10 text-coral mb-5">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-xl font-display tracking-tight text-ink">{it.title}</h3>
                <p className="mt-2 text-inkSoft leading-relaxed">{it.body}</p>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.2} className="mt-10 sm:mt-12 text-center">
          <p className="font-display text-2xl sm:text-3xl text-ink">
            Zato gradimo <span className="gradient-text">pinku</span>.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
