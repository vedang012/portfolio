export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  content: string;
  readingMinutes: number;
}

type Frontmatter = Record<string, string | string[] | boolean>;

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Frontmatter = {};
  for (const line of (match[1] ?? "").split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (!key) continue;

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    value = value.replace(/^["']|["']$/g, "");
    if (value === "true" || value === "false") {
      data[key] = value === "true";
      continue;
    }
    data[key] = value;
  }

  return { data, body: raw.slice(match[0].length) };
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const allPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = (path.split("/").pop() ?? "").replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(raw);
    const words = body.trim().split(/\s+/).filter(Boolean).length;

    return {
      slug,
      title: asString(data["title"], slug),
      description: asString(data["description"]),
      date: asString(data["date"]),
      tags: Array.isArray(data["tags"]) ? data["tags"] : [],
      draft: data["draft"] === true,
      content: body.trim(),
      readingMinutes: Math.max(1, Math.round(words / 200)),
    } satisfies BlogPost;
  })
  .filter((post) => !post.draft)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getBlogPosts(): BlogPost[] {
  return allPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
