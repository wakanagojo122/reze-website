import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "lucide-react";
import { getYoutubeEmbedUrl } from "../utils";

interface TrailerSectionProps {
  trailerBgUrl: string;
  title: string;
  subTitle: string;
  desc: string;
  youtubeUrl: string;
}

export default function TrailerSection({ 
  trailerBgUrl, 
  title, 
  subTitle, 
  desc, 
  youtubeUrl 
}: TrailerSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="trailer" className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-neutral-950 border-t border-neutral-800">
      
      {/* Background Image with heavy dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={trailerBgUrl || "/your-image-here.jpg"}
          alt="Dark Tokyo atmospheric backdrop"
          className="w-full h-full object-cover opacity-15 filter saturate-50"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-neutral-950/90" />
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6">
        
        {/* Subtle indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[9px] tracking-[0.25em] font-mono text-neutral-400 uppercase font-bold">
            PREVIEW // THE OFFICIAL PROMO
          </span>
        </motion.div>

        {/* Massive Tracked-Out Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-black text-4xl sm:text-6xl tracking-[0.3em] text-white leading-none uppercase select-none mb-0"
        >
          {title}
        </motion.h2>

        {/* Japanese Title */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-red-500 font-bold tracking-[0.4em] text-xs uppercase"
        >
          {subTitle}
        </motion.p>

        {/* Descriptive Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans font-light text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto"
        >
          {desc}
        </motion.p>

        {/* Play Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-4"
        >
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center p-4 rounded-full bg-white text-neutral-950 hover:bg-red-600 hover:text-white transition-all shadow-md"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </motion.button>
          <p className="text-[9px] font-mono tracking-widest uppercase text-neutral-500 mt-3 font-bold">
            PLAY VIDEO PREVIEW
          </p>
        </motion.div>

      </div>

      {/* Cinematic YouTube Embed Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Close trigger overlay */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-4xl aspect-video bg-[#0a0a0a] rounded-lg border border-neutral-800 overflow-hidden z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/65 text-white hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* YouTube Iframe Embed */}
              <iframe
                src={getYoutubeEmbedUrl(youtubeUrl) || "/your-video-here.mp4"}
                title="Custom Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

