import type { Metadata, Viewport } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { business } from "@/config/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["Chakra Petch Fallback", "ui-sans-serif", "system-ui", "sans-serif"],
  // Generates the metric-adjusted "Chakra Petch Fallback" face used while the
  // webfont loads, and while a user blocks it — no layout shift.
  adjustFontFallback: true,
});

const sans = chakra;

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${business.name} — CCTV Installation & Security Systems in Hyderabad`,
    template: `%s | ${business.name}`,
  },
  description:
    "CCTV installation, product supply, repair, upgrades and AMC maintenance across Hyderabad. Dome, bullet, IP, wireless, solar and PTZ CCTV cameras.",
  keywords: [
    "Flash Fix Computers and Security Systems",
    "Flash Fix CCTV",
    "CCTV installation Hyderabad",
    "CCTV camera dealer Hyderabad",
    "CCTV repair Hyderabad",
    "AMC maintenance Hyderabad",
    "security camera installation Telangana",
    "DVR NVR Hyderabad",
  ],
  openGraph: {
    title: `${business.name} — CCTV Installation & Security Systems in Hyderabad`,
    description:
      "End-to-end CCTV installation, supply, repair and maintenance for Hyderabad homes, shops, offices and industrial sites.",
    type: "website",
    locale: "en_IN",
    siteName: business.name,
    images: [{ url: "/images/brand/logo.png", width: 1024, height: 1024, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — CCTV Installation Hyderabad`,
    description:
      "End-to-end CCTV installation, supply, repair and maintenance for Hyderabad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07090E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${chakra.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
