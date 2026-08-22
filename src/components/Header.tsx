"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Menu } from 'lucide-react';

export default function Header() {
  const serviceLinks = [
    { label: "Service Corner", href: "/q-service" },
    { label: "Toyota i-Connect", href: "/i-connect" },
  ];

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
                style={{ width: "auto" }}
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
          <div className="relative group py-2 -my-2">
            <span className="flex items-center cursor-default group-hover:text-[var(--toyota-red)] transition-colors">
              SERVICE <ChevronDown size={12} strokeWidth={3} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
            </span>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
              <div className="bg-white shadow-lg border border-gray-100 min-w-[180px] py-2">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-5 py-2.5 text-[11px] font-bold text-[#333] tracking-wider hover:text-[var(--toyota-red)] hover:bg-gray-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
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
            className="hidden md:flex items-center text-xs font-bold text-[#333] mr-6 border-r border-gray-300 pr-6 h-8 hover:text-[var(--toyota-red)] transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Search size={16} strokeWidth={3} className="mr-2" />
            SEARCH
          </motion.button>
          
          <div className="flex items-center gap-4">
            <div className="text-[var(--toyota-red)] font-bold text-2xl md:text-3xl tracking-tighter">
              TOYOTA
            </div>
            
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-1 text-gray-800 hover:text-[var(--toyota-red)] transition-colors">
              <Menu size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
