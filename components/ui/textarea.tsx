import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex min-h-[88px] w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-inkMuted/70 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-cream focus:border-ink/30",
        "disabled:cursor-not-allowed disabled:opacity-60 resize-y",
        "aria-[invalid=true]:border-rust/60 aria-[invalid=true]:focus:ring-rust/40",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
