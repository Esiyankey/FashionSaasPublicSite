'use client';

import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, User, X, Menu } from 'lucide-react';

export default function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <div className="relative font-poppins">
      {/* Promotional Banner */}
      {showBanner && (
        <div className="bg-amber-950 text-amber-100 px-4 py-2 flex items-center justify-between text-[11px] uppercase tracking-widest h-[40px]">
          <span className="font-medium">Support (406) 555-0120</span>
          <div className="hidden md:flex items-center gap-2">
            <span>Sign up and <span className="font-bold">GET 25% OFF</span></span>
            <a href="#" className="font-semibold hover:underline">Sign up now</a>
          </div>
          <button onClick={() => setShowBanner(false)} aria-label="Close banner">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav 
        className={`
          bg-white px-6 py-4 flex items-center justify-between transition-all duration-300
          ${isSticky ? 'fixed top-0 left-0 w-full z-50 shadow-sm' : 'relative'}
        `}
      >
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-gray-900 uppercase">Clothing.</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-gray-500 text-[12px] uppercase tracking-widest font-bold hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <Search size={20} className="cursor-pointer hidden sm:block" />
          <User size={20} className="cursor-pointer hidden sm:block" />
          <div className="relative cursor-pointer">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Zara-style Slide-out) */}
      <div className={`
        fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className={`
          absolute top-0 left-0 h-full w-[80%] max-w-[300px] bg-white p-8 transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <button 
            className="absolute top-6 right-6" 
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>

          <div className="mt-12 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-lg font-bold uppercase tracking-tighter text-gray-900 border-b border-gray-100 pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {isSticky && <div className="h-[72px]" />}
    </div>
  );
}