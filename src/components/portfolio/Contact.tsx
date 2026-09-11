import { Github, Linkedin, Mail } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { personal, socialLinks } from "./data";
import { SectionHeader } from "./SectionHeader";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className={cn(
        "px-6 py-20 pb-28 transition-all duration-700 md:px-12 lg:px-16",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeader number="05" title="Contact" />
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-foreground">
          Have a project in mind or just want to say hi? Send me an email and
          I&apos;ll get back to you.
        </p>
        <a
          href={`mailto:${personal.email}`}
          data-cursor-label="LET'S TALK"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Mail className="mr-2 h-4 w-4" />
          &nbsp;hit me up!
        </a>
        <div className="mt-12 flex gap-6">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              data-cursor-label="OPEN"
              aria-label={label}
              className="group flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              <span className="border-b border-transparent transition-colors group-hover:border-foreground">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
