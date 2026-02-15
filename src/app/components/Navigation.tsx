"use client";

import { useState, useEffect } from "react";
import { Menu, X, Wrench, Phone } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-foreground">RapidAuto</span>
              <span className="text-xs text-muted-foreground -mt-1">Mobile Mechanic</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("certifications")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Certifications
            </button>
            <Button
              onClick={() => scrollToSection("intake-form")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Quote
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-border hover:bg-accent"
            >
              <a href="tel:555-123-4567" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("certifications")}
                className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              >
                Certifications
              </button>
              <Button
                onClick={() => scrollToSection("intake-form")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
              >
                Get Quote
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-border hover:bg-accent w-full"
              >
                <a href="tel:555-123-4567" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  (555) 123-4567
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
