import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { personal } from "./data";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={cn(
        "px-6 py-20 transition-all duration-700 md:px-12 lg:px-16",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeader number="01" title="About" />
        <p className="text-lg leading-relaxed text-foreground md:text-xl">
          {personal.bio}
        </p>
      </div>
    </section>
  );
}
