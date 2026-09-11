import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { skills } from "./data";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className={cn(
        "px-6 py-20 transition-all duration-700 md:px-12 lg:px-16",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeader number="02" title="Skills" />
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-sm text-secondary-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
