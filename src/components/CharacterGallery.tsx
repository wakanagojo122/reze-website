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
        <div className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-neutral-200 max-w-7xl mx-auto">
          
          {/* Card 1: Aki Hayakawa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative h-[480px] sm:h-[550px] overflow-hidden bg-white border-r border-neutral-200 flex flex-col justify-end"
          >
            {/* Portrait Image */}
            <img
              src={akiUrl || "/your-image-here.jpg"}
              alt="Aki Hayakawa"
              className="absolute inset-0 w-full h-full object-cover filter saturate-75 brightness-95 group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/25 to-transparent pointer-events-none" />

            {/* Signature / Dossier info */}
            <div className="absolute top-6 left-6 font-mono text-[8px] text-neutral-500 tracking-widest uppercase font-bold bg-white/80 px-2 py-0.5 rounded shadow-sm">
              DOSSIER_003
            </div>
            
            {/* Bottom Info overlay */}
            <div className="relative z-10 p-8 flex flex-col justify-end text-white">
              <h3 className="font-display text-xl font-black tracking-widest uppercase mb-1">
                Aki Hayakawa
              </h3>
              <div className="h-[1px] w-8 bg-red-600 mb-3" />
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group relative h-[480px] sm:h-[550px] overflow-hidden bg-white border-r border-neutral-200 flex flex-col justify-end"
          >
            {/* Portrait Image */}
            <img
              src={makimaUrl || "/your-image-here.jpg"}
              alt="Makima looking down"
              className="absolute inset-0 w-full h-full object-cover filter saturate-75 brightness-95 group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/25 to-transparent pointer-events-none" />

            {/* Dossier info */}
            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-600 tracking-widest uppercase font-bold bg-white/80 px-2 py-0.5 rounded shadow-sm">
              DOSSIER_001
            </div>

            {/* Bottom Info overlay */}
            <div className="relative z-10 p-8 flex flex-col justify-end text-white">
              <h3 className="font-display text-xl font-black tracking-widest uppercase mb-1">
                Makima
              </h3>
              <div className="h-[1px] w-8 bg-red-600 mb-3" />
              
              <p className="font-sans text-[11px] text-neutral-300 leading-relaxed font-light">
                Beautiful, yet deeply terrifying. A master of absolute control over humanity.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Angel Devil */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative h-[480px] sm:h-[550px] overflow-hidden bg-white flex flex-col justify-end"
          >
            {/* Portrait Image */}
            <img
              src={angelDevilUrl || "/your-image-here.jpg"}
              alt="Angel Devil looking up"
              className="absolute inset-0 w-full h-full object-cover filter saturate-75 brightness-95 group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/25 to-transparent pointer-events-none" />

            {/* Dossier info */}
            <div className="absolute top-6 left-6 font-mono text-[8px] text-neutral-500 tracking-widest uppercase font-bold bg-white/80 px-2 py-0.5 rounded shadow-sm">
              DOSSIER_008
            </div>

            {/* Bottom Info overlay */}
            <div className="relative z-10 p-8 flex flex-col justify-end text-white">
              <h3 className="font-display text-xl font-black tracking-widest uppercase mb-1">
                Angel Devil
              </h3>
              <div className="h-[1px] w-8 bg-red-600 mb-3" />
              
              <p className="font-sans text-[11px] text-neutral-300 leading-relaxed font-light">
                Possessing the face of an angel, carrying the sheer tragedy of life-leeching touch. Melancholic and completely indifferent.
              </p>
            </div>
          </motion.div>

        </div>

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
