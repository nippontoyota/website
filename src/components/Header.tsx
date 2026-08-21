"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <motion.header 
      className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center px-4 py-2 mx-auto max-w-[1400px]">
        {/* Left: Nippon Toyota Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image 
                src="/nippon-toyota.png" 
                alt="Nippon Toyota Logo" 
                width={200} 
                height={40} 
                className="object-contain h-10 w-auto"
              />
            </motion.div>
          </Link>
        </div>

        {/* Middle: Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-bold text-[#333] tracking-wider">
          <Link href="/showroom" className="flex items-center hover:text-[var(--toyota-red)] transition-colors group">
            SHOWROOM <ChevronDown size={12} strokeWidth={3} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
          </Link>
          <Link href="/virtual-showroom" className="hover:text-[var(--toyota-red)] transition-colors relative group">
            VIRTUAL SHOWROOM
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--toyota-red)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/service" className="flex items-center hover:text-[var(--toyota-red)] transition-colors group">
            SERVICE <ChevronDown size={12} strokeWidth={3} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
          </Link>
          <Link href="/t-care" className="hover:text-[var(--toyota-red)] transition-colors relative group">
            T-CARE
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--toyota-red)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/used-cars" className="hover:text-[var(--toyota-red)] transition-colors relative group">
            USED CARS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--toyota-red)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="hover:text-[var(--toyota-red)] transition-colors relative group">
            ABOUT US
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--toyota-red)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="hover:text-[var(--toyota-red)] transition-colors relative group">
            CONTACT US
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--toyota-red)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/more" className="flex items-center hover:text-[var(--toyota-red)] transition-colors group">
            MORE <ChevronDown size={12} strokeWidth={3} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
          </Link>
        </nav>

        {/* Right: Search and Toyota Logo */}
        <div className="flex items-center">
          <motion.button 
            className="flex items-center text-xs font-bold text-[#333] mr-6 border-r border-gray-300 pr-6 h-8 hover:text-[var(--toyota-red)] transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Search size={16} strokeWidth={3} className="mr-2" />
            SEARCH
          </motion.button>
          <div className="text-[var(--toyota-red)] font-bold text-3xl tracking-tighter">
            TOYOTA
          </div>
        </div>
      </div>
    </motion.header>
  );
}
