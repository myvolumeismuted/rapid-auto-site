"use client";

import { Wrench, Clock, MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById("intake-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#0d1220] to-[#151925]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm text-foreground">5 Years of Professional Experience</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Professional Auto Repair
            <br />
            <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">
              Comes to You
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Skip the shop. Expert mobile mechanic service at your home, office, or anywhere in the city. Same-day appointments available.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 h-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
              <Wrench className="mr-2 h-5 w-5" />
              Get Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-border hover:bg-accent px-8 py-6 h-auto bg-background/50 backdrop-blur-sm"
            >
              <a href="tel:540-525-8425">
                <Clock className="mr-2 h-5 w-5" />
                Call: (540) 525-8425
              </a>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-primary/30 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-foreground">Same-Day Service</h3>
              <p className="text-sm text-muted-foreground">Fast turnaround for most repairs. We respect your time.</p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-primary/30 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-foreground">Mobile Service</h3>
              <p className="text-sm text-muted-foreground">We come to your location. No need to visit a shop.</p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-primary/30 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-foreground">Certified Technician</h3>
              <p className="text-sm text-muted-foreground">Certified technicians with 5+ years of professional experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
