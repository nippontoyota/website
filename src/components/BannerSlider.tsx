"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function BannerSlider() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force muted and play programmatically for strict mobile browsers (iOS/Safari)
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    }
  }, []);
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
          ref={videoRef}
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
{/*         <motion.h2 
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
        </motion.h2> */}
        
        
      </div>

      </div>
  );
}
