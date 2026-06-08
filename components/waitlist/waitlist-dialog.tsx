"use client";

import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { useI18n } from "@/lib/i18n";
import type { Role } from "@/lib/waitlist-schema";

type Props = {
  children: ReactNode;
  source?: "primary" | "footer" | "modal";
  initialRole?: Role;
};

export function WaitlistDialog({ children, source = "modal", initialRole }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("dialog.title")}</DialogTitle>
          <DialogDescription>{t("dialog.description")}</DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <WaitlistForm source={source} initialRole={initialRole} compact />
        </div>
      </DialogContent>
    </Dialog>
  );
}
