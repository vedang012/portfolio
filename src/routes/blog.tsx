import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { CursorProvider } from "@/hooks/use-cursor";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <CursorProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 md:px-12 lg:px-16">
            <Link
              to="/"
              data-cursor-label="HOME"
              className="font-mono text-sm font-semibold text-foreground"
            >
              &lt;/&gt;
            </Link>
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/"
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  activeOptions={{ exact: true }}
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
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
        <CustomCursor />
      </div>
    </CursorProvider>
  );
}
