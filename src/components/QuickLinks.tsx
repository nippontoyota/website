"use client";

import { motion } from 'framer-motion';
import { Car, Tag, BookOpen, Repeat, ArrowUpRight } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';

export default function QuickLinks() {
  const { openModal } = useLeadStore();

  const links = [
    { label: 'TEST DRIVE', sub: 'Experience Toyota', Icon: Car, highlight: true, isModal: true },
    { label: 'EXCHANGE CAR', sub: 'Value Your Vehicle', Icon: Repeat, highlight: true, isModal: true },
    { label: 'PRICE LIST', sub: 'Latest Offers', Icon: Tag, highlight: false, isModal: true },
    { label: 'BROCHURE', sub: 'Model Details', Icon: BookOpen, highlight: false, isModal: true },
  ];

  return (
    <div className="w-full bg-[#f8f8f8] py-32 md:py-40 border-y border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href || "#"}
              onClick={(e: React.MouseEvent) => {
                if (link.isModal) {
                  e.preventDefault();
                  openModal();
                }
              }}
              className="group relative flex flex-col justify-between aspect-square p-6 md:p-8 bg-white border border-gray-100 hover:border-transparent shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Highlight Background Shift */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out
                ${link.highlight ? 'bg-[#eb0a1e]' : 'bg-zinc-900'}`} 
              />

              <div className="relative z-10 flex justify-between items-start">
                <div 
                  className={`transition-colors duration-500 ease-out
                  ${link.highlight ? 'text-[#eb0a1e] group-hover:text-white' : 'text-zinc-800 group-hover:text-white'}`}
                >
                  <link.Icon size={28} strokeWidth={1.5} />
                </div>
                <ArrowUpRight 
                  size={20} 
                  strokeWidth={2}
                  className="opacity-0 translate-y-3 -translate-x-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-white" 
                />
              </div>

              <div className="relative z-10 mt-auto">
                <h3 
                  className={`font-display text-[11px] md:text-[13px] font-bold tracking-widest uppercase mb-1.5 transition-colors duration-500 ease-out
                  ${link.highlight ? 'text-zinc-900 group-hover:text-white' : 'text-zinc-900 group-hover:text-white'}`}
                >
                  {link.label}
                </h3>
                <p 
                  className="text-[10px] md:text-[11px] font-medium tracking-wide text-gray-500 group-hover:text-white/70 transition-colors duration-500 ease-out"
                >
                  {link.sub}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
