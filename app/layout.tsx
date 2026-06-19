import type { Metadata, Viewport } from "next";
import { Lora, Inter, Cormorant_Garamond, Crete_Round } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const creteRound = Crete_Round({
  variable: "--font-crete-round",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "My PT Companion",
  description: "Home physical therapy exercises for knee recovery",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PT Companion",
  },
};

export const viewport: Viewport = {
  themeColor: "#3d6b4a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable} ${cormorant.variable} ${creteRound.variable} h-full`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-dvh flex flex-col" style={{ fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
