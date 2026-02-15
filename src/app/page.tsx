import { IntakeForm } from "./components/IntakeForm";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import Link from "next/link";



export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <IntakeForm />
      <Footer />
    </main>
  );
}