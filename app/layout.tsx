import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ModernNavigation from "@/components/ModernNavigation";
import ModernFooter from "@/components/ModernFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Krishna108 | Daily Vedic Wisdom & Sacred Transmissions",
  description:
    "A digital sanctuary for high-frequency Vedic transmissions. Explore the Bhagavad Gita, Srimad Bhagavatam, and ancient spiritual technology decoded for the modern age.",
  keywords: ["Krishna", "Bhagavad Gita", "Vedic Wisdom", "Spiritual growth", "Bhakti Yoga", "Srimad Bhagavatam", "Daily Devotional"],
  authors: [{ name: "Krishna108 Collective" }],
  openGraph: {
    title: "Krishna108 | Daily Vedic Wisdom",
    description: "Daily scripture-based devotional content for spiritual growth and inspiration.",
    url: "https://krishna108.com.np",
    siteName: "Krishna108",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Krishna108 Divine Sanctuary",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna108 | Daily Vedic Wisdom",
    description: "Decoding eternal frequencies for the modern conscious explorer.",
    images: ["/hero.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  metadataBase: new URL("https://krishna108.com.np"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} dark`}>
      <body className="font-sans antialiased bg-deepSpace-950 text-slate-200 selection:bg-saffron-500 selection:text-deepSpace-950 overflow-x-hidden">
        <ModernNavigation />
        <main className="min-h-screen">
          {children}
        </main>
        <ModernFooter />
      </body>
    </html>
  );
}
