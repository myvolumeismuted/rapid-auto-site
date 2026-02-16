import type { Metadata } from "next";
import { IntakeForm } from "../components/IntakeForm";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServicesSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About RapidAuto Mobile Mechanic",
  description:
    "Learn about RapidAuto Mobile Mechanic, our on-site automotive repair approach, and our commitment to transparent service.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About RapidAuto Mobile Mechanic",
    description:
      "Learn about RapidAuto Mobile Mechanic, our on-site automotive repair approach, and our commitment to transparent service.",
    url: "/about",
    type: "article",
  },
};

export default function Home() {
  return (
    <main>
      <Footer />
    </main>
  );
}
