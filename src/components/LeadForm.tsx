"use client";

import { motion } from 'framer-motion';
import LeadCaptureForm from './LeadCaptureForm';

export default function LeadForm() {
  return (
    <section className="bg-[#050505] py-16 md:py-24 relative border-t border-white/10" id="lead-form">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle_at_right,rgba(235,10,30,0.05),transparent_70%)] pointer-events-none mix-blend-screen" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Typography Side */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            
          >
            
            <h2 className="font-druk text-4xl md:text-6xl text-white tracking-tighter uppercase leading-none mb-4">
              Get in Touch
            </h2>
            <p className="text-zinc-400 font-display font-light text-sm md:text-base max-w-sm leading-relaxed">
              Connect with our Toyota specialists for test drives, pricing, or expert advice.
            </p>
          </motion.div>
        </div>

        {/* Right Form Side */}
        <div className="w-full lg:w-1/2">
          <LeadCaptureForm standalone />
        </div>
      </div>
    </section>
  );
}
