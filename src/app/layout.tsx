import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/blog/rss.xml", title: "Nathaniel Endick — Blog" },
        { url: "/projects/rss.xml", title: "Nathaniel Endick — Projects" },
      ],
    },
  },
  title: "Home | Nathaniel Endick",
  description: "Building human-focused tooling for the post-AI era. Currently a DevOps Engineer by day, and a tech enthusiast by night.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <noscript>
          <style>{`[data-fade]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
