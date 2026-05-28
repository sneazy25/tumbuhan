"use client";

import { Language } from "@/types";
import { translations } from "@/lib/i18n/translations";
import { Leaf } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-8 md:mt-12 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6 md:gap-12 mb-8 md:mb-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center text-xl font-bold tracking-tight text-foreground">
              <img src="/logo.png" alt="Leafity Logo" className="w-9 h-9 md:w-12 md:h-12 object-contain shrink-0 relative z-10" />
              <img src="/brand.png" alt="Leafity" className="h-7 md:h-10 object-contain dark:invert shrink-0 -ml-4 md:-ml-6" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pr-4">
              {t.footer.desc}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="text-sm text-left text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {t.footer.home}
              </button>
              <Dialog>
                <DialogTrigger render={<button className="text-sm text-left text-muted-foreground hover:text-primary transition-colors w-fit" />}>
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
              <Dialog>
                <DialogTrigger render={<button className="text-sm text-left text-muted-foreground hover:text-primary transition-colors w-fit" />}>
                  {t.footer.privacy}
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg w-[90vw] md:w-full bg-card border-border/50 backdrop-blur-xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg md:text-xl">{t.footer.privacy}</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                      {t.footer.privacyDesc}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 md:space-y-4 py-2 md:py-4">
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">{t.footer.privacy1}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t.footer.privacy1Desc}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">{t.footer.privacy2}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t.footer.privacy2Desc}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">{t.footer.privacy3}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t.footer.privacy3Desc}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger render={<button className="text-sm text-left text-muted-foreground hover:text-primary transition-colors w-fit" />}>
                  {t.footer.terms}
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg w-[90vw] md:w-full bg-card border-border/50 backdrop-blur-xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg md:text-xl">{t.footer.terms}</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                      {t.footer.termsDesc}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 md:space-y-4 py-2 md:py-4">
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">{t.footer.terms1}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t.footer.terms1Desc}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">{t.footer.terms2}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t.footer.terms2Desc}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">{t.footer.terms3}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t.footer.terms3Desc}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">{t.footer.community}</h4>
            <p className="text-sm text-muted-foreground mb-1">
              {t.footer.communityDesc}
            </p>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger render={<button className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1 bg-muted p-2.5 rounded-full" aria-label="Instagram" />}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xs w-[85vw] bg-card border-border/50 backdrop-blur-xl text-center flex flex-col items-center py-8 md:py-10">
                  <div className="size-12 md:size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                  <DialogTitle className="text-base md:text-lg font-bold mb-1 md:mb-2 text-foreground">Instagram</DialogTitle>
                  <DialogDescription className="text-xs md:text-sm text-muted-foreground">
                    {t.footer.socialNotAdded}
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger render={<button className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1 bg-muted p-2.5 rounded-full" aria-label="X (Twitter)" />}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xs w-[85vw] bg-card border-border/50 backdrop-blur-xl text-center flex flex-col items-center py-8 md:py-10">
                  <div className="size-12 md:size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                  </div>
                  <DialogTitle className="text-base md:text-lg font-bold mb-1 md:mb-2 text-foreground">X (Twitter)</DialogTitle>
                  <DialogDescription className="text-xs md:text-sm text-muted-foreground">
                    {t.footer.socialNotAdded}
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger render={<button className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1 bg-muted p-2.5 rounded-full" aria-label="Discord" />}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M7.5 4.2c-1.8 1.4-3.5 3.5-4.2 6.3-1.2 5.1-.3 8.7 1.5 10.5 1.5 1.5 4.5 1.2 6.2.3.8-.5 1.8-.5 2.5 0 1.7.9 4.7 1.2 6.2-.3 1.8-1.8 2.7-5.4 1.5-10.5-.7-2.8-2.4-4.9-4.2-6.3"/><path d="M11 4.5V3a1 1 0 0 1 2 0v1.5"/></svg>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xs w-[85vw] bg-card border-border/50 backdrop-blur-xl text-center flex flex-col items-center py-8 md:py-10">
                  <div className="size-12 md:size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M7.5 4.2c-1.8 1.4-3.5 3.5-4.2 6.3-1.2 5.1-.3 8.7 1.5 10.5 1.5 1.5 4.5 1.2 6.2.3.8-.5 1.8-.5 2.5 0 1.7.9 4.7 1.2 6.2-.3 1.8-1.8 2.7-5.4 1.5-10.5-.7-2.8-2.4-4.9-4.2-6.3"/><path d="M11 4.5V3a1 1 0 0 1 2 0v1.5"/></svg>
                  </div>
                  <DialogTitle className="text-base md:text-lg font-bold mb-1 md:mb-2 text-foreground">Discord</DialogTitle>
                  <DialogDescription className="text-xs md:text-sm text-muted-foreground">
                    {t.footer.socialNotAdded}
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <div className="pt-6 md:pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Leafity. {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
