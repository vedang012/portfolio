# Blog section — write a file, publish an article

## How publishing will work

To publish a new article you add one markdown file to `src/content/blog/`, for example
`docker-multi-stage-builds.md`. Nothing else needs touching — the blog list, the article
page, the URL, and the page title all come from that file.

Each file starts with a small info block, then the article itself:

```text
---
title: Multi-stage Docker builds that actually shrink your image
description: Cutting a 900MB Java image down to 180MB.
date: 2026-09-17
tags: [Docker, Java, DevOps]
---

## Why it matters

Regular markdown from here on — headings, lists, links, quotes,
tables, images, and code blocks with syntax highlighting.
```

Delete the file and the article disappears. Change the filename and the URL changes with it.

## What gets built

- **`/blog`** — a list page in the same terminal/monospace style as the portfolio:
  section-numbered header, each post as a neat card with date, title, description and tags.
  Newest first. Drafts (`draft: true`) are hidden.
- **`/blog/<file-name>`** — the article page: title, date, reading time, tags, back link,
  and the full markdown rendered with proper typography and highlighted code blocks.
  Unknown slugs show a "post not found" page.
- **Blog link in the top navigation** on the portfolio, so visitors can reach it. Article
  and list pages carry the same nav and footer for a consistent feel.
- Two starter articles so the section isn't empty, which you can edit or delete.

Everything works with markdown: headings, bold/italic, links, lists, tables, blockquotes,
inline code, fenced code blocks with language highlighting, images, and horizontal rules.

## Technical notes

- Posts are collected at build time with `import.meta.glob('../content/blog/*.md', { query: '?raw', eager: true })`
  in `src/lib/blog.ts`, which parses the frontmatter, derives the slug from the filename,
  computes reading time, sorts by date, and filters drafts. No database, no server calls,
  no runtime fetching — posts are baked into the build and render fully during SSR.
- Rendering uses the already-installed `streamdown` (plus its `@streamdown/code`
  highlighting) so no new dependencies are needed. Frontmatter parsing is a small local
  helper — no `gray-matter` install.
- New routes: `src/routes/blog.tsx` (layout with `<Outlet />`), `src/routes/blog.index.tsx`
  (list), `src/routes/blog.$slug.tsx` (article, with `notFound()` on unknown slug).
- Each route defines its own `head()`: the list page gets blog-level title/description;
  the article page derives title, description, `og:title`, `og:description` and
  `og:type: article` from the post's frontmatter.
- Nav: `src/components/portfolio/data.ts` gains a Blog entry, and `Navigation.tsx` handles
  it as a router `Link` to `/blog` rather than a hash scroll, keeping the existing
  scroll-spy behaviour for on-page sections. Existing section styling, cursor labels and
  reveal animations are reused.
