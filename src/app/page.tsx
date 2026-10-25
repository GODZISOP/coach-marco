"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KineticProfileSection from "@/components/KineticProfileSection";
import AthleteScrollReveal from "@/components/AthleteScrollReveal";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import PricingSection from "@/components/PricingSection";
import FAQContactSection from "@/components/FAQContactSection";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#070709] text-[#f4f4f7] selection:bg-[#c6f939] selection:text-black relative">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Hero Section */}
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Section 2: Kinetic Profile // Embrace Movement */}
        <KineticProfileSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Section 3: Skiper34 Sticky Image Reveal Stack */}
        <AthleteScrollReveal />

        {/* Section 4: The Full Experience & Showcase (Screenshot Design) */}
        <ExperienceShowcase onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Section 5: Membership Packages & Pricing */}
        <PricingSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Section 6: FAQs & Direct Contact */}
        <FAQContactSection />

        {/* Industrial Footer */}
        <Footer />

        {/* Interactive VIP Pass Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}
