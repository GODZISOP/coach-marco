"use client";

import { useState } from "react";
import { X, Flame, ShieldCheck, CheckCircle2, ArrowRight, Dumbbell, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("Hypertrophy & Mass");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0e0e15] border border-[#262638] shadow-[0_0_50px_rgba(198,249,57,0.2)] overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c6f939]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#181824] hover:bg-[#252538] text-zinc-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#161622] border border-[#c6f939]/40 text-xs font-mono text-[#c6f939] uppercase tracking-wider w-fit mb-3">
              <Flame className="w-3.5 h-3.5 fill-[#c6f939]" />
              <span>LIMITED TRIAL ALLOCATION</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight mb-2">
              CLAIM 3-DAY <span className="text-[#c6f939]">VIP PASS</span>
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              Experience unrestricted access to all 14 calibrated platforms, cold plunge basins, and body composition analytics.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-300 uppercase mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Hunter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#14141d] border border-[#222232] text-white text-xs font-mono focus:outline-none focus:border-[#c6f939] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-300 uppercase mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@athlete.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#14141d] border border-[#222232] text-white text-xs font-mono focus:outline-none focus:border-[#c6f939] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-300 uppercase mb-1">
                  PHONE / WHATSAPP NUMBER
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#14141d] border border-[#222232] text-white text-xs font-mono focus:outline-none focus:border-[#c6f939] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-300 uppercase mb-1">
                  PRIMARY ATHLETIC GOAL
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#14141d] border border-[#222232] text-white text-xs font-mono focus:outline-none focus:border-[#c6f939] transition-colors cursor-pointer"
                >
                  <option value="Hypertrophy & Mass">Hypertrophy & Lean Muscle Mass</option>
                  <option value="Raw Powerlifting Total">Powerlifting (Squat/Bench/Deadlift)</option>
                  <option value="Hyrox & Conditioning">Hyrox & Tactical Conditioning</option>
                  <option value="Joint Rebuild & Pain-Free">Injury Rehabilitation & Biomechanics</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#c6f939] via-[#b6f224] to-[#99d813] hover:from-[#d2fc3b] hover:to-[#c6f939] text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(198,249,57,0.4)] transition-all cursor-pointer"
                >
                  <Flame className="w-4 h-4 fill-black" />
                  <span>GENERATE DIGITAL VIP PASS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NO CREDIT CARD REQUIRED • INSTANT BIOMETRIC QR ACTIVATION</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight mb-1">
              VIP PASS CONFIRMED
            </h3>
            <p className="text-zinc-400 text-xs font-mono mb-6">
              Welcome to the foundry, {name}. Your 72-hour pass has been generated.
            </p>

            {/* Simulated Digital Card */}
            <div className="w-full p-5 rounded-2xl bg-[#09090e] border border-[#26263a] mb-6 text-left relative overflow-hidden">
              <div className="flex justify-between items-center pb-3 border-b border-[#1b1b26] mb-3">
                <span className="font-display font-black text-white text-sm">
                  COACH <span className="text-[#c6f939]">//</span> MARCO
                </span>
                <span className="px-2 py-0.5 rounded bg-[#c6f939]/20 text-[#c6f939] text-[9px] font-mono font-bold">
                  PASS CODE: #CM-9821
                </span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="text-zinc-400">
                  HOLDER: <span className="text-white font-bold">{name}</span>
                </div>
                <div className="text-zinc-400">
                  EMAIL: <span className="text-zinc-200">{email}</span>
                </div>
                <div className="text-zinc-400">
                  FOCUS: <span className="text-[#c6f939] font-bold">{goal}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1b1b26] flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>VALID FOR 72 HOURS FROM FIRST ENTRY</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-[#181824] hover:bg-[#252538] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              DONE & CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
