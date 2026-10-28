import { Link, createFileRoute } from "@tanstack/react-router";

import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { formatPostDate, getBlogPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Vedang Solaskar" },
      {
        name: "description",
        content:
          "Notes on DevOps, cloud, containers and CI/CD from Vedang Solaskar.",
      },
      { property: "og:title", content: "Blog — Vedang Solaskar" },
      {
        property: "og:description",
        content:
          "Notes on DevOps, cloud, containers and CI/CD from Vedang Solaskar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getBlogPosts();

  return (
    <section className="px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeader number="06" title="Blog" />
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Notes from the terminal — deployments, containers, pipelines, and the
          things that broke on the way.
        </p>

        {posts.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                data-cursor-label="READ"
                className="block rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent-tech/50"
              >
                <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                  <span>{formatPostDate(post.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {post.title}
                </h3>
                {post.description ? (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                ) : null}
                {post.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-accent-tech"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
