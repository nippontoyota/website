"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWidgets from '@/components/StickyWidgets';
import Image from 'next/image';

const tPrograms = [
  { prefix: "T", name: "ASSIST", sub: "ROADSIDE ASSISTANCE" },
  { prefix: "T", name: "SECURE", sub: "EXTENDED WARRANTY" },
  { prefix: "T", name: "SMILE", sub: "PREPAID MAINTENANCE" },
  { prefix: "T", name: "DELIVER", sub: "EXPRESS DELIVERY" },
  { prefix: "T", name: "GLOSS", sub: "CAR DETAILING" },
  { prefix: "T", name: "WEB", sub: "BOOK ONLINE" },
  { prefix: "T", name: "CHOICE", sub: "PARTS OF YOUR CHOICE" },
  { prefix: "T", name: "INSPECT", sub: "TRUSTED VEHICLE INSPECTION" },
  { prefix: "T", name: "SAATH", sub: "PARTS AT CONVENIENCE" },
  { prefix: "T", name: "SERV", sub: "TOTAL CAR SERVICE" },
  { prefix: "T", name: "SPARSH", sub: "TOUCH POINT" },
  { prefix: "T", name: "CLUB", sub: "UNLOCK CLUB BENEFITS" },
  { prefix: "T", name: "SHIELD", sub: "BE AWARE, BE EMPOWERED" },
];

export default function TCarePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, zIndex: 0 }),
  };

  const slides = [
    {
      id: 1,
      bg: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      content: (
        <div className="flex flex-col md:flex-row h-full w-full max-w-[1400px] mx-auto items-center px-4 md:px-16 pt-20 md:pt-0">
          <div className="w-full md:w-[45%] flex flex-col justify-center text-left relative z-10">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-[5.5rem] font-display font-black text-[#111] leading-[0.85] italic tracking-tighter"
            >
              EXPERIENCE<br/>
              <span className="flex items-baseline">
                WITH <span className="text-[var(--toyota-red)] text-6xl md:text-[8rem] ml-3 mr-1 leading-none">T</span>CARE
              </span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-2 md:mt-4 ml-10 md:ml-32"
            >
              <span className="font-caveat text-3xl md:text-5xl text-[var(--toyota-red)] font-bold transform -rotate-2 inline-block">Awesome</span>
              <span className="font-display font-black text-lg md:text-2xl text-[#111] ml-2 tracking-widest uppercase">Together</span>
            </motion.div>
          </div>
          <div className="w-full md:w-[55%] flex justify-center items-center mt-10 md:mt-0 relative z-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="relative w-[120%] md:w-full ml-10 md:ml-0"
            >
              <img 
                src="/toyota-cars.png" 
                alt="Toyota Fleet" 
                className="w-full h-auto drop-shadow-2xl object-contain scale-110 md:scale-125 origin-right"
              />
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      bg: "#ffffff",
      content: (
        <div className="flex flex-col md:flex-row h-full w-full max-w-[1400px] mx-auto">
          <div className="w-full h-1/2 md:h-full md:w-1/2 relative overflow-hidden">
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200")' }}
            />
          </div>
          <div className="w-full h-1/2 md:h-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 bg-white relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="py-10 md:py-0"
            >
              <h2 className="text-2xl md:text-5xl font-display font-extrabold text-[#111] leading-tight tracking-tight">
                Consumers are Free to Avail <br/>
                <span className="text-[var(--toyota-red)]">INSURANCE SERVICES</span><br/>
                from Any Insurance Service Provider
              </h2>
              <div className="mt-8 flex flex-col">
                 <p className="font-caveat text-4xl md:text-6xl text-[var(--toyota-red)] font-bold transform -rotate-3 mb-1 md:mb-2">Flexibility is</p>
                 <p className="font-caveat text-5xl md:text-7xl text-[#111] font-bold transform -rotate-3 ml-12">Awesome</p>
              </div>
              
              <div className="mt-10 md:mt-16 flex items-center justify-between border-t border-gray-100 pt-6">
                 <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                   <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-300 flex items-center justify-center">i</div>
                   www.toyotabharat.com
                 </div>
                 <div className="text-right">
                   <p className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-wider">TALK TO TOYOTA ON</p>
                   <p className="font-bold text-[#111] text-xs md:text-sm">1800 309 0001</p>
                   <p className="font-bold text-[#111] text-xs md:text-sm">080 4505 9000</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Hero Slider Area */}
        <section className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden bg-gray-50">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0 w-full h-full"
              style={{ background: slides[currentIndex].bg }}
            >
              {slides[currentIndex].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-6 z-20 cursor-pointer text-white/50 hover:text-white transition-colors drop-shadow-md" onClick={handlePrev}>
            <ChevronLeft size={48} strokeWidth={1} />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-6 z-20 cursor-pointer text-[#111]/30 hover:text-[#111] transition-colors drop-shadow-md" onClick={handleNext}>
            <ChevronRight size={48} strokeWidth={1} />
          </div>
          
          {/* Menu Button Overlay (placeholder for the 9-dot menu in design) */}
          <div className="absolute bottom-6 right-6 z-20 w-12 h-12 bg-black flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <div className="grid grid-cols-3 gap-1">
               {[...Array(9)].map((_, i) => (
                 <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm" />
               ))}
            </div>
          </div>
        </section>

        {/* T-Programs Infinite Marquee (Cooler than static row) */}
        <section className="w-full bg-white border-b border-gray-200 py-6 overflow-hidden relative shadow-sm z-10">
          <div className="flex w-[200%] md:w-[150%] animate-marquee">
            {[...tPrograms, ...tPrograms].map((prog, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center w-[120px] md:w-[160px] flex-shrink-0 group cursor-pointer px-4">
                <div className="text-2xl md:text-3xl font-display font-black tracking-tight text-[#111] group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-[var(--toyota-red)]">{prog.prefix}</span>{prog.name}
                </div>
                <div className="w-full h-px bg-gray-200 my-1 group-hover:bg-[var(--toyota-red)] transition-colors duration-300"></div>
                <div className="text-[6px] md:text-[8px] font-bold text-gray-400 uppercase tracking-widest text-center mt-1 group-hover:text-gray-600 transition-colors duration-300">
                  {prog.sub}
                </div>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </section>

      </main>

      <Footer />
      <StickyWidgets />
    </div>
  );
}
