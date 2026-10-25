"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Flame, Zap } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const athleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Webflow-Style Masked Line Reveal on Load
      const entranceTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      entranceTl
        .fromTo(
          ".hero-mask-line",
          { y: "130%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.16,
            ease: "power4.out",
            delay: 0.1
          }
        )
        .fromTo(
          ".hero-cta-wrap",
          { y: 35, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
          "-=0.6"
        );

      // 2. Smooth vertical scroll parallax (locked horizontal alignment so text NEVER drifts)
      gsap.to(".hero-left-col", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 60,
        opacity: 0.35,
        ease: "none",
      });

      gsap.to(".hero-right-col", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 60,
        opacity: 0.35,
        ease: "none",
      });

      gsap.to(athleteRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.12,
        y: 40,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full bg-[#c6f939] text-black overflow-hidden flex flex-col justify-start lg:justify-end pt-20 sm:pt-24 lg:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 select-none"
      style={{ backgroundColor: "#c6f939" }}
    >
      {/* Subtle industrial dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Athlete Photo Background (Centered on mobile and desktop) */}
      <div
        ref={athleteRef}
        className="absolute inset-0 flex items-end sm:items-center justify-center pointer-events-none z-10 overflow-hidden"
      >
        <div className="relative w-full h-full max-w-[1600px] flex items-end sm:items-center justify-center">
          <img
            src="/hero-bg.webp"
            alt="Coach Marco Athletic Background"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
        </div>
      </div>

      {/* TYPOGRAPHY & CTAs: Placed up into the clear space on mobile */}
      <div className="relative z-20 w-full mt-2 sm:mt-4 lg:mt-auto pt-2 sm:pt-4 lg:pt-20 pb-2">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 sm:gap-6">

          {/* Left Block: All 3 lines aligned consistently on mobile & tablet */}
          <div className="hero-left-col flex flex-col">
            <div className="overflow-hidden py-0.5">
              <h1 className="hero-mask-line block font-display font-black tracking-tighter uppercase text-black leading-[0.86] text-[10.5vw] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.5vw] drop-shadow-sm">
                YOUR BODY.
              </h1>
            </div>
            <div className="overflow-hidden py-0.5">
              <h1 className="hero-mask-line block font-display font-black tracking-tighter uppercase text-black leading-[0.86] text-[10.5vw] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.5vw] drop-shadow-sm">
                YOUR RESULTS.
              </h1>
            </div>
            {/* Third line grouped together on mobile */}
            <div className="overflow-hidden py-0.5 lg:hidden">
              <h1 className="hero-mask-line block font-display font-black tracking-tighter uppercase text-black leading-[0.86] text-[10.5vw] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.5vw] drop-shadow-sm">
                YOUR PATH.
              </h1>
            </div>
          </div>

          {/* Right Block: "YOUR PATH." on Desktop + High-Contrast CTAs */}
          <div className="hero-right-col flex flex-col items-start lg:items-end w-full lg:w-auto">
            <div className="overflow-hidden py-0.5 hidden lg:block">
              <h1 className="hero-mask-line block font-display font-black tracking-tighter uppercase text-black leading-[0.86] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.5vw] drop-shadow-sm text-right">
                YOUR PATH.
              </h1>
            </div>

            <div className="hero-cta-wrap mt-2 sm:mt-4 flex flex-row flex-wrap items-center gap-2 sm:gap-2.5 w-auto">
              <button
                onClick={onOpenBooking}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-black hover:bg-zinc-900 text-[#c6f939] font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-[0_6px_20px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                <Flame className="w-3 h-3 fill-current shrink-0" />
                <span>APPLY COACHING</span>
                <ArrowRight className="w-3 h-3 shrink-0" />
              </button>

              <a
                href="#profile-section"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white hover:bg-zinc-100 text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 border border-black/80 sm:border-2 sm:border-black transition-all shadow-sm hover:scale-105 active:scale-95 text-center cursor-pointer"
              >
                <Zap className="w-3 h-3 shrink-0" />
                <span>EXPLORE METHOD ↓</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
