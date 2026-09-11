import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { personal } from "./data";
import { SectionHeader } from "./SectionHeader";

type ContributionDay = { date: string; count: number; level: number };

const levelClasses = [
  "bg-secondary",
  "bg-accent-tech/25",
  "bg-accent-tech/50",
  "bg-accent-tech/75",
  "bg-accent-tech",
];

function toWeeks(days: ContributionDay[]) {
  if (days.length === 0) return [];
  const padded: (ContributionDay | null)[] = [];
  const firstWeekday = new Date(days[0]!.date).getUTCDay();
  for (let i = 0; i < firstWeekday; i++) padded.push(null);
  padded.push(...days);
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

export function Activity() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${personal.githubUsername}?y=last`
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = (await res.json()) as {
          total: Record<string, number>;
          contributions: ContributionDay[];
        };
        if (cancelled) return;
        const recent = json.contributions.slice(-371);
        setDays(recent);
        setTotal(recent.reduce((sum, day) => sum + day.count, 0));
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = toWeeks(days);

  return (
    <section
      id="activity"
      ref={ref}
      className={cn(
        "px-6 py-20 transition-all duration-700 md:px-12 lg:px-16",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeader number="03" title="Activity" />
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
            <span>
              $ git log --author={personal.githubUsername} --since=&quot;1 year ago&quot;
            </span>
            {status === "ready" && (
              <span className="text-accent-tech">
                {total} commits in the last year
              </span>
            )}
          </div>

          {status === "loading" && (
            <p className="font-mono text-sm text-muted-foreground">
              loading contribution graph…
            </p>
          )}

          {status === "error" && (
            <p className="font-mono text-sm text-muted-foreground">
              Couldn&apos;t load the contribution graph right now.{" "}
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="text-accent-tech underline-offset-4 hover:underline"
              >
                View it on GitHub
              </a>
              .
            </p>
          )}

          {status === "ready" && (
            <>
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) =>
                        day ? (
                          <span
                            key={day.date}
                            title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                            className={cn(
                              "h-3 w-3 rounded-[2px]",
                              levelClasses[day.level] ?? levelClasses[0]
                            )}
                          />
                        ) : (
                          <span
                            key={`empty-${weekIndex}-${dayIndex}`}
                            className="h-3 w-3 rounded-[2px]"
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span>less</span>
                {levelClasses.map((cls) => (
                  <span key={cls} className={cn("h-3 w-3 rounded-[2px]", cls)} />
                ))}
                <span>more</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
