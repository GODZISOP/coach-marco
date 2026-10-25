"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Flame, Shield, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PricingProps {
  onOpenBooking: () => void;
}

export default function PricingSection({ onOpenBooking }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Typography Mask Reveals (Every time user scrolls into view)
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".pricing-mask-line"),
          { y: "120%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          ".pricing-toggle-wrap",
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 2. 3D Perspective Card Stagger (Every time user scrolls into view)
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          {
            y: 80,
            opacity: 0,
            scale: 0.93,
            rotateX: 10,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.95,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 3. Guarantee Strip Reveal
      if (guaranteeRef.current) {
        gsap.fromTo(
          guaranteeRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: guaranteeRef.current,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: "IRON CORE",
      tagline: "Unrestricted access to the calibrated barbell floor.",
      priceMonthly: 89,
      priceAnnual: 71,
      popular: false,
      features: [
        "24/7 Biometric RFID Turnstile Access",
        "Calibrated Eleiko & Rogue Steel Barbells",
        "14 Competition Squat & Bench Platforms",
        "Free Chalk & Liquid Magnesium Stations",
        "Coach Marco Mobile Tracking App",
        "Locker Room & High-Pressure Showers",
      ],
      cta: "SELECT IRON CORE",
    },
    {
      name: "APEX ATHLETE",
      tagline: "The complete performance and biometric recovery protocol.",
      priceMonthly: 169,
      priceAnnual: 135,
      popular: true,
      features: [
        "Everything in Iron Core Tier",
        "4x Monthly Sub-Zero Electric Cryo Sessions",
        "Unlimited Cold Plunge (38°F) & Infrared Sauna",
        "Monthly InBody / DEXA Composition Scan",
        "Official Hyrox & High-Velocity Turf Access",
        "10% Discount at Macro Bar & Fuel Lab",
        "Priority Bay Booking during Peak Hours",
      ],
      cta: "CLAIM APEX MEMBERSHIP",
    },
    {
      name: "TITAN BLACK CARD",
      tagline: "Full-spectrum concierge athletic coaching and rehabilitation.",
      priceMonthly: 289,
      priceAnnual: 231,
      popular: false,
      features: [
        "Unlimited 24/7 Access with Guest Pass",
        "Weekly 1-on-1 Coaching with Coach Marco",
        "Unlimited Cryo Chamber & Recovery Suite",
        "Bi-Weekly VALD Force Plate Neuromuscular Testing",
        "Custom Macro Programming & Weekly Check-ins",
        "Dedicated Permanent Locker & Fresh Towel Valet",
        "Private VIP Athlete Lounge Access",
      ],
      cta: "REQUEST TITAN BLACK",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="py-24 sm:py-32 relative bg-[#08080a] border-t border-[#1a1a24] overflow-hidden select-none perspective-[1200px]"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(198,249,57,0.15)_0%,transparent_70%)] blur-[150px] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Masked Slide-Up Reveals */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="overflow-hidden inline-block mb-3">
            <div className="pricing-mask-line inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#15151e] border border-[#c6f939]/40 text-xs font-mono text-[#c6f939] uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>TRANSPARENT ATHLETIC TIERS</span>
            </div>
          </div>

          <div className="overflow-hidden py-1">
            <h2 className="pricing-mask-line text-4xl sm:text-6xl font-black text-white uppercase font-display tracking-tight leading-[1.0]">
              INVEST IN YOUR <span className="text-[#c6f939]">ENGINE</span>
            </h2>
          </div>

          <div className="overflow-hidden py-1">
            <p className="pricing-mask-line text-zinc-400 text-sm max-w-xl mx-auto mt-2 font-sans">
              No long-term predatory lock-ins. Capped member roster to guarantee zero rack wait times.
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="pricing-toggle-wrap mt-8 inline-flex items-center p-1.5 rounded-full bg-[#12121a] border border-[#232332] shadow-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#1f1f2c] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              MONTH-TO-MONTH
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-[#c6f939] text-black font-black shadow-[0_0_15px_rgba(198,249,57,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>ANNUAL PASS</span>
              <span className="px-2 py-0.5 rounded-full bg-black text-[#c6f939] text-[9px] font-black">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid with 3D Stagger & Hover */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
            return (
              <motion.div
                key={plan.name}
                whileHover={{
                  scale: 1.035,
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-shadow duration-300 relative ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#161622] to-[#0d0d14] border-2 border-[#c6f939] shadow-[0_0_40px_rgba(198,249,57,0.25)] lg:-translate-y-3"
                    : "bg-[#0d0d13] border border-[#1e1e2c] hover:border-[#c6f939]/40 shadow-xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#c6f939] to-[#9ad116] text-black font-mono text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-black" /> MOST POPULAR PROTOCOL
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed font-sans">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-1 my-6 font-display">
                    <span className="text-4xl sm:text-5xl font-black text-white">${price}</span>
                    <span className="text-xs text-zinc-400 font-mono">/ MONTH</span>
                    {billingCycle === "annual" && (
                      <span className="text-[10px] font-mono text-emerald-400 ml-2">BILLED ANNUALLY</span>
                    )}
                  </div>

                  <div className="h-[1px] bg-[#1e1e2a] w-full mb-6"></div>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                        <Check className="w-4 h-4 text-[#c6f939] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className={`w-full py-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-[#c6f939] hover:bg-[#b2e52b] text-black shadow-[0_0_25px_rgba(198,249,57,0.4)] hover:scale-[1.02]"
                      : "bg-[#15151e] hover:bg-[#c6f939] text-zinc-200 hover:text-black border border-[#262638] hover:border-[#c6f939]"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Member Guarantee */}
        <div 
          ref={guaranteeRef}
          className="mt-14 p-6 rounded-2xl bg-[#0e0e14] border border-[#1f1f2c] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 font-mono gap-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#c6f939]" />
            <span>30-DAY UNCONDITIONAL STRENGTH PR GUARANTEE OR 100% REFUND</span>
          </div>
          <span className="text-zinc-500 font-bold">CAPPED AT 350 TOTAL ACTIVE MEMBERS</span>
        </div>
      </div>
    </section>
  );
}
