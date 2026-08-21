"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PressRelease() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        
        {/* Press Release Header */}
        <div className="mb-6">
          <h2 className="font-display text-3xl font-extrabold text-[#111] mb-1 tracking-tight">Press Release</h2>
          <p className="text-sm text-gray-500 font-medium">Check out latest news</p>
        </div>

        {/* Press Release Cards */}
        <div className="flex flex-col md:flex-row gap-4 relative">
          {/* Card 1 */}
          <div className="w-full md:w-1/2 border border-gray-200 bg-white rounded-sm p-6 flex items-start gap-6 hover:border-gray-300 transition-colors cursor-pointer group">
            <div className="text-center min-w-[70px] pt-1">
              <div className="text-5xl font-bold text-[#94a3b8] group-hover:text-[var(--toyota-red)] transition-colors leading-none tracking-tighter">14</div>
              <div className="text-xs font-bold text-[#94a3b8] group-hover:text-gray-500 transition-colors mt-2 uppercase tracking-wide">Aug<br/>2026</div>
            </div>
            <div>
              <h3 className="font-bold text-[#111] text-[17px] leading-snug mb-3 group-hover:text-[var(--toyota-red)] transition-colors">Six-Time World Champion M. C. Mary Kom Drives Home the All-New 9th Generation Toyota Hilux in India</h3>
              <p className="text-xs text-gray-500 leading-relaxed">New Delhi, August 14th, 2026: Six-time World Champion and Olympic medallist Ms. M. C. Mary Kom recently took delivery of the All-New Hilux, marking a special association between the two icons who define strength, resilience and an unwavering spirit t...</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full md:w-1/2 border border-gray-200 bg-white rounded-sm p-6 flex items-start gap-6 hover:border-gray-300 transition-colors cursor-pointer group">
            <div className="text-center min-w-[70px] pt-1">
              <div className="text-5xl font-bold text-[#94a3b8] group-hover:text-[var(--toyota-red)] transition-colors leading-none tracking-tighter">18</div>
              <div className="text-xs font-bold text-[#94a3b8] group-hover:text-gray-500 transition-colors mt-2 uppercase tracking-wide">Aug<br/>2026</div>
            </div>
            <div>
              <h3 className="font-bold text-[#111] text-[17px] leading-snug mb-3 group-hover:text-[var(--toyota-red)] transition-colors">Toyota Kirloskar Motor Concludes Environment Month 2026, Delivering Measurable Environmental Impact Through...</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Bengaluru, 18th August 2026: Toyota Kirloskar Motor (TKM) today announced the successful culmination of Environment Month 2026, organized under the theme &quot;Move Towards Climate Positive Company through Resource Recycling.&quot; The month-long...</p>
            </div>
          </div>

          {/* Arrows */}
          <motion.div 
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-6 w-9 h-9 border border-gray-200 rounded-full items-center justify-center text-gray-400 bg-white cursor-pointer hover:border-gray-300 hover:text-gray-600 shadow-sm"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </motion.div>
          <motion.div 
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-6 w-9 h-9 border border-gray-200 rounded-full items-center justify-center text-gray-400 bg-white cursor-pointer hover:border-gray-300 hover:text-gray-600 shadow-sm"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </motion.div>
        </div>

        <div className="text-right mt-6 mb-20">
          <span className="text-[13px] font-bold text-[#111] cursor-pointer hover:text-[var(--toyota-red)] transition-colors">View All &gt;</span>
        </div>

        {/* More from Toyota */}
        <h2 className="font-display text-3xl font-extrabold text-center mb-10 text-[#111] tracking-tight">More from Toyota</h2>
        
        <div className="flex flex-col md:flex-row gap-4 relative">
          {/* TOYOTA TRUST */}
          <div className="w-full md:w-1/3 h-[220px] bg-[#f4f4f4] border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
            <span className="font-bold text-[#9ca3af] tracking-widest text-sm uppercase">TOYOTA TRUST</span>
          </div>

          {/* WHAT'S NEW */}
          <div className="w-full md:w-1/3 h-[220px] bg-[var(--toyota-red)] flex items-center justify-center cursor-pointer hover:bg-[#d60000] transition-colors">
            <span className="font-display font-bold text-white text-3xl tracking-wide">WHAT&apos;S NEW?</span>
          </div>

          {/* Toyota Financial Services */}
          <div className="w-full md:w-1/3 h-[220px] bg-white border border-gray-200 flex flex-col justify-end cursor-pointer hover:border-gray-300 transition-colors">
            <div className="h-[70px] bg-[var(--toyota-red)] flex flex-col items-center justify-center text-white text-center w-full">
              <span className="font-bold text-[15px] leading-tight">Toyota Financial Services</span>
              <span className="font-bold text-[15px] leading-tight">Makes You Happier</span>
            </div>
          </div>
          
          {/* Arrows */}
          <motion.div 
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-6 w-9 h-9 border border-gray-200 rounded-full items-center justify-center text-gray-400 bg-white cursor-pointer hover:border-gray-300 hover:text-gray-600 shadow-sm"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </motion.div>
          <motion.div 
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-6 w-9 h-9 border border-gray-200 rounded-full items-center justify-center text-gray-400 bg-white cursor-pointer hover:border-gray-300 hover:text-gray-600 shadow-sm"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
