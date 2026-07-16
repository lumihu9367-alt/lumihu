"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface AccordionContextType {
  activeValue: string | null;
  toggleValue: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [activeValue, setActiveValue] = React.useState<string | null>(null);

  const toggleValue = (value: string) => {
    setActiveValue((prev) => (prev === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ activeValue, toggleValue }}>
      <div className={cn("space-y-4", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b border-stone-150 pb-4", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value } as any);
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({
  children,
  className,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value?: string;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");

  const isOpen = context.activeValue === value;

  return (
    <button
      type="button"
      onClick={() => value && context.toggleValue(value)}
      className={cn(
        "flex w-full items-center justify-between py-2 text-left font-medium text-stone-900 transition-all duration-300 hover:text-brand-dark cursor-pointer group",
        className
      )}
    >
      <span className="text-base font-semibold group-hover:translate-x-1 transition-transform duration-300">
        {children}
      </span>
      <ChevronDown
        className={cn(
          "h-5 w-5 text-stone-400 transition-transform duration-300 ease-out",
          {
            "rotate-180 text-brand-dark": isOpen,
          }
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value?: string;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");

  const isOpen = context.activeValue === value;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          <div className={cn("pt-2 pb-1 text-sm text-stone-600 leading-relaxed", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
