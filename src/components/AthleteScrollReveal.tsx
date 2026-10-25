"use client";

import { StickyCard_003 } from "@/components/v1/skiper34";

const images = [
  "/image copy 2.png",
  "/image copy 3.png",
  "/image copy 4.png",
  "/image copy 5.png",
  "/image copy 6.png",
];

export default function AthleteScrollReveal() {
  return (
    <section
      id="gallery"
      className="relative flex w-full flex-col items-center px-4 pt-20 sm:pt-28 pb-32 bg-[#070709] border-t border-b border-[#1a1a24]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c6f939]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center mb-10 sm:mb-14 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141d] border border-[#c6f939]/30 text-[11px] font-mono text-[#c6f939] uppercase tracking-widest font-black">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c6f939] animate-ping" />
          <span>PORTFOLIO // VERIFIED ATHLETES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-display">
          TRANSFORMATION <span className="text-[#c6f939]">ARCHIVE</span>
        </h2>

        <span className="relative text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 font-mono mt-3 after:block after:mx-auto after:mt-3 after:h-12 after:w-px after:bg-gradient-to-b after:from-[#c6f939] after:to-transparent">
          scroll down to stack cards
        </span>
      </div>

      {/* Full-bleed card stack: one image lands and sticks on top of the other */}
      <div className="w-full flex flex-col items-center">
        {images.map((img, idx) => (
          <StickyCard_003
            key={idx}
            imgUrl={img}
            index={idx}
            total={images.length}
          />
        ))}
      </div>
    </section>
  );
}
