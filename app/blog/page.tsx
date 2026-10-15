import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { getBlogPosts, getStorefrontHome } from "@/services/storefront.service";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { siteConfig } from "@/app/lib/site";

export default async function BlogPage() {
  const [result, storefront] = await Promise.all([getBlogPosts({ page: 1, pageSize: 24 }), getStorefrontHome()]);
  const posts = result.items;
  const heroImage = storefront.hero?.imageUrl || "/images/blog/blog-image5.jpg";

  return (
    <div className="bg-white text-slate-900">
      <section className="relative flex h-[35vh] flex-col items-center justify-center">
        <Image src={heroImage} alt={storefront.hero?.imageAlt || "Blog Header"} fill priority sizes="100vw" className="object-cover brightness-75" />
        <div className="relative z-10 text-center text-white">
          <h1 className="mb-3 text-5xl font-bold">Our Blog</h1>
          <nav className="text-sm font-medium uppercase tracking-widest">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <span className="mx-2">&bull;</span>
            <span className="opacity-70">Our Blog</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        {posts.length ? <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col">
              <Link href={`/blog/${post.slug}`} className="relative mb-6 block aspect-[4/5] overflow-hidden bg-slate-100">
                {post.coverImageUrl && <Image src={post.coverImageUrl} alt={post.coverImageAlt || post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              </Link>
              <div className="space-y-3">
                <div className="flex items-center text-[10px] font-bold tracking-[0.15em] text-slate-400">
                  {post.publishedAt && <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.publishedAt))}</time>}
                  {post.category && <><span className="mx-2">|</span><span className="text-slate-900">{post.category.name}</span></>}
                </div>
                <h2 className="text-xl font-bold leading-snug transition-colors group-hover:text-blue-600">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-block border-b border-transparent pt-2 text-[11px] font-bold uppercase tracking-widest transition-all hover:border-slate-900">Read More</Link>
              </div>
            </article>
          ))}
        </div> : <p className="py-12 text-center text-slate-500">No articles have been published yet.</p>}

        <div className="mt-20 flex items-center justify-center space-x-4 text-sm font-bold">
          <span className="cursor-default border-b-2 border-slate-900 pb-1">01</span>
          <span className="cursor-pointer pb-1 text-slate-400 transition-colors hover:text-slate-900">02</span>
          <span className="cursor-pointer pb-1 text-slate-400 transition-colors hover:text-slate-900">&raquo;</span>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-start gap-12 text-center lg:grid-cols-3 lg:text-left">
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Contact Us</h4>
              <p className="text-sm text-slate-500">Email: {storefront.contact.email || siteConfig.contact.email}</p>
              <p className="text-sm text-slate-500">Phone: {storefront.contact.phone || siteConfig.contact.phone}</p>
            </div>
            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-bold">Subscribe To Our Newsletter</h2>
              <NewsletterForm />
              <p className="text-[10px] italic text-slate-400">By subscribing, you accept the Privacy Policy</p>
              <div className="flex justify-center space-x-6 pt-4">
                {storefront.socialLinks.length ? storefront.socialLinks.map(({ platform, url }) => {
                  const Icon = platform.toLowerCase().includes("instagram") ? FaInstagram
                    : platform.toLowerCase().includes("youtube") ? FaYoutube
                      : platform.toLowerCase().includes("twitter") || platform.toLowerCase() === "x" ? FaXTwitter : FaFacebookF;
                  return <Link key={platform} href={url} aria-label={platform} className="transition-colors hover:text-blue-600"><Icon className="size-4" /></Link>;
                }) : <><FaFacebookF className="size-4" /><FaInstagram className="size-4" /><FaXTwitter className="size-4" /><FaYoutube className="size-4" /></>}
              </div>
            </div>
            <div className="space-y-4 lg:text-right">
              <h4 className="text-sm font-bold">Our store</h4>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-500">{(storefront.contact.addressLines.length ? storefront.contact.addressLines : siteConfig.contact.address).join("\n")}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
