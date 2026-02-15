"use client";

import {
  Wrench,
  Gauge,
  Battery,
  Droplets,
  Disc,
  Settings,
  Car,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    icon: Droplets,
    title: "Oil Changes",
    description: "Full synthetic or conventional oil changes with filter replacement",
    price: "From $55",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Disc,
    title: "Brake Service",
    description: "Brake pad replacement, rotor resurfacing, and complete inspections",
    price: "From $120",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Professional battery testing, replacement, and electrical diagnostics",
    price: "From $150",
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
  {
    icon: Settings,
    title: "Diagnostics",
    description: "Computer diagnostics to identify and resolve check engine lights",
    price: "From $70",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Gauge,
    title: "Tune-Ups",
    description: "Spark plugs, filters, and complete engine performance optimization",
    price: "From $100",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Alternator Service",
    description: "Testing, repair, and replacement of charging system components",
    price: "From $200",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    icon: Wrench,
    title: "Starter Replacement",
    description: "Quick starter motor replacement and electrical system checks",
    price: "From $180",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: Car,
    title: "General Repair",
    description: "Don't see what you're looking for? We handle most repairs. Get a custom quote today.",
    price: "Custom Quote",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
];

export function ServicesSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById("intake-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background via-[#0d1220] to-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm text-primary">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Expert Auto Repair Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional mobile mechanic services performed at your location with quality parts and expert care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  
                  <h3 className="mb-2 text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 min-h-[3rem]">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-primary">{service.price}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={scrollToForm}
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      Get Quote →
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 h-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            Request Service Now
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Don't see your service? <button onClick={scrollToForm} className="text-primary hover:underline">Contact us</button> for custom repairs and maintenance.
          </p>
        </div>
      </div>
    </section>
  );
}
