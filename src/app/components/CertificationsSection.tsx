"use client";

import { Award, Shield, Clock, ThumbsUp } from "lucide-react";

const certifications = [
  {
    icon: Award,
    title: "Certified Technician",
    description: "Recognized, experienced certified technician",
  },
  {
    icon: Clock,
    title: "5 Years Experience",
    description: "Proven track record in mobile automotive repair",
  },
  {
    icon: Shield,
    title: "Insured & Bonded",
    description: "Full liability coverage for your peace of mind",
  },
  {
    icon: ThumbsUp,
    title: "Quality Guaranteed",
    description: "Satisfaction guarantee on all work performed",
  },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 bg-gradient-to-b from-background to-[#0d1220] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm text-primary">Credentials</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Certified & Trusted
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional qualifications and experience you can count on for quality automotive service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 text-center"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  
                  <h3 className="mb-3 text-foreground">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
            <h3 className="text-center mb-6 text-foreground">Why Choose a Certified Mobile Mechanic?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p>Professional training and ongoing education in automotive technology</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p>Adherence to industry best practices and safety standards</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p>Comprehensive insurance coverage protecting you and your vehicle</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p>Commitment to quality workmanship and customer satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
