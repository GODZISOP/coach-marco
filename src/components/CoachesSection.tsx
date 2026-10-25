"use client";

import { Award, Trophy, Dumbbell, ShieldCheck, ArrowRight } from "lucide-react";

interface CoachesProps {
  onOpenBooking: () => void;
}

export default function CoachesSection({ onOpenBooking }: CoachesProps) {
  const coaches = [
    {
      name: "COACH MARCO",
      role: "HEAD COACH & ATHLETIC DIRECTOR",
      certs: "CSCS*D, USAW LEVEL 3, EXOS PERFORMANCE",
      bio: "Elite Strength & Conditioning Director with 14 years preparing elite lifters, athletes, and transformation clients. Zero fluff, 100% individual programming.",
      prs: [
        { lift: "DEADLIFT", weight: "765 LBS" },
        { lift: "SQUAT", weight: "640 LBS" },
        { lift: "BENCH", weight: "445 LBS" },
      ],
      tag: "HEAD COACH",
      initials: "CM",
    },
    {
      name: "DR. ELENA VANCE",
      role: "BIOMECHANICS & HYPERTROPHY SPECIALIST",
      certs: "PHD EXERCISE PHYSIOLOGY, CSCS, CISSN",
      bio: "Author of multiple peer-reviewed studies on eccentric muscle damage and structural tendon remodeling. Designs periodized mass-gain programs backed by empirical data.",
      prs: [
        { lift: "SQUAT", weight: "425 LBS" },
        { lift: "DEADLIFT", weight: "485 LBS" },
        { lift: "HIP THRUST", weight: "550 LBS" },
      ],
      tag: "LAB DIRECTOR",
      initials: "EV",
    },
    {
      name: "DEX COLEMAN",
      role: "POWERLIFTING & JOINT REBUILD SPECIALIST",
      certs: "USAPL SENIOR COACH, FMS LEVEL 2, RTS",
      bio: "Specializes in lifting through structural impingements, hip-hinge mechanics, and technical mastery under extreme barbell loads. 1,750 lb competitive raw total.",
      prs: [
        { lift: "SQUAT", weight: "605 LBS" },
        { lift: "BENCH", weight: "435 LBS" },
        { lift: "DEADLIFT", weight: "710 LBS" },
      ],
      tag: "RAW TOTAL",
      initials: "DC",
    },
  ];

  return (
    <section id="coaches" className="py-24 relative bg-[#09090d] border-t border-[#1a1a24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151e] border border-[#ff1f26]/40 text-xs font-mono text-[#ff1f26] uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>THE APEX CADRE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
              WORLD-CLASS <span className="text-[#ff1f26]">COACHING</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mt-2">
              No twenty-something influencers. Our directors are accredited exercise physiologists and competitive barbell champions.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="mt-6 md:mt-0 px-6 py-3 rounded-xl bg-[#14141c] hover:bg-[#1f1f2c] border border-[#ff1f26]/40 hover:border-[#ff1f26] text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all"
          >
            <span>REQUEST 1-ON-1 EVALUATION</span>
            <ArrowRight className="w-4 h-4 text-[#ff1f26]" />
          </button>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div
              key={coach.name}
              className="rounded-3xl bg-[#0f0f16] border border-[#1f1f2e] hover:border-[#ff1f26]/60 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Header with Avatar & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff1f26] to-[#6b060b] flex items-center justify-center font-display font-black text-2xl text-white shadow-[0_0_20px_rgba(255,31,38,0.3)]">
                    {coach.initials}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#171722] border border-[#272738] text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
                    {coach.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight group-hover:text-[#ff1f26] transition-colors">
                  {coach.name}
                </h3>
                <div className="text-xs font-mono text-[#ff1f26] font-semibold uppercase mt-1 mb-2">
                  {coach.role}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mb-4 pb-4 border-b border-[#1b1b26]">
                  {coach.certs}
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  {coach.bio}
                </p>

                {/* Personal Records Strip */}
                <div className="p-3.5 rounded-xl bg-[#09090d] border border-[#1b1b24] mb-6">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>VERIFIED COMPETITION PRS</span>
                    <Trophy className="w-3.5 h-3.5 text-[#ff1f26]" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    {coach.prs.map((pr) => (
                      <div key={pr.lift} className="p-2 rounded bg-[#13131c]">
                        <div className="text-[9px] text-zinc-400">{pr.lift}</div>
                        <div className="text-xs font-bold text-white mt-0.5">{pr.weight}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-lg bg-[#14141e] hover:bg-[#ff1f26] text-zinc-300 hover:text-white border border-[#232332] hover:border-[#ff1f26] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>BOOK ASSESSMENT WITH {coach.name.split(" ")[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
