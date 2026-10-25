"use client";

import { useState, useRef, useEffect } from "react";
import { Dumbbell, MapPin, Clock, Phone, ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered columns entrance every time scrolling into footer
      if (columnsRef.current) {
        gsap.fromTo(
          columnsRef.current.children,
          {
            y: 50,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 92%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Bottom bar reveal
      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 98%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-[#050507] border-t border-[#171722] pt-10 pb-8 text-zinc-400 font-mono text-xs overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-8 border-b border-[#151520]">
          {/* Brand Column (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c6f939] to-[#8fc819] flex items-center justify-center shadow-[0_0_15px_rgba(198,249,57,0.4)]">
                <Dumbbell className="w-3.5 h-3.5 text-black transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-wider text-white font-display">
                  COACH <span className="text-[#c6f939]">//</span> MARCO
                </span>
                <span className="text-[8px] tracking-widest text-zinc-400 -mt-0.5 uppercase">
                  ELITE ATHLETIC COACHING
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-[11px] leading-relaxed max-w-sm mb-4 font-sans">
              An uncompromising coaching platform engineered by Coach Marco for competitive lifters,
              athletes, and dedicated transformations. 1-on-1 programming and biomechanical precision.
            </p>

            <div className="space-y-2 text-zinc-400 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c6f939]" />
                <span>420 FOUNDRY BLVD, SECTOR 4, DOWNTOWN</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c6f939]" />
                <span>24/7 BIOMETRIC ENTRY • STAFFED 05:00 - 22:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c6f939]" />
                <span>+1 (800) 867-8391 // APEX DIRECT</span>
              </div>
            </div>
          </div>

          {/* Training Sectors */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">FACILITY BAYS</h4>
            <ul className="space-y-2.5">
              <li><a href="#facility" className="hover:text-[#c6f939] transition-colors">Calibrated Barbell Lab</a></li>
              <li><a href="#facility" className="hover:text-[#c6f939] transition-colors">14 Olympic Platforms</a></li>
              <li><a href="#facility" className="hover:text-[#c6f939] transition-colors">-110°C Cryo Recovery Chamber</a></li>
              <li><a href="#facility" className="hover:text-[#c6f939] transition-colors">VALD Biometric Force Plates</a></li>
              <li><a href="#facility" className="hover:text-[#c6f939] transition-colors">50m High-Velocity Sled Turf</a></li>
              <li><a href="#facility" className="hover:text-[#c6f939] transition-colors">Cold Plunge & Infrared Sauna</a></li>
            </ul>
          </div>

          {/* Protocols & Tools */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">PROTOCOLS</h4>
            <ul className="space-y-2.5">
              <li><a href="#programs" className="hover:text-[#c6f939] transition-colors">Hypertrophy Blueprint</a></li>
              <li><a href="#programs" className="hover:text-[#c6f939] transition-colors">Competition Strength Peak</a></li>
              <li><a href="#programs" className="hover:text-[#c6f939] transition-colors">Hyrox & Tactical MetCon</a></li>
              <li><a href="#calculator" className="hover:text-[#c6f939] transition-colors">1RM Scientific Calculator</a></li>
              <li><a href="#calculator" className="hover:text-[#c6f939] transition-colors">Macronutrient Engine</a></li>
              <li><a href="#pricing" className="hover:text-[#c6f939] transition-colors">Membership Tiers</a></li>
            </ul>
          </div>

          {/* Dispatch Subscription */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">IRON DISPATCH</h4>
            <p className="text-zinc-400 text-xs font-sans mb-3 leading-relaxed">
              Weekly scientific programming breakdowns, bar-path analyses, and cold shock research.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="athlete@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-[#232332] text-white text-xs focus:outline-none focus:border-[#c6f939]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#c6f939] hover:bg-[#b2e52b] text-black font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(198,249,57,0.3)]"
                >
                  <span>SUBSCRIBE DISPATCH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-lg bg-[#c6f939]/10 border border-[#c6f939]/30 text-[#c6f939] text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>SUBSCRIBED TO APEX DISPATCH.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={bottomBarRef} className="pt-8 flex flex-col sm:flex-row items-center justify-between text-zinc-400 text-[11px] gap-4">
          <div>
            © {new Date().getFullYear()} COACH MARCO ATHLETICS LLC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-zinc-300 cursor-pointer">SAFETY PROTOCOLS</span>
            <span className="hover:text-zinc-300 cursor-pointer">BIOMETRIC WAIVER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
