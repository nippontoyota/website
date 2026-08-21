"use client";

import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';

export default function StickyWidgets() {
  return (
    <>
      {/* Floating Callback Button - Clean and Compact */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div 
          className="w-14 h-14 bg-[var(--toyota-red)] rounded-full flex flex-col items-center justify-center text-white shadow-lg cursor-pointer hover:shadow-xl hover:bg-[#c80000] transition-colors border border-white/20"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <PhoneCall size={18} className="mb-0.5" />
          <span className="text-[8px] font-bold uppercase tracking-wider">Call</span>
        </motion.div>
      </div>
    </>
  );
}
