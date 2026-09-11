import { ExternalLink, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { projects } from "./data";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="projects"
      ref={ref}
      className={cn(
        "px-6 py-20 transition-all duration-700 md:px-12 lg:px-16",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeader number="04" title="Projects" />
        <div className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.id}
              data-cursor-label="VIEW PROJECT"
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent-tech/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.number}
                    </span>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="OPEN"
                    aria-label={`${project.title} repository`}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="OPEN"
                    aria-label={`${project.title} live demo`}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-accent-tech"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
