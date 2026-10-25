"use client";

import { useState } from "react";
import { ChevronDown, Mail, Phone, MapPin, Send, HelpCircle, MessageSquare, CheckCircle2 } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "WHAT IS THE COACH MARCO PROTOCOL?",
    answer:
      "Our protocol is built upon individualized 1-on-1 coaching, progressive mechanical overload, and biomechanical movement screening. Whether targeting lean body recomposition or adding 100+ lbs to your compound lifts, every block is customized directly by Coach Marco.",
  },
  {
    question: "HOW DOES NUTRITION PROGRAMMING WORK?",
    answer:
      "You receive tailored daily macro targets, intra-workout fueling guidelines, and weekly metabolic check-ins. Coach Marco adjusts carbohydrate cycling and nutritional protocols based on your progress and energy recovery.",
  },
  {
    question: "IS THIS SUITABLE FOR BEGINNERS OR ONLY COMPETITORS?",
    answer:
      "Coach Marco trains athletes of all stages who are committed to disciplined progression. From busy executives looking to rebuild posture and shed body fat to competitive lifters, the coaching standard remains uncompromising.",
  },
  {
    question: "WHAT TRAINING ENVIRONMENT DO WE USE?",
    answer:
      "Full access to competition-grade Eleiko and Rogue calibrated steel, competition squat/bench platforms, specialized belt squats, and private coaching bays with zero crowd distractions.",
  },
  {
    question: "HOW QUICKLY CAN I START COACHING WITH MARCO?",
    answer:
      "Upon submitting your inquiry below, Coach Marco will personally review your goals and reach out within 2 hours to schedule your introductory 1-on-1 assessment.",
  },
];

export default function FAQContactSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "Hypertrophy & Conditioning",
    message: "",
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="faq-contact" className="relative py-14 sm:py-20 bg-[#09090d] text-white border-t border-[#1a1a24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#c6f939] font-bold">
            SUPPORT & INQUIRIES
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display mt-2">
            FREQUENTLY ASKED <span className="text-[#c6f939]">&amp;</span> CONTACT
          </h2>
          <p className="mt-2 text-zinc-400 font-mono text-xs max-w-md mx-auto">
            Everything you need to know about our athletic protocols, or reach out to our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* FAQs Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-[#c6f939]" />
              <h3 className="font-display font-black text-lg uppercase tracking-wider text-white">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#1f1f2e] bg-[#0e0e15] rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.02]"
                    >
                      <span className="font-display font-bold text-xs sm:text-sm uppercase tracking-wide text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#c6f939] transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-4.5 pb-4 text-xs text-zinc-400 font-mono leading-relaxed border-t border-[#181824] pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Column (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0e0e15] border border-[#222233] rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-[#c6f939]" />
              <h3 className="font-display font-black text-lg uppercase tracking-wider text-white">
                Get In Touch
              </h3>
            </div>
            <p className="text-zinc-400 font-mono text-[11px] mb-5">
              Speak directly with Coach Marco to structure your transformation block.
            </p>

            {submitted ? (
              <div className="p-5 rounded-xl bg-[#c6f939]/10 border border-[#c6f939]/30 text-center flex flex-col items-center">
                <CheckCircle2 className="w-10 h-10 text-[#c6f939] mb-2" />
                <h4 className="font-display font-black text-base uppercase text-white">
                  Message Dispatched
                </h4>
                <p className="text-xs font-mono text-zinc-300 mt-1.5">
                  Coach Marco will personally review your inquiry and reach back within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Hunter"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#14141f] border border-[#26263a] text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#c6f939] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@athlete.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#14141f] border border-[#26263a] text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#c6f939] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-bold">
                    Primary Athletic Objective
                  </label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#14141f] border border-[#26263a] text-white font-mono text-xs focus:outline-none focus:border-[#c6f939] transition-colors"
                  >
                    <option value="Hypertrophy & Conditioning">Hypertrophy &amp; Conditioning</option>
                    <option value="Raw Strength & Powerlifting">Raw Strength &amp; Powerlifting</option>
                    <option value="Body Recomposition (Sub-10% DEXA)">Body Recomposition (Sub-10% DEXA)</option>
                    <option value="Athletic VO2 & Mobility Restoration">Athletic VO2 &amp; Mobility Restoration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-bold">
                    Message / Current Training Baseline
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your current training routine..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#14141f] border border-[#26263a] text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#c6f939] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#c6f939] hover:bg-[#b0e628] text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Inquiry</span>
                </button>
              </form>
            )}

            {/* Direct details */}
            <div className="mt-6 pt-4 border-t border-[#1e1e2d] space-y-2 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c6f939]" />
                <span>coaching@kinetic-apex.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c6f939]" />
                <span>+1 (800) 867-8391 // DIRECT</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c6f939]" />
                <span>420 Foundry Blvd, Sector 4, Downtown</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
