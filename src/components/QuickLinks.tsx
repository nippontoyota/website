"use client";

import { motion } from 'framer-motion';
import { PhoneCall, Car, Tag, Smartphone, BookOpen, Repeat } from 'lucide-react';

export default function QuickLinks() {
  const links = [
    { label: 'CONTACT US', Icon: PhoneCall },
    { label: 'TEST DRIVE', Icon: Car },
    { label: 'PRICE LIST', Icon: Tag },
    { label: 'EBOOK', Icon: Smartphone },
    { label: 'BROCHURE', Icon: BookOpen },
    { label: 'EXCHANGE CAR', Icon: Repeat }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full bg-white relative z-10 py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div 
          className="flex flex-wrap justify-center gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {links.map((link, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex-1 min-w-[140px] max-w-[180px]"
            >
              <motion.div 
                className="w-full h-28 flex flex-col items-center justify-center cursor-pointer group"
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-3 text-[var(--toyota-red)] transition-all duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1">
                    <link.Icon size={28} strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-[10px] font-bold tracking-widest text-gray-400 text-center uppercase transition-colors duration-300 group-hover:text-[#111]">
                    {link.label}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
