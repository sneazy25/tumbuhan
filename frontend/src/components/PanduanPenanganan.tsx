"use client";

import { useState, useEffect } from "react";
import { Language } from "@/types";
import { translations } from "@/lib/i18n/translations";
import { getTreatmentAdvice } from "@/lib/data/treatments";

interface PanduanPenangananProps {
  plant: string;
  disease: string;
  lang: Language;
}

export function PanduanPenanganan({ plant, disease, lang }: PanduanPenangananProps) {
  const [loading, setLoading] = useState(true);
  const t = translations[lang];
  const steps = getTreatmentAdvice(disease, lang);

  useEffect(() => {
    // Artificial loading skeleton
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, [disease]);

  if (loading) {
    return (
      <div className="w-full mt-4 pt-4 border-t border-border/40 space-y-2">
        <div className="h-2.5 bg-muted rounded animate-pulse w-3/4"></div>
        <div className="h-2.5 bg-muted rounded animate-pulse w-full"></div>
        <div className="h-2.5 bg-muted rounded animate-pulse w-5/6"></div>
      </div>
    );
  }

  if (!steps || steps.length === 0) {
    return null; 
  }

  return (
    <div className="w-full mt-4 pt-4 border-t border-border/40">
      <span className="block text-[12px] font-semibold text-foreground mb-2">
        {disease.toLowerCase().includes('healthy') || disease.toLowerCase() === 'sehat' || disease.toLowerCase() === 'sehat.' 
          ? t.results.maintenanceGuide 
          : t.results.treatmentGuide}
      </span>
      <ul className="space-y-1.5">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-2.5 items-start text-[11px] md:text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground shrink-0">{idx + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
