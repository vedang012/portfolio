import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "./data";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation({ night, onToggleNight }: { night: boolean; onToggleNight: () => void }) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      let current = "hero";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-3 md:px-12 lg:px-16">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#hero");
          }}
          className="font-mono text-sm font-semibold text-foreground"
        >
          &lt;/&gt;
        </a>
        <ul className="order-3 flex w-full justify-between gap-2 sm:order-none sm:w-auto sm:gap-6">
          {navLinks.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(href);
                  }}
                  className={cn(
                    "font-mono text-xs transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        <Button variant="ghost" size="icon" onClick={onToggleNight}
          aria-label={night ? "Switch to light mode" : "Switch to night mode"}
          aria-pressed={night} title={night ? "Light mode" : "Diwali night mode"}>
          {night ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </nav>
    </header>
  );
}
