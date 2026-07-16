import * as React from "react";
import { cn } from "@/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 select-none",
        {
          "border-transparent bg-brand-dark text-white": variant === "default",
          "border-transparent bg-brand-pale text-brand-dark": variant === "secondary",
          "border-transparent bg-rose-50 text-rose-700 border border-rose-200": variant === "destructive",
          "border-stone-200 bg-white text-stone-700": variant === "outline",
          "border-transparent bg-emerald-500 text-white": variant === "accent",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
