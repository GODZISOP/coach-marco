import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "COACH MARCO // Elite Athletic Performance & 1-on-1 Coaching",
  description: "Personalized athletic transformation directed by Coach Marco. Bespoke periodized strength training, biomechanical technique refinement, and custom nutrition.",
  keywords: ["coach marco", "athletic training", "elite fitness", "hypertrophy", "powerlifting", "1-on-1 coaching", "nutrition protocol"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} bg-[#070709] text-[#f2f2f5] font-sans antialiased selection:bg-[#c6f939] selection:text-black min-h-screen overflow-x-clip`}
      >
        {children}
      </body>
    </html>
  );
}
