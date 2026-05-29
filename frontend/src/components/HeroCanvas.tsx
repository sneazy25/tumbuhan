"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;

const currentFrame = (index: number) =>
  `/frames/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

interface HeroCanvasProps {
  children: React.ReactNode;
}

export function HeroCanvas({ children }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let images: HTMLImageElement[] = [];
    const animationObj = { frame: 1 };

    // Function to set canvas dimensions correctly maintaining aspect ratio handling
    const setDimensions = () => {
      // Use device pixel ratio for sharper image on retina displays
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      context.scale(dpr, dpr);
      
      // Force high-quality image resampling for better "HD" look when stretched
      context.imageSmoothingEnabled = true;
      // @ts-ignore - Some older TS configs might not have imageSmoothingQuality typed, but browsers support it
      context.imageSmoothingQuality = "high";
      
      render();
    };

    const render = () => {
      const currentImg = images[Math.round(animationObj.frame) - 1];
      if (currentImg && currentImg.complete) {
        // Internal canvas size (css size)
        const canvasW = window.innerWidth;
        const canvasH = window.innerHeight;
        
        const hRatio = canvasW / currentImg.width;
        const vRatio = canvasH / currentImg.height;
        // cover effect
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvasW - currentImg.width * ratio) / 2;
        const centerShift_y = (canvasH - currentImg.height * ratio) / 2;

        context.clearRect(0, 0, canvasW, canvasH);
        context.drawImage(
          currentImg,
          0,
          0,
          currentImg.width,
          currentImg.height,
          centerShift_x,
          centerShift_y,
          currentImg.width * ratio,
          currentImg.height * ratio
        );
      }
    };

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const preloadImg = new Image();
      preloadImg.src = currentFrame(i);
      images.push(preloadImg);
    }

    images[0].onload = () => {
      setDimensions();
      window.addEventListener("resize", setDimensions);
      
      // Setup ScrollTrigger after the first image loads
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1.5, // smooth scrubbing, takes 1.5 seconds to "catch up" to the scrollbar
        animation: gsap.to(animationObj, {
          frame: frameCount,
          snap: "frame",
          ease: "none",
          onUpdate: render,
        }),
      });

      // Fade out effect for the hero content at the very end of scroll
      gsap.to(".hero-content", {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -200%",
          end: "+=100%",
          scrub: true,
        },
      });
    };

    return () => {
      window.removeEventListener("resize", setDimensions);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black/5 dark:bg-black">
      {/* Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100 transition-opacity duration-1000" 
      />
      
      {/* Gradient Overlay to ensure text readability and smooth blend into the page */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0 pointer-events-none" />

      {/* Content Layer */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center w-full h-full px-6 pt-16">
        {children}
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-5 h-8 border-2 border-muted-foreground/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
