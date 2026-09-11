import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/portfolio/About";
import { Activity } from "@/components/portfolio/Activity";
import { Contact } from "@/components/portfolio/Contact";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Hero } from "@/components/portfolio/Hero";
import { Navigation } from "@/components/portfolio/Navigation";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { ChatWidget } from "@/components/ved-ai/ChatWidget";
import { CursorProvider } from "@/hooks/use-cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vedang Solaskar — DevOps & Cloud Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Vedang Solaskar — DevOps, Cloud and AWS projects, skills, GitHub activity and contact details.",
      },
      {
        property: "og:title",
        content: "Vedang Solaskar — DevOps & Cloud Engineer",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Vedang Solaskar — DevOps, Cloud and AWS projects, skills, GitHub activity and contact details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CursorProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Activity />
          <Projects />
          <Contact />
        </main>
        <ChatWidget />
        <CustomCursor />
        <footer className="border-t border-border px-6 py-8 md:px-12 lg:px-16">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <p className="font-mono text-xs text-muted-foreground">
              Built with ❤️ by Vedang
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              © 2026 Vedang&nbsp;
            </p>
          </div>
        </footer>
      </div>
    </CursorProvider>
  );
}
