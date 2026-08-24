"use client";

import { motion } from 'framer-motion';
import { Car, Tag, BookOpen, Repeat, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';

export default function QuickLinks() {
  const { openModal } = useLeadStore();

  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-druk text-5xl md:text-7xl text-zinc-950 tracking-tighter uppercase leading-none">
            Take the <br className="hidden md:block" /> Next Step
          </h2>
          <p className="text-zinc-500 text-sm md:text-base font-medium max-w-sm">
            Whether you&apos;re ready to drive or just exploring, we make upgrading to a Toyota seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* 1. TEST DRIVE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            
            onClick={() => openModal('', 'TEST_DRIVE')}
            className="lg:col-span-7 group relative bg-zinc-950 text-white overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-500 p-8 md:p-12 flex flex-col justify-between min-h-[400px]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#eb0a1e]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-[#eb0a1e]/40 transition-colors duration-700" />
            
            <div className="relative z-10 flex flex-col items-start">
              <div className="bg-[#eb0a1e] p-4 rounded-full mb-8 group-hover:-rotate-12 transition-transform duration-500">
                <Car size={32} strokeWidth={2} className="text-white" />
              </div>
              <h3 className="font-druk text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-none">
                Book a VIP <br/>Test Drive
              </h3>
              <p className="text-zinc-400 font-medium mb-8 max-w-md text-sm md:text-base leading-relaxed">
                Skip the queue. Feel the performance, comfort, and safety of your dream Toyota first-hand. Our specialists will have it prepped exclusively for you.
              </p>
              
              <ul className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-10">
                <li className="flex items-center text-xs font-bold tracking-widest text-white uppercase">
                  <Zap size={16} className="mr-2 text-[#eb0a1e]" /> Priority Scheduling
                </li>
                <li className="flex items-center text-xs font-bold tracking-widest text-white uppercase">
                  <ShieldCheck size={16} className="mr-2 text-[#eb0a1e]" /> Expert Walkthrough
                </li>
              </ul>
            </div>

            <div className="relative z-10 inline-flex items-center text-[#eb0a1e] font-bold text-xs md:text-sm tracking-[0.2em] uppercase mt-auto">
              Schedule Now
              <ArrowRight size={20} className="ml-3 transform group-hover:translate-x-3 transition-transform duration-500" />
            </div>
          </motion.div>

          {/* RIGHT COLUMN WRAPPER */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* 2. EXCHANGE CAR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              
              transition={{ delay: 0.1 }}
              onClick={() => openModal('', 'EXCHANGE')}
              className="group relative bg-[#eb0a1e] text-white overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-500 p-8 flex-1 flex flex-col justify-between"
            >
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />

              <div className="relative z-10 mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/10 rounded-full text-white group-hover:bg-white group-hover:text-[#eb0a1e] transition-colors duration-500">
                    <Repeat size={28} strokeWidth={2} />
                  </div>
                  <span className="bg-black text-white text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase rounded-sm">Best Value</span>
                </div>
                <h3 className="font-druk text-3xl md:text-4xl tracking-tight uppercase mb-3 leading-none">
                  Exchange <br/>& Upgrade
                </h3>
                <p className="text-white/80 font-medium text-sm leading-relaxed max-w-sm">
                  Turn your old car into a new Toyota. Get a transparent, top-market valuation in under 30 minutes with exclusive bonuses.
                </p>
              </div>

              <div className="relative z-10 flex items-center text-white font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                Get Valuation
                <ArrowRight size={20} className="ml-3 transform group-hover:translate-x-3 transition-transform duration-500" />
              </div>
            </motion.div>

            {/* BOTTOM ROW: PRICE LIST & BROCHURE */}
            <div className="grid grid-cols-2 gap-4 h-40 md:h-48">
              
              {/* 3. PRICE LIST */}
              <motion.a
                href="https://www.nippon-toyota.com/pricelist/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                
                transition={{ delay: 0.2 }}
                className="group bg-zinc-100 hover:bg-zinc-950 cursor-pointer p-6 flex flex-col justify-between transition-colors duration-500 block"
              >
                <div className="text-zinc-400 group-hover:text-[#eb0a1e] transition-colors duration-500">
                  <Tag size={28} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-druk text-xl md:text-2xl tracking-wider text-zinc-950 group-hover:text-white uppercase mb-1 transition-colors duration-500">Price List</h4>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 font-medium transition-colors duration-500">Latest Offers & EMI</p>
                </div>
              </motion.a>

              {/* 4. BROCHURE */}
              <motion.button
                onClick={() => openModal('', 'BROCHURE')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                
                transition={{ delay: 0.3 }}
                className="group bg-zinc-100 text-left hover:bg-zinc-950 cursor-pointer p-6 flex flex-col justify-between transition-colors duration-500 w-full"
              >
                <div className="text-zinc-400 group-hover:text-[#eb0a1e] transition-colors duration-500">
                  <BookOpen size={28} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-druk text-xl md:text-2xl tracking-wider text-zinc-950 group-hover:text-white uppercase mb-1 transition-colors duration-500">Brochure</h4>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 font-medium transition-colors duration-500">Model Details</p>
                </div>
              </motion.button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
