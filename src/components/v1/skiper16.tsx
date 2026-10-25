"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Trophy, ArrowUpRight, Flame, Shield, Activity, Zap } from "lucide-react";

export interface ProjectCardData {
  title: string;
  category: string;
  stat: string;
  metric: string;
  src: string;
  tag: string;
  color?: string;
}

export const defaultProjects: ProjectCardData[] = [
  {
    tag: "PHASE 01 // HYPERTROPHY",
    title: "12-WEEK LEAN MASS ACCRETION",
    category: "Hypertrophy & Strength Periodization",
    stat: "+5.8KG LEAN TISSUE",
    metric: "Body Fat: 16.2% → 9.4%",
    src: "/image copy 2.png",
    color: "#c6f939",
  },
  {
    tag: "PHASE 02 // CONDITIONING",
    title: "CONTEST PREP & PEAKING PROTOCOL",
    category: "Metabolic Peaking & Conditioning",
    stat: "STAGE READY // 4.8% BF",
    metric: "1st Place Classic Physique",
    src: "/image copy 3.png",
    color: "#38bdf8",
  },
  {
    tag: "PHASE 03 // STRUCTURAL POWER",
    title: "POSTERIOR CHAIN & REBUILD",
    category: "Biomechanical Correction & Power",
    stat: "+45KG DEADLIFT 1RM",
    metric: "Full Spinal Decompression",
    src: "/image copy 4.png",
    color: "#f59e0b",
  },
  {
    tag: "PHASE 04 // VASCULARITY",
    title: "METABOLIC ACCELERATION",
    category: "Nutrient Partitioning & Density",
    stat: "-9.4KG VISCERAL FAT",
    metric: "Insulin Sensitivity Restored",
    src: "/image copy 5.png",
    color: "#c6f939",
  },
  {
    tag: "PHASE 05 // PEAK OUTPUT",
    title: "EXPLOSIVE FORCE & VELOCITY",
    category: "CNS Rate of Force Development",
    stat: "+12CM VERTICAL JUMP",
    metric: "Anaerobic Power: +28%",
    src: "/image copy 6.png",
    color: "#a855f7",
  },
];

interface StickyCardProps {
  i: number;
  totalCards: number;
  card: ProjectCardData;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const StickyCard_001 = ({
  i,
  totalCards,
  card,
  progress,
  range,
  targetScale,
}: StickyCardProps) => {
  const container = useRef<HTMLDivElement>(null);

  // Smooth scroll-based card scaling
  const scale = useTransform(progress, range, [1, targetScale]);

  // Subtle image parallax / counter-zoom
  const imgScale = useTransform(progress, range, [1, 1.08]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center h-screen w-full px-3 sm:px-6 pointer-events-none"
    >
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 20}px)`,
        }}
        className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-[500px] sm:h-[540px] md:h-[580px] max-h-[75vh] origin-top rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/20 bg-[#0d0d14] shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between p-3.5 sm:p-6 pointer-events-auto select-none"
      >
        {/* Background Transformation Image with parallax zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px] sm:rounded-[36px]">
          <motion.img
            style={{ scale: imgScale }}
            src={card.src}
            alt={card.title}
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
            decoding="sync"
          />
          {/* Vignette & Contrast gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80" />
        </div>

        {/* TOP ROW: Protocol Tag & Card Index Pill */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: card.color || "#c6f939" }}
            />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
              {card.tag}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[10px] sm:text-xs font-black text-[#c6f939]">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">{String(totalCards).padStart(2, "0")}</span>
          </div>
        </div>

        {/* BOTTOM ROW: Protocol Title & Verified Result Pill */}
        <div className="relative z-10 flex flex-col gap-3 mt-auto">
          {/* Stat Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#c6f939] text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg">
              <Trophy className="w-3.5 h-3.5 shrink-0" />
              <span>{card.stat}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-zinc-300 font-mono text-[10px] sm:text-xs font-medium">
              <Activity className="w-3.5 h-3.5 text-[#c6f939] shrink-0" />
              <span>{card.metric}</span>
            </div>
          </div>

          {/* Title & Category Bar */}
          <div className="p-3 sm:p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <h3 className="font-display font-black text-lg sm:text-2xl uppercase tracking-tight text-white leading-tight">
                {card.title}
              </h3>
              <p className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest mt-0.5">
                {card.category}
              </p>
            </div>

            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-[#c6f939] hover:text-black text-white flex items-center justify-center transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Skiper16 = ({
  projects = defaultProjects,
}: {
  projects?: ProjectCardData[];
}) => {
  const container = useRef<HTMLDivElement>(null);

  // Track scroll through the full height of the stacked card deck
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative w-full">
      {projects.map((project, i) => {
        // Calculate smooth progressive scale reduction for older cards in the deck
        const targetScale = Math.max(0.72, 1 - (projects.length - i - 1) * 0.06);
        const startRange = (i * 0.8) / projects.length;

        return (
          <StickyCard_001
            key={`sticky_card_${i}`}
            i={i}
            totalCards={projects.length}
            card={project}
            progress={scrollYProgress}
            range={[startRange, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

export default Skiper16;
