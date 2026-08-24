"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function PressRelease() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Press Release Header */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-druk tracking-tight uppercase text-zinc-900 mb-4">
            Press Release
          </h2>
        </motion.div>

        {/* Press Release Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {/* Card 1 */}
          <motion.a 
            href="https://www.toyotabharat.com/news/2026/tkm-concludes-environment-month-2026-delivering-measurable-environmental.html"
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white border border-gray-100 p-8 md:p-12 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden rounded-sm"
            initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            
            variants={fadeUp}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="text-left md:text-center min-w-[80px]">
                <div className="text-5xl md:text-6xl font-bold text-[#eb0a1e] tracking-tighter">18</div>
                <div className="text-[11px] font-bold text-zinc-500 mt-2 uppercase tracking-[0.2em]">Aug<br/>2026</div>
              </div>
              <div>
                <h3 className="font-display font-bold text-zinc-900 group-hover:text-[#eb0a1e] text-xl leading-tight mb-4 transition-colors duration-500">
                  Toyota Kirloskar Motor Concludes Environment Month 2026, Delivering Measurable Environmental Impact
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
                  Bengaluru, 18th August 2026: Toyota Kirloskar Motor (TKM) today announced the successful culmination of Environment Month 2026, organized under the theme &quot;Move Towards Climate Positive Company through Resource Recycling.&quot;
              </div>
            </div>
            {/* Subtle Hover Arrow */}
            <div className="absolute top-8 right-8 text-zinc-300 group-hover:text-[#eb0a1e] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <ArrowUpRight size={24} strokeWidth={1.5} />
            </div>
          </motion.a>

          {/* Card 2 */}
          <motion.a 
            href="https://www.toyotabharat.com/news/2026/tkm-conducts-groundbreaking-ceremony-for-educational-infrastructure-project.html"
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white border border-gray-100 p-8 md:p-12 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden rounded-sm"
            initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            
            variants={fadeUp}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="text-left md:text-center min-w-[80px]">
                <div className="text-5xl md:text-6xl font-bold text-[#eb0a1e] tracking-tighter">17</div>
                <div className="text-[11px] font-bold text-zinc-500 mt-2 uppercase tracking-[0.2em]">Aug<br/>2026</div>
              </div>
              <div>
                <h3 className="font-display font-bold text-zinc-900 group-hover:text-[#eb0a1e] text-xl leading-tight mb-4 transition-colors duration-500">
                  Toyota Kirloskar Motor Conducts Groundbreaking Ceremony for Educational Infrastructure Project
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
                  Bengaluru, 17th August 2026: Toyota Kirloskar Motor (TKM) today concluded the groundbreaking ceremony for an educational infrastructure development project at Karnataka Public School, Magadi.
              </div>
            </div>
            {/* Subtle Hover Arrow */}
            <div className="absolute top-8 right-8 text-zinc-300 group-hover:text-[#eb0a1e] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <ArrowUpRight size={24} strokeWidth={1.5} />
            </div>
          </motion.a>
        </div>

        {/* More from Toyota */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-druk tracking-tight uppercase text-zinc-900">
            More from Toyota
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* TOYOTA TRUST */}
          <motion.a 
            href="#"
            className="group relative h-[220px] bg-white border border-gray-100 overflow-hidden flex cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
            initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            
            variants={fadeUp}
          >
            <Image 
              src="/u-trust.png" 
              alt="Toyota Trust" 
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </motion.a>

          {/* WHAT'S NEW */}
          <motion.a 
            href="#"
            className="group relative h-[220px] bg-white border border-gray-100 overflow-hidden flex cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
            initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <Image 
              src="/whats-new.png" 
              alt="What's New" 
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </motion.a>

          {/* FINANCIAL SERVICES */}
          <motion.a 
            href="#"
            className="group relative h-[220px] bg-white border border-gray-100 overflow-hidden flex cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
            initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <Image 
              src="/toyota-financial-service.png" 
              alt="Toyota Financial Services" 
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </motion.a>

          {/* EVENTS */}
          <motion.a 
            href="#"
            className="group relative h-[220px] bg-white border border-gray-100 overflow-hidden flex cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
            initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <Image 
              src="/events.png" 
              alt="Events" 
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
