"use client";

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const cars = [
  {
    id: "taisor",
    name: "URBAN CRUISER TAISOR",
    tagline: "Make Your Way",
    price: "₹7.73 Lakhs*",
    stats: [
      { label: "Efficiency", value: "22.8 km/l" },
      { label: "Engine", value: "1.2L Dual Jet" },
      { label: "Seating", value: "5 Seats" }
    ],
    image: "/taisor.webp" 
  },
  {
    id: "glanza",
    name: "GLANZA",
    tagline: "Go Hatchin'",
    price: "₹6.86 Lakhs*",
    stats: [
      { label: "Efficiency", value: "22.9 km/l" },
      { label: "Engine", value: "1.2L K-Series" },
      { label: "Power", value: "66 kW" }
    ],
    image: "/glanza.webp" 
  },
  {
    id: "hyryder",
    name: "URBAN CRUISER HYRYDER",
    tagline: "It's Hybrid Time",
    price: "₹11.14 Lakhs*",
    stats: [
      { label: "Efficiency", value: "27.97 km/l" },
      { label: "Drivetrain", value: "AWD / Hybrid" },
      { label: "Power", value: "85 kW" }
    ],
    image: "/hyryder.avif" 
  },
  {
    id: "ebella",
    name: "URBAN CRUISER EBELLA",
    tagline: "The Electric Future",
    price: "TBA",
    stats: [
      { label: "Range", value: "400+ km" },
      { label: "Drivetrain", value: "AWD EV" },
      { label: "Charging", value: "Fast Charge" }
    ],
    image: "/ebella.avif" 
  },
  {
    id: "hilux",
    name: "HILUX",
    tagline: "A Richer Life",
    price: "₹30.40 Lakhs*",
    stats: [
      { label: "Engine", value: "2.8L Diesel" },
      { label: "Drivetrain", value: "4x4 AT/MT" },
      { label: "Torque", value: "500 Nm" }
    ],
    image: "/hilux.png" 
  },
  {
    id: "fortuner",
    name: "FORTUNER",
    tagline: "Lead With Power",
    price: "₹33.43 Lakhs*",
    stats: [
      { label: "Engine", value: "2.8L Diesel" },
      { label: "Drivetrain", value: "4x4 / 4x2" },
      { label: "Power", value: "150 kW" }
    ],
    image: "/fortuner.avif" 
  },
  {
    id: "legender",
    name: "LEGENDER",
    tagline: "Power Empowers",
    price: "₹43.66 Lakhs*",
    stats: [
      { label: "Engine", value: "2.8L Diesel" },
      { label: "Drivetrain", value: "4x4 AT" },
      { label: "Torque", value: "500 Nm" }
    ],
    image: "/legender.avif" 
  },
  {
    id: "vellfire",
    name: "VELLFIRE",
    tagline: "Masterpiece of Luxury",
    price: "₹1.20 Cr*",
    stats: [
      { label: "Engine", value: "2.5L Hybrid" },
      { label: "Drivetrain", value: "E-Four AWD" },
      { label: "Seating", value: "Executive Lounge" }
    ],
    image: "/vellfire.png" 
  },
  {
    id: "camry",
    name: "CAMRY",
    tagline: "True Luxury",
    price: "₹46.17 Lakhs*",
    stats: [
      { label: "Efficiency", value: "19.1 km/l" },
      { label: "Engine", value: "2.5L Hybrid" },
      { label: "Power", value: "160 kW" }
    ],
    image: "" 
  },
  {
    id: "lc300",
    name: "LAND CRUISER 300",
    tagline: "The Unstoppable",
    price: "₹2.10 Cr*",
    stats: [
      { label: "Engine", value: "3.3L Twin-Turbo" },
      { label: "Drivetrain", value: "AWD Multi-Terrain" },
      { label: "Power", value: "227 kW" }
    ],
    image: "/land-cruiser.png" 
  }
];

import { useLeadStore } from '@/store/useLeadStore';

