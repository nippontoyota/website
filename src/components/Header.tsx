"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronRight, Menu } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const base = "flex items-center transition-colors group";
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
      className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center px-6 py-4 mx-auto w-full">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image 
                src="/nippon-toyota.png" 
                alt="Toyota Logo" 
                width={200} 
                height={40} 
                className="object-contain h-8 w-auto"
                style={{ width: "auto" }}
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Middle: Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-[11px] font-display font-bold text-[#222] tracking-widest">
          <Link href="/showroom" className={getLinkClass('/showroom')}>
            SHOWROOM <ChevronDown size={14} strokeWidth={2.5} className="ml-1 text-gray-500 group-hover:text-[var(--toyota-red)] transition-transform duration-300 group-hover:-rotate-180" />
          </Link>
          <Link href="/virtual-showroom" className={getLinkClass('/virtual-showroom')}>
            VIRTUAL SHOWROOM
          </Link>
          <Link href="/service" className={getLinkClass('/service')}>
            SERVICE <ChevronDown size={14} strokeWidth={2.5} className="ml-1 text-gray-500 group-hover:text-[var(--toyota-red)] transition-transform duration-300 group-hover:-rotate-180" />
          </Link>
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
              <div className="bg-white shadow-xl py-2 w-[240px] rounded-b-md border-t-[3px] border-[var(--toyota-red)] flex flex-col items-start font-sans normal-case tracking-normal">
                {moreDropdownItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.href} 
                    className="w-full px-6 py-2.5 text-[15px] font-medium text-gray-800 hover:text-[var(--toyota-red)] hover:bg-gray-50 transition-colors flex justify-between items-center"
                  >
                    {item.label}
                    {item.hasSub && <ChevronRight size={14} className="text-gray-400" />}
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
          <button className="lg:hidden p-1 ml-4 text-gray-800 hover:text-[var(--toyota-red)] transition-colors">
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
