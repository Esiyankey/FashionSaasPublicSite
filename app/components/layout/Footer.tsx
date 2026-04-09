'use client'

import { 
  FaFacebookF, 
  FaXTwitter, 
  FaPinterestP, 
  FaLinkedinIn, 
  FaInstagram 
} from 'react-icons/fa6'
import Link from 'next/link'

export default function Footer() {
  const topLinks = ['BRANDS', 'MEDIA', 'PR AGENCIES']
  const bottomLinks = ['BRAND DIRECTORY', 'CASE STUDIES', 'BLOG', 'PRICING', 'FAQ', 'ABOUT', 'CONTACT']
  
  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaXTwitter, href: '#', label: 'Twitter' },
    { icon: FaPinterestP, href: '#', label: 'Pinterest' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="relative w-full overflow-hidden py-10 px-4">
      {/* 1. Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-image-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* 2. Lighter Glass Overlay */}
      {/* Changed bg-black/30 to bg-black/10 for a much clearer view of the image */}
      <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-md border-t border-white/20" />

      {/* 3. Content */}
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Brand Logo */}
        <div className="mb-14">
          <h2 className="text-5xl md:text-6xl italic font-serif text-white tracking-tighter drop-shadow-lg">
            Fashion SaaS
          </h2>
        </div>

        {/* Primary Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-6">
          {topLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-xs font-bold tracking-[0.3em] text-white hover:text-gray-300 transition-all uppercase drop-shadow-md"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Secondary Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
          {bottomLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-[10px] font-medium tracking-[0.2em] text-white/60 hover:text-white transition-opacity uppercase"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Social Bar - Circular Glass Buttons */}
        <div className="flex justify-center gap-6">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 shadow-xl"
              >
                <Icon size={18} className="transition-transform group-hover:rotate-[360deg] duration-500" />
              </Link>
            )
          })}
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-3 border-t border-white/10 w-full text-center">
          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
            © {new Date().getFullYear()} Fashion Sass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}