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

  // Measure scroll through this specific card's track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // As the user scrolls past this card, it scales down from 1.0 to 0.90 so the top/sides peek behind the next card
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.90]);

  // Subtle natural deck tilt (+2.5deg / -2.5deg) exactly like the demo
  const rotateAngle = index % 2 === 0 ? 2.5 : -2.5;
  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotateAngle]);

  // Counter-rotate the inner image so the athlete stays upright while card frame subtly rotates
  const counterRotate = useTransform(rotate, (val) => -val);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[85vh] sm:h-[95vh] flex justify-center"
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{
          scale,
          rotate,
          top: "12vh",
        }}
        className="sticky w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[620px] aspect-[4/5] max-h-[72vh] sm:max-h-[76vh] overflow-hidden rounded-[26px] sm:rounded-[36px] bg-[#0c0c12] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex items-center justify-center p-2 sm:p-2.5"
      >
        <motion.img
          src={imgUrl}
          alt={`Coach Marco Transformation ${index + 1}`}
          style={{
            rotate: counterRotate,
          }}
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-center select-none rounded-[20px] sm:rounded-[30px]"
        />
      </motion.div>
    </div>
  );
};

export default StickyCard_003;
