"use client";

import { motion } from 'framer-motion';
import { MapPin, Car, Tag, CreditCard, Map, Maximize, PhoneCall } from 'lucide-react';
import { useState } from 'react';

export default function StickyWidgets() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  const sidebarIcons = [
    { Icon: MapPin, label: 'Location' },
    { Icon: Car, label: 'Test Drive' },
    { Icon: Tag, label: 'Price List' },
    { Icon: CreditCard, label: 'Book' },
    { Icon: Map, label: 'Map' },
    { Icon: Maximize, label: 'Expand' },
  ];

  return (
    <>
      {/* Right Sidebar */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-sm text-white flex flex-col z-50 rounded-l-xl shadow-2xl overflow-hidden border border-gray-800 border-r-0">
        {sidebarIcons.map((item, idx) => (
          <div 
            key={idx} 
            className="w-14 h-14 flex items-center justify-center border-b border-gray-800/50 last:border-b-0 hover:bg-[var(--toyota-red)] cursor-pointer transition-all duration-300 relative group"
            onMouseEnter={() => setHoveredIcon(idx)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <item.Icon size={22} className="group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            
            {/* Tooltip */}
            <div className={`absolute right-full mr-2 px-3 py-1.5 bg-[var(--toyota-red)] text-white text-xs font-bold rounded shadow-lg whitespace-nowrap transition-all duration-300 origin-right ${hoveredIcon === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              {item.label}
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-[var(--toyota-red)]"></div>
            </div>
          </div>
        ))}
      </div>

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
