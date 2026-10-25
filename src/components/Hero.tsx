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
            stagger: 0.18, 
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

      // 2. Webflow-Style Scroll Scrubbed Parallax as user scrolls down
      gsap.to(".hero-left-col", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 90,
        x: -50,
        opacity: 0.25,
        ease: "none",
      });

      gsap.to(".hero-right-col", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 90,
        x: 50,
        opacity: 0.25,
        ease: "none",
      });

      gsap.to(athleteRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.15,
        y: 60,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#ccff00] text-black overflow-hidden flex flex-col justify-end pt-24 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 select-none"
      style={{ backgroundColor: "#ccff00" }}
    >
      {/* Subtle industrial dot overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Center Athlete Photo Background (Instant 47KB WebP, eager loading) */}
      <div 
        ref={athleteRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden"
      >
        <div className="relative w-full h-full max-w-[1600px] flex items-center justify-center">
          <img
            src="/hero-bg.webp"
            alt="Apex Athletic Coach Background"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-center scale-100 select-none pointer-events-none"
          />
        </div>
      </div>

      {/* BOTTOM ROW: SIGNATURE CONDENSED BRUTALIST TYPOGRAPHY */}
      <div className="relative z-20 w-full mt-auto pt-12 sm:pt-16 pb-2">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 sm:gap-6">
          
          {/* Left Block: "YOUR BODY." / "YOUR RESULTS." with overflow-hidden mask reveals */}
          <div className="hero-left-col flex flex-col">
            <div className="overflow-hidden py-0.5">
              <h1 className="hero-mask-line block font-display font-black tracking-tighter uppercase text-black leading-[0.85] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.5vw] drop-shadow-sm">
                YOUR BODY.
              </h1>
            </div>
            <div className="overflow-hidden py-0.5">
              <h1 className="hero-mask-line block font-display font-black tracking-tighter uppercase text-black leading-[0.85] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.5vw] drop-shadow-sm">
                YOUR RESULTS.
              </h1>
            </div>
          </div>

          {/* Right Block: "YOUR PATH." + Quick CTAs with overflow-hidden mask reveals */}
          <div className="hero-right-col flex flex-col items-start lg:items-end w-full lg:w-auto">
            <div className="overflow-hidden py-0.5">
              <h1 className="hero-mask-line block font-display font-black tracking-tighter uppercase text-black leading-[0.85] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.5vw] drop-shadow-sm text-left lg:text-right">
                YOUR PATH.
              </h1>
            </div>

            <div className="hero-cta-wrap mt-3 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-900 text-[#c6f939] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                <Flame className="w-4 h-4 fill-current shrink-0" />
                <span>TRAIN WITH COACH MARCO</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href="#profile-section"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-black/10 hover:bg-black/20 border border-black/25 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-center"
              >
                <Zap className="w-4 h-4 shrink-0" />
                <span>EXPLORE METHOD ↓</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