export default function Vehicles() {
  const { openModal } = useLeadStore();
  const [activeCar, setActiveCar] = useState(cars[0]);

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


  const handleDragEnd = (e: unknown, { offset, velocity }: { offset: { x: number; y: number }, velocity: { x: number; y: number } }) => {
    const currentIndex = cars.findIndex(c => c.id === activeCar.id);
    if (offset.x < -30 || velocity.x < -300) {
      // Swiped left (next car)
      if (currentIndex < cars.length - 1) setActiveCar(cars[currentIndex + 1]);
    } else if (offset.x > 30 || velocity.x > 300) {
      // Swiped right (prev car)
      if (currentIndex > 0) setActiveCar(cars[currentIndex - 1]);
    }
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
      <AnimatePresence mode="wait">
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
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 gap-6 pb-8 relative">
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="shrink-0 xl:mr-6">
            <h2 className="text-xl md:text-2xl font-display font-thin tracking-[0.3em] uppercase text-white/90 hover:text-white transition-colors duration-1000 ease-out cursor-default">
              Select Model
            </h2>
          </div>

          <div className="flex overflow-x-auto gap-8 md:gap-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full snap-x pb-4 [mask-image:linear-gradient(to_right,black_90%,transparent_100%)]">
            {cars.map((car) => (
              <button
                key={car.id}
                onClick={() => setActiveCar(car)}
                className={`shrink-0 text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-700 relative snap-start ${
                  activeCar.id === car.id ? 'text-white' : 'text-zinc-600 hover:text-white/70'
                }`}
              >
                {car.name}
              </button>
            ))}
          </div>
        </div>

        {/* The Showroom Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Center Column: The Hero Car with Reflections and Parallax */}
          <div className="lg:col-span-8 relative h-[250px] sm:h-[350px] lg:h-[500px] xl:h-[600px] flex flex-col items-center justify-center">
            
            <AnimatePresence custom={activeCar.id}>
              <motion.div
                key={activeCar.id + "-img"}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full h-full z-20 scale-110 lg:scale-[1.25] origin-bottom cursor-grab active:cursor-grabbing"
              >
                {activeCar.image ? (
                  <>
                    {/* Main Car Image */}
                    <Image 
                      src={activeCar.image}
                      alt={activeCar.name}
                      fill
                      className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)]"
                      draggable={false}
                      priority
                    />
                    
                    {/* Physical Mirror Reflection on the Floor */}
                    <div className="absolute top-[90%] left-0 right-0 h-full scale-y-[-1] opacity-20 [mask-image:linear-gradient(to_bottom,black_0%,transparent_30%)] blur-[2px] -z-10">
                      <Image 
                        src={activeCar.image}
                        alt={`${activeCar.name} Reflection`}
                        fill
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
          <div className="lg:col-span-4 z-30">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCar.id + "-stats"}
                initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col space-y-10 relative"
              >
                {/* Header & Tagline */}
                <div className="border-b border-white/10 pb-6 relative z-10">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[#eb0a1e] font-bold text-[10px] tracking-[0.4em] uppercase mb-2 drop-shadow-[0_0_8px_rgba(235,10,30,0.4)]"
                  >
                    {activeCar.tagline}
                  </motion.p>
                  <h2 className="font-druk text-5xl xl:text-6xl text-white tracking-tighter uppercase leading-none drop-shadow-lg">
                    {activeCar.name}
                  </h2>
                </div>

                {/* Specs Grid */}
                <div className="space-y-6 relative z-10">
                  {activeCar.stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (idx * 0.1) }}
                      className="border-b border-white/5 pb-3 flex justify-between items-end hover:border-white/20 transition-colors duration-500"
                    >
                      <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
                        {stat.label}
                      </p>
                      <p className="font-display text-2xl font-medium text-white tracking-tight drop-shadow-md">
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Price & CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4 relative z-10"
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-2">
                    Starting Price
                  </p>
                  <p className="font-display font-bold text-4xl text-white tracking-tighter mb-8 drop-shadow-lg">
                    {activeCar.price}
                  </p>
                  
                  <button 
                    onClick={() => openModal(activeCar.name)}
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
