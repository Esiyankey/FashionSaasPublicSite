import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/cart/CartProvider";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { QueryProvider } from "./providers/QueryProvider";
import { getStorefrontHome } from "@/services/storefront.service";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { store } = await getStorefrontHome();
  const metadataBase = store.siteUrl ? new URL(store.siteUrl) : undefined;
  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: { default: store.seo.title, template: `%s | ${store.name}` },
    description: store.seo.description,
    openGraph: { title: store.seo.title, description: store.seo.description, type: "website", siteName: store.name },
    twitter: { card: "summary_large_image", title: store.seo.title, description: store.seo.description },
    ...(store.faviconUrl ? { icons: { icon: store.faviconUrl } } : {}),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storefront = await getStorefrontHome();
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <QueryProvider>
          <CartProvider commerce={storefront.commerce}>
            <Navbar storefront={storefront} />
            <main className="flex-1">{children}</main>
            <Footer storefront={storefront} />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
