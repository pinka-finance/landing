import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { BuiltOn } from "@/components/sections/built-on";
import { Transparency } from "@/components/sections/transparency";
import { Roadmap } from "@/components/sections/roadmap";
import { Team } from "@/components/sections/team";
import { FAQ } from "@/components/sections/faq";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <BuiltOn />
        <Transparency />
        <Roadmap />
        <Team />
        <FAQ />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
