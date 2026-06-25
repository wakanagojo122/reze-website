import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface PhoneMockupProps {
  heroBgUrl: string;
  storefrontUrl: string;
  makimaUrl: string;
  akiUrl: string;
  kobeniUrl: string;
  heroTitle: string;
  heroDesc: string;
}

export default function PhoneMockup({
  heroBgUrl,
  storefrontUrl,
  makimaUrl,
  akiUrl,
  kobeniUrl,
  heroTitle,
  heroDesc
}: PhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect inside the miniature phone screen for active feeling!
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let direction = 1;
    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (!el) return;
        const maxScroll = el.scrollHeight - el.clientHeight;
        if (el.scrollTop >= maxScroll - 2) {
          direction = -1; // scroll back up
        } else if (el.scrollTop <= 2) {
          direction = 1; // scroll back down
        }
        el.scrollTop += direction * 0.5;
      }, 30);
    };

    const handleMouseEnter = () => clearInterval(scrollInterval);
    const handleMouseLeave = () => startScroll();

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    startScroll();

    return () => {
      clearInterval(scrollInterval);
      if (el) {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotate: -8 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        rotate: -4,
        y: [0, -8, 0] // continuous slow floating motion!
      }}
      transition={{
        opacity: { duration: 1, delay: 0.5 },
        x: { duration: 1, delay: 0.5, type: "spring" },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.05, rotate: -1, zIndex: 50 }}
      className="hidden xl:block fixed bottom-8 left-8 z-40 w-[240px] h-[480px] bg-neutral-900 rounded-[40px] shadow-2xl border-[10px] border-white flex flex-col overflow-hidden select-none"
    >
      {/* Speaker and Camera Notch at Top */}
      <div className="absolute top-0 inset-x-0 h-6 bg-white z-50 flex justify-center items-center">
        {/* Notch container */}
        <div className="w-24 h-4 bg-neutral-950 rounded-b-xl flex items-center justify-center space-x-2">
          {/* Camera lens */}
          <div className="w-2 h-2 rounded-full bg-neutral-800" />
          {/* Speaker grill */}
          <div className="w-8 h-1 bg-neutral-700 rounded-full" />
        </div>
      </div>

      {/* Phone Screen: Scrollable Simulator */}
      <div 
        ref={scrollRef}
        className="w-full h-full bg-[#0a0a0a] overflow-y-auto scrollbar-none pt-6 text-white text-[8px] flex flex-col space-y-4"
        style={{ scrollbarWidth: "none" }}
      >
        
        {/* Mock Top bar */}
        <div className="px-3 pt-1 flex justify-between items-center text-[6px] font-mono opacity-50 text-white">
          <span>09:41</span>
          <div className="flex space-x-1">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Mock Header */}
        <div className="px-3 py-1 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-sm sticky top-0 z-30">
          <span className="font-display font-black tracking-[0.2em] text-[8px]">HARSHX</span>
          <span className="font-mono text-[5px] text-red-500 font-bold">LIVE</span>
        </div>

        {/* Mini Hero */}
        <div className="px-3 space-y-2 relative h-[140px] flex flex-col justify-end pb-3">
          <div className="absolute inset-0 z-0">
            <img src={heroBgUrl || "/your-image-here.jpg"} alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          <div className="relative z-10 space-y-1">
            <span className="font-mono text-[5px] text-red-500 tracking-widest block uppercase font-bold">CSM SPECIAL</span>
            <h4 className="font-display font-black text-[11px] leading-tight tracking-tighter line-clamp-2">{heroTitle}</h4>
            <p className="text-gray-400 font-sans leading-normal text-[6px] max-w-[160px] line-clamp-3">
              {heroDesc}
            </p>
          </div>
        </div>

        {/* Mini Storefront Card */}
        <div className="px-3">
          <div className="bg-white rounded-lg p-2 text-[#050505] flex items-center space-x-2 shadow">
            <img src={storefrontUrl || "/your-image-here.jpg"} alt="" className="w-10 h-10 object-cover rounded" />
            <div className="flex-1 space-y-0.5">
              <span className="font-mono text-[5px] text-gray-400 uppercase">LOCATION</span>
              <p className="font-bold text-[7px] leading-none">ねんぼう教室</p>
              <p className="text-gray-500 text-[6px]">Dusk storefront style.</p>
            </div>
          </div>
        </div>

        {/* Mini Section 01 */}
        <div className="px-3 space-y-2">
          <span className="font-mono text-[5px] text-white/30 tracking-widest uppercase block">DESIGN IDEAS</span>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="relative rounded overflow-hidden aspect-square bg-[#111]">
              <img src={makimaUrl || "/your-image-here.jpg"} alt="" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-1 flex flex-col justify-end">
                <span className="text-[5px] font-bold">MAKIMA GETS SHOT</span>
              </div>
            </div>

            <div className="relative rounded overflow-hidden aspect-square bg-[#111]">
              <img src={akiUrl || "/your-image-here.jpg"} alt="" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-1 flex flex-col justify-end">
                <span className="text-[5px] font-bold">AKI HAYAKAWA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Section 02 - LOVE MAKIMA */}
        <div className="px-3 py-2 bg-[#1a1a1a] rounded mx-3 space-y-1">
          <div className="flex justify-between items-center text-[7px]">
            <span className="font-display font-bold tracking-widest uppercase">LOVE MAKIMA</span>
            <span className="text-red-500 font-bold">100%</span>
          </div>
          <div className="aspect-[16/9] rounded overflow-hidden bg-[#050505]">
            <img src={makimaUrl || "/your-image-here.jpg"} alt="" className="w-full h-full object-cover opacity-80" />
          </div>
          <p className="text-gray-400 text-[5px] leading-relaxed">
            Tatsuki Fujimoto's legendary world where demons and humans live together.
          </p>
        </div>

        {/* Mock Navigation Bottom Bar */}
        <div className="mt-auto px-3 py-2 bg-black border-t border-white/5 flex justify-around items-center sticky bottom-0 z-30 text-white/50 text-[6px]">
          <span className="text-red-500 font-bold">HOME</span>
          <span>ALBUM</span>
          <span>TRAILER</span>
        </div>

      </div>

      {/* Home Indicator Bar at Bottom of Phone */}
      <div className="absolute bottom-1 inset-x-0 h-4 bg-white z-50 flex justify-center items-center">
        <div className="w-20 h-1 bg-neutral-800 rounded-full" />
      </div>

    </motion.div>
  );
}
