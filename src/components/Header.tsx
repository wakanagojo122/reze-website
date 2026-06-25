import React from "react";
import { motion } from "motion/react";

interface HeaderProps {
  onOpenEditor: () => void;
}

export default function Header({ onOpenEditor }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-200 shadow-sm">
      {/* Top Hairline Rule with URL */}
      <div className="w-full border-b border-neutral-100 bg-[#fbfbfa] py-1.5 px-6 sm:px-8 flex justify-between items-center text-[8px] font-mono tracking-[0.25em] text-neutral-500">
        <span className="uppercase">www.harshx.jp / editorial_issue_04</span>
        <span className="hidden sm:inline uppercase">chainsaw_man_exhibit_2026</span>
        <span className="uppercase">mag : harshx studio</span>
      </div>

      {/* Main Navbar */}
      <nav className="w-full py-4 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Side: Small links */}
          <div className="flex items-center space-x-6 text-[9px] tracking-[0.2em] font-medium text-neutral-500 uppercase">
            <a 
              href="#design-ideas" 
              className="hover:text-black transition-colors duration-300 relative group"
            >
              IDEAS
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
            </a>
            <span className="text-neutral-200 hidden md:inline">|</span>
            <a 
              href="#album" 
              className="hidden md:inline hover:text-black transition-colors duration-300 relative group"
            >
              ALBUM
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Center Brand Logo (Massive tracked-out bold font) */}
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <button 
              onClick={onOpenEditor}
              className="inline-block focus:outline-none cursor-pointer group"
              title="Open Editorial Studio"
            >
              <motion.span 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-[0.4em] sm:tracking-[0.6em] text-neutral-900 group-hover:text-red-600 transition-colors duration-300 select-none uppercase"
              >
                HARSHX
              </motion.span>
            </button>
          </div>

          {/* Right Side: Small links + Studio button */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[9px] tracking-[0.2em] font-medium text-neutral-500">
            <a href="#trailer" className="hidden sm:inline hover:text-black transition-colors duration-300 relative group uppercase">
              TRAILER
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
            </a>
            <button 
              onClick={onOpenEditor}
              className="px-3 py-1 border border-neutral-900 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-[8px] font-mono font-bold tracking-widest transition-all duration-300 shrink-0 uppercase shadow-sm"
            >
              STUDIO
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
}
