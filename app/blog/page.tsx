import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/lib/blog-data";
import { siteConfig } from "@/app/lib/site";
import { createMetadata } from "../lib/site";

export const metadata = createMetadata({
  title: "Fashion Journal",
  description:
    "Read editorial stories, sustainable fashion notes, and product design perspectives from the Fashion SaaS team.",
  path: "/blog",
  keywords: ["fashion blog", "style journal", "sustainable fashion"],
});

export default function BlogPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative flex h-[35vh] flex-col items-center justify-center">
        <Image
          src="/images/blog/blog-image5.jpg"
          alt="Blog header"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="mb-3 text-5xl font-bold">Our Blog</h1>
          <nav className="text-sm font-medium uppercase tracking-widest">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <span className="mx-2">&bull;</span>
            <span className="opacity-70">Our Blog</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="group flex flex-col">
              <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  <span>{post.date}</span>
                  <span className="mx-2">|</span>
                  <span className="text-slate-900">{post.category}</span>
                </div>
                <h2 className="text-xl font-bold leading-snug transition-colors group-hover:text-blue-600">
                  {post.title}
                </h2>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block border-b border-transparent pt-2 text-[11px] font-bold uppercase tracking-widest transition-all hover:border-slate-900"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-center space-x-4 text-sm font-bold">
          <span className="cursor-default border-b-2 border-slate-900 pb-1">01</span>
          <span className="cursor-pointer pb-1 text-slate-400 transition-colors hover:text-slate-900">
            02
          </span>
          <span className="cursor-pointer pb-1 text-slate-400 transition-colors hover:text-slate-900">
            &raquo;
          </span>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-start gap-12 text-center lg:grid-cols-3 lg:text-left">
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Contact Us</h4>
              <p className="text-sm text-slate-500">Email: {siteConfig.contact.email}</p>
              <p className="text-sm text-slate-500">Phone: {siteConfig.contact.phone}</p>
            </div>

            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-bold">Subscribe To Our Newsletter</h2>
              <form className="mx-auto flex max-w-md">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-1 border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-800"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] italic text-slate-400">
                By subscribing, you accept the Privacy Policy
              </p>
              <div className="flex justify-center space-x-6 pt-4">
                {["Fb", "Ig", "Yt"].map((label) => (
                  <span
                    key={label}
                    className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:text-right">
              <h4 className="text-sm font-bold">Our store</h4>
              <p className="text-sm leading-relaxed text-slate-500">
                {siteConfig.contact.address.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
