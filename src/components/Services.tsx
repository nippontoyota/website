"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const services = [
    { id: 1, title: "What's New", image: "/whats-new.jpg" },
    { id: 2, title: "Q Service", image: "/q-service.jpg" },
    { id: 3, title: "Driving School", image: "/driving-school.jpg" },
    { id: 4, title: "iConnect", image: "/iconnect.jpg" }
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000); // Auto swipe every 4 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 relative">
        <motion.h2 
          className="font-display text-3xl md:text-4xl font-extrabold text-center mb-12 text-[#111] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Check out our wide range of services
        </motion.h2>
        
        {/* Slider Container */}
        <div className="relative w-full flex items-center justify-center mt-12">
          {/* Arrows - Outside Left */}
          <motion.div 
            className="absolute left-0 md:-left-12 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 cursor-pointer hover:text-[var(--toyota-red)] transition-colors z-20 border border-gray-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </motion.div>

          {/* Main Card */}
          <div className="w-full max-w-[900px] h-[450px] md:h-[550px] relative overflow-hidden bg-white">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 w-full h-full flex flex-col group"
              >
                <div className="w-full flex-grow bg-gray-200 overflow-hidden relative">
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{backgroundImage: `url("${services[currentIndex].image}")`}}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="h-[120px] bg-white flex flex-col items-center justify-center border-t border-gray-100 z-10">
                  <h3 className="font-display text-2xl md:text-3xl font-black tracking-widest uppercase text-[#111] mb-3 group-hover:text-[var(--toyota-red)] transition-colors">{services[currentIndex].title}</h3>
                  <motion.button 
                    className="bg-[var(--toyota-red)] text-white px-10 py-3 text-sm font-bold tracking-widest rounded-none"
                    whileHover={{ backgroundColor: "#c80000" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    KNOW MORE
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows - Outside Right */}
          <motion.div 
            className="absolute right-0 md:-right-12 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 cursor-pointer hover:text-[var(--toyota-red)] transition-colors z-20 border border-gray-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
          >
            <ChevronRight size={24} strokeWidth={2} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
