"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Language } from "@/types";
import { translations } from "@/lib/i18n/translations";
import { Leaf, Globe, ChevronDown, Check, Moon, Sun, Monitor } from "lucide-react";
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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      // Hero canvas is 100vh and is pinned for 300vh. 
      // The upload section will only appear after 300vh of scrolling.
      // 3.1 ensures it only triggers right as the upload section starts overlapping.
      const threshold = window.innerHeight * 3.1;
      setIsScrolled(window.scrollY > threshold);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "border-b border-border/40 bg-background/80 backdrop-blur-md" 
        : "bg-transparent border-transparent"
    }`}>
      <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="Leafity Logo" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain shrink-0 relative z-10" />
          <img src="/brand.png" alt="Leafity" className="h-6 sm:h-6 md:h-7 object-contain dark:invert shrink-0 -ml-4 md:-ml-6" />
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="group flex items-center h-8 md:h-9 gap-1 md:gap-2 pl-1.5 md:pl-2 pr-2.5 md:pr-3 text-[11px] sm:text-xs font-semibold rounded-full bg-background/50 hover:bg-muted/80 backdrop-blur-md border border-border/50 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="size-[18px] sm:size-5 md:size-6 rounded-full overflow-hidden ring-1 ring-border/50 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <img 
                  src={lang === "id" ? "https://flagcdn.com/w40/id.png" : "https://flagcdn.com/w40/us.png"} 
                  alt={lang} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="w-[1px] h-3 md:h-3.5 bg-border/80"></div>
              <div className="flex items-center gap-0.5 md:gap-1">
                <span className="uppercase tracking-widest text-foreground">{lang}</span>
                <ChevronDown className="size-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px] rounded-lg border-border/50 shadow-lg p-1">
              <DropdownMenuItem 
                onClick={() => setLang('id')}
                className={`flex items-center justify-between cursor-pointer rounded-md text-sm font-medium py-2 px-3 ${lang === 'id' ? 'bg-muted' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-4 h-3 rounded-[2px] object-cover ring-1 ring-border/50" />
                  Indonesia
                </div>
                {lang === 'id' && <Check className="size-4 text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLang('en')}
                className={`flex items-center justify-between cursor-pointer rounded-md text-sm font-medium py-2 px-3 ${lang === 'en' ? 'bg-muted' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-4 h-3 rounded-[2px] object-cover ring-1 ring-border/50" />
                  English
                </div>
                {lang === 'en' && <Check className="size-4 text-primary" />}
              </DropdownMenuItem>
              {mounted && (
                <>
                  <div className="h-px bg-border/60 my-1 mx-1"></div>
                  <div className="px-2 py-1.5 pb-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{lang === 'id' ? 'Tampilan' : 'Appearance'}</span>
                  </div>
                  <DropdownMenuItem 
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-between cursor-pointer rounded-md text-sm font-medium py-2 px-3 ${theme === 'light' ? 'bg-muted' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 text-foreground">
                      <Sun className="size-4 text-muted-foreground" />
                      {lang === 'id' ? 'Terang' : 'Light'}
                    </div>
                    {theme === 'light' && <Check className="size-4 text-primary" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-between cursor-pointer rounded-md text-sm font-medium py-2 px-3 ${theme === 'dark' ? 'bg-muted' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 text-foreground">
                      <Moon className="size-4 text-muted-foreground" />
                      {lang === 'id' ? 'Gelap' : 'Dark'}
                    </div>
                    {theme === 'dark' && <Check className="size-4 text-primary" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setTheme('system')}
                    className={`flex items-center justify-between cursor-pointer rounded-md text-sm font-medium py-2 px-3 ${theme === 'system' ? 'bg-muted' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 text-foreground">
                      <Monitor className="size-4 text-muted-foreground" />
                      {lang === 'id' ? 'Sistem' : 'System'}
                    </div>
                    {theme === 'system' && <Check className="size-4 text-primary" />}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog>
            <DialogTrigger render={<Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-[11px] sm:text-xs md:text-sm font-semibold rounded-full px-3 md:px-5 shadow-sm transition-all h-8 md:h-9" />}>
              {t.nav.howItWorks}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-[90vw] md:w-full max-h-[85vh] overflow-y-auto bg-card border-border/50 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-lg md:text-xl">{t.howItWorksModal.title}</DialogTitle>
                <DialogDescription className="text-xs md:text-sm">
                  {t.howItWorksModal.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 md:space-y-6 py-2 md:py-4">
                <div className="flex gap-3 md:gap-4 items-start">
                  <div className="size-6 md:size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 text-xs md:text-base">1</div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-foreground">{t.howItWorksModal.step1Title}</h4>
                    <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 md:mt-1 leading-relaxed">
                      {t.howItWorksModal.step1Desc}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4 items-start">
                  <div className="size-6 md:size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 text-xs md:text-base">2</div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-foreground">{t.howItWorksModal.step2Title}</h4>
                    <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 md:mt-1 leading-relaxed">
                      {t.howItWorksModal.step2Desc}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4 items-start">
                  <div className="size-6 md:size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 text-xs md:text-base">3</div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-foreground">{t.howItWorksModal.step3Title}</h4>
                    <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 md:mt-1 leading-relaxed">
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
