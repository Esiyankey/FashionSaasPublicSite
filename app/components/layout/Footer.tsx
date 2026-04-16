import Link from "next/link";
import { siteConfig } from "@/app/lib/site";

export default function Footer() {
  const socialLinks = [
    { monogram: "Fb", href: "https://facebook.com", label: "Facebook" },
    { monogram: "Ig", href: "https://instagram.com", label: "Instagram" },
    { monogram: "Pi", href: "https://pinterest.com", label: "Pinterest" },
    { monogram: "In", href: "https://linkedin.com", label: "LinkedIn" },
    { monogram: "Yt", href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="relative w-full overflow-hidden py-16 px-4 bg-gray-50">
      
      {/* Soft background */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-50/95 to-white z-0" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-gray-900 tracking-[0.12em] uppercase">
            Fashion SaaS
          </h2>
        </div>

        <nav className="mb-6 flex flex-wrap justify-center gap-x-12 gap-y-6">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-xs font-sans tracking-[0.3em] text-gray-700 hover:text-amber-900 transition-all uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="mb-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {siteConfig.footerLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-[11px] font-sans tracking-[0.2em] text-gray-500 hover:text-gray-900 transition-all uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-5">
          {socialLinks.map((social) => {
            return (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all duration-300 hover:border-amber-900 hover:bg-amber-900 hover:text-white"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                  {social.monogram}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-gray-200 w-full text-center">
          <p className="text-[10px] font-sans tracking-[0.3em] text-gray-400 uppercase">
            © {new Date().getFullYear()} Fashion SaaS. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
