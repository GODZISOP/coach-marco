"use client";

import { useState, useEffect } from "react";
import { 
  Flame, 
  Dumbbell, 
  Activity, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Play, 
  RotateCcw,
  Sparkles,
  Zap
} from "lucide-react";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rpe: string;
  rest: string;
  cue: string;
}

interface Program {
  id: string;
  title: string;
  tagline: string;
  level: string;
  frequency: string;
  primaryGoal: string;
  exercises: Exercise[];
}

export default function WorkoutSplitSelector() {
  const [activeTab, setActiveTab] = useState<string>("hypertrophy");

  // Interactive Rest Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(90);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [initialSeconds, setInitialSeconds] = useState<number>(90);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const startTimer = (seconds: number) => {
    setInitialSeconds(seconds);
    setTimerSeconds(seconds);
    setTimerRunning(true);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(initialSeconds);
  };

  const programs: Record<string, Program> = {
    hypertrophy: {
      id: "hypertrophy",
      title: "APEX HYPERTROPHY BLUEPRINT",
      tagline: "High-threshold motor unit recruitment & maximum mechanical tension.",
      level: "ADVANCED",
      frequency: "5 DAYS / WEEK",
      primaryGoal: "MAXIMAL LEAN MUSCLE MASS",
      exercises: [
        {
          name: "Barbell Incline Chest Press",
          sets: "4 sets",
          reps: "6 - 8 reps",
          rpe: "RPE 8.5",
          rest: "120 sec",
          cue: "Slow 3s eccentric descent, explosive drive into lockout",
        },
        {
          name: "Weighted Chest-Supported Row",
          sets: "4 sets",
          reps: "8 - 10 reps",
          rpe: "RPE 9",
          rest: "90 sec",
          cue: "Full scapular protraction at stretch, squeeze lats hard",
        },
        {
          name: "Romanian Deadlift (Eleiko Stiff Bar)",
          sets: "3 sets",
          reps: "8 - 10 reps",
          rpe: "RPE 8",
          rest: "150 sec",
          cue: "Hinge hips back toward wall, maintain rigid neutral spine",
        },
        {
          name: "Seated Dumbbell Lateral Raise",
          sets: "4 sets",
          reps: "12 - 15 reps",
          rpe: "RPE 9.5",
          rest: "60 sec",
          cue: "Pour water tilt at top, control negative without momentum",
        },
        {
          name: "Overhead Rope Tricep Extension",
          sets: "3 sets",
          reps: "10 - 12 reps",
          rpe: "RPE 9",
          rest: "60 sec",
          cue: "Flared elbows at deep stretch, full tricep peak contraction",
        },
      ],
    },
    powerlifting: {
      id: "powerlifting",
      title: "COMPETITION STRENGTH PEAK",
      tagline: "RTS rate-of-perceived-exertion periodization for maximal 1RM output.",
      level: "ELITE",
      frequency: "4 DAYS / WEEK",
      primaryGoal: "SQUAT, BENCH & DEADLIFT TOTAL",
      exercises: [
        {
          name: "Competition Low Bar Squat",
          sets: "5 sets",
          reps: "3 reps",
          rpe: "RPE 8.5",
          rest: "180 sec",
          cue: "Spread floor with feet, brace 360 diaphragmatic air",
        },
        {
          name: "Competition Paused Bench Press",
          sets: "5 sets",
          reps: "3 reps",
          rpe: "RPE 8",
          rest: "180 sec",
          cue: "1-second sternum motionless pause, explosive leg drive",
        },
        {
          name: "Deficit Conventional Deadlift",
          sets: "3 sets",
          reps: "4 reps",
          rpe: "RPE 8",
          rest: "240 sec",
          cue: "Pull slack out of bar, wedge hips and push floor away",
        },
        {
          name: "Safety Squat Bar Good Mornings",
          sets: "3 sets",
          reps: "8 reps",
          rpe: "RPE 7.5",
          rest: "120 sec",
          cue: "Strengthen posterior chain without shoulder strain",
        },
        {
          name: "Heavy Pendlay Barbell Rows",
          sets: "4 sets",
          reps: "6 reps",
          rpe: "RPE 8",
          rest: "120 sec",
          cue: "Dead stop off floor every repetition, anti-rotation core",
        },
      ],
    },
    hyrox: {
      id: "hyrox",
      title: "HYROX & METABOLIC ENGINE",
      tagline: "Lactate threshold buffering and aerobic power under severe muscular fatigue.",
      level: "INTERMEDIATE - ADVANCED",
      frequency: "4 DAYS / WEEK",
      primaryGoal: "AEROBIC CAPACITY & HYROX TIME TRIAL",
      exercises: [
        {
          name: "Concept2 SkiErg Intervals",
          sets: "6 rounds",
          reps: "500m sprint",
          rpe: "RPE 9",
          rest: "60 sec",
          cue: "Engage lats and hip hinge, maintain steady 1:48/500m pace",
        },
        {
          name: "Heavy Sled Push (Tank/Prowler)",
          sets: "5 rounds",
          reps: "50 meters",
          rpe: "RPE 9.5",
          rest: "90 sec",
          cue: "Forward 45-degree angle lean, aggressive rhythmic piston strides",
        },
        {
          name: "Dual Kettlebell Farmer Carry (32kg)",
          sets: "4 rounds",
          reps: "100 meters",
          rpe: "RPE 8.5",
          rest: "90 sec",
          cue: "Crush grip handles, keep chest up, no side-to-side sway",
        },
        {
          name: "Wall Ball Shots (20lb to 10ft target)",
          sets: "4 rounds",
          reps: "25 reps",
          rpe: "RPE 9",
          rest: "75 sec",
          cue: "Full hip crease squat below parallel, push through heels",
        },
        {
          name: "Rogue Echo Air Bike Anaerobic Burnout",
          sets: "8 sets",
          reps: "20s ON / 10s OFF",
          rpe: "MAX EFFORT",
          rest: "10 sec",
          cue: "Maximum RPM burst, pure lactate tolerance conditioning",
        },
      ],
    },
    athletic: {
      id: "athletic",
      title: "ATHLETIC REBUILD & FORCE VELOCITY",
      tagline: "Multi-planar rotational power, sprint deceleration, and bulletproof joints.",
      level: "ALL LEVELS",
      frequency: "3 - 4 DAYS / WEEK",
      primaryGoal: "EXPLOSIVENESS & INJURY RESISTANCE",
      exercises: [
        {
          name: "Trap Bar Jump Shrugs (Velocity-tracked)",
          sets: "5 sets",
          reps: "3 reps",
          rpe: "Speed Focus",
          rest: "120 sec",
          cue: "Triple extension at ankles, knees, and hips with zero deceleration",
        },
        {
          name: "Lateral Med Ball Rotational Slams",
          sets: "4 sets",
          reps: "8 / side",
          rpe: "RPE 8.5",
          rest: "60 sec",
          cue: "Violent rotational torque from rear hip into reinforced wall",
        },
        {
          name: "Poliquin Step-Ups on Decline Wedge",
          sets: "3 sets",
          reps: "15 reps",
          rpe: "RPE 7.5",
          rest: "60 sec",
          cue: "Patellar tendon remodeling and knee bulletproofing",
        },
        {
          name: "Landmine Push Press",
          sets: "4 sets",
          reps: "6 / side",
          rpe: "RPE 8",
          rest: "90 sec",
          cue: "Scapular upward rotation in natural scapular plane",
        },
        {
          name: "Nordic Hamstring Curls (Assisted)",
          sets: "3 sets",
          reps: "6 reps",
          rpe: "RPE 9",
          rest: "120 sec",
          cue: "Eccentric tendon lengthening for hamstring tear prevention",
        },
      ],
    },
  };

  const currentProgram = programs[activeTab];

  return (
    <section id="programs" className="py-24 relative bg-[#09090d] border-t border-[#1a1a24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161622] border border-[#ff1f26]/30 text-xs font-mono text-[#ff1f26] uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>PRESCRIPTIVE ATHLETIC TRAINING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
              PROVEN TRAINING <span className="text-[#ff1f26]">PROTOCOLS</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mt-2">
              Every regimen is calibrated with periodized volume, targeted RPE benchmarks, and calculated recovery tempos.
            </p>
          </div>

          {/* Interactive Set Rest Timer Widget */}
          <div className="mt-6 md:mt-0 p-4 rounded-2xl bg-[#12121a] border border-[#232332] flex items-center gap-4 shadow-xl">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#ff1f26]" /> SET REST TIMER
              </span>
              <div className="text-2xl font-black font-display text-white tracking-wider">
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => startTimer(60)}
                className="px-2 py-1 rounded bg-[#1c1c28] hover:bg-[#252538] text-[11px] font-mono text-zinc-300 transition-colors"
              >
                60s
              </button>
              <button
                onClick={() => startTimer(90)}
                className="px-2 py-1 rounded bg-[#1c1c28] hover:bg-[#252538] text-[11px] font-mono text-zinc-300 transition-colors"
              >
                90s
              </button>
              <button
                onClick={() => startTimer(180)}
                className="px-2 py-1 rounded bg-[#1c1c28] hover:bg-[#252538] text-[11px] font-mono text-zinc-300 transition-colors"
              >
                180s
              </button>
              <button
                onClick={resetTimer}
                title="Reset timer"
                className="p-1.5 rounded bg-[#1c1c28] hover:bg-[#252538] text-zinc-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-[#1f1f2c] pb-4">
          {[
            { id: "hypertrophy", label: "HYPERTROPHY BLUEPRINT", icon: Dumbbell },
            { id: "powerlifting", label: "STRENGTH & POWERLIFTING", icon: ShieldCheck },
            { id: "hyrox", label: "HYROX & METABOLIC", icon: Flame },
            { id: "athletic", label: "ATHLETIC REBUILD", icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#ff1f26] text-white shadow-[0_0_20px_rgba(255,31,38,0.4)]"
                    : "bg-[#111117] text-zinc-400 hover:text-zinc-200 hover:bg-[#181822] border border-[#1f1f2c]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#ff1f26]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Program Card */}
        <div className="rounded-3xl bg-[#0f0f15] border border-[#20202e] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff1f26]/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Program Overview Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-[#1e1e2c] gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
                  {currentProgram.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-[#ff1f26]/20 border border-[#ff1f26]/40 text-[#ff1f26] text-[10px] font-mono font-bold">
                  {currentProgram.level}
                </span>
              </div>
              <p className="text-zinc-400 text-sm">{currentProgram.tagline}</p>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#14141d] border border-[#242434]">
                <div className="text-zinc-400 text-[10px]">TRAINING FREQUENCY</div>
                <div className="text-white font-bold">{currentProgram.frequency}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#14141d] border border-[#242434]">
                <div className="text-zinc-400 text-[10px]">PRIMARY ADAPTATION</div>
                <div className="text-[#ff1f26] font-bold">{currentProgram.primaryGoal}</div>
              </div>
            </div>
          </div>

          {/* Exercise Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#212130] text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">EXERCISE & MOVEMENT</th>
                  <th className="py-3 px-4 font-bold">SETS</th>
                  <th className="py-3 px-4 font-bold">REPS</th>
                  <th className="py-3 px-4 font-bold">INTENSITY / RPE</th>
                  <th className="py-3 px-4 font-bold">REST</th>
                  <th className="py-3 px-4 font-bold">BIOMECHANICAL CUE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#191924]">
                {currentProgram.exercises.map((item, index) => (
                  <tr key={index} className="hover:bg-[#14141e] transition-colors group">
                    <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                      <span className="text-[#ff1f26] font-bold">0{index + 1}.</span>
                      <span className="group-hover:text-[#ff1f26] transition-colors">{item.name}</span>
                    </td>
                    <td className="py-4 px-4 text-zinc-300 font-bold">{item.sets}</td>
                    <td className="py-4 px-4 text-zinc-300">{item.reps}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                        {item.rpe}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-zinc-400">{item.rest}</td>
                    <td className="py-4 px-4 text-zinc-400 italic font-sans text-xs">{item.cue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1e1e2c] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 font-mono gap-3">
            <span>* FULL DIGITAL PROGRAM DELIVERED VIA APEX ATHLETE APP UPON MEMBERSHIP</span>
            <span className="text-[#ff1f26] font-bold flex items-center gap-1">
              INCLUDED IN ALL ACCESS TIERS <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
