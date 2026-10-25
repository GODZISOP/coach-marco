"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Dumbbell, 
  Activity, 
  Flame, 
  Gauge, 
  Coffee, 
  Plus, 
  RotateCcw, 
  Zap, 
  Check, 
  ShieldAlert,
  Sliders,
  ChevronRight
} from "lucide-react";

export default function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive Plate Loader State for Card 1
  const [plates, setPlates] = useState<number[]>([45, 45, 25]); // Per side
  const barWeight = 45; // Olympic barbell
  const totalWeight = barWeight + plates.reduce((acc, curr) => acc + curr * 2, 0);

  const addPlate = (weight: number) => {
    if (plates.length < 6) {
      setPlates([...plates, weight]);
    }
  };

  const clearPlates = () => {
    setPlates([]);
  };

  // Interactive Cryo Temp State for Card 2
  const [cryoMode, setCryoMode] = useState<"standard" | "extreme">("standard");
  const [cryoSeconds, setCryoSeconds] = useState(180);
  const [cryoActive, setCryoActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cryoActive && cryoSeconds > 0) {
      interval = setInterval(() => {
        setCryoSeconds((prev) => prev - 1);
      }, 1000);
    } else if (cryoSeconds === 0) {
      setCryoActive(false);
    }
    return () => clearInterval(interval);
  }, [cryoActive, cryoSeconds]);

  // GSAP scroll trigger for Bento Cards
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = containerRef.current?.querySelectorAll(".bento-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        }
      );
    }
  }, []);

  return (
    <section id="facility" ref={containerRef} className="py-28 relative bg-[#08080a] overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#ff1f26]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#ff1f26]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151e] border border-[#ff1f26]/40 text-xs font-mono text-[#ff1f26] uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>THE 5 PILLARS OF APEX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight mb-4">
            BUILT DIFFERENT. <span className="text-[#ff1f26]">ZERO COMPROMISE.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every square foot is engineered for supreme athletic output. 
            Calibrated competition iron, cold-shock chambers, and high-speed motion analysis.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Card 1: Heavy Iron & Interactive Plate Loader (Spans 2 cols, 2 rows on large) */}
          <div className="bento-card md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl bg-gradient-to-b from-[#13131b] to-[#0c0c11] border border-[#222230] hover:border-[#ff1f26]/60 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff1f26]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-md bg-[#ff1f26]/20 border border-[#ff1f26]/40 text-[#ff1f26] text-xs font-mono font-bold">
                  PILLAR 01 // COMPETITION STEEL
                </span>
                <Dumbbell className="w-6 h-6 text-[#ff1f26]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display mb-2">
                CALIBRATED BARBELL LAB
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                Eleiko IPF-certified stainless power bars, Olympic bearing bars, and cast iron plates 
                milled to within 10 grams of accuracy. Test your rack loading below:
              </p>

              {/* Interactive Barbell Simulator */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0a0e] border border-[#1e1e28] mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-mono text-zinc-400">TOTAL BAR WEIGHT:</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#ff1f26] font-display">
                      {totalWeight} <span className="text-xs text-zinc-400">LBS</span>
                    </span>
                    <button
                      onClick={clearPlates}
                      title="Clear Plates"
                      className="p-1.5 rounded-lg bg-[#181822] hover:bg-[#252535] text-zinc-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Visual Barbell Representation */}
                <div className="h-16 bg-[#111116] rounded-xl border border-[#22222d] flex items-center justify-center px-4 relative overflow-hidden mb-4">
                  {/* Barbell shaft */}
                  <div className="absolute left-6 right-6 h-2 bg-gradient-to-r from-zinc-600 via-zinc-300 to-zinc-600 rounded"></div>
                  
                  {/* Plate Stacks Left & Right */}
                  <div className="relative z-10 flex items-center justify-between w-full px-2">
                    {/* Left Sleeve */}
                    <div className="flex items-center flex-row-reverse gap-1">
                      {plates.map((plate, idx) => (
                        <div
                          key={`left-${idx}`}
                          className={`rounded-sm flex items-center justify-center text-[9px] font-black text-white shadow-md transition-all ${
                            plate === 45
                              ? "h-12 w-3.5 bg-red-600 border border-red-400"
                              : plate === 25
                              ? "h-10 w-3 bg-blue-600 border border-blue-400"
                              : plate === 10
                              ? "h-8 w-2.5 bg-emerald-600 border border-emerald-400"
                              : "h-7 w-2 bg-zinc-600 border border-zinc-400"
                          }`}
                        >
                          <span className="sr-only">{plate}</span>
                        </div>
                      ))}
                      <div className="w-2 h-7 bg-amber-400 rounded-sm" title="Collar"></div>
                    </div>

                    <div className="text-[11px] font-mono text-zinc-500 font-bold tracking-widest uppercase">
                      OLYMPIC 45 LB BAR
                    </div>

                    {/* Right Sleeve */}
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-7 bg-amber-400 rounded-sm" title="Collar"></div>
                      {plates.map((plate, idx) => (
                        <div
                          key={`right-${idx}`}
                          className={`rounded-sm flex items-center justify-center text-[9px] font-black text-white shadow-md transition-all ${
                            plate === 45
                              ? "h-12 w-3.5 bg-red-600 border border-red-400"
                              : plate === 25
                              ? "h-10 w-3 bg-blue-600 border border-blue-400"
                              : plate === 10
                              ? "h-8 w-2.5 bg-emerald-600 border border-emerald-400"
                              : "h-7 w-2 bg-zinc-600 border border-zinc-400"
                          }`}
                        >
                          <span className="sr-only">{plate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Plate quick buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 mr-1 uppercase">ADD TO SLEEVES:</span>
                  {[
                    { val: 45, color: "bg-red-950 text-red-400 border-red-800 hover:bg-red-900" },
                    { val: 25, color: "bg-blue-950 text-blue-400 border-blue-800 hover:bg-blue-900" },
                    { val: 10, color: "bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-emerald-900" },
                    { val: 5, color: "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700" },
                  ].map((btn) => (
                    <button
                      key={btn.val}
                      onClick={() => addPlate(btn.val)}
                      className={`px-2.5 py-1 rounded border text-xs font-mono font-bold flex items-center gap-1 transition-all ${btn.color}`}
                    >
                      <Plus className="w-3 h-3" />
                      +{btn.val}lb
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-[#1e1e28] pt-4 font-mono">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Check className="w-4 h-4 text-[#ff1f26]" /> 14 Rogue Monster Racks
              </span>
              <span>CHALK ALWAYS PROVIDED</span>
            </div>
          </div>

          {/* Card 2: Cryo & Cold Shock Recovery Pod */}
          <div className="bento-card md:col-span-1 lg:col-span-2 rounded-3xl bg-[#101017] border border-[#20202e] hover:border-[#ff1f26]/60 transition-all duration-300 p-6 flex flex-col justify-between group shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
                  PILLAR 02 // SUB-ZERO RECOVERY
                </span>
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-display mb-2">
                -110°C ELECTRIC CRYO CHAMBER
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Full-body nitrogen-free cryotherapy resets central nervous system fatigue, shrinks muscular inflammation, and spikes norepinephrine by 250%.
              </p>

              {/* Interactive Cryo Panel */}
              <div className="p-3.5 rounded-xl bg-[#0a0a0f] border border-[#1d1d28] flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black text-blue-400 font-display">
                    {cryoMode === "standard" ? "-110°C" : "-140°C"}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    <div>MODE: {cryoMode.toUpperCase()}</div>
                    <div className="text-zinc-500">TIMER: {Math.floor(cryoSeconds / 60)}:{(cryoSeconds % 60).toString().padStart(2, "0")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCryoMode(cryoMode === "standard" ? "extreme" : "standard")}
                    className="px-2.5 py-1 rounded bg-[#171724] border border-[#2b2b3d] text-[11px] font-mono text-zinc-300 hover:text-white"
                  >
                    TOGGLE {cryoMode === "standard" ? "EXTREME" : "STD"}
                  </button>
                  <button
                    onClick={() => setCryoActive(!cryoActive)}
                    className={`px-3 py-1 rounded text-xs font-bold font-mono ${
                      cryoActive
                        ? "bg-amber-600 text-white"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                    }`}
                  >
                    {cryoActive ? "PAUSE" : "START SESSION"}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xs text-zinc-400 flex items-center justify-between font-mono pt-3 border-t border-[#1a1a24]">
              <span>COMPRESSION BOOTS INCLUDED</span>
              <span className="text-blue-400">38°F CHILLED PLUNGE</span>
            </div>
          </div>

          {/* Card 3: Biomechanical Blueprint & Force Plates */}
          <div className="bento-card md:col-span-1 lg:col-span-1 rounded-3xl bg-[#101017] border border-[#20202e] hover:border-[#ff1f26]/60 transition-all duration-300 p-6 flex flex-col justify-between group shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded bg-[#ff1f26]/20 border border-[#ff1f26]/40 text-[#ff1f26] text-[10px] font-mono font-bold">
                  PILLAR 03 // DATA
                </span>
                <Gauge className="w-5 h-5 text-[#ff1f26]" />
              </div>
              <h3 className="text-lg font-black text-white uppercase font-display mb-1.5">
                VALD FORCE PLATES
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Analyze ground reaction force asymmetry, jump velocity, and barbell bar-path tracking in real time.
              </p>
              
              <div className="p-3 rounded-lg bg-[#0a0a0f] border border-[#1b1b24] space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-zinc-300">
                  <span>RFD (Rate of Force):</span>
                  <span className="text-[#ff1f26] font-bold">4,120 N/s</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>ASYMMETRY DELTA:</span>
                  <span className="text-emerald-400 font-bold">&lt; 1.2% OPTIMAL</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1c1c28] text-[11px] font-mono text-zinc-500">
              PHYSICAL LAB PROTOCOL
            </div>
          </div>

          {/* Card 4: High-Velocity Turf Track & Hyrox */}
          <div className="bento-card md:col-span-1 lg:col-span-1 rounded-3xl bg-[#101017] border border-[#20202e] hover:border-[#ff1f26]/60 transition-all duration-300 p-6 flex flex-col justify-between group shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold">
                  PILLAR 04 // SPRINT
                </span>
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-black text-white uppercase font-display mb-1.5">
                50M SLED TURF
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Engineered high-density turf runway for heavy tank pushes, prowler sprints, and Hyrox wall-ball conditioning.
              </p>

              <div className="p-3 rounded-lg bg-[#0a0a0f] border border-[#1b1b24] space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-zinc-300">
                  <span>TURF GRADE:</span>
                  <span className="text-amber-400 font-bold">MIL-SPEC SHOCK</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>PROWLER CARTS:</span>
                  <span className="text-white font-bold">UP TO 800 LBS</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1c1c28] text-[11px] font-mono text-zinc-500">
              OFFICIAL HYROX AFFILIATE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
