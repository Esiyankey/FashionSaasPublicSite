import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

const AboutPage = () => {
  // Replace these with your actual image paths in the /public folder
  const images = {
    hero: "/images/hero-image-1.jpg",
    collage1: "/images/hero-image-2.jpg",
    collage2: "/images/hero-image-3.jpg",
    collage3: "/images/hero-image-4.jpg",
    inspiration: "/images/hero-image-1.jpg",
  };

  const teamMembers = [
    {
      name: "Demetria Fisher",
      role: "Web Designer",
      img: "/images/women/woman-dress-1.jpg",
    },
    {
      name: "Neil Cunningham",
      role: "Digital Marketer",
      img: "/images/women/woman-dress2.jpg",
    },
    {
      name: "Ahmed Hammad",
      role: "UI/UX Designer",
      img: "/images/women/woman-dress-3.jpg",
    },
  ];

  return (
    <div className="text-slate-700 bg-white">
      {/* Hero Section */}
      <section className="relative h-[35vh]  flex items-center justify-center overflow-hidden">
        <Image
          src={images.hero}
          alt="About Fashion Sass"
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center py-2 text-white px-4 max-w-3xl">
          <p className="text-sm tracking-[0.2em] uppercase mb-4 opacity-90">
            Welcome to Fashion Sass
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            About Fashion Sass shop
          </h1>
          
        </div>
      </section>

      {/* Sustainable Elegance Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-64  overflow-hidden">
                <Image
                  src={images.collage1}
                  alt="Sustainable style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48  overflow-hidden">
                <Image
                  src={images.collage2}
                  alt="Quality fabrics"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative h-full min-h-[400px]  overflow-hidden">
              <Image
                src={images.collage3}
                alt="Ethical sourcing"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 max-w-xl">
            <span className="text-amber-900 font-sans tracking-[0.35em] text-xs uppercase">
              The Result
            </span>

            <h2 className="font-heading text-3xl md:text-4xl text-gray-900 leading-snug tracking-[0.08em]">
              Sustainable Elegance
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-gray-600 font-sans">
              We focus on thoughtful, ethical clothing. Our designs are simple,
              timeless, and crafted with a deep respect for sustainability. Each
              piece is created to last — designed with intention, not excess.
            </p>

            {/* Button */}
            <button className="group relative inline-flex items-center justify-center px-8 py-3 border border-gray-900 text-gray-900 text-xs tracking-[0.3em] uppercase font-sans transition-all duration-300 hover:bg-gray-900 hover:text-white">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#686b74] text-center relative overflow-hidden">
        {/* subtle background accent */}
        <div className="absolute inset-0 bg-linear-to-b from-white via-gray-50 to-white opacity-80" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {/* Quote */}
          <p className="font-heading text-xl md:text-2xl leading-relaxed tracking-[0.05em] italic text-gray-800">
           ”Fashion SaaS is built on kindness, integrity, and timeless design —
            creating premium value through simplicity and intention.”
          </p>

          {/* Divider */}
          <div className="w-14 h-[1px] bg-amber-900 mx-auto my-8 opacity-70"></div>

          {/* Name */}
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-amber-900">
            Robert Anthony
          </p>

          {/* Role */}
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mt-2">
            CEO & Founder, Fashion Sass
          </p>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">
            Meet Our Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="relative w-56 h-56 mx-auto mb-6 overflow-hidden shadow-xl">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="text-xl font-semibold text-slate-900">
                  {member.name}
                </h4>
                <p className="text-slate-500 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px]  overflow-hidden shadow-2xl">
            <Image
              src={images.inspiration}
              alt="Our Inspiration"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900">
              Your Style is Our Inspiration
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We look for the latest, best in quality clothing and accessories.
              Follow us on social media for new items, sales, and current
              updates. We look forward to your support.
            </p>
            <button className="border-2 border-slate-900 text-slate-900 px-10 py-4 text-sm font-semibold hover:bg-slate-900 hover:text-white transition-colors">
              SHOP THE COLLECTION
            </button>
          </div>
        </div>
        {/* Floating Search Widget */}
        <div className="absolute right-8 bottom-8 bg-white p-5 rounded-full shadow-2xl border border-slate-100 cursor-pointer hover:scale-110 transition-transform">
          <Search className="w-8 h-8 text-slate-900" />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
