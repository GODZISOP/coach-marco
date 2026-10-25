"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StickyCardProps {
  imgUrl: string;
  index: number;
  total: number;
}

export const StickyCard_003 = ({ imgUrl, index, total }: StickyCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll through this specific card once it reaches its sticky position (14vh from top)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 14vh", "end start"],
  });

  // Card scales down as subsequent cards land on top of it, peeking out behind them
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Alternating natural deck tilt (+3.5deg / -3.5deg) so the top corners peek out behind newer cards
  const rotateAngle = index % 2 === 0 ? 3.5 : -3.5;
  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotateAngle]);

  // Counter-rotate the inner image so the athlete stays upright while the card frame tilts
  const counterRotate = useTransform(rotate, (val) => -val);

  // Subtle dimming as the card settles beneath newer cards in the stack
  const darkness = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        rotate,
        top: "14vh",
        zIndex: index + 10,
      }}
      className="sticky w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[620px] aspect-[4/5] max-h-[70vh] sm:max-h-[74vh] overflow-hidden rounded-[26px] sm:rounded-[36px] bg-[#0c0c12] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex items-center justify-center p-2 sm:p-2.5 will-change-transform select-none shrink-0"
    >
      <div className="w-full h-full overflow-hidden rounded-[20px] sm:rounded-[30px] relative bg-[#121218]">
        <motion.img
          src={imgUrl}
          alt={`Coach Marco Transformation ${index + 1}`}
          loading="eager"
          decoding="sync"
          style={{
            rotate: counterRotate,
            scale: 1.12,
          }}
          className="w-full h-full object-cover object-center select-none"
        />

        {/* Ambient cinematic lighting vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Shadow overlay when card sits beneath newer cards */}
        <motion.div
          style={{ opacity: darkness }}
          className="absolute inset-0 bg-black pointer-events-none"
        />

        {/* Technical athlete indicator badge */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c6f939]" />
          <span>ATHLETE // 0{index + 1} OF 0{total}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StickyCard_003;
