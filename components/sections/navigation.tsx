"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WaitlistDialog } from "@/components/waitlist/waitlist-dialog";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n";

export function Navigation() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-ink/8 shadow-[0_1px_0_0_rgba(26,26,26,0.04)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        aria-label={t("nav.ariaLabel")}
        className="container-hero flex h-16 sm:h-[72px] items-center justify-between"
      >
        <a href="#" className="focus-ring rounded-md -m-1 p-1" aria-label={t("nav.homeAria")}>
          <Logo />
        </a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <WaitlistDialog source="primary">
            <Button size="sm">
              <span className="hidden sm:inline">{t("nav.cta")}</span>
              <span className="sm:hidden">{t("nav.ctaShort")}</span>
            </Button>
          </WaitlistDialog>
        </div>
      </nav>
    </header>
  );
}
