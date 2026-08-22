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
    <section className="py-24 md:py-32 bg-[#f8f8f8] border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Press Release Header */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-druk tracking-tight uppercase text-zinc-900 mb-4">
            Press Release
          </h2>
          <p className="text-lg text-gray-500 font-display font-medium">
            Stay updated with our latest announcements and initiatives
          </p>
        </motion.div>

        {/* Press Release Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {/* Card 1 */}
          <motion.a 
            href="https://www.toyotabharat.com/news/2026/tkm-concludes-environment-month-2026-delivering-measurable-environmental.html"
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white border border-gray-100 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="text-left md:text-center min-w-[80px]">
                <div className="text-5xl md:text-6xl font-bold text-[#eb0a1e] tracking-tighter">18</div>
                <div className="text-[11px] font-bold text-zinc-500 mt-2 uppercase tracking-[0.2em]">Aug<br/>2026</div>
              </div>
              <div>
                <h3 className="font-display font-bold text-[#eb0a1e] text-xl leading-tight mb-4 transition-colors duration-500">
                  Toyota Kirloskar Motor Concludes Environment Month 2026, Delivering Measurable Environmental Impact
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
                  Bengaluru, 18th August 2026: Toyota Kirloskar Motor (TKM) today announced the successful culmination of Environment Month 2026, organized under the theme &quot;Move Towards Climate Positive Company through Resource Recycling.&quot;
                </p>
              </div>
            </div>
            {/* Subtle Hover Arrow */}
            <div className="absolute top-8 right-8 opacity-100 translate-y-0 translate-x-0 transition-all duration-500 text-[#eb0a1e]">
              <ArrowUpRight size={24} strokeWidth={1.5} />
            </div>
          </motion.a>

          {/* Card 2 */}
          <motion.a 
            href="https://www.toyotabharat.com/news/2026/tkm-conducts-groundbreaking-ceremony-for-educational-infrastructure-project.html"
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white border border-gray-100 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="text-left md:text-center min-w-[80px]">
                <div className="text-5xl md:text-6xl font-bold text-[#eb0a1e] tracking-tighter">17</div>
                <div className="text-[11px] font-bold text-zinc-500 mt-2 uppercase tracking-[0.2em]">Aug<br/>2026</div>
              </div>
              <div>
                <h3 className="font-display font-bold text-[#eb0a1e] text-xl leading-tight mb-4 transition-colors duration-500">
                  Toyota Kirloskar Motor Conducts Groundbreaking Ceremony for Educational Infrastructure Project
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
                  Bengaluru, 17th August 2026: Toyota Kirloskar Motor (TKM) today concluded the groundbreaking ceremony for an educational infrastructure development project at Karnataka Public School, Magadi.
                </p>
              </div>
            </div>
            {/* Subtle Hover Arrow */}
            <div className="absolute top-8 right-8 opacity-100 translate-y-0 translate-x-0 transition-all duration-500 text-[#eb0a1e]">
              <ArrowUpRight size={24} strokeWidth={1.5} />
            </div>
          </motion.a>
        </div>

        {/* More from Toyota */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Image 
              src="/u-trust-more.jpg" 
              alt="Toyota Trust" 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </motion.a>

          {/* WHAT'S NEW */}
          <motion.a 
            href="#"
            className="group relative h-[220px] bg-white border border-gray-100 overflow-hidden flex cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <Image 
              src="/whats-new-more.jpg" 
              alt="What's New" 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </motion.a>

          {/* FINANCIAL SERVICES */}
          <motion.a 
            href="#"
            className="group relative h-[220px] bg-white border border-gray-100 overflow-hidden flex cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <Image 
              src="/financial-services-more.jpg" 
              alt="Toyota Financial Services" 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </motion.a>

          {/* EVENTS */}
          <motion.a 
            href="#"
            className="group relative h-[220px] bg-white border border-gray-100 overflow-hidden flex cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <Image 
              src="/events-more.jpg" 
              alt="Events" 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
