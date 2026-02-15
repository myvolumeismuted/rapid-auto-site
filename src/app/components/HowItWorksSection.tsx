"use client";

import { Calendar, FileCheck, Wrench, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    number: "01",
    title: "Request Service",
    description: "Fill out our simple form or give us a call. Tell us what's wrong with your vehicle.",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Get Quote & Schedule",
    description: "Receive a transparent quote and schedule a convenient time for us to come to you.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "We Come to You",
    description: "Our certified technician arrives at your location with all necessary tools and parts.",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Job Complete",
    description: "We fix your vehicle on-site, test everything, and get you back on the road.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm text-primary">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting your vehicle serviced has never been easier. Here's our simple 4-step process.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-lg">
                      <span className="text-sm text-white">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#intake-form"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20"
            >
              Schedule Service Now
            </a>
            <a
              href="tel:540-525-8425"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border hover:bg-accent text-foreground transition-all duration-300"
            >
              Or Call: (540) 525-8425
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
