"use client";

import { motion } from 'framer-motion';
import { Mouse } from 'lucide-react';

export default function BannerSlider() {
  return (
    <div className="w-full relative h-[600px] lg:h-[700px] overflow-hidden bg-[#889fb3]">
      {/* Background Video */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/toyota-video.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/10"></div>
      </motion.div>



      {/* Main Text */}
      <div className="absolute top-20 md:top-24 left-0 right-0 text-center flex flex-col items-center px-4">
        <motion.h2 
          className="font-display text-5xl md:text-7xl font-black text-white drop-shadow-2xl tracking-[0.15em] uppercase flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.3 }}
        >
          <span>LEAD WITH</span>
          <motion.span 
            className="text-[var(--toyota-red)] font-sans italic tracking-tighter text-6xl md:text-8xl ml-2"
            initial={{ opacity: 0, x: -20, skewX: 20 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            POWER
          </motion.span> 
        </motion.h2>
        
        <motion.p
          className="text-white font-display text-xs md:text-sm font-bold tracking-[0.4em] drop-shadow-lg mt-6 uppercase opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Dominating <span className="text-[var(--toyota-red)] mx-1">•</span> All-Terrain <span className="text-[var(--toyota-red)] mx-1">•</span> Powered In Style
        </motion.p>
      </div>

      {/* Bottom Content Container */}
      <div className="absolute bottom-8 md:bottom-10 left-0 w-full px-4 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-end pointer-events-none z-10">
        
        {/* Bottom Text - Left */}
        <motion.div 
          className="text-white font-display pointer-events-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-baseline drop-shadow-lg">
            <span className="text-4xl md:text-6xl font-extrabold">70</span>
            <span className="text-sm md:text-xl font-bold ml-1">+ YEARS OF</span>
          </div>
          <div className="text-xl md:text-3xl font-extrabold tracking-widest mt-[-5px] drop-shadow-lg">LEGACY</div>
          <div className="text-[8px] mt-2 opacity-80 max-w-[200px] leading-tight drop-shadow-sm font-sans hidden md:block">
            *T&C apply. Digitally created visual. Picture of vehicle was not taken while driving.
          </div>
        </motion.div>

        {/* Bottom Text - Right */}
        <motion.div 
          className="text-white font-display text-left md:text-right mt-4 md:mt-0 pointer-events-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="text-xs md:text-sm tracking-widest drop-shadow-md">ALL NEW</div>
          <div className="text-2xl md:text-3xl font-extrabold tracking-widest drop-shadow-md">FORTUNER</div>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <motion.div 
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center text-white text-[10px] tracking-widest opacity-80 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse size={32} strokeWidth={1} className="mb-1" />
        </motion.div>
        SCROLL DOWN
      </motion.div>
    </div>
  );
}
