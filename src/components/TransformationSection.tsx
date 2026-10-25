"use client";

import { useState } from "react";
import { Trophy, TrendingUp, ShieldCheck, Flame, ArrowUpRight, Star } from "lucide-react";

export default function TransformationSection() {
  const [activeClient, setActiveClient] = useState<number>(0);

  const transformations = [
    {
      name: "ALEXANDER M.",
      profession: "Tech Founder & Competitive Powerlifter",
      duration: "16 WEEKS",
      protocol: "HYPERTROPHY & PEAK STRENGTH HYBRID",
      metrics: [
        { label: "LEAN MUSCLE GAINED", value: "+14.2 LBS", change: "positive" },
        { label: "DEXA BODY FAT DELTA", value: "22% → 11.4%", change: "positive" },
        { label: "RAW SQUAT PR", value: "365 → 475 LBS", change: "positive" },
        { label: "DEADLIFT TOTAL", value: "425 → 560 LBS", change: "positive" },
      ],
      quote:
        "The difference with Coach Marco is that everything is tailored down to biomechanics and tendon tolerance. No fluff, no generic cookie-cutter plans. In 16 weeks I added 110 lbs to my competition squat while leaning out.",
      verified: "DEXA VERIFIED LAB RESULTS",
    },
    {
      name: "SARAH K.",
      profession: "Orthopedic Surgeon & Hyrox Competitor",
      duration: "12 WEEKS",
      protocol: "AEROBIC ENGINE & METABOLIC PEAK",
      metrics: [
        { label: "HYROX TIME IMPROVEMENT", value: "-18 MINS", change: "positive" },
        { label: "VO2 MAX INCREASE", value: "43 → 52 ml/kg", change: "positive" },
        { label: "TRAP BAR DEADLIFT", value: "205 → 315 LBS", change: "positive" },
        { label: "RECOVERY RESTING HR", value: "58 → 46 BPM", change: "positive" },
      ],
      quote:
        "As a surgeon, posture and structural joint health are non-negotiable. The biomechanical cues from Coach Marco eliminated my lower back fatigue completely. My Hyrox time dropped by 18 minutes.",
      verified: "BIOMETRIC LAB TESTED",
    },
    {
      name: "DAVID L.",
      profession: "Former Collegiate Sprinter",
      duration: "20 WEEKS",
      protocol: "STRUCTURAL HYPERTROPHY & EXPLOSIVE RESTORATION",
      metrics: [
        { label: "LEAN MASS ACCRETION", value: "+18.5 LBS", change: "positive" },
        { label: "10M SPRINT VELOCITY", value: "+12.4% SPEED", change: "positive" },
        { label: "BENCH PRESS REPS (225LBS)", value: "6 → 16 REPS", change: "positive" },
        { label: "VERTICAL JUMP GAIN", value: "+4.5 INCHES", change: "positive" },
      ],
      quote:
        "I was tired of generic commercial gyms that felt like social clubs. Coach Marco is intensely focused, knowledgeable, and demands perfection on every rep. The standard here forces you to level up.",
      verified: "VALD FORCE VERIFIED",
    },
  ];

  const current = transformations[activeClient];

  return (
    <section id="results" className="py-24 relative bg-[#070709] border-t border-[#1a1a24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151e] border border-[#ff1f26]/40 text-xs font-mono text-[#ff1f26] uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>MEASURABLE ATHLETIC EVIDENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            VERIFIED CLIENT <span className="text-[#ff1f26]">TRANSFORMATIONS</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2">
            We don’t rely on deceptive lighting or camera angles. We track DEXA body scans, force plate RFD, and calibrated barbell PRs.
          </p>
        </div>

        {/* Client Selector Pills */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {transformations.map((client, index) => (
            <button
              key={client.name}
              onClick={() => setActiveClient(index)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeClient === index
                  ? "bg-[#ff1f26] text-white shadow-[0_0_20px_rgba(255,31,38,0.4)]"
                  : "bg-[#121219] text-zinc-400 hover:text-white border border-[#20202e]"
              }`}
            >
              {client.name} ({client.duration})
            </button>
          ))}
        </div>

        {/* Detailed Transformation Card */}
        <div className="rounded-3xl bg-[#0f0f15] border border-[#20202e] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff1f26]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Client Profile & Quote (Spans 7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {current.verified}
                  </span>
                  <span className="text-zinc-500 text-xs font-mono">• {current.duration} CYCLE</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
                  {current.name}
                </h3>
                <div className="text-xs font-mono text-[#ff1f26] uppercase font-semibold mt-1 mb-4">
                  {current.profession}
                </div>

                <div className="p-4 rounded-xl bg-[#14141d] border border-[#222230] text-zinc-300 text-sm leading-relaxed italic mb-6">
                  &ldquo;{current.quote}&rdquo;
                </div>

                <div className="text-xs font-mono text-zinc-400">
                  <span className="text-zinc-500 uppercase">ASSIGNED PROTOCOL: </span>
                  <span className="text-white font-bold">{current.protocol}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Key Metric Deliverables (Spans 5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 font-mono">
              {current.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#13131c] border border-[#222232] hover:border-[#ff1f26]/40 transition-colors"
                >
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>{metric.label}</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#ff1f26]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-display mt-2">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
