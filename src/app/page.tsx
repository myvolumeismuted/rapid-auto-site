import type { Metadata } from "next";
import { IntakeForm } from "./components/IntakeForm";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rapidautoworks.com";

export const metadata: Metadata = {
  title: "Mobile Mechanic Service at Your Location",
  description:
    "Book on-site mobile mechanic service with transparent quote options for diagnostics, oil changes, brakes, battery, and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mobile Mechanic Service at Your Location",
    description:
      "Book on-site mobile mechanic service with transparent quote options for diagnostics, oil changes, brakes, battery, and more.",
    url: siteUrl,
    type: "website",
  },
  twitter: {
    title: "Mobile Mechanic Service at Your Location",
    description:
      "Book on-site mobile mechanic service with transparent quote options for diagnostics, oil changes, brakes, battery, and more.",
  },
};

export default function Home() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Mechanic Service",
    provider: {
      "@type": "AutoRepair",
      name: "RapidAuto Mobile Mechanic",
      telephone: "+1-540-525-8425",
      url: siteUrl,
    },
    areaServed: "United States",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteUrl,
      servicePhone: "+1-540-525-8425",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <HeroSection />
      <ServicesSection />
      <IntakeForm />
      <Footer />
    </main>
  );
}
