import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "./components/ui/sonner";
import "./globals.css";
import "./index.css"

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rapidautoworks.com";
const businessName = "RapidAuto Mobile Mechanic";
const defaultTitle = "Mobile Mechanic Near You | RapidAuto Mobile Mechanic";
const defaultDescription =
  "RapidAuto Mobile Mechanic provides on-site car repair, diagnostics, brake service, oil changes, battery and starter replacement, and routine maintenance at your home, work, or roadside.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${businessName}`,
  },
  description: defaultDescription,
  applicationName: businessName,
  category: "Automotive",
  creator: businessName,
  publisher: businessName,
  authors: [{ name: businessName, url: siteUrl }],
  icons: {
    icon: "/next.svg",
    shortcut: "/next.svg",
    apple: "/next.svg",
  },
  keywords: [
    "mobile mechanic",
    "mobile auto repair",
    "car repair at home",
    "car repair at work",
    "roadside mechanic",
    "oil change",
    "brake repair",
    "car diagnostics",
    "alternator replacement",
    "starter replacement",
    "battery replacement",
    "RapidAuto",
  ],
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: businessName,
    title: defaultTitle,
    description: defaultDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: businessName,
        url: siteUrl,
        email: "kam@rapidautoworks.com",
        telephone: "+1-540-525-8425",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: businessName,
        publisher: { "@id": `${siteUrl}#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "AutoRepair",
        "@id": `${siteUrl}#autorepair`,
        name: businessName,
        url: siteUrl,
        telephone: "+1-540-525-8425",
        email: "kam@rapidautoworks.com",
        priceRange: "$$",
        areaServed: "United States",
        serviceType: [
          "Mobile mechanic",
          "Oil change",
          "Brake service",
          "Battery replacement",
          "Alternator service",
          "Starter replacement",
          "Vehicle diagnostics",
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
