"use client";

import { Camera, UploadCloud, Sparkles } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Camera,
      title: "1. Siapkan Foto",
      desc: "Ambil foto daun tanaman dengan jelas, pencahayaan terang, dan fokus pada area yang bermasalah."
    },
    {
      icon: UploadCloud,
      title: "2. Unggah Gambar",
      desc: "Seret dan lepas gambar ke area yang disediakan, atau klik untuk memilih file dari perangkat."
    },
    {
      icon: Sparkles,
      title: "3. Dapatkan Hasil AI",
      desc: "AI kami akan langsung menganalisis penyakit dan memberikan panduan perawatan khusus."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/20 relative border-b border-border/40">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
            Sangat Mudah Digunakan
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light">
            Tiga langkah sederhana untuk mengetahui penyakit tanaman Anda dan cara mengatasinya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connector Line (visible only on desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="size-24 rounded-3xl bg-background border border-border shadow-sm flex items-center justify-center mb-8 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md group-hover:border-primary/30">
                  <div className="size-16 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="size-8 text-primary/80 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
