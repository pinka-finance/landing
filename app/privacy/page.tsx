import type { Metadata } from "next";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { PrivacyContent } from "@/components/legal/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Kako pinka.finance prikuplja, koristi i čuva osobne podatke.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-32 pb-24">
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
