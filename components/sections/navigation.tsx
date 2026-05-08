"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WaitlistDialog } from "@/components/waitlist/waitlist-dialog";

export function Navigation() {
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
        aria-label="Glavna navigacija"
        className="container-hero flex h-16 sm:h-[72px] items-center justify-between"
      >
        <a href="#" className="focus-ring rounded-md -m-1 p-1" aria-label="pinka — početna">
          <Logo />
        </a>
        <WaitlistDialog source="primary">
          <Button size="sm">
            <span className="hidden sm:inline">Pridruži se waitlist-u</span>
            <span className="sm:hidden">Waitlist</span>
          </Button>
        </WaitlistDialog>
      </nav>
    </header>
  );
}
