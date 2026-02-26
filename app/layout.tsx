import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import ModernNavigation from "@/components/ModernNavigation";
import ModernFooter from "@/components/ModernFooter";

// Sans-serif font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Serif font for verse excerpts
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishna108 - Daily Devotional Wisdom",
  description:
    "Daily scripture-based devotional content from Bhagavad Gita and Srimad Bhagavatam for spiritual growth and inspiration",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <ModernNavigation />
        {children}
        <ModernFooter />
      </body>
    </html>
  );
}
