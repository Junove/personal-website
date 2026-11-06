import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home | Nathaniel Endick",
  description: "DevOps Engineer specializing in security, privacy, distributed infrastructure, and automation. Creating software that just works.",
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
