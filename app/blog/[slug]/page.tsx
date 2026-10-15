import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/services/storefront.service";
import { ApiError } from "@/services/http-client";
import { MarkdownContent } from "@/components/shared/MarkdownContent";

type Props = { params: Promise<{ slug: string }> };

async function loadPost(slug: string) {
  try {
    return await getBlogPost(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.seo.title || post.title, description: post.seo.description || post.excerpt };
}

export const dynamicParams = true;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  return <article className="mx-auto max-w-4xl px-6 py-16">
    <Link href="/blog" className="text-xs uppercase tracking-[0.3em] text-primary hover:underline">Back to Journal</Link>
    <header className="mt-8">
      {post.category && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">{post.category.name}</p>}
      <h1 className="mt-4 text-4xl leading-tight text-gray-900 md:text-6xl">{post.title}</h1>
      {post.publishedAt && <time dateTime={post.publishedAt} className="mt-4 block text-sm uppercase tracking-[0.2em] text-gray-500">{new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time>}
      {post.authorName && <p className="mt-2 text-sm text-gray-500">By {post.authorName}</p>}
    </header>
    <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-slate-100">{post.coverImageUrl && <Image src={post.coverImageUrl} alt={post.coverImageAlt || post.title} fill priority sizes="(max-width: 900px) 100vw, 900px" className="object-cover" />}</div>
    <div className="mt-10"><MarkdownContent content={post.content} /></div>
  </article>;
}
