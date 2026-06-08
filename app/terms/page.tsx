import type { Metadata } from "next";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { TermsContent } from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Uvjeti korištenja pinka.finance landing stranice.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-32 pb-24">
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
