import { personal } from "./data";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col justify-center px-6 py-16 pt-24 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-4 font-mono text-sm text-accent-tech">
          &gt; Namaste, duniya!
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          I&apos;m {personal.firstName}
          <span className="ml-1 inline-block h-8 w-2 animate-pulse bg-accent-tech align-middle sm:h-10 md:h-12" />
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {personal.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            data-cursor-label="VIEW PROJECT"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View projects
          </a>
          <a
            href="#contact"
            data-cursor-label="LET'S TALK"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Get in touch
          </a>
        </div>
        <div className="mt-12 flex items-center gap-6 font-mono text-sm text-muted-foreground">
          <span>{personal.location}</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Open to opportunities</span>
        </div>
        <blockquote className="mt-14 max-w-xl border-l-2 border-accent-tech pl-5">
          <p className="font-mono text-sm leading-relaxed text-muted-foreground sm:text-base">
            &ldquo;{personal.philosophy}&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
}
