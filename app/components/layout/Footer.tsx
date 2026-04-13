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
    <footer className="relative w-full overflow-hidden py-16 px-4 bg-gray-50">
      
      {/* Soft gradient like hero */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-50/95 to-white z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Brand */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl italic font-serif text-gray-900 tracking-tight">
            Fashion SaaS
          </h2>
        </div>

        {/* Primary Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-6">
          {topLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-xs font-bold tracking-[0.3em] text-gray-700 hover:text-amber-900 transition-all uppercase"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Secondary Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
          {bottomLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-[11px] font-medium tracking-[0.2em] text-gray-500 hover:text-gray-900 transition-all uppercase"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Social Icons - clean instead of glass */}
        <div className="flex justify-center gap-5">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 transition-all duration-300 hover:bg-amber-900 hover:text-white hover:border-amber-900"
              >
                <Icon size={16} />
              </Link>
            )
          })}
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-gray-200 w-full text-center">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">
            © {new Date().getFullYear()} Fashion SaaS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}