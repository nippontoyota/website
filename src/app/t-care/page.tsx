"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="flex flex-col md:flex-row-reverse h-full w-full max-w-[1400px] mx-auto items-center px-4 md:px-16 pt-20 md:pt-0">
          <div className="w-full md:w-[45%] flex flex-col justify-center text-left relative z-10">
            <motion.h1 
              initial={{ opacity: 0, x: 50 }}
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
              <span className="font-signature text-3xl md:text-5xl text-[var(--toyota-red)] font-bold transform -rotate-2 inline-block">Awesome</span>
              <span className="font-display font-black text-lg md:text-2xl text-[#111] ml-2 tracking-widest uppercase">Together</span>
            </motion.div>
          </div>
          <div className="w-full md:w-[55%] flex justify-center items-center mt-10 md:mt-0 relative z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
              className="relative w-full"
            >
              <Image 
                src="/hyryder.webp" 
                alt="Toyota Hyryder" width={1200} height={800} 
                className="w-full h-auto drop-shadow-2xl object-contain scale-110 md:scale-125"
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
          <div className="w-full h-1/2 md:h-full md:w-1/2 flex justify-center items-center bg-white p-4 md:p-12 relative">
            <Image 
              src="/hilux.jpeg" 
              alt="Toyota Hilux" width={1200} height={800} 
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
          <div className="w-full h-1/2 md:h-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 bg-white relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="py-10 md:py-0"
            >
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#111] leading-tight tracking-tight">
                Consumers are Free to Avail <br/>
                <span className="text-[var(--toyota-red)]">INSURANCE SERVICES</span><br/>
                from Any Insurance Service Provider
              </h2>
              <div className="mt-8 flex flex-col">
                 <p className="font-signature text-4xl md:text-6xl text-[var(--toyota-red)] font-bold transform -rotate-3 mb-1 md:mb-2">Flexibility is</p>
                 <p className="font-signature text-5xl md:text-7xl text-[#111] font-bold transform -rotate-3 ml-12">Awesome</p>
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
        <section className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden bg-white">
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
          <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-6 z-20 cursor-pointer text-black/50 hover:text-black transition-colors drop-shadow-md" onClick={handlePrev}>
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

        {/* Modern Clean Grid Section */}
        <section className="w-full bg-white py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
              {tPrograms.map((prog, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: (idx % 4) * 0.1 }}
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] flex flex-col items-center text-center group cursor-pointer border border-transparent hover:border-gray-50 p-6 rounded-xl transition-all duration-700 ease-out"
                >
                  
                  {/* Logo / Brand Name */}
                  <div className="text-3xl font-display font-black tracking-tighter transition-colors duration-700 ease-out text-[#111] group-hover:text-[#eb0a1e]">
                     <span className="text-[#eb0a1e]">{prog.prefix}</span>{prog.name}
                  </div>
                  
                  {/* Description */}
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 mb-6 transition-colors duration-700 ease-out group-hover:text-gray-900">
                    {prog.sub}
                  </h3>
                  
                  {/* Read More Link */}
                  <div className="mt-auto flex items-center justify-center text-[10px] font-bold text-[#111] uppercase tracking-widest group-hover:text-[#eb0a1e] transition-colors duration-700 ease-out">
                    READ MORE
                    <svg className="w-3 h-3 ml-1.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
