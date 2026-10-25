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
    <section id="gallery" className="relative flex w-full flex-col items-center gap-[15vh] px-4 pt-20 pb-[20vh] bg-[#070709]">
      {/* Header with skiper34 scroll indicator */}
      <div className="relative flex flex-col items-center gap-4 text-center mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-[#c6f939] font-bold">
          COACH MARCO ATHLETES // ARCHIVE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display">
          TRANSFORMATION IN MOTION
        </h2>
        <span className="relative text-xs uppercase tracking-widest text-zinc-500 font-mono mt-2 after:block after:mx-auto after:mt-3 after:h-12 after:w-px after:bg-gradient-to-b after:from-[#c6f939] after:to-transparent">
          scroll down to see effect
        </span>
      </div>

      {/* Sticky Card Stack */}
      {images.map((img, idx) => (
        <StickyCard_003 key={idx} imgUrl={img} />
      ))}
    </section>
  );
}
