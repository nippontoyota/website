"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  { 
    id: 1, 
    title: "Toyota Q Service", 
    subtitle: "Unmatched Quality & Care", 
    desc: "Experience legendary Toyota reliability. Our master technicians use cutting-edge diagnostics and genuine parts to keep your vehicle performing flawlessly.",
    image: "/q-service.png", 
    className: "md:col-span-8 md:row-span-2 min-h-[400px] md:min-h-[600px]" 
  },
  { 
    id: 2, 
    title: "Toyota i-Connect", 
    subtitle: "Stay Connected", 
    desc: "Control your Toyota from your smartwatch or phone. Seamless connectivity, remote immobilization, and instant diagnostics at your fingertips.",
    image: "/i-connect.png", 
    className: "md:col-span-4 md:row-span-1 min-h-[300px]" 
  },
  { 
    id: 3, 
    title: "Driving School", 
    subtitle: "Master the Road", 
    desc: "World-class simulator training, comprehensive defensive driving curriculums, and expert instruction.",
    image: "/driving-school.png", 
    className: "md:col-span-4 md:row-span-1 min-h-[300px]" 
  },
  { 
    id: 4, 
    title: "T-Care Solutions", 
    subtitle: "Complete Peace of Mind", 
    desc: "Comprehensive warranty extensions, tailored maintenance packages, and 24/7 roadside assistance across India.",
    image: "/t-care.png", 
    className: "md:col-span-12 md:row-span-1 min-h-[350px] md:min-h-[400px]" 
  }
];

export default function Services() {
  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Cinematic Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#eb0a1e] font-bold text-[11px] tracking-[0.5em] uppercase mb-4"
            >
              Beyond the Drive
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-druk text-5xl md:text-7xl lg:text-8xl text-zinc-950 tracking-tighter uppercase leading-none"
            >
              Premium<br className="hidden md:block" /> Services
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:max-w-sm lg:max-w-md pb-2"
          >
            <p className="text-zinc-600 font-display font-medium text-base md:text-lg leading-relaxed border-l-2 border-[#eb0a1e] pl-6">
              Experience the pinnacle of automotive care, unmatched connectivity, and exclusive ownership benefits engineered to Toyota&apos;s exacting global standards.
            </p>
          </motion.div>
        </div>
        
        {/* High-End Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-4 md:gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className={`group flex flex-col overflow-hidden bg-zinc-950 border border-white/10 hover:border-white/30 rounded-sm cursor-pointer transition-colors duration-500 ${service.className}`}
            >
              {/* Image Header */}
              <div className="relative w-full flex-1 min-h-[250px] md:min-h-[350px] overflow-hidden">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority 
                  className="object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
                />
              </div>
              
              {/* Text Footer */}
              <div className="p-6 md:p-8 flex flex-col shrink-0 bg-zinc-950 border-t border-white/10">
                <h3 className="font-druk text-2xl md:text-3xl text-white uppercase tracking-tighter leading-none mb-3">
                  {service.title}
                </h3>
                <p className="text-zinc-400 font-sans font-light text-sm md:text-base leading-relaxed mb-6">
                  {service.desc}
                </p>
                
                {/* Explore Button */}
                <div className="flex items-center space-x-4 text-white">
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase border-b border-white/30 group-hover:border-[#eb0a1e] pb-1 transition-colors duration-300">
                    Explore {service.title}
                  </span>
                  <ArrowRight size={14} className="text-zinc-500 group-hover:text-[#eb0a1e] transform group-hover:translate-x-2 transition-all duration-300 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
