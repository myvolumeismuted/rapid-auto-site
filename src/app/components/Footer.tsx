"use client";

import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0a0e1a] border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Wrench className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground">RapidAuto</span>
                <span className="text-xs text-muted-foreground -mt-1">Mobile Mechanic</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Professional mobile mechanic service bringing quality auto repair to your doorstep.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("certifications")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Certifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("intake-form")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Get Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-foreground">Popular Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Oil Changes</li>
              <li>Brake Service</li>
              <li>Battery Replacement</li>
              <li>Diagnostics</li>
              <li>Tune-Ups</li>
              <li>Alternator Service</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:540-525-8425"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-card border border-border group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all">
                    <Phone className="h-4 w-4" />
                  </div>
                  (540) 525-8425
                </a>
              </li>
              <li>
                <a
                  href="mailto:kam@rapidautoworks.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-card border border-border group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all">
                    <Mail className="h-4 w-4" />
                  </div>
                  kam@rapidautoworks.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Serving the Greater Metro Area</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} RapidAuto Mobile Mechanic. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="tos" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/tos" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
