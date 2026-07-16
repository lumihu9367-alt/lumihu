import { cn } from "@/utils/cn";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 md:mb-16 max-w-3xl",
        {
          "mx-auto text-center items-center": align === "center",
          "text-left items-start": align === "left",
        },
        className
      )}
    >
      {badge && (
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-dark bg-brand-pale px-3.5 py-1 rounded-full mb-3 inline-block select-none animate-pulse">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-stone-500 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
