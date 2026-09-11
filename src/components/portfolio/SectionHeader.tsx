import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionHeader({ number, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 flex items-baseline gap-4", className)}>
      <span className="font-mono text-sm text-accent-tech">{number}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="ml-4 hidden h-px flex-1 bg-border sm:block" />
    </div>
  );
}
