import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      date: "OCTOBER 24, 2023",
      category: "FASHION & LIFESTYLE",
      title: "The Perfect Guide To Pick Your Perfect Duffle 2024!",
      excerpt:
        "Summer is here, the season of road trips, rovers, and gateways is upon us. Hold in regularly like your Tuesday cycling class and a duffle...",
      image: "/images/blog/blog-image1.jpg",
    },
    {
      id: 2,
      date: "OCTOBER 24, 2023",
      category: "DENIM INDUSTRY",
      title: "Products With Purpose: What is clean denim...",
      excerpt:
        "We've come up with a few tips, in the form of a practical care guide, to increase your products' lifespan while keeping things like energy...",
      image: "/images/blog/blog-image-2.jpg",
    },
    {
      id: 3,
      date: "OCTOBER 24, 2023",
      category: "GOLD STYLE",
      title: "Gold Seal of Sustainability: GOTS, Finally Explained!",
      excerpt:
        "One of the reasons why sustainable brands tend to have higher prices than what's considered the average is because the product's price reflects its...",
      image: "/images/blog/blog-image-3.jpg",
    },
    {
      id: 4,
      date: "OCTOBER 24, 2023",
      category: "CLOTHES HANDMADE",
      title: "First made to order collection: it's time to...",
      excerpt:
        "While sustainable sourcing and ethical production have always been a fundamental part of approach, we felt we needed be aware of clothing labels that...",
      image: "/images/blog/blog-image-4.jpg",
    },
    {
      id: 5,
      date: "OCTOBER 24, 2023",
      category: "CHANGE STYLE",
      title: "What if: embracing change, one piece at a time.",
      excerpt:
        "We kept our promise continued exploring the made-to-order production model for new collection. From now on this One of the reasons why sustainable...",
      image: "/images/blog/blog-image5.jpg",
    },
    {
      id: 6,
      date: "OCTOBER 24, 2023",
      category: "DESIGN FASHION",
      title: "Our journey towards a more conscious fashion industry.",
      excerpt:
        "We took sustainability a step further, designing our pieces from scratch to make them as hybrid and versatile as. We've come up with a few...",
      image: "/images/blog/blog-image-6.jpg",
    },
  ];

  return (
    <div className="bg-white text-slate-900">
      {/* Page Header */}
      <section className="relative h-[35vh] flex flex-col items-center justify-center">
        <Image
          src="/images/blog/blog-image5.jpg"
          alt="Blog Header"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-3">Our Blog</h1>
          <nav className="text-sm font-medium tracking-widest uppercase">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <span className="mx-2">&bull;</span>
            <span className="opacity-70">Our Blog</span>
          </nav>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-[10px] font-bold tracking-[0.15em] text-slate-400">
                  <span>{post.date}</span>
                  <span className="mx-2">|</span>
                  <span className="text-slate-900">{post.category}</span>
                </div>
                <h2 className="text-xl font-bold leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-block text-[11px] font-bold tracking-widest uppercase border-b border-transparent hover:border-slate-900 transition-all pt-2"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-20 flex justify-center items-center space-x-4 text-sm font-bold">
          <span className="border-b-2 border-slate-900 pb-1 cursor-default">
            01
          </span>
          <span className="text-slate-400 hover:text-slate-900 cursor-pointer transition-colors pb-1">
            02
          </span>
          <span className="text-slate-400 hover:text-slate-900 cursor-pointer transition-colors pb-1">
            &raquo;
          </span>
        </div>
      </section>

      {/* Footer / Newsletter Section */}
      <footer className="border-t border-slate-100 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start text-center lg:text-left">
            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm">Contact Us</h4>
              <p className="text-sm text-slate-500">
                Email: shan@onesuperhero.com
              </p>
              <p className="text-sm text-slate-500">Phone: +1 (234) 567-8910</p>
            </div>

            {/* Newsletter */}
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Subscribe To Our Newsletter
              </h2>
              <form className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-1 px-4 py-3 bg-white border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <button className="bg-slate-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-slate-400 italic">
                By subscribing, you accept the Privacy Policy
              </p>
              <div className="flex justify-center space-x-6 pt-4">
                <FaFacebookF className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors" />
                <FaInstagram className="w-4 h-4 cursor-pointer hover:text-pink-600 transition-colors" />
                <FaXTwitter className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors" />
                <FaYoutube className="w-4 h-4 cursor-pointer hover:text-red-600 transition-colors" />
              </div>
            </div>

            {/* Store Location */}
            <div className="lg:text-right space-y-4">
              <h4 className="font-bold text-sm">Our store</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                2331 Beverly Rd Brooklyn, New York
                <br />
                11226 United States
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
