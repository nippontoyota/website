"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

export default function Header({ theme = "light", className = "" }: { theme?: "light" | "transparent", className?: string }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const base = `flex items-center transition-colors group ${theme === "transparent" ? "text-white/80" : ""}`;
    const isActive = pathname === path;
    return `${base} ${isActive ? 'text-[var(--toyota-red)]' : 'hover:text-[var(--toyota-red)]'}`;
  };

  const moreDropdownItems = [
    { label: 'Apply for Loan', href: '/loan' },
    { label: 'Apply for Insurance', href: '/insurance' },
    { label: 'Promotions', href: '/promotions', hasSub: true },
    { label: 'Whats New', href: '/whats-new' },
    { label: 'Feedback', href: '/feedback' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Events', href: '/events' },
    { label: 'Driving School', href: '/driving-school' },
    { label: 'Certified Used Cars', href: '/used-cars' },
    { label: 'Careers', href: '/careers' },
    { label: 'Toyota India', href: '/toyota-india' },
  ];

  return (
    <motion.header 
      className={`w-full z-50 transition-colors duration-300 ${theme === "transparent" ? "absolute top-0 bg-gradient-to-b from-black/80 to-transparent border-b border-white/10" : "sticky top-0 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"} ${className}`}
      
    >
      <div className="flex justify-between items-center px-6 py-4 mx-auto w-full">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <Image 
                src="/nippon-toyota.png" 
                alt="Toyota Logo" 
                width={200} 
                height={40} 
                className={`object-contain h-8 w-auto ${theme === "transparent" ? "brightness-0 invert" : ""}`}
                style={{ width: "auto" }}
                priority
              />
              <span className={`ml-3 font-display font-black text-lg tracking-tight ${theme === "transparent" ? "text-white" : "text-black"}`}>NIPPON TOYOTA</span>
            </div>
          </Link>
        </div>

        {/* Middle: Navigation */}
        <nav className={`hidden lg:flex items-center space-x-8 xl:space-x-10 text-[11px] font-display font-bold ${theme === "transparent" ? "text-white/80" : "text-[#222]"} tracking-widest`}>
          <Link href="/virtual-showroom" className={getLinkClass('/virtual-showroom')}>
            VIRTUAL SHOWROOM
          </Link>
          <div className="relative group/service py-2">
            <Link href="/service" className={getLinkClass('/service')}>
              SERVICE <ChevronDown size={14} strokeWidth={2.5} className="ml-1 text-gray-500 group-hover/service:text-[var(--toyota-red)] transition-transform duration-300 group-hover/service:-rotate-180" />
            </Link>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/service:opacity-100 group-hover/service:pointer-events-auto transition-all duration-300 z-50 transform translate-y-2 group-hover/service:translate-y-0">
              <div className="bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 w-[240px] rounded-2xl border border-gray-100 flex flex-col font-sans normal-case tracking-normal">
                <Link 
                  href="/service" 
                  className="w-full px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 flex justify-between items-center"
                >
                  Service Corner
                </Link>
                <Link 
                  href="/i-connect" 
                  className="w-full px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 flex justify-between items-center"
                >
                  Toyota i-Connect
                </Link>
              </div>
            </div>
          </div>
          <Link href="/t-care" className={getLinkClass('/t-care')}>
            T-CARE
          </Link>
          <Link href="/used-cars" className={getLinkClass('/used-cars')}>
            USED CARS
          </Link>
          <Link href="/about" className={getLinkClass('/about')}>
            ABOUT US
          </Link>
          <Link href="/contact" className={getLinkClass('/contact')}>
            CONTACT US
          </Link>
          
          {/* MORE Dropdown */}
          <div className="relative group/more py-2">
            <div className={`cursor-pointer ${getLinkClass('/more')}`}>
              MORE <ChevronDown size={14} strokeWidth={2.5} className="ml-1 text-gray-500 group-hover/more:text-[var(--toyota-red)] transition-transform duration-300 group-hover/more:-rotate-180" />
            </div>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/more:opacity-100 group-hover/more:pointer-events-auto transition-all duration-300 z-50 transform translate-y-2 group-hover/more:translate-y-0">
              <div className="bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 w-[240px] rounded-2xl border border-gray-100 flex flex-col font-sans normal-case tracking-normal">
                {moreDropdownItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.href} 
                    className="w-full px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 flex justify-between items-center group/item"
                  >
                    {item.label}
                    {item.hasSub && <ChevronRight size={14} className="text-gray-400 group-hover/item:text-black transition-colors" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right: Search */}
        <div className="flex items-center">
          <div className="hidden lg:block h-6 w-px bg-gray-300 mr-6"></div>
          <motion.button 
            className="hidden md:flex items-center text-[11px] font-bold text-[var(--toyota-red)] transition-colors tracking-widest hover:opacity-80"
            whileHover={{ scale: 1.05 }}
          >
            <Search size={18} strokeWidth={2.5} className="mr-2" />
            SEARCH
          </motion.button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 ml-4 text-gray-800 hover:text-[var(--toyota-red)] transition-colors relative z-[60]"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-white h-[100dvh] w-full flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 text-lg font-display font-bold text-[#222] tracking-widest">
              <Link href="/virtual-showroom" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/virtual-showroom')}>
                VIRTUAL SHOWROOM
              </Link>
              <Link href="/service" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/service')}>
                SERVICE
              </Link>
              <Link href="/t-care" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/t-care')}>
                T-CARE
              </Link>
              <Link href="/used-cars" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/used-cars')}>
                USED CARS
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/about')}>
                ABOUT US
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/contact')}>
                CONTACT US
              </Link>
              
              <div className="pt-6 mt-6 border-t border-gray-100">
                <span className="text-gray-400 text-xs tracking-[0.2em]">MORE OPTIONS</span>
                <div className="flex flex-col space-y-4 mt-4 font-sans font-medium text-base tracking-normal">
                  {moreDropdownItems.map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-[var(--toyota-red)] transition-colors flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronRight size={16} className="text-gray-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
            
            <div className="mt-auto pt-8">
              <button 
                className="w-full flex justify-center items-center py-4 bg-gray-50 text-[var(--toyota-red)] font-bold tracking-widest text-sm rounded-xl"
              >
                <Search size={18} strokeWidth={2.5} className="mr-2" />
                SEARCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
