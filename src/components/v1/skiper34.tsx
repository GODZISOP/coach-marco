"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const StickyCard_003 = ({ imgUrl }: { imgUrl: string }) => {
  const vertMargin = 10;
  const container = useRef<HTMLDivElement>(null);
  const [stickPoint, setStickPoint] = useState<number | null>(null);

  // Initial values: card is 100% visible and unrotated from the very start
  const scale = useMotionValue(1);
  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll();

  useEffect(() => {
    const updateStickPoint = () => {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        const currentScroll = window.scrollY || window.pageYOffset;
        const targetTop = (window.innerHeight * vertMargin) / 100;
        setStickPoint(currentScroll + rect.top - targetTop);
      }
    };

    updateStickPoint();
    window.addEventListener("resize", updateStickPoint);
    return () => window.removeEventListener("resize", updateStickPoint);
  }, [vertMargin]);

  useEffect(() => {
    return scrollY.on("change", (latestScrollY) => {
      if (stickPoint === null) return;

      if (latestScrollY <= stickPoint) {
        // Entering the card: fully visible, sharp, upright, no delay!
        scale.set(1);
        filter.set(0);
      } else {
        // As you scroll past: scales down and spins the outer card frame while counter-rotating the inner image!
        const scrollDistance = 800;
        const progress = Math.min(1, Math.max(0, (latestScrollY - stickPoint) / scrollDistance));
        const animationValue = 1 - progress;
        scale.set(Math.max(0.1, animationValue));
        filter.set((1 - animationValue) * 65);
      }
    });
  }, [scrollY, stickPoint, scale, filter]);

  return (
    <motion.div
      ref={container}
      className="rounded-[28px] sm:rounded-[36px] sticky w-full max-w-3xl overflow-hidden bg-[#0e0e16] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.95)] flex items-center justify-center p-3 sm:p-5"
      style={{
        scale: scale,
        rotate: filter,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`,
      }}
    >
      <motion.img
        src={imgUrl}
        alt="Transformation Athlete"
        style={{
          rotate: negateFilter,
        }}
        loading="eager"
        className="h-full w-full object-contain object-center select-none rounded-[20px] sm:rounded-[28px]"
      />
    </motion.div>
  );
};

export default StickyCard_003;
