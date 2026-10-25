"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StickyCardProps {
  imgUrl: string;
  index: number;
}

export const StickyCard_003 = ({ imgUrl, index }: StickyCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll through this specific card's section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale down card as user scrolls past it (1 -> 0.8)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Alternate rotation direction (+14deg / -14deg) for realistic dynamic card deck
  const rotateAngle = index % 2 === 0 ? 14 : -14;
  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotateAngle]);

  // Counter-rotate the inner image so the athlete stays upright while card spins
  const counterRotate = useTransform(rotate, (val) => -val);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[75vh] sm:h-[85vh] flex justify-center"
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{
          scale,
          rotate,
          top: "14vh",
        }}
        className="sticky w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[460px] md:max-w-[520px] aspect-[4/5] max-h-[65vh] sm:max-h-[70vh] overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#0d0d14] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex items-center justify-center p-2.5 sm:p-3.5"
      >
        <motion.img
          src={imgUrl}
          alt="Transformation Athlete"
          style={{
            rotate: counterRotate,
          }}
          loading="eager"
          className="h-full w-full object-cover object-center select-none rounded-[18px] sm:rounded-[26px]"
        />
      </motion.div>
    </div>
  );
};

export default StickyCard_003;
