import React from "react";
import { motion } from "motion/react";

interface LoveMakimaSectionProps {
  makimaDenjiUrl: string;
  girlLookingBackUrl: string;
  boyLookingForwardUrl: string;
  smallArtPanelUrl: string;
  section2Title: string;
  section2Percent: string;
  section2Quote: string;
}

export default function LoveMakimaSection({
  makimaDenjiUrl,
  girlLookingBackUrl,
  boyLookingForwardUrl,
  smallArtPanelUrl,
  section2Title,
  section2Percent,
  section2Quote
}: LoveMakimaSectionProps) {
  return (
    <section id="album" className="relative w-full bg-[#f4f4f0] py-24 px-4 sm:px-8 text-neutral-900 overflow-hidden border-t border-neutral-200">
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Headings - Bold Typography layout */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 border-b border-neutral-300 pb-6 gap-2">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-black text-3xl sm:text-5xl tracking-widest text-neutral-950 uppercase"
          >
            {section2Title}
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-black text-2xl sm:text-4xl tracking-[0.3em] text-red-600"
          >
            {section2Percent}
          </motion.span>
        </div>

        {/* Centerpiece Image Card (Wide horizontal card in the center) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-neutral-300 bg-neutral-200 shadow-md group"
        >
          <img
            src={makimaDenjiUrl || "/your-image-here.jpg"}
            alt="Centerpiece Still"
            className="w-full h-full object-cover filter saturate-90 brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Subtle text details overlaying the main centerpiece */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
            <span className="text-[8px] font-mono tracking-[0.4em] text-red-500 uppercase mb-1 font-bold">
              CINEMATIC STILL
            </span>
            <p className="text-xs font-sans font-light tracking-widest text-white uppercase font-bold">
              "Control & Submission"
            </p>
          </div>
        </motion.div>

        {/* Below centerpiece: 3 small polaroid-style images */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Polaroid Cards Cluster with layout stagger */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="md:col-span-7 flex flex-wrap gap-6 justify-center md:justify-start items-center"
          >
            
            {/* Polaroid 1: Girl looking back */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, rotate: -8 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotate: -3, 
                  transition: { type: "spring", stiffness: 100, damping: 15 } 
                }
              }}
              whileHover={{ 
                rotate: -1, 
                scale: 1.08, 
                y: -12, 
                boxShadow: "0 25px 30px -10px rgba(0,0,0,0.22)" 
              }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="bg-white p-2.5 pb-6 shadow-md rounded border border-neutral-200 w-[140px] cursor-pointer transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-neutral-100 mb-2 rounded-sm relative group/polaroid">
                <img
                  src={girlLookingBackUrl || "/your-image-here.jpg"}
                  alt="Looking back reference"
                  className="w-full h-full object-cover filter contrast-125 transition-transform duration-500 group-hover/polaroid:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="font-handwritten text-sm text-center leading-none text-neutral-700 pt-1">
                looking back
              </p>
            </motion.div>

            {/* Polaroid 2: Boy looking forward */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 35, rotate: 8 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotate: 3, 
                  transition: { type: "spring", stiffness: 100, damping: 15 } 
                }
              }}
              whileHover={{ 
                rotate: 0, 
                scale: 1.08, 
                y: -12, 
                boxShadow: "0 25px 30px -10px rgba(0,0,0,0.22)" 
              }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="bg-white p-2.5 pb-6 shadow-md rounded border border-neutral-200 w-[140px] cursor-pointer transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-neutral-100 mb-2 rounded-sm relative group/polaroid">
                <img
                  src={boyLookingForwardUrl || "/your-image-here.jpg"}
                  alt="Looking forward reference"
                  className="w-full h-full object-cover filter contrast-110 transition-transform duration-500 group-hover/polaroid:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="font-handwritten text-sm text-center leading-none text-neutral-700 pt-1">
                forward path
              </p>
            </motion.div>

            {/* Polaroid 3: Small Art Panel */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40, rotate: -4 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotate: -1, 
                  transition: { type: "spring", stiffness: 100, damping: 15 } 
                }
              }}
              whileHover={{ 
                rotate: 2, 
                scale: 1.08, 
                y: -12, 
                boxShadow: "0 25px 30px -10px rgba(0,0,0,0.22)" 
              }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="bg-white p-2.5 pb-6 shadow-md rounded border border-neutral-200 w-[140px] cursor-pointer transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-neutral-100 mb-2 rounded-sm relative group/polaroid">
                <img
                  src={smallArtPanelUrl || "/your-image-here.jpg"}
                  alt="Visual detail panel"
                  className="w-full h-full object-cover filter saturate-50 transition-transform duration-500 group-hover/polaroid:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="font-handwritten text-sm text-center leading-none text-neutral-700 pt-1">
                visual details
              </p>
            </motion.div>

          </motion.div>

          {/* Text paragraph (Columns 8-12) */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pl-5 border-l border-red-600"
            >
              <p className="font-sans font-normal text-xs sm:text-sm text-neutral-600 leading-relaxed tracking-wide whitespace-pre-line">
                {section2Quote}
              </p>
              <p className="font-sans text-[9px] text-neutral-400 mt-3 uppercase tracking-widest font-bold">
                — EDITORIAL STUDY, SHONEN JUMP ISSUE 04
              </p>
            </motion.div>

            <div>
              <span className="inline-block px-3 py-1 bg-white border border-neutral-200 text-[8px] font-mono tracking-widest text-neutral-500 uppercase rounded font-bold shadow-sm">
                EXHIBITION NO: 04-B
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
