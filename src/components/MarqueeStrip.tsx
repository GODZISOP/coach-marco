"use client";

import { Flame, ShieldCheck, Zap, Award, Target, Dumbbell, Activity, CheckCircle2 } from "lucide-react";

export default function MarqueeStrip() {
  const row1 = [
    { label: "ELEIKO IPF CALIBRATED PLATES", icon: Dumbbell },
    { label: "NSCA-CSCS CERTIFIED COACHING", icon: Award },
    { label: "SUB-ZERO CRYO PODS (-110°C)", icon: Activity },
    { label: "HYROX OFFICIAL AFFILIATE FACILITY", icon: Flame },
    { label: "24/7 BIOMETRIC RFID ENTRANCE", icon: ShieldCheck },
    { label: "VALD PERFORMANCE FORCE PLATES", icon: Zap },
    { label: "DEXA BODY COMPOSITION SCANNING", icon: Target },
    { label: "INFRARED RECOVERY SAUNA", icon: CheckCircle2 },
  ];

  const row2 = [
    { label: "ZERO QUEUES • CAPPED ATHLETE ROSTER", icon: ShieldCheck },
    { label: "SPECIALTY BARS (SSB, DUFFALO, DEADLIFT)", icon: Dumbbell },
    { label: "COMPETITION BENCHES WITH ROLLBACK LEVERS", icon: Award },
    { label: "SPRINT TURF & ROGUE SLED PULLS", icon: Zap },
    { label: "COLD PLUNGE 38°F CHILLED BASIN", icon: Activity },
    { label: "HIGH-PROTEIN MACRO BAR & FUEL STATION", icon: Flame },
    { label: "ISOKINETIC DYNAMOMETER TESTING", icon: Target },
    { label: "CHALK STATIONS EVERY 10 FEET", icon: CheckCircle2 },
  ];

  return (
    <div className="relative py-10 bg-[#060608] border-y border-[#1a1a24] overflow-hidden select-none">
      {/* Side gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#060608] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#060608] to-transparent z-10 pointer-events-none"></div>

      {/* Row 1: Left sliding */}
      <div className="flex overflow-hidden mb-4">
        <div className="animate-marquee-left flex items-center gap-6">
          {[...row1, ...row1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0d0d12] border border-[#222230] text-xs font-mono font-bold tracking-wider text-zinc-300 whitespace-nowrap hover:border-[#ff1f26]/60 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4 text-[#ff1f26]" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Right sliding */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-right flex items-center gap-6">
          {[...row2, ...row2].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#111118] border border-[#262638] text-xs font-mono font-bold tracking-wider text-zinc-300 whitespace-nowrap hover:border-[#ff1f26]/60 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4 text-[#ff3840]" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
