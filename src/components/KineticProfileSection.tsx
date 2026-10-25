"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RotateCw, X, Sparkles, ChevronRight } from "lucide-react";

interface KineticProfileProps {
  onOpenBooking?: () => void;
}

export default function KineticProfileSection({ onOpenBooking }: KineticProfileProps) {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const athleteRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Webflow-style smooth scroll scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom 80%",
          scrub: 1.2,
        },
      });

      // 1. First: "Profile People" slides in from top
      tl.fromTo(
        ".anim-profile-people",
        { y: -35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
      // 2. Second: "Kinetic" logo slides in from top
      .fromTo(
        ".anim-kinetic-logo",
        { y: -35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      // 3. Third: Niche se headline lines slide up through overflow masks
      // ("EMBRACE", "MOVEMENT THE", "POWER OF REGULAR", "EXERCISE")
      .fromTo(
        ".anim-headline-line",
        { y: "125%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, stagger: 0.22, ease: "power3.out" },
        "-=0.2"
      )
      // 4. Right Bauhaus Art Frame & controls scale in
      .fromTo(
        gridRef.current,
        { scale: 0.88, opacity: 0, y: 35 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
        "-=0.6"
      )
      // 5. Fourth: Niche metadata slides up ("® -2024", "DANIEL KAHNEMAN/", "Age 34")
      .fromTo(
        ".anim-metadata",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
      )
      // Subtle background athlete parallax scale
      .fromTo(
        athleteRef.current,
        { scale: 1.04, y: 30 },
        { scale: 1, y: 0, duration: 2.0, ease: "none" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 800);
  };

  return (
    <section
      ref={sectionRef}
      id="profile-section"
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] bg-[#c6f939] text-black overflow-hidden flex flex-col justify-between pt-6 sm:pt-12 pb-0 px-4 sm:px-10 lg:px-16 select-none border-b-2 border-black"
      style={{ backgroundColor: "#c6f939" }}
    >
      {/* Background Image: kinetic-bg.webp (Instant load, high-res 145KB, zero delay) */}
      <div
        ref={athleteRef}
        className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none overflow-hidden"
      >
        <div className="relative w-full h-full max-w-[1300px] flex items-end justify-center">
          <img
            src="/kinetic-bg.webp"
            alt="Kinetic Background Athlete"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-contain object-bottom select-none pointer-events-none"
          />
        </div>
      </div>

      {/* TOP ROW: "Profile People" on Left, "Kinetic" on Right */}
      <div className="relative z-30 w-full flex items-center justify-between">
        <div className="overflow-hidden">
          <span className="anim-profile-people block font-sans font-extrabold text-xs sm:text-sm tracking-wider text-black uppercase">
            Profile People
          </span>
        </div>

        {/* Top-Right Kinetic Logo with geometric squares */}
        <div className="anim-kinetic-logo flex items-center gap-2">
          <svg className="w-5 h-5 text-black fill-current" viewBox="0 0 24 24">
            <rect x="2" y="2" width="8" height="8" rx="2" />
            <rect x="14" y="2" width="8" height="8" rx="2" />
            <rect x="2" y="14" width="8" height="8" rx="2" />
            <rect x="14" y="14" width="8" height="8" rx="2" />
          </svg>
          <span className="font-sans font-black text-lg sm:text-xl tracking-tight text-black">
            Kinetic
          </span>
        </div>
      </div>

      {/* CONTENT GRID: Left Editorial Content & Right Bauhaus Art Frame */}
      {/* High z-index (z-20) so all text and UI sit ABOVE the background image */}
      <div className="relative z-20 w-full flex-1 flex flex-col lg:flex-row items-stretch justify-between gap-6 sm:gap-8 mt-4 sm:mt-10 pb-6 sm:pb-12 pointer-events-none">
        {/* LEFT COLUMN: Editorial Headline & Person Details */}
        <div className="flex flex-col justify-between max-w-xl z-30 pointer-events-auto">
          <div>
            <h2
              ref={headlineRef}
              className="font-sans font-black tracking-tight text-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.3vw] leading-[1.0] uppercase drop-shadow-sm flex flex-col"
            >
              <div className="overflow-hidden py-0.5">
                <span className="anim-headline-line block">Embrace</span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span className="anim-headline-line block">Movement The</span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span className="anim-headline-line block">Power of Regular</span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span className="anim-headline-line block">Exercise</span>
              </div>
            </h2>
          </div>

          {/* Left Metadata & Athlete Tag */}
          <div className="mt-4 sm:mt-12 lg:mt-auto flex flex-col gap-4 sm:gap-6">
            <div className="overflow-hidden">
              <span className="anim-metadata block font-mono text-xs sm:text-sm font-bold tracking-wider text-black/80">
                ® -2024
              </span>
            </div>

            <div className="flex flex-col">
              <div className="overflow-hidden">
                <span className="anim-metadata block font-sans font-black text-base sm:text-lg tracking-tight text-black uppercase">
                  Coach Marco/
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="anim-metadata block font-mono text-xs sm:text-sm font-bold text-black/75">
                  Head Coach
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Bauhaus Geometric Modular Grid & Interactive Controls */}
        <div
          ref={gridRef}
          className="flex flex-col items-end justify-between mt-auto pt-6 sm:pt-16 lg:pt-0 ml-auto z-30 pointer-events-auto"
        >
          {/* Bauhaus Geometric 2x2 Grid with high contrast black and #c6f939 tiles (Hidden on mobile) */}
          <div className="hidden sm:block w-full max-w-[150px] xs:max-w-[180px] sm:max-w-[260px] lg:max-w-[340px]">
            <div className="grid grid-cols-2 grid-rows-2 w-full aspect-square border-2 border-black bg-black shadow-2xl">
              {/* Tile 1: Top-Left - #c6f939 bg with Black Diagonal Triangle */}
              <div className="relative w-full h-full bg-[#c6f939] overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="100,0 100,100 0,100" fill="black" />
                </svg>
              </div>

              {/* Tile 2: Top-Right - Solid Black with subtle concentric ring */}
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border border-[#c6f939]/30" />
              </div>

              {/* Tile 3: Bottom-Left - Black bg with #c6f939 Diagonal Triangle */}
              <div className="relative w-full h-full bg-black overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 0,100" fill="#c6f939" />
                </svg>
              </div>

              {/* Tile 4: Bottom-Right - Black Quarter Circle on #c6f939 */}
              <div className="relative w-full h-full bg-[#c6f939] overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0 0 A 100 100 0 0 1 100 100 L 0 100 Z" fill="black" />
                </svg>
              </div>
            </div>

            {/* "do your best/" label & Interactive Expand Button */}
            <div className="mt-3 sm:mt-5 flex items-center justify-between gap-2 sm:gap-4">
              <span className="font-sans font-black text-xs sm:text-lg tracking-tight text-black">
                do your best/
              </span>

              {/* Expand Button with diagonal 2-way arrows (⤢) */}
              <button
                onClick={() => setIsStatsOpen(true)}
                title="View Athlete Dossier"
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-black hover:bg-zinc-900 text-[#c6f939] flex items-center justify-center transition-all group active:scale-90 cursor-pointer shadow-xl border-2 border-black"
              >
                <svg
                  className="w-5 h-5 sm:w-8 sm:h-8 text-[#c6f939] group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons: Expand on Mobile + Kinetic Rotate */}
          <div className="mt-auto sm:mt-6 ml-auto flex items-center gap-2.5 sm:gap-3">
            {/* Mobile-only Dossier access button */}
            <button
              onClick={() => setIsStatsOpen(true)}
              title="View Athlete Dossier"
              className="sm:hidden w-10 h-10 rounded-xl bg-black hover:bg-zinc-900 text-[#c6f939] flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xl border-2 border-black"
            >
              <svg
                className="w-5 h-5 text-[#c6f939]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>

            <button
              onClick={handleRotate}
              title="Kinetic Rhythm Pulse"
              className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-black hover:bg-zinc-900 text-[#c6f939] flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xl border-2 border-black"
            >
              <RotateCw
                className={`w-4 h-4 sm:w-7 sm:h-7 text-[#c6f939] transition-transform duration-700 ${isRotating ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE DOSSIER MODAL (When clicking the Expand Arrow) */}
      {isStatsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0c0c10] border border-[#2b2b3a] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#222230] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c6f939] text-black font-black flex items-center justify-center font-display text-sm">
                  CM
                </div>
                <div>
                  <h3 className="font-display font-black text-xl uppercase tracking-wider text-white">
                    Coach Marco // Profile
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    Head Coach & Athletic Director • Elite Cadre
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsStatsOpen(false)}
                className="w-9 h-9 rounded-full bg-[#1b1b24] hover:bg-[#282836] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Athlete Metric Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
              <div className="p-3.5 rounded-2xl bg-[#14141c] border border-[#262638]">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  Deadlift 1RM
                </span>
                <p className="font-display font-black text-2xl text-[#c6f939] mt-0.5">
                  615 <span className="text-xs font-mono text-zinc-400">LBS</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14141c] border border-[#262638]">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  Back Squat 1RM
                </span>
                <p className="font-display font-black text-2xl text-white mt-0.5">
                  525 <span className="text-xs font-mono text-zinc-400">LBS</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14141c] border border-[#262638]">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  Bench Press 1RM
                </span>
                <p className="font-display font-black text-2xl text-white mt-0.5">
                  405 <span className="text-xs font-mono text-zinc-400">LBS</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14141c] border border-[#262638]">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  Body Fat %
                </span>
                <p className="font-display font-black text-2xl text-[#c6f939] mt-0.5">
                  7.2% <span className="text-xs font-mono text-zinc-400">DEXA</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14141c] border border-[#262638]">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  Weekly Volume
                </span>
                <p className="font-display font-black text-2xl text-white mt-0.5">
                  24 <span className="text-xs font-mono text-zinc-400">SETS/GRP</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14141c] border border-[#262638]">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  Recovery Score
                </span>
                <p className="font-display font-black text-2xl text-emerald-400 mt-0.5">
                  96% <span className="text-xs font-mono text-zinc-400">HRV</span>
                </p>
              </div>
            </div>

            {/* Protocol Summary */}
            <div className="p-4 rounded-2xl bg-[#13131b] border border-[#232332] mb-6">
              <h4 className="font-mono text-xs font-bold text-[#c6f939] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Active Training Protocol
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Upper/Lower conjugate split combined with intra-cellular hydration and cryotherapy recovery.
                Emphasizing mechanical tension in stretched positions and velocity-based barbell tracking.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setIsStatsOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-[#c6f939] hover:bg-[#b5f022] text-black font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-lg"
            >
              <span>Train Under Coach Marco&apos;s Protocol</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
