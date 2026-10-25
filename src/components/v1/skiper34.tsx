"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const StickyCard_003 = ({ imgUrl }: { imgUrl: string }) => {
  const vertMargin = 12;
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
    window.addEventListener("load", updateStickPoint);

    const t1 = setTimeout(updateStickPoint, 400);
    const t2 = setTimeout(updateStickPoint, 1200);

    return () => {
      window.removeEventListener("resize", updateStickPoint);
      window.removeEventListener("load", updateStickPoint);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [vertMargin]);

  useEffect(() => {
    return scrollY.on("change", (latestScrollY) => {
      if (!container.current) return;
      const rect = container.current.getBoundingClientRect();
      const targetTop = (window.innerHeight * vertMargin) / 100;

      // Before sticking: stay upright and fully sized
      if (rect.top > targetTop + 2) {
        scale.set(1);
        filter.set(0);
      } else {
        // While stuck and scrolling past: animate 1-by-1
        const currentStick = stickPoint ?? (latestScrollY + rect.top - targetTop);
        const scrollDistance = 650;
        const progress = Math.min(1, Math.max(0, (latestScrollY - currentStick) / scrollDistance));
        const animationValue = 1 - progress;
        scale.set(Math.max(0.12, animationValue));
        filter.set((1 - animationValue) * 55);
      }
    });
  }, [scrollY, stickPoint, scale, filter, vertMargin]);

  return (
    <motion.div
      ref={container}
      className="rounded-[24px] sm:rounded-[32px] sticky w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[540px] aspect-[4/5] max-h-[68vh] sm:max-h-[72vh] overflow-hidden bg-[#0d0d12] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex items-center justify-center p-2.5 sm:p-3.5"
      style={{
        scale: scale,
        rotate: filter,
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
        className="h-full w-full object-cover object-center select-none rounded-[18px] sm:rounded-[26px]"
      />
    </motion.div>
  );
};

export default StickyCard_003;
