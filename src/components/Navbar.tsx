"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Flame, Menu, X, ArrowRight, ShieldCheck, Activity } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "PROFILE", href: "#profile-section" },
    { label: "SHOWCASE", href: "#gallery" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PACKAGES", href: "#pricing" },
    { label: "FAQ & CONTACT", href: "#faq-contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#08080a]/90 backdrop-blur-md border-b border-[#1f1f28] shadow-2xl py-3.5 text-white"
            : "bg-[#ccff00]/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border-b border-black/10 md:border-transparent py-4 text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
              scrolled 
                ? "bg-gradient-to-br from-[#c6f939] to-[#8fc819] text-black shadow-[0_0_20px_rgba(198,249,57,0.4)]" 
                : "bg-black text-[#ccff00] shadow-md"
            } group-hover:scale-105`}>
              <Dumbbell className="w-5 h-5 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-xl tracking-wider flex items-center gap-1.5 font-display ${
                scrolled ? "text-white" : "text-black"
              }`}>
                COACH <span className={scrolled ? "text-[#c6f939]" : "text-black/60"}>//</span> MARCO
              </span>
              <span className={`text-[9px] tracking-widest font-mono -mt-1 uppercase font-bold ${
                scrolled ? "text-zinc-400" : "text-black/70"
              }`}>
                ELITE ATHLETIC COACHING
              </span>
            </div>
          </a>

          {/* Live Capacity status pill (Desktop) */}
          <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
            scrolled 
              ? "bg-[#121217] border-[#23232e] text-zinc-400" 
              : "bg-black/10 border-black/20 text-black font-semibold"
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>FLOOR STATUS:</span>
            <span className={scrolled ? "text-emerald-400 font-semibold" : "text-black font-black"}>OPTIMAL (38% CAP)</span>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 relative py-1 group ${
                  scrolled 
                    ? "text-zinc-300 hover:text-[#c6f939]" 
                    : "text-black/80 hover:text-black font-extrabold"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-[#c6f939]" : "bg-black"
                }`}></span>
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-mono font-black flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                scrolled
                  ? "bg-[#c6f939] hover:bg-[#b2e52b] text-black shadow-[0_0_20px_rgba(198,249,57,0.4)]"
                  : "bg-black hover:bg-zinc-900 text-[#c6f939]"
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Apply Coaching</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-colors ${
                scrolled
                  ? "text-zinc-300 hover:text-white bg-[#15151c] border-[#242430]"
                  : "text-black bg-black/10 border-black/20"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08080a]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-fadeIn">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#14141a] border border-[#22222e] text-xs font-mono mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-400">FLOOR STATUS:</span>
              <span className="text-emerald-400 font-semibold">OPTIMAL (38% CAP)</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold uppercase tracking-wider text-zinc-200 hover:text-[#c6f939] transition-colors py-2 border-b border-[#1b1b24] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-lg bg-[#c6f939] hover:bg-[#b2e52b] text-black font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(198,249,57,0.4)]"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>Apply For Coaching With Marco</span>
            </button>
            <p className="text-[11px] text-center text-zinc-500 font-mono">
              1-ON-1 PERIODIZED PROGRAMMING • NO CONTRACTS
            </p>
          </div>
        </div>
      )}
    </>
  );
}
