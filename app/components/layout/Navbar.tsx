'use client';

import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, User, X } from 'lucide-react';

export default function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scroll position is greater than 40px (the approximate height of the banner)
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
    { label: 'Home', href: '#' },
    { label: 'Shop', href: '#' },
    { label: 'Women', href: '#' },
    { label: 'Men', href: '#' },
    { label: 'Accessories', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Blog', href: '#' },
  ];

  return (
    <div className="relative">
      {/* Promotional Banner */}
      {showBanner && (
        <div className="bg-amber-950 text-amber-100 px-4 py-2 flex items-center justify-between text-sm h-[40px]">
          <span className="font-medium">Support (406) 555-0120</span>
          <div className=" hidden md:flex items-center gap-2">
            <span>Sign up and <span className="font-bold">GET 25% OFF</span></span>
            <a href="#" className="font-semibold hover:underline">Sign up now</a>
          </div>
          <button onClick={() => setShowBanner(false)} aria-label="Close banner">
            <X size={20} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav 
        className={`
          bg-white px-6 py-4 flex items-center justify-between transition-all duration-300
          ${isSticky ? 'fixed top-0 left-0 w-full z-50 shadow-md animate-slidedown' : 'relative'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">Clothing.</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-gray-700 text-sm font-medium hover:text-gray-900">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <Search size={20} className="cursor-pointer" />
          <Heart size={20} className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <ShoppingCart size={20} />
          </div>
          <User size={20} className="cursor-pointer" />
        </div>
      </nav>

      {/* Spacer: Prevents content jump when navbar becomes fixed */}
      {isSticky && <div className="h-[72px]" />}
    </div>
  );
}