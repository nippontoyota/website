"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export const cars = [
  {
    id: "glanza",
    name: "GLANZA",
    highlight: "Premium hatchback, 1.2L DualJet petrol/CNG, 360-degree camera, HUD, touchscreen.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹6.73L – ₹9.99L" },
      { label: "On-Road Kochi (Est.)", value: "₹8.37L – ₹12.20L" }
    ],
    image: "/glanza.png" 
  },
  {
    id: "taisor",
    name: "URBAN CRUISER TAISOR",
    highlight: "Sub-4m crossover, 1.2L NA & 1.0L Turbo petrol, aggressive styling, wireless Android Auto/CarPlay.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹7.74L – ₹13.04L" },
      { label: "On-Road Kochi (Est.)", value: "₹9.20L – ₹15.80L" }
    ],
    image: "/taisor.png" 
  },
  {
    id: "rumion",
    name: "RUMION",
    highlight: "7-seater MPV, 1.5L K-Series engine with CNG option, high fuel efficiency, comfortable 3-row seating.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹10.44L – ₹13.73L" },
      { label: "On-Road Kochi (Est.)", value: "₹12.09L – ₹17.67L" }
    ],
    image: "/rumion.png" 
  },
  {
    id: "hyryder",
    name: "URBAN CRUISER HYRYDER",
    highlight: "Mid-size SUV, Neo Drive (Mild) & Self-Charging Strong Hybrid (27.97 km/l), AWD option available.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹11.14L – ₹20.19L" },
      { label: "On-Road Kochi (Est.)", value: "₹13.50L – ₹24.80L" }
    ],
    image: "/hyryder.png" 
  },
  {
    id: "ebella",
    name: "URBAN CRUISER EBELLA",
    highlight: "All-electric EV SUV concept/upcoming release. Detailed specs pending official dealer launch.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "TBA" },
      { label: "On-Road Kochi (Est.)", value: "TBA" }
    ],
    image: "/ebella.png" 
  },
  {
    id: "crysta",
    name: "INNOVA CRYSTA",
    highlight: "Premium utility MPV, 2.4L Diesel engine, proven durability, ladder-frame chassis, 7/8 seater.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹19.99L – ₹26.30L" },
      { label: "On-Road Kochi (Est.)", value: "₹24.50L – ₹32.80L" }
    ],
    image: "/crysta.png" 
  },
  {
    id: "hycross",
    name: "INNOVA HYCROSS",
    highlight: "Modern monocoque MPV, 2.0L Petrol & 2.0L Strong Hybrid, Panoramic Sunroof, ADAS, Ottoman seats.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹18.92L – ₹30.68L" },
      { label: "On-Road Kochi (Est.)", value: "₹22.82L – ₹38.45L" }
    ],
    image: "/hycross.png" 
  },
  {
    id: "hilux",
    name: "HILUX",
    highlight: "Heavy-duty pickup truck, 2.8L Diesel engine (500 Nm torque), 4x4 with high/low range, 700mm water wading capacity.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹30.40L – ₹37.90L" },
      { label: "On-Road Kochi (Est.)", value: "₹38.00L – ₹47.50L" }
    ],
    image: "/hilux.png" 
  },
  {
    id: "fortuner",
    name: "FORTUNER",
    highlight: "Iconic 7-seater SUV, 2.7L Petrol & 2.8L Diesel, 4x2 / 4x4 options, high resale value.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹33.43L – ₹51.44L" },
      { label: "On-Road Kochi (Est.)", value: "₹41.50L – ₹63.50L" }
    ],
    image: "/fortuner-v2.png" 
  },
  {
    id: "legender",
    name: "LEGENDER",
    highlight: "Sportier Fortuner variant, sharp LED headlamps, dual-tone exterior, wireless charging, sequential turn signals.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹43.66L – ₹50.09L" },
      { label: "On-Road Kochi (Est.)", value: "₹54.65L – ₹62.68L" }
    ],
    image: "/legender.png" 
  },
  {
    id: "camry",
    name: "CAMRY",
    highlight: "Executive luxury sedan, 2.5L Self-Charging Strong Hybrid, recliner rear seats, 9-speaker JBL audio.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹46.17L – ₹48.50L" },
      { label: "On-Road Kochi (Est.)", value: "₹57.20L – ₹60.50L" }
    ],
    image: "/camry.png" 
  },
  {
    id: "vellfire",
    name: "VELLFIRE",
    highlight: "Ultra-luxury MPV, VIP lounge seating, Executive Lounge package, 2.5L Strong Hybrid, dual sunroofs.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹1.22 Cr – ₹1.32 Cr" },
      { label: "On-Road Kochi (Est.)", value: "₹1.52 Cr – ₹1.65 Cr" }
    ],
    image: "/vellfire.png" 
  },
  {
    id: "lc300",
    name: "LAND CRUISER 300",
    highlight: "Flagship luxury off-road SUV built on GA-F platform. Features a 3.3L Twin-Turbo V6 Diesel engine, Multi-Terrain Select, and E-KDSS.",
    stats: [
      { label: "Ex-Showroom (Est.)", value: "₹2.10 Crore" },
      { label: "On-Road Kochi (Est.)", value: "₹2.60 Cr – ₹2.70 Cr" }
    ],
    image: "/land-cruiser-300.png" 
  }
];

