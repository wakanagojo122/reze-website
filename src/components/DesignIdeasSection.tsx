import React from "react";
import { motion } from "motion/react";

interface DesignIdeasSectionProps {
  makimaUrl: string;
  akiUrl: string;
  kobeniUrl: string;
  sectionTitle: string;
  makimaTitle: string;
  makimaDesc: string;
  akiTitle: string;
  akiDesc: string;
  kobeniTitle: string;
  kobeniDesc: string;
}

export default function DesignIdeasSection({ 
  makimaUrl, 
  akiUrl, 
  kobeniUrl,
  sectionTitle,
  makimaTitle,
  makimaDesc,
  akiTitle,
  akiDesc,
  kobeniTitle,
  kobeniDesc
}: DesignIdeasSectionProps) {
  return (
    <section id="design-ideas" className="relative w-full bg-[#f4f4f0] py-24 px-4 sm:px-8 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block with Editorial Typography */}
        <div className="text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-3"
          >
            <span className="h-[1px] w-8 bg-neutral-900" />
            <span className="text-[10px] tracking-[0.4em] font-mono text-neutral-800 font-bold uppercase">SECTION 01 // EXHIBITIONS</span>
            <span className="h-[1px] w-8 bg-neutral-900" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] text-neutral-900 uppercase text-center mt-2"
          >
            {sectionTitle}
          </motion.h2>
        </div>

        {/* 3-Column Grid of square image cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          
          {/* Card 1: Makima */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ 
              y: -8, 
              scale: 1.015,
              boxShadow: "0 20px 30px -10px rgba(0,0,0,0.15)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm cursor-pointer group"
          >
            {/* Square Image Container */}
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={makimaUrl || "/your-image-here.jpg"}
                alt="Makima"
                className="w-full h-full object-cover filter saturate-90 brightness-95"
                referrerPolicy="no-referrer"
              />
              {/* Overlay content with interactive slide-up reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent flex flex-col justify-end p-5 transition-all duration-300 group-hover:from-red-950/95">
                <span className="font-mono text-red-500 text-[8px] tracking-[0.3em] uppercase mb-1 font-bold">
                  EPISODE_09
                </span>
                <h3 className="text-white font-sans text-xs tracking-widest uppercase font-black transition-transform duration-500 group-hover:-translate-y-1">
                  {makimaTitle}
                </h3>
                <p className="text-neutral-300 font-sans text-[10px] font-light mt-1.5 leading-relaxed opacity-90 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                  {makimaDesc}
                </p>
              </div>
              <div className="absolute top-3 right-3 bg-neutral-900 text-white px-2 py-0.5 text-[7px] font-mono uppercase tracking-widest rounded font-bold transition-all duration-300 group-hover:bg-red-600">
                PANEL_01
              </div>
            </div>
          </motion.div>

          {/* Card 2: Aki Hayakawa */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ 
              y: -8, 
              scale: 1.015,
              boxShadow: "0 20px 30px -10px rgba(0,0,0,0.15)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm cursor-pointer group"
          >
            {/* Square Image Container */}
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={akiUrl || "/your-image-here.jpg"}
                alt="Aki Hayakawa"
                className="w-full h-full object-cover filter saturate-90 brightness-95"
                referrerPolicy="no-referrer"
              />
              {/* Overlay content with interactive slide-up reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent flex flex-col justify-end p-5 transition-all duration-300 group-hover:from-neutral-950/95">
                <span className="font-mono text-red-500 text-[8px] tracking-[0.3em] uppercase mb-1 font-bold">
                  CHARACTER_FILE
                </span>
                <h3 className="text-white font-sans text-xs tracking-widest uppercase font-black transition-transform duration-500 group-hover:-translate-y-1">
                  {akiTitle}
                </h3>
                <p className="text-neutral-300 font-sans text-[10px] font-light mt-1.5 leading-relaxed opacity-90 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                  {akiDesc}
                </p>
              </div>
              <div className="absolute top-3 right-3 bg-neutral-900 text-white px-2 py-0.5 text-[7px] font-mono uppercase tracking-widest rounded font-bold transition-all duration-300 group-hover:bg-red-600">
                PANEL_02
              </div>
            </div>
          </motion.div>

          {/* Card 3: Kobeni */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ 
              y: -8, 
              scale: 1.015,
              boxShadow: "0 20px 30px -10px rgba(0,0,0,0.15)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm cursor-pointer group"
          >
            {/* Square Image Container */}
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={kobeniUrl || "/your-image-here.jpg"}
                alt="Kobeni"
                className="w-full h-full object-cover filter saturate-90 brightness-95"
                referrerPolicy="no-referrer"
              />
              {/* Overlay content with interactive slide-up reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent flex flex-col justify-end p-5 transition-all duration-300 group-hover:from-neutral-950/95">
                <span className="font-mono text-red-500 text-[8px] tracking-[0.3em] uppercase mb-1 font-bold">
                  COSPLAY_REF
                </span>
                <h3 className="text-white font-sans text-xs tracking-widest uppercase font-black transition-transform duration-500 group-hover:-translate-y-1">
                  {kobeniTitle}
                </h3>
                <p className="text-neutral-300 font-sans text-[10px] font-light mt-1.5 leading-relaxed opacity-90 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                  {kobeniDesc}
                </p>
              </div>
              <div className="absolute top-3 right-3 bg-neutral-900 text-white px-2 py-0.5 text-[7px] font-mono uppercase tracking-widest rounded font-bold transition-all duration-300 group-hover:bg-red-600">
                PANEL_03
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
