"use client";

import { Language } from "@/types";
import { translations } from "@/lib/i18n/translations";
import { Leaf, Globe, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export function Navbar({ lang, setLang }: NavbarProps) {
  const t = translations[lang];

  return (
    <nav className="fixed top-0 w-full border-b border-border/40 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        <div className="flex items-center gap-1.5 md:gap-2.5 text-base md:text-xl font-bold tracking-tight text-foreground">
          <Leaf className="size-5 md:size-6 text-primary" />
          Leafity
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="group flex items-center h-8 md:h-9 gap-1.5 md:gap-2 pl-1.5 pr-3 text-xs font-semibold rounded-full bg-background/50 hover:bg-muted/80 backdrop-blur-md border border-border/50 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="size-5 md:size-6 rounded-full overflow-hidden ring-1 ring-border/50 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <img 
                  src={lang === "id" ? "https://flagcdn.com/w40/id.png" : "https://flagcdn.com/w40/us.png"} 
                  alt={lang} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="w-[1px] h-3.5 bg-border/80"></div>
              <div className="flex items-center gap-1">
                <span className="uppercase tracking-widest text-foreground">{lang}</span>
                <ChevronDown className="size-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px] rounded-xl border-border/50 shadow-lg p-1">
              <DropdownMenuItem 
                onClick={() => setLang('id')}
                className={`flex items-center justify-between cursor-pointer rounded-lg text-sm font-medium py-2 px-3 ${lang === 'id' ? 'bg-muted' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-4 h-3 rounded-[2px] object-cover ring-1 ring-border/50" />
                  Indonesia
                </div>
                {lang === 'id' && <Check className="size-4 text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLang('en')}
                className={`flex items-center justify-between cursor-pointer rounded-lg text-sm font-medium py-2 px-3 ${lang === 'en' ? 'bg-muted' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-4 h-3 rounded-[2px] object-cover ring-1 ring-border/50" />
                  English
                </div>
                {lang === 'en' && <Check className="size-4 text-primary" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog>
            <DialogTrigger render={<Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm font-semibold rounded-full px-3 md:px-5 shadow-sm transition-all h-8 md:h-9" />}>
              {t.nav.howItWorks}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card border-border/50 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-xl">{t.howItWorksModal.title}</DialogTitle>
                <DialogDescription>
                  {t.howItWorksModal.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="flex gap-4 items-start">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t.howItWorksModal.step1Title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {t.howItWorksModal.step1Desc}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t.howItWorksModal.step2Title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {t.howItWorksModal.step2Desc}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t.howItWorksModal.step3Title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {t.howItWorksModal.step3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}
