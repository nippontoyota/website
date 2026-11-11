"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Menu, X, Car } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState<{
    enabled: boolean;
    text: string;
    badge?: string;
    link?: string;
  } | null>(null);
  const { openModal } = useLeadStore();

  const isHome = pathname === '/';

  // Sync with live marketing campaign announcement
  useEffect(() => {
    fetch('/api/public/store')
      .then((res) => res.json())
      .then((data) => {
        if (data?.campaigns?.announcementBar) {
          setAnnouncement(data.campaigns.announcementBar);
        }
      })
      .catch((err) => console.log('Announcement sync error:', err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center text-[11px] font-display font-bold tracking-[0.2em] uppercase transition-colors py-2 ${
      isActive ? 'text-[#eb0a1e]' : 'text-white/80 hover:text-white'
    }`;
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
    <header
      className={`w-full z-50 transition-all duration-300 ${
        isHome
          ? `fixed top-0 left-0 right-0 ${
              isScrolled
                ? 'bg-[#050505]/95 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] py-3 sm:py-3.5'
                : 'bg-transparent py-4 sm:py-5'
            }`
          : 'sticky top-0 bg-[#050505]/95 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] py-3.5 sm:py-4'
      } ${className}`}
    >
      {announcement?.enabled && (
        <div className="w-full bg-[#eb0a1e] text-white py-1 px-4 mb-2 text-center text-[10px] font-display font-medium tracking-wider flex items-center justify-center gap-2 shadow-sm">
          {announcement.badge && (
            <span className="px-1.5 py-0.5 bg-black/30 font-bold uppercase text-[8px] tracking-widest">
              {announcement.badge}
            </span>
          )}
          <span>{announcement.text}</span>
          {announcement.link && (
            <Link href={announcement.link} className="underline font-bold ml-1 hover:text-white/80">
              Details →
            </Link>
          )}
        </div>
      )}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        {/* Left: Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/nippon-toyota.png"
            alt="Toyota Logo"
            width={180}
            height={36}
            className="object-contain h-7 sm:h-8 w-auto brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
            style={{ width: "auto" }}
            priority
          />
          <span className="font-display font-black text-base sm:text-lg tracking-tight text-white group-hover:text-white transition-colors">
            NIPPON TOYOTA
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
          {/* Service Dropdown */}
          <div className="relative group/service py-2">
            <Link href="/service" className={getLinkClass('/service')}>
              SERVICE
              <ChevronDown
                size={13}
                strokeWidth={2.5}
                className="ml-1 text-white/50 group-hover/service:text-[#eb0a1e] transition-transform duration-300 group-hover/service:-rotate-180"
              />
            </Link>

            <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover/service:opacity-100 group-hover/service:pointer-events-auto transition-all duration-200 z-50 transform translate-y-1 group-hover/service:translate-y-0">
              <div className="bg-[#0c0c0c]/98 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-2 w-[220px] border border-white/15 flex flex-col font-sans">
                <Link
                  href="/service"
                  className="w-full px-4 py-2.5 text-xs font-display font-semibold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center"
                >
                  Service Corner
                </Link>
                <Link
                  href="/i-connect"
                  className="w-full px-4 py-2.5 text-xs font-display font-semibold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center"
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

          {/* More Dropdown */}
          <div className="relative group/more py-2">
            <div className={`cursor-pointer ${getLinkClass('/more')}`}>
              MORE
              <ChevronDown
                size={13}
                strokeWidth={2.5}
                className="ml-1 text-white/50 group-hover/more:text-[#eb0a1e] transition-transform duration-300 group-hover/more:-rotate-180"
              />
            </div>

            <div className="absolute top-full right-0 pt-2 opacity-0 pointer-events-none group-hover/more:opacity-100 group-hover/more:pointer-events-auto transition-all duration-200 z-50 transform translate-y-1 group-hover/more:translate-y-0">
              <div className="bg-[#0c0c0c]/98 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-2 w-[240px] border border-white/15 flex flex-col font-sans">
                {moreDropdownItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="w-full px-4 py-2 text-xs font-display font-semibold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center group/item"
                  >
                    <span>{item.label}</span>
                    {item.hasSub && (
                      <ChevronRight size={13} className="text-white/40 group-hover/item:text-white transition-colors" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right: Quick Action CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal('', 'TEST_DRIVE')}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#eb0a1e] hover:bg-[#c90013] text-white text-[10px] font-display font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(235,10,30,0.35)]"
          >
            <Car size={13} strokeWidth={2} />
            <span>TEST DRIVE</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors relative z-[60]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.75} /> : <Menu size={24} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Luxury Dark Theme) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl h-[100dvh] w-full flex flex-col pt-24 pb-8 px-8 overflow-y-auto border-l border-white/10 text-white"
          >
            <nav className="flex flex-col space-y-5 text-base font-display font-bold tracking-[0.2em] uppercase">
              <Link
                href="/service"
                onClick={() => setIsMobileMenuOpen(false)}
                className={getLinkClass('/service')}
              >
                SERVICE
              </Link>
              <Link
                href="/t-care"
                onClick={() => setIsMobileMenuOpen(false)}
                className={getLinkClass('/t-care')}
              >
                T-CARE
              </Link>
              <Link
                href="/used-cars"
                onClick={() => setIsMobileMenuOpen(false)}
                className={getLinkClass('/used-cars')}
              >
                USED CARS
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={getLinkClass('/about')}
              >
                ABOUT US
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={getLinkClass('/contact')}
              >
                CONTACT US
              </Link>

              <div className="pt-6 mt-4 border-t border-white/10">
                <span className="text-white/40 text-[10px] font-bold tracking-[0.25em] uppercase block mb-3 font-display">
                  MORE OPTIONS
                </span>
                <div className="flex flex-col space-y-3 font-sans text-sm tracking-normal normal-case">
                  {moreDropdownItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white/70 hover:text-white transition-colors flex items-center justify-between py-1"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={14} className="text-white/30" />
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            <div className="mt-auto pt-8">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal('', 'TEST_DRIVE');
                }}
                className="w-full flex justify-center items-center gap-2 py-4 bg-[#eb0a1e] hover:bg-[#c90013] text-white font-display font-bold tracking-[0.2em] text-xs uppercase transition-colors shadow-lg"
              >
                <Car size={16} />
                BOOK TEST DRIVE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
