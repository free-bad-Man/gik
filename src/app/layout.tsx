import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/vercel-navbar";
import { Footer } from "@/components/ui/footer";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { ThemeProvider } from "@/components/theme-provider";
import JsonLd from "@/components/JsonLd";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo/jsonld";

import { siteConfig } from "@/lib/site";
import { YandexMetrika } from "@/components/YandexMetrika";
import { FloatingNav } from "@/components/FloatingNav";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "НИИ ГИК - Геодезия и Картография",
  description: "Научно-исследовательский институт Геодезии и картографии. Инженерные изыскания, кадастровые работы.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  verification: {
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html lang="ru" suppressHydrationWarning className="overflow-hidden">
      <body className={`${inter.className} overflow-hidden h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd data={orgJsonLd} />
          <JsonLd data={websiteJsonLd} />
          
          <Header />
          <GLSLHills />
          <FloatingNav />
          
          <div className="flex flex-col h-screen overflow-hidden relative z-0">
            <main className="flex-1 pt-16 flex flex-col overflow-y-auto overflow-x-hidden pb-40 scrollbar-hide">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
