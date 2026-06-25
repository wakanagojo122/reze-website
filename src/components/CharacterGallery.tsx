import React from "react";
import { motion } from "motion/react";

interface CharacterGalleryProps {
  akiUrl: string;
  makimaUrl: string;
  angelDevilUrl: string;
}

export default function CharacterGallery({ akiUrl, makimaUrl, angelDevilUrl }: CharacterGalleryProps) {
  return (
    <section className="relative w-full bg-[#f4f4f0] pt-16 pb-0 overflow-hidden border-t border-neutral-200">
      
      <div className="w-full">
        
        {/* Section title with Editorial styling */}
        <div className="max-w-7xl mx-auto mb-16 text-center space-y-2 px-4 sm:px-8">
          <span className="font-mono text-[9px] text-neutral-500 tracking-[0.4em] uppercase block mb-1 font-bold">
            EXHIBIT PART 4 // DOSSIER PANELS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-[0.25em] text-neutral-900 uppercase">
            CHARACTER FILES
          </h2>
        </div>

        {/* 3-Column Grid of 3 vertical portrait cards flush at the bottom */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-neutral-200 max-w-7xl mx-auto"
        >
          
          {/* Card 1: Aki Hayakawa */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="group relative h-[480px] sm:h-[550px] overflow-hidden bg-zinc-950 border-r border-neutral-200 flex flex-col justify-end cursor-pointer"
          >
            {/* Portrait Image with Motion */}
            <motion.img
              src={akiUrl || "/your-image-here.jpg"}
              alt="Aki Hayakawa"
              whileHover={{ scale: 1.05, filter: "saturate(0.9) brightness(0.9)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover filter saturate-75 brightness-95"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent pointer-events-none" />

            {/* Signature / Dossier info */}
            <div className="absolute top-6 left-6 font-mono text-[8px] text-neutral-500 tracking-widest uppercase font-bold bg-white/80 px-2 py-0.5 rounded shadow-sm z-10 transition-colors group-hover:bg-red-600 group-hover:text-white">
              DOSSIER_003
            </div>
            
            {/* Bottom Info overlay */}
            <div className="relative z-10 p-8 flex flex-col justify-end text-white transition-transform duration-500 group-hover:-translate-y-1">
              <h3 className="font-display text-xl font-black tracking-widest uppercase mb-1">
                Aki Hayakawa
              </h3>
              <div className="h-[1px] w-8 bg-red-600 mb-3 transition-all duration-500 group-hover:w-20" />
              <div className="flex justify-between items-end">
                <span className="font-sans text-[11px] text-neutral-300 font-light italic leading-relaxed">
                  "I want the Gun Devil dead."
                </span>
                <span className="font-handwritten text-base text-neutral-200 tracking-wider">
                  Aki
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Makima */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="group relative h-[480px] sm:h-[550px] overflow-hidden bg-zinc-950 border-r border-neutral-200 flex flex-col justify-end cursor-pointer"
          >
            {/* Portrait Image with Motion */}
            <motion.img
              src={makimaUrl || "/your-image-here.jpg"}
              alt="Makima looking down"
              whileHover={{ scale: 1.05, filter: "saturate(0.9) brightness(0.9)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover filter saturate-75 brightness-95"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent pointer-events-none" />

            {/* Dossier info */}
            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-600 tracking-widest uppercase font-bold bg-white/80 px-2 py-0.5 rounded shadow-sm z-10 transition-colors group-hover:bg-red-600 group-hover:text-white">
              DOSSIER_001
            </div>

            {/* Bottom Info overlay */}
            <div className="relative z-10 p-8 flex flex-col justify-end text-white transition-transform duration-500 group-hover:-translate-y-1">
              <h3 className="font-display text-xl font-black tracking-widest uppercase mb-1">
                Makima
              </h3>
              <div className="h-[1px] w-8 bg-red-600 mb-3 transition-all duration-500 group-hover:w-20" />
              
              <p className="font-sans text-[11px] text-neutral-300 leading-relaxed font-light">
                Beautiful, yet deeply terrifying. A master of absolute control over humanity.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Angel Devil */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="group relative h-[480px] sm:h-[550px] overflow-hidden bg-zinc-950 flex flex-col justify-end cursor-pointer"
          >
            {/* Portrait Image with Motion */}
            <motion.img
              src={angelDevilUrl || "/your-image-here.jpg"}
              alt="Angel Devil looking up"
              whileHover={{ scale: 1.05, filter: "saturate(0.9) brightness(0.9)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover filter saturate-75 brightness-95"
              referrerPolicy="no-referrer"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent pointer-events-none" />

            {/* Dossier info */}
            <div className="absolute top-6 left-6 font-mono text-[8px] text-neutral-500 tracking-widest uppercase font-bold bg-white/80 px-2 py-0.5 rounded shadow-sm z-10 transition-colors group-hover:bg-red-600 group-hover:text-white">
              DOSSIER_008
            </div>

            {/* Bottom Info overlay */}
            <div className="relative z-10 p-8 flex flex-col justify-end text-white transition-transform duration-500 group-hover:-translate-y-1">
              <h3 className="font-display text-xl font-black tracking-widest uppercase mb-1">
                Angel Devil
              </h3>
              <div className="h-[1px] w-8 bg-red-600 mb-3 transition-all duration-500 group-hover:w-20" />
              
              <p className="font-sans text-[11px] text-neutral-300 leading-relaxed font-light">
                Possessing the face of an angel, carrying the sheer tragedy of life-leeching touch. Melancholic and completely indifferent.
              </p>
            </div>
          </motion.div>

        </motion.div>

        {/* Footer Credit & Copyright Info */}
        <div className="bg-neutral-100 py-16 border-t border-neutral-200 text-center px-4 sm:px-8 space-y-4">
          <p className="font-display font-bold text-sm tracking-[0.4em] text-neutral-800">
            HARSHX / CHAINSAW MAN
          </p>
          <p className="font-mono text-[9px] text-neutral-500 tracking-[0.2em] uppercase leading-relaxed max-w-md mx-auto font-bold">
            ALL CHARACTERS AND INTELLECTUAL PROPERTY OF CHAINSAW MAN BELONG TO TATSUKI FUJIMOTO, SHUEISHA, AND MAPPA. THIS IS A FAN PROJECT.
          </p>
          <div className="text-[9px] font-mono text-red-600 tracking-widest font-bold">
            © 2026 HARSHX. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </section>
  );
}
