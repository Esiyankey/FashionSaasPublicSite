"use client";

import Link from "next/link";
import type { StorefrontHome } from "@/services/storefront.service";
import { siteConfig } from "@/app/lib/site";

export default function Footer({ storefront }: { storefront: StorefrontHome }) {
  const businessName = storefront.store.name;
  const headerLinks = storefront.navigation.header.length ? storefront.navigation.header : siteConfig.navLinks;
  const footerLinks = storefront.navigation.footer.length ? storefront.navigation.footer : siteConfig.footerLinks;
  const socialLinks = storefront.socialLinks.length ? storefront.socialLinks : [
    { platform: "Facebook", url: "https://facebook.com" }, { platform: "Instagram", url: "https://instagram.com" },
    { platform: "Pinterest", url: "https://pinterest.com" }, { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "YouTube", url: "https://youtube.com" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-gray-50 px-6 py-16 sm:px-8 lg:px-10">
      <div className="absolute inset-0 z-0 bg-linear-to-r from-gray-50 via-gray-50/95 to-white" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-12">
          <h2 className="text-3xl font-heading uppercase tracking-[0.12em] text-gray-900 md:text-4xl">
            {businessName}
          </h2>
        </div>

        <nav className="mb-6 flex flex-wrap justify-center gap-x-12 gap-y-6">
          {headerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-sans uppercase tracking-[0.3em] text-gray-700 transition-all hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="mb-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] font-sans uppercase tracking-[0.2em] text-gray-500 transition-all hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-center gap-5">
          {socialLinks.map((social) => (
            <Link
              key={social.platform}
              href={social.url}
              aria-label={social.platform}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{social.platform.slice(0, 2)}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 w-full border-t border-gray-200 pt-6 text-center">
          <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-gray-400">
            {storefront.store.footerText || `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
