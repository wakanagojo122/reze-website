import React from "react";
import { motion } from "motion/react";

interface HeroSectionProps {
  heroBgUrl: string;
  storefrontUrl: string;
  title: string;
  desc: string;
}

export default function HeroSection({ heroBgUrl, storefrontUrl, title, desc }: HeroSectionProps) {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center bg-[#f4f4f0] pt-32 pb-16 overflow-hidden px-4 md:px-8">
      {/* Editorial Watermark background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[12vw] font-display font-black text-neutral-200/50 tracking-widest uppercase leading-none">
          ISSUE 04
        </h1>
      </div>

      {/* Floating White Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl bg-white border border-neutral-200/80 rounded-xl shadow-xl overflow-hidden text-neutral-900 flex flex-col justify-between min-h-[500px]"
      >
        {/* Main Content: Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-12 items-center flex-grow">
          
          {/* Left Column: Text Content */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-neutral-400 block font-bold">
                SPECIAL EDITORIAL // HARSHX DIRECTED
              </span>
              <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-900 leading-[1.15] tracking-tight whitespace-pre-line">
                {title}
              </h1>
            </div>

            <p className="font-sans font-light text-sm text-neutral-600 leading-relaxed max-w-md tracking-wide whitespace-pre-line">
              {desc}
            </p>

            <div className="pt-4 flex items-center space-x-6">
              <motion.a
                href="#design-ideas"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-2.5 bg-neutral-900 text-white rounded-md text-[10px] uppercase font-bold tracking-widest hover:bg-neutral-800 transition-all shadow-md"
              >
                VIEW DESIGN IDEAS
              </motion.a>

              <a
                href="#album"
                className="text-[10px] uppercase font-bold tracking-widest border-b border-neutral-900 hover:text-red-600 hover:border-red-600 transition-colors py-1"
              >
                COLLECTION
              </a>
            </div>
          </div>

          {/* Right Column: Perfectly Framed Storefront Image */}
          <div className="md:col-span-5 h-[240px] sm:h-[300px] md:h-[380px] relative overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center shadow-sm">
            <img
              src={storefrontUrl || "/your-image-here.jpg"}
              alt="Storefront reference"
              className="w-full h-full object-cover filter saturate-90 brightness-95"
              referrerPolicy="no-referrer"
            />
            {/* Absolute visual labels inside image */}
            <div className="absolute top-3 left-3 bg-neutral-900 text-white font-mono text-[8px] tracking-widest px-2.5 py-1 uppercase rounded">
              ねんぼう教室
            </div>
            <div className="absolute bottom-3 right-3 bg-white/90 text-neutral-900 font-mono text-[8px] tracking-widest px-2.5 py-1 rounded border border-neutral-200 font-bold">
              REF_STOREFRONT_04
            </div>
          </div>

        </div>

        {/* Bottom Bar inside White Card */}
        <div className="border-t border-neutral-100 py-3 px-6 sm:px-12 flex justify-between items-center bg-[#fafafa]">
          <span className="font-mono text-[8px] text-neutral-400 tracking-[0.2em] uppercase font-bold">
            ART DIRECTION: HARSHX STUDIO
          </span>
          <span className="font-mono text-[8px] text-neutral-400 tracking-[0.2em] uppercase font-bold">
            EDITION: 004_CSM
          </span>
        </div>

      </motion.div>
    </section>
  );
}
