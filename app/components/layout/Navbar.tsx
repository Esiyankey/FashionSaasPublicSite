'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { siteConfig } from '@/app/lib/site';
import { useCart } from '@/app/components/cart/CartProvider';

export default function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const handleScroll = useEffectEvent(() => {
    setIsSticky(window.scrollY > 40);
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative z-40">
      {showBanner && (
        <div className="flex h-[40px] items-center justify-between bg-amber-950 px-4 py-2 text-[11px] uppercase tracking-widest text-amber-100">
          <span className="font-medium">Support {siteConfig.contact.phone}</span>
          <div className="hidden items-center gap-2 md:flex">
            <span>
              Sign up and <span className="font-bold">get 25% off</span>
            </span>
            <Link href="/shop" className="font-semibold hover:underline">
              Shop offers
            </Link>
          </div>
          <button type="button" onClick={() => setShowBanner(false)} aria-label="Close banner">
            <X size={16} />
          </button>
        </div>
      )}

      <nav
        className={`flex items-center justify-between border-b border-stone-200/80 bg-white/95 px-6 py-4 backdrop-blur transition-all duration-300 sm:px-8 lg:px-10 ${
          isSticky ? 'fixed left-0 top-0 z-50 w-full shadow-sm' : 'relative'
        }`}
      >
        <button
          type="button"
          className="p-2 -ml-2 lg:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <Link href="/" className="flex items-center gap-2" aria-label="Fashion SaaS home">
          <div className="flex size-8 items-center justify-center rounded-full bg-amber-900">
            <span className="text-sm font-bold text-white">F</span>
          </div>
          <span className="text-xl font-bold uppercase tracking-tighter text-gray-900">
            Fashion SaaS
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[12px] font-bold uppercase tracking-widest text-gray-500 transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button type="button" aria-label="Search" className="hidden sm:block">
            <Search size={20} />
          </button>
          <button type="button" aria-label="Account" className="hidden sm:block">
            <User size={20} />
          </button>
          <Link href="/cart" aria-label="Cart" className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-amber-900 text-[10px] text-white">
              {itemCount}
            </span>
          </Link>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-full w-[80%] max-w-[300px] bg-white p-8 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            type="button"
            className="absolute right-6 top-6"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <div className="mt-12 flex flex-col gap-6">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="border-b border-gray-100 pb-2 text-lg font-bold uppercase tracking-tighter text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isSticky && <div className="h-[72px]" />}
    </header>
  );
}
