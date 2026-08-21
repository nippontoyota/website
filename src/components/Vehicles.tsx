"use client";

import { motion } from 'framer-motion';

export default function Vehicles() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-center mb-16 text-[#111] tracking-tight">
            Discover the Toyota range
          </h2>
        </motion.div>
        
        <motion.div 
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="/toyota-cars.png" 
            alt="Toyota Range" 
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
