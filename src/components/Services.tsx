"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  { 
    id: 1, 
    title: "Toyota Q Service", 
    subtitle: "Unmatched Quality & Care", 
    image: "/q-service.jpg", 
    className: "md:col-span-8 md:row-span-2 min-h-[400px] md:min-h-[600px]" 
  },
  { 
    id: 2, 
    title: "Driving School", 
    subtitle: "Master the Road", 
    image: "/driving-school.jpg", 
    className: "md:col-span-4 md:row-span-1 min-h-[300px]" 
  },
  { 
    id: 3, 
    title: "Toyota iConnect", 
    subtitle: "Stay Connected", 
    image: "/iconnect.jpg", 
    className: "md:col-span-4 md:row-span-1 min-h-[300px]" 
  },
  { 
    id: 4, 
    title: "What's New", 
    subtitle: "Latest Announcements", 
    image: "/whats-new.jpg", 
    className: "md:col-span-12 md:row-span-1 min-h-[350px] md:min-h-[400px]" 
  }
];

export default function Services() {
  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Cinematic Section Header */}
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#eb0a1e] font-bold text-[10px] tracking-[0.4em] uppercase mb-4"
          >
            Beyond the Drive
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-druk text-5xl md:text-7xl text-zinc-950 tracking-tighter uppercase leading-none mb-6"
          >
            Premium Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 font-display font-light text-base md:text-lg max-w-xl leading-relaxed"
          >
            Experience the pinnacle of automotive care and connectivity, engineered to Toyota's exacting global standards.
          </motion.p>
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
              className={`group relative overflow-hidden bg-zinc-900 rounded-sm cursor-pointer ${service.className}`}
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.25,1,0.5,1] opacity-70 group-hover:opacity-100" 
                />
              </div>
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-[0.8s] ease-[0.2,0.9,0.4,1]">
                  
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#eb0a1e] mb-3 transform origin-left transition-all duration-700">
                    {service.subtitle}
                  </p>
                  
                  <h3 className="font-druk text-3xl md:text-5xl text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-lg">
                    {service.title}
                  </h3>
                  
                  {/* Hover Reveal Button */}
                  <div className="flex items-center space-x-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase border-b border-white/30 pb-1">
                      Explore Service
                    </span>
                    <ArrowRight size={14} className="transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-700 delay-100 ease-out" />
                  </div>

                </div>
              </div>

              {/* Ambient Hover Border/Glow */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
