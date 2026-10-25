"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Dumbbell, Zap, Flame, Activity, Star } from "lucide-react";

interface ExperienceShowcaseProps {
  onOpenBooking?: () => void;
}

export default function ExperienceShowcase({ onOpenBooking }: ExperienceShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking for subtle 3D tactile feedback
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 35);
      mouseY.set(y * 35);
    }
  };

  // --- Scroll Parallax Orchestration (NO BLUR, ultra-crisp transforms) ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Layered Parallax: Avatars glide at varying depths on scroll
  const avatar1Y = useTransform(smoothScroll, [0, 1], [-80, 100]);
  const avatar1X = useTransform(smoothScroll, [0, 1], [15, -35]);

  const avatar2Y = useTransform(smoothScroll, [0, 1], [70, -110]);
  const avatar2X = useTransform(smoothScroll, [0, 1], [-30, 25]);

  const avatar3Y = useTransform(smoothScroll, [0, 1], [-90, 110]);
  const avatar3X = useTransform(smoothScroll, [0, 1], [35, -25]);

  const avatar4Y = useTransform(smoothScroll, [0, 1], [90, -120]);
  const avatar4X = useTransform(smoothScroll, [0, 1], [20, -30]);

  // Floating Pills Parallax
  const reviewsPillY = useTransform(smoothScroll, [0, 1], [-50, 60]);
  const reviewsPillRotate = useTransform(smoothScroll, [0, 1], [-3, 4]);

  const badge1Y = useTransform(smoothScroll, [0, 1], [60, -75]);
  const badge2Y = useTransform(smoothScroll, [0, 1], [-50, 65]);

  // Center text scroll parallax
  const centerTextY = useTransform(smoothScroll, [0.2, 0.8], [40, -40]);
  const pillSquash = useTransform(smoothScroll, [0.35, 0.55, 0.75], [0.94, 1.05, 0.96]);

  // --- GSAP Context for High-Precision Text Mask Reveals & Card Staggers ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Top Section Masked Typography Reveal (Clean Slide-Up from overflow: hidden)
      if (topTextRef.current) {
        gsap.fromTo(
          topTextRef.current.querySelectorAll(".mask-reveal-line"),
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.0,
            stagger: 0.14,
            ease: "power4.out",
            scrollTrigger: {
              trigger: topTextRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. Staggered 3D Perspective Card Entrance
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          {
            y: 90,
            opacity: 0,
            scale: 0.92,
            rotateX: 12,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 3. Statement Line Mask Slide-Up Reveals
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current.querySelectorAll(".statement-mask-line"),
          { y: "115%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.1,
            stagger: 0.16,
            ease: "power4.out",
            scrollTrigger: {
              trigger: statementRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      // 4. Elastic Pop for the Signature "JUST TRAIN." Neon Capsule
      if (pillRef.current) {
        gsap.fromTo(
          pillRef.current,
          {
            scale: 0.65,
            rotation: -8,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: -1,
            opacity: 1,
            duration: 1.2,
            ease: "elastic.out(1.1, 0.5)",
            scrollTrigger: {
              trigger: pillRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fitnessCards = [
    {
      num: "01",
      title: "CUSTOM\nPROGRAMMING",
      sub: "Bespoke 1-on-1 strength plan",
      bg: "bg-[#c6f939]",
      text: "text-black",
      numColor: "text-black/55",
      subColor: "text-black/75",
      stagger: false,
    },
    {
      num: "02",
      title: "TECHNIQUE &\nFORM LAB",
      sub: "Frame-by-frame lift analysis",
      bg: "bg-[#18181d] border border-white/10",
      text: "text-white",
      numColor: "text-zinc-600",
      subColor: "text-zinc-400",
      stagger: true,
    },
    {
      num: "03",
      title: "NUTRITION &\nMETA PROTOCOL",
      sub: "Tailored macros & fueling guide",
      bg: "bg-white",
      text: "text-black",
      numColor: "text-zinc-400",
      subColor: "text-zinc-600",
      stagger: false,
    },
    {
      num: "04",
      title: "DIRECT COACH\nMENTORSHIP",
      sub: "Weekly check-ins with Marco",
      bg: "bg-[#c6f939]",
      text: "text-black",
      numColor: "text-black/55",
      subColor: "text-black/75",
      stagger: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      onMouseMove={handleMouseMove}
      className="relative py-16 sm:py-20 bg-[#000000] text-white overflow-hidden select-none perspective-[1200px]"
    >
      {/* Precision Geometric Grid Background (No blur, crisp high-res styling) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* TOP SUB-SECTION: MASKED TYPOGRAPHY + 4 STAGGERED 3D CARDS                 */}
        {/* ========================================================================= */}
        <div className="mb-12 sm:mb-16">
          <div 
            ref={topTextRef}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-8 sm:mb-10"
          >
            <div>
              <div className="overflow-hidden mb-2">
                <div className="mask-reveal-line inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121218] border border-[#c6f939]/30 text-xs font-mono text-[#c6f939] uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>1-ON-1 ATHLETIC COACHING</span>
                </div>
              </div>

              {/* Masked Headline Lines (Slide up from parent overflow: hidden) */}
              <div className="overflow-hidden py-0.5">
                <h2 className="mask-reveal-line text-2xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-white leading-[1.05]">
                  The complete
                </h2>
              </div>
              <div className="overflow-hidden py-0.5">
                <h2 className="mask-reveal-line text-2xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight leading-[1.05]">
                  <span className="text-white">coach marco</span>{" "}
                  <span className="text-[#c6f939]">system.</span>
                </h2>
              </div>
            </div>

            <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed max-w-sm">
              Everything you need for an uncompromising physical transformation — direct 1-on-1 mentorship, bespoke periodized strength training, technique refinement, and customized nutrition under Coach Marco.
            </p>
          </div>

          {/* 4 Staggered Feature Cards Grid with GSAP entrance & Framer-motion hover */}
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start"
          >
            {fitnessCards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  rotateZ: idx % 2 === 0 ? -0.6 : 0.6,
                  transition: { type: "spring", stiffness: 450, damping: 22 }
                }}
                whileTap={{ scale: 0.97 }}
                className={`w-full min-h-[200px] sm:min-h-[220px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-shadow duration-300 cursor-pointer shadow-xl ${
                  card.bg
                } ${card.stagger ? "lg:translate-y-5" : ""}`}
              >
                {/* Top Number */}
                <div className="flex items-center justify-between">
                  <span className={`text-base sm:text-lg font-sans font-black tracking-tight ${card.numColor}`}>
                    {card.num}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${card.text === "text-white" ? "bg-[#c6f939]" : "bg-black/40"}`} />
                </div>

                {/* Middle Headline */}
                <div className="my-auto py-2">
                  <h3 className={`text-lg sm:text-xl font-sans font-black tracking-tight uppercase leading-[1.15] whitespace-pre-line ${card.text}`}>
                    {card.title}
                  </h3>
                </div>

                {/* Bottom Subtext */}
                <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                  <span className={`text-[11px] font-sans font-bold ${card.subColor}`}>
                    {card.sub}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${card.subColor}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SUB-SECTION: INTERACTIVE ORBIT SHOWCASE + MASK REVEALS             */}
        {/* ========================================================================= */}
        <div 
          ref={showcaseContainerRef}
          className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 text-center flex flex-col items-center justify-center"
        >
          {/* Top Brand Logo / Wordmark in center */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#c6f939] text-black flex items-center justify-center font-black shadow-[0_0_15px_rgba(198,249,57,0.4)]">
              <Dumbbell className="w-3.5 h-3.5 transform -rotate-45" />
            </div>
            <span className="font-sans font-black text-xl tracking-wider text-white uppercase">
              COACH MARCO
            </span>
          </div>

          {/* Floating Pill: 500+ Athletes Coached (Top Right) with scroll parallax + mouse reaction */}
          <motion.div
            style={{ 
              y: reviewsPillY, 
              rotate: reviewsPillRotate,
              x: springMouseX 
            }}
            animate={{ y: [-5, 6, -5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 sm:top-14 right-4 sm:right-12 lg:right-24 px-4 py-2 rounded-full bg-[#121217] border border-white/20 text-zinc-200 text-xs font-mono shadow-2xl hidden sm:flex items-center gap-2 cursor-pointer hover:border-[#c6f939] hover:scale-105 transition-all"
          >
            <div className="flex items-center text-[#c6f939]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-[11px]">500+ Athletes Coached by Marco</span>
          </motion.div>

          {/* Floating Avatar 1 (Top Left) with green ring glow and scroll parallax */}
          <motion.div
            style={{ 
              y: avatar1Y, 
              x: useTransform(() => avatar1X.get() + springMouseX.get() * 0.7) 
            }}
            animate={{ y: [-7, 7, -7] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 sm:top-12 left-6 sm:left-16 lg:left-28 w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 border-[#c6f939] shadow-[0_0_20px_rgba(198,249,57,0.4)] overflow-hidden hover:scale-115 transition-transform cursor-pointer"
          >
            <Image
              src="/image copy 2.png"
              alt="Coach Marco Athlete"
              width={52}
              height={52}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Avatar 2 (Mid Left) with smooth float physics */}
          <motion.div
            style={{ 
              y: avatar2Y, 
              x: useTransform(() => avatar2X.get() + springMouseX.get() * 0.5) 
            }}
            animate={{ y: [7, -7, 7] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-8 left-2 sm:left-8 lg:left-16 w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-white/25 shadow-xl overflow-hidden hover:scale-115 transition-transform cursor-pointer"
          >
            <Image
              src="/image copy 3.png"
              alt="Powerlifter & Member"
              width={56}
              height={56}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Avatar 3 (Mid Right) */}
          <motion.div
            style={{ 
              y: avatar3Y, 
              x: useTransform(() => avatar3X.get() - springMouseX.get() * 0.6) 
            }}
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-16 right-2 sm:right-8 lg:right-16 w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-white/25 shadow-xl overflow-hidden hover:scale-115 transition-transform cursor-pointer"
          >
            <Image
              src="/image copy 4.png"
              alt="Hyrox Conditioning Member"
              width={56}
              height={56}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Badge (Bottom Left): 12+ Years Elite Coaching */}
          <motion.div
            style={{ 
              y: badge1Y,
              x: useTransform(() => springMouseX.get() * 0.4) 
            }}
            animate={{ y: [5, -6, 5] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 sm:bottom-14 left-4 sm:left-14 lg:left-32 px-3.5 py-1.5 rounded-full bg-[#121217] border border-white/15 text-zinc-300 text-[11px] font-mono shadow-xl hidden sm:flex items-center gap-1.5 cursor-pointer hover:border-[#c6f939] hover:scale-105 transition-all"
          >
            <Flame className="w-3 h-3 text-[#c6f939] fill-current" />
            <span>12+ Years Elite Coaching</span>
          </motion.div>

          {/* Floating Badge (Mid-Lower Right): 100% Custom Training Protocol */}
          <motion.div
            style={{ 
              y: badge2Y,
              x: useTransform(() => -springMouseX.get() * 0.4) 
            }}
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-2/3 right-6 sm:right-16 lg:right-28 px-3.5 py-1.5 rounded-full bg-[#121217] border border-white/15 text-zinc-300 text-[11px] font-mono shadow-xl hidden sm:flex items-center gap-1.5 cursor-pointer hover:border-[#c6f939] hover:scale-105 transition-all"
          >
            <Activity className="w-3 h-3 text-[#c6f939]" />
            <span>100% Custom Training Protocol</span>
          </motion.div>

          {/* Floating Avatar 4 (Bottom Right) */}
          <motion.div
            style={{ 
              y: avatar4Y, 
              x: useTransform(() => avatar4X.get() - springMouseX.get() * 0.5) 
            }}
            animate={{ y: [6, -7, 6] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 sm:bottom-12 right-10 sm:right-24 lg:right-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20 shadow-xl overflow-hidden hover:scale-115 transition-transform cursor-pointer"
          >
            <Image
              src="/image copy 5.png"
              alt="Competition Athlete"
              width={48}
              height={48}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Central Massive Typography Statement (with Apple/Linear Style Overflow Masking) */}
          <motion.div 
            ref={statementRef}
            style={{ y: centerTextY }}
            className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
          >
            {/* Masked Line 1 */}
            <div className="overflow-hidden py-0.5">
              <h2 className="statement-mask-line text-3xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-white leading-[0.95] uppercase">
                No excuses.
              </h2>
            </div>

            {/* Masked Line 2 */}
            <div className="overflow-hidden py-0.5">
              <h2 className="statement-mask-line text-3xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-white leading-[0.95] uppercase">
                No wait.
              </h2>
            </div>
            
            {/* The Signature Neon Pill: "Just train." with Elastic Pop & Squash Physics */}
            <motion.div 
              ref={pillRef}
              style={{ scale: pillSquash }}
              whileHover={{ 
                scale: 1.06, 
                rotate: 0,
                transition: { type: "spring", stiffness: 450, damping: 15 } 
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-2.5 sm:mt-4 cursor-pointer"
              onClick={onOpenBooking}
            >
              <span className="inline-block bg-[#c6f939] text-black text-3xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight px-6 sm:px-10 py-1 sm:py-2 rounded-[28px] sm:rounded-[44px] shadow-[0_0_35px_rgba(198,249,57,0.4)] transform -rotate-1 select-none uppercase">
                Just train.
              </span>
            </motion.div>

            {/* Fitness Subtitle */}
            <p className="mt-4 sm:mt-6 text-zinc-400 font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed px-4">
              Direct 1-on-1 coaching by Coach Marco. Personalized lifting protocols, meticulous biomechanical cues, and zero guesswork. Raw strength, lean conditioning, and real results.
            </p>

            {/* Primary Pill Button with Tactile Bounce */}
            <motion.button
              onClick={onOpenBooking}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(198, 249, 57, 0.5)"
              }}
              whileTap={{ scale: 0.94 }}
              className="mt-6 px-6 py-3 rounded-full bg-[#c6f939] hover:bg-[#b5f022] text-black font-sans font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(198,249,57,0.35)] cursor-pointer"
            >
              <span>START 1-ON-1 WITH COACH MARCO →</span>
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
