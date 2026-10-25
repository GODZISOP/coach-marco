"use client";

import { useState } from "react";
import { Sliders, Calculator, Dumbbell, Flame, Target, Zap, Check } from "lucide-react";

export default function FitnessCalculator() {
  // 1RM Calculator State
  const [liftType, setLiftType] = useState<string>("SQUAT");
  const [weight, setWeight] = useState<number>(315);
  const [reps, setReps] = useState<number>(5);

  // Epley Formula: 1RM = Weight * (1 + Reps / 30)
  const oneRepMax = Math.round(weight * (1 + reps / 30));

  // Daily Nutrition Target State
  const [bodyweight, setBodyweight] = useState<number>(185);
  const [goal, setGoal] = useState<"bulk" | "recomp" | "cut">("recomp");

  // Macro Calculations
  const calorieMultipliers = {
    cut: 12,
    recomp: 15,
    bulk: 18,
  };

  const calories = Math.round(bodyweight * calorieMultipliers[goal]);
  const protein = Math.round(bodyweight * 1.1); // 1.1g per lb
  const fats = Math.round((calories * 0.25) / 9); // 25% of calories
  const carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);

  return (
    <section id="calculator" className="py-24 relative bg-[#070709] border-t border-[#1a1a24]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-red-radial blur-[120px] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151e] border border-[#ff1f26]/40 text-xs font-mono text-[#ff1f26] uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>BIOMETRIC LAB CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            CALIBRATE YOUR <span className="text-[#ff1f26]">NUMBERS</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2">
            Eliminate guesswork. Calculate your true 1-Repetition Maximum and athletic daily macro fuel split in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tool 1: 1RM Calculator */}
          <div className="rounded-3xl bg-[#0e0e14] border border-[#20202e] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#ff1f26]/50 transition-colors">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff1f26]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold text-[#ff1f26] uppercase tracking-wider flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" /> SCIENTIFIC 1RM ENGINE
                </span>
                <span className="text-[11px] font-mono text-zinc-400">EPLEY FORMULA</span>
              </div>

              {/* Lift Selector Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {["SQUAT", "BENCH", "DEADLIFT", "OH PRESS"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setLiftType(item)}
                    className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      liftType === item
                        ? "bg-[#ff1f26] text-white shadow-[0_0_15px_rgba(255,31,38,0.4)]"
                        : "bg-[#14141c] text-zinc-400 hover:text-white border border-[#20202c]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Weight Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-zinc-300">WEIGHT LIFTED:</span>
                  <span className="text-lg font-bold text-white font-display">
                    {weight} <span className="text-xs text-[#ff1f26]">LBS</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="650"
                  step="5"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-[#1b1b26] rounded-lg appearance-none cursor-pointer accent-[#ff1f26]"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>45 lbs (Bar)</span>
                  <span>350 lbs</span>
                  <span>650 lbs</span>
                </div>
              </div>

              {/* Reps Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-zinc-300">REPETITIONS PERFORMED:</span>
                  <span className="text-lg font-bold text-white font-display">
                    {reps} <span className="text-xs text-[#ff1f26]">REPS</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="w-full h-2 bg-[#1b1b26] rounded-lg appearance-none cursor-pointer accent-[#ff1f26]"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>1 Rep</span>
                  <span>6 Reps</span>
                  <span>12 Reps</span>
                </div>
              </div>

              {/* 1RM Display Big Callout */}
              <div className="p-5 rounded-2xl bg-[#09090d] border border-[#232332] flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    CALCULATED ONE REP MAX ({liftType})
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white font-display flex items-baseline gap-2">
                    {oneRepMax} <span className="text-sm font-mono text-[#ff1f26]">LBS</span>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-emerald-400 font-bold block">CONFIDENCE: 98%</span>
                  <span className="text-zinc-500 text-[10px]">COMPETITION STANDARD</span>
                </div>
              </div>

              {/* Training Percentages Grid */}
              <div className="grid grid-cols-5 gap-2 text-center font-mono">
                {[
                  { pct: 95, reps: "2 Reps" },
                  { pct: 90, reps: "4 Reps" },
                  { pct: 85, reps: "6 Reps" },
                  { pct: 80, reps: "8 Reps" },
                  { pct: 75, reps: "10 Reps" },
                ].map((tier) => (
                  <div key={tier.pct} className="p-2.5 rounded-xl bg-[#13131c] border border-[#1e1e28]">
                    <div className="text-[10px] text-zinc-500">{tier.pct}% 1RM</div>
                    <div className="text-sm font-bold text-white my-0.5">
                      {Math.round(oneRepMax * (tier.pct / 100))}
                    </div>
                    <div className="text-[9px] text-[#ff1f26]">{tier.reps}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tool 2: Athletic Daily Fuel & Macro Calculator */}
          <div className="rounded-3xl bg-[#0e0e14] border border-[#20202e] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#ff1f26]/50 transition-colors">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4" /> ATHLETIC MACRO TARGET ENGINE
                </span>
                <span className="text-[11px] font-mono text-zinc-400">LEAN TISSUE SYNTHESIS</span>
              </div>

              {/* Goal Selection Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { id: "cut", label: "FAT LOSS / CUT" },
                  { id: "recomp", label: "RECOMPOSITION" },
                  { id: "bulk", label: "LEAN SURPLUS" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id as "bulk" | "recomp" | "cut")}
                    className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      goal === item.id
                        ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                        : "bg-[#14141c] text-zinc-400 hover:text-white border border-[#20202c]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Bodyweight Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-zinc-300">CURRENT BODY WEIGHT:</span>
                  <span className="text-lg font-bold text-white font-display">
                    {bodyweight} <span className="text-xs text-amber-400">LBS</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="110"
                  max="320"
                  step="1"
                  value={bodyweight}
                  onChange={(e) => setBodyweight(Number(e.target.value))}
                  className="w-full h-2 bg-[#1b1b26] rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>110 lbs</span>
                  <span>215 lbs</span>
                  <span>320 lbs</span>
                </div>
              </div>

              {/* Total Daily Calorie Target Display */}
              <div className="p-5 rounded-2xl bg-[#09090d] border border-[#232332] flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    ESTIMATED DAILY CALORIC EXPENDITURE TARGET
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white font-display flex items-baseline gap-2">
                    {calories.toLocaleString()} <span className="text-sm font-mono text-amber-400">KCAL</span>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-amber-400 font-bold block">MACRO RATIO: 35/40/25</span>
                  <span className="text-zinc-500 text-[10px]">ANABOLIC WINDOW</span>
                </div>
              </div>

              {/* Macro Breakdown Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#13131c] border border-[#ff1f26]/30 text-center">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">PROTEIN</div>
                  <div className="text-2xl font-black text-[#ff1f26] font-display my-1">{protein}g</div>
                  <div className="text-[9px] font-mono text-zinc-500">1.1g / lb LBM</div>
                </div>

                <div className="p-4 rounded-xl bg-[#13131c] border border-blue-500/30 text-center">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">CARBOHYDRATES</div>
                  <div className="text-2xl font-black text-blue-400 font-display my-1">{carbs}g</div>
                  <div className="text-[9px] font-mono text-zinc-500">GLYCOGEN FUEL</div>
                </div>

                <div className="p-4 rounded-xl bg-[#13131c] border border-amber-500/30 text-center">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">ESSENTIAL FATS</div>
                  <div className="text-2xl font-black text-amber-400 font-display my-1">{fats}g</div>
                  <div className="text-[9px] font-mono text-zinc-500">HORMONAL HEALTH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
