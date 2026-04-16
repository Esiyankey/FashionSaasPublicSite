import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/app/lib/blog-data";
import { createMetadata } from "@/app/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return createMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    keywords: [post.category, "fashion article", post.title],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/blog"
        className="text-xs uppercase tracking-[0.3em] text-amber-900 hover:text-amber-700"
      >
        Back to Journal
      </Link>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
          {post.category}
        </p>
        <h1 className="mt-4 text-4xl leading-tight text-gray-900 md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gray-500">{post.date}</p>
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
        <Image src={post.image} alt={post.title} fill priority className="object-cover" />
      </div>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-gray-700">
        <p>{post.excerpt}</p>
        <p>
          Fashion SaaS focuses on clear storytelling, durable product thinking, and
          wardrobe decisions that age well. This article expands on those themes with a
          practical, editorial perspective designed for modern shoppers.
        </p>
        <p>
          When product pages, editorial content, and collection design speak the same
          language, the result is a stronger brand experience and a more useful shopping
          journey. That alignment is what this journal is intended to support.
        </p>
      </div>
    </article>
  );
}
