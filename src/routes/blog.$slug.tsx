import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { MessageResponse } from "@/components/ai-elements/message";
import { formatPostDate, getBlogPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Post not found — Vedang Solaskar" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const { title, description } = loaderData.post;
    const fullTitle = `${title} — Vedang Solaskar`;

    return {
      meta: [
        { title: fullTitle },
        { name: "description", content: description },
        { property: "og:title", content: fullTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: BlogPostPage,
});

function PostNotFound() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-foreground">
          Post not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This article doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent-tech"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>
      </div>
    </section>
  );
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <article className="px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          to="/blog"
          data-cursor-label="BACK"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All posts
        </Link>

        <header className="mb-10 mt-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{formatPostDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h1>
          {post.description ? (
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          ) : null}
          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-accent-tech">
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-8 h-px w-full bg-border" />
        </header>

        <MessageResponse className="prose-blog text-base leading-relaxed">
          {post.content}
        </MessageResponse>
      </div>
    </article>
  );
}
