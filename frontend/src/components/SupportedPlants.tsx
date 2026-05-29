"use client";

import { Leaf } from "lucide-react";

export function SupportedPlants() {
  const plants = [
    "Apel", "Tomat", "Jagung", "Anggur", "Kentang", "Kopi", "Padi", "Kedelai", "Bawang", "Cabai", "Jeruk", "Mangga"
  ];

  // Duplicate for seamless marquee
  const marqueeItems = [...plants, ...plants];

  return (
    <section className="py-16 md:py-20 overflow-hidden bg-background border-b border-border/40 relative">
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-10 text-center relative z-20">
        <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase">Mendukung Berbagai Jenis Tanaman & Daun</h2>
      </div>

      <div className="flex gap-4 md:gap-6 items-center w-max animate-marquee hover:[animation-play-state:paused] px-4">
        {marqueeItems.map((plant, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-card border border-border/60 shadow-sm backdrop-blur-sm transition-all hover:bg-primary/5 hover:border-primary/30 hover:scale-105 cursor-default"
          >
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="size-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground tracking-tight">{plant}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
