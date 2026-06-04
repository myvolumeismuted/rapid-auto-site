import type { Metadata } from "next";
import { IntakeForm } from "./components/IntakeForm";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rapidautoworks.com";
const serviceAreaNames = ["Roanoke", "Salem", "Vinton", "Blacksburg", "Christiansburg"];
const serviceAreas = serviceAreaNames.map((name) => ({
  "@type": "City",
  name,
  containedInPlace: {
    "@type": "State",
    name: "Virginia",
  },
}));

export const metadata: Metadata = {
  title: "Mobile Mechanic Service in Roanoke, VA",
  description:
    "Book on-site mobile mechanic service in Roanoke, Salem, Vinton, Blacksburg, and Christiansburg, VA with transparent quotes for diagnostics, oil changes, brakes, batteries, and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mobile Mechanic Service in Roanoke, VA",
    description:
      "Book on-site mobile mechanic service in Roanoke, Salem, Vinton, Blacksburg, and Christiansburg, VA with transparent quotes for diagnostics, oil changes, brakes, batteries, and more.",
    url: siteUrl,
    type: "website",
  },
  twitter: {
    title: "Mobile Mechanic Service in Roanoke, VA",
    description:
      "Book on-site mobile mechanic service in Roanoke, Salem, Vinton, Blacksburg, and Christiansburg, VA with transparent quotes for diagnostics, oil changes, brakes, batteries, and more.",
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
      telephone: "+1-540-254-0670",
      url: siteUrl,
    },
    areaServed: serviceAreas,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteUrl,
      servicePhone: "+1-540-254-0670",
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