import { useLeadStore } from '@/store/useLeadStore';

export default function Vehicles() {
  const { openModal } = useLeadStore();
  const [activeCar, setActiveCar] = useState(cars[0]);
  const [direction, setDirection] = useState(1);
  const [hasSwiped, setHasSwiped] = useState(false);

  useEffect(() => {
    const el = document.getElementById(`car-nav-${activeCar.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeCar.id]);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, smoothConfig);
  const smoothY = useSpring(mouseY, smoothConfig);
  
  const lightX = useTransform(smoothX, [-0.5, 0.5], ["30%", "70%"]);
  const lightY = useTransform(smoothY, [-0.5, 0.5], ["20%", "60%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleNext = () => {
    const currentIndex = cars.findIndex(c => c.id === activeCar.id);
    setDirection(1);
    setActiveCar(currentIndex < cars.length - 1 ? cars[currentIndex + 1] : cars[0]);
  };

  const handlePrev = () => {
    const currentIndex = cars.findIndex(c => c.id === activeCar.id);
    setDirection(-1);
    setActiveCar(currentIndex > 0 ? cars[currentIndex - 1] : cars[cars.length - 1]);
  };

  const handleDragEnd = (e: unknown, { offset, velocity }: { offset: { x: number; y: number }, velocity: { x: number; y: number } }) => {
    setHasSwiped(true);
    if (offset.x < -30 || velocity.x < -300) {
      handleNext();
    } else if (offset.x > 30 || velocity.x > 300) {
      handlePrev();
    }
  };

  const carVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 150 : -150,
      scale: 0.95
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -150 : 150,
      scale: 0.95
    })
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#000000] min-h-screen pt-32 pb-24 md:pt-48 md:pb-32 relative overflow-hidden flex flex-col justify-center perspective-[2000px]"
    >
      {/* Dynamic Volumetric Spotlight mapped to mouse */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background: useTransform(
            [lightX, lightY],
            ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(235,10,30,0.12) 0%, rgba(0,0,0,0) 60%)`
          )
        }}
      />

      {/* Parallax Background Typography */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCar.id + "-bg"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.04, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] text-center pointer-events-none whitespace-nowrap overflow-hidden z-0"
        >
          <h1 className="text-[18vw] font-druk text-white leading-none tracking-tighter mix-blend-overlay">
            {activeCar.name}
          </h1>
        </motion.div>
      </AnimatePresence>

      {/* 3D Showroom Floor (Perspective Grid & Light) */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[150vw] h-[60vh] perspective-floor z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] rounded-[100%]" />
        {/* Subtle floor grid lines */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            transform: `rotateX(80deg) scale(2)`
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Sleek Horizontal Model Nav */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-16 gap-6 pb-6 relative border-b border-white/20">
          <div className="shrink-0 xl:mr-8 text-center xl:text-left w-full xl:w-auto">
            <h2 className="text-xl md:text-2xl font-display font-bold tracking-[0.3em] uppercase text-white hover:text-white transition-colors duration-1000 ease-out cursor-default py-2">
              Select Model
            </h2>
          </div>

          <div 
            className="flex overflow-x-auto gap-8 md:gap-12 [&::-webkit-scrollbar]:hidden w-full relative z-50 pointer-events-auto items-center pb-4 pt-2"
          >
            {cars.map((car, idx) => (
              <button
                key={car.id}
                id={`car-nav-${car.id}`}
                onClick={() => {
                  const currentIndex = cars.findIndex(c => c.id === activeCar.id);
                  if (idx !== currentIndex) {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setActiveCar(car);
                  }
                }}
                className={`shrink-0 text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-700 relative hover:text-white py-2 ${
                  activeCar.id === car.id ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-zinc-500'
                }`}
              >
                {car.name}
              </button>
            ))}
          </div>
        </div>

        
        {/* The Showroom Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative">

          
          {/* Center Column: The Hero Car with Reflections and Parallax */}
          <div className="lg:col-span-8 relative h-[250px] sm:h-[350px] lg:h-[500px] xl:h-[600px] flex flex-col items-center justify-center group">
            
            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:flex absolute inset-y-0 -left-12 -right-12 z-50 items-center justify-between pointer-events-none">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-[#eb0a1e] hover:bg-[#eb0a1e]/10 transition-all pointer-events-auto"
                
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-[#eb0a1e] hover:bg-[#eb0a1e]/10 transition-all pointer-events-auto"
                
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Gesture Overlay: explicitly handles drag events independent of the crossfading images */}
            <motion.div 
              className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing touch-pan-y flex items-end justify-center pb-8"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
            >
              {/* Mobile Swipe Indicator */}
              {!hasSwiped && (
                <motion.div 
                  className="lg:hidden text-white/50 pointer-events-none mb-12 flex items-center justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ x: [-4, 4, -4] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold drop-shadow-md">&larr; Swipe &rarr;</span>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
            
            <AnimatePresence custom={direction}>
              <motion.div
                key={activeCar.id + "-img"}
                custom={direction}
                variants={carVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full z-20 scale-110 lg:scale-[1.25] origin-bottom"
              >
                {activeCar.image ? (
                  <>
                    {/* Main Car Image */}
                    <Image 
                      src={activeCar.image}
                      alt={activeCar.name}
                      fill sizes="100vw"
                      className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)]"
                      draggable={false}
                      priority
                    />
                    
                    {/* Physical Mirror Reflection on the Floor */}
                    <div className="absolute top-[90%] left-0 right-0 h-full scale-y-[-1] opacity-20 [mask-image:linear-gradient(to_bottom,black_0%,transparent_30%)] blur-[2px] -z-10">
                      <Image 
                        src={activeCar.image}
                        alt={`${activeCar.name} Reflection`}
                        priority
                        fill sizes="100vw"
                        className="object-contain"
                        draggable={false}
                      />
                    </div>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: High-End HUD */}
          <div className="lg:col-span-3 lg:col-start-10 z-30 lg:-mt-16 xl:-mt-24">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeCar.id + "-stats"}
                initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col space-y-6 relative"
              >
                {/* Header */}
                <div className="border-b border-white/10 pb-4 relative z-10">
                  <h2 className="font-display font-black text-3xl xl:text-4xl text-white tracking-[0.3em] uppercase leading-none drop-shadow-lg">
                    {activeCar.name}
                  </h2>
                </div>

                {/* Highlight & Features */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative z-10"
                >
                  <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed font-light mb-6">
                    {activeCar.highlight}
                  </p>
                </motion.div>

                {/* Prices Grid */}
                <div className="space-y-4 relative z-10 mb-8">
                  {activeCar.stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + (idx * 0.1) }}
                      className="border-b border-white/10 pb-3 flex flex-col hover:border-white/30 transition-colors duration-500"
                    >
                      <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-1">
                        {stat.label}
                      </p>
                      <p className="font-display text-2xl md:text-3xl font-bold text-white tracking-tighter drop-shadow-md">
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative z-10"
                >
                  
                  <button 
                    onClick={() => openModal(activeCar.name, 'TEST_DRIVE')}
                    className="group/btn relative w-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-700 hover:bg-white hover:text-zinc-950 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] rounded-sm"
                  >
                    <span className="relative z-10 flex items-center justify-between w-full">
                      Book Test Drive
                      <ArrowRight size={16} className="transform group-hover/btn:translate-x-3 transition-transform duration-700 ease-out" />
                    </span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-700 ease-[0.25,1,0.5,1]" />
                  </button>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
