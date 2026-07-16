import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-brand-dark disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-98",
          // Variants
          {
            "bg-brand-dark text-white shadow-xs hover:bg-brand-medium": variant === "default",
            "bg-rose-600 text-white shadow-xs hover:bg-rose-700": variant === "destructive",
            "border border-stone-200 bg-white hover:bg-stone-50 hover:text-stone-900": variant === "outline",
            "bg-brand-pale text-brand-dark shadow-xs hover:bg-brand-pale/80": variant === "secondary",
            "hover:bg-stone-100 hover:text-stone-900": variant === "ghost",
            "text-brand-dark underline-offset-4 hover:underline bg-transparent p-0": variant === "link",
          },
          // Sizes
          {
            "h-10 px-6 py-2 rounded-lg": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-12 rounded-lg px-8 text-base": size === "lg",
            "h-10 w-10 rounded-full": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
