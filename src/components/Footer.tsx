"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronUp, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-white font-sans relative border-t-4 border-[var(--toyota-red)]">
      {/* Back to top button */}
      <motion.div 
        className="absolute -top-5 right-8 md:right-12 w-10 h-10 bg-[var(--toyota-red)] flex items-center justify-center cursor-pointer shadow-lg rounded-sm hover:bg-[#c80000] transition-colors z-20"
        onClick={scrollToTop}
        whileHover={{ y: -2 }}
        whileTap={{ y: 2 }}
      >
        <ChevronUp size={24} className="text-white" />
      </motion.div>

      {/* Top Nav Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[11px] font-bold tracking-widest text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="text-white/20 hidden md:inline">|</span>
            <Link href="/finance" className="hover:text-white transition-colors">FINANCE</Link>
            <span className="text-white/20 hidden md:inline">|</span>
            <Link href="/events" className="hover:text-white transition-colors">EVENTS</Link>
            <span className="text-white/20 hidden md:inline">|</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">DISCLAIMER</Link>
            <span className="text-white/20 hidden md:inline">|</span>
            <Link href="/driving-school" className="hover:text-white transition-colors">DRIVING SCHOOL</Link>
          </div>
          <div className="flex space-x-5 text-gray-400 items-center">
            <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4.2V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200">
              {/* X / Twitter logo */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-10 md:gap-4">
          
          {/* Column 1 */}
          <div className="w-full sm:w-1/3 md:w-[15%]">
            <h4 className="font-display text-[13px] font-bold mb-5 tracking-wide text-white">ABOUT US</h4>
            <ul className="space-y-3 text-[11px] text-gray-400 font-semibold tracking-wide">
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">MISSION</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">DEALER PRINCIPAL</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">CONTACT US</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">CONTACT PERSON</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">SPECIAL FEATURES</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">FACILITIES</Link></li>
            </ul>
            <h4 className="font-display text-[13px] font-bold mt-8 mb-2 tracking-wide text-white cursor-pointer hover:text-[var(--toyota-red)] transition-colors">PRICE LIST</h4>
          </div>

          {/* Column 2 */}
          <div className="w-full sm:w-1/3 md:w-[15%]">
            <h4 className="font-display text-[13px] font-bold mb-5 tracking-wide text-white">PRODUCTS</h4>
            <ul className="space-y-3 text-[11px] text-gray-400 font-semibold tracking-wide">
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">GLANZA</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">URBAN CRUISER</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">HYRYDER</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">EBELLA</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">INNOVA CRYSTA</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">INNOVA HYCROSS</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">HILUX</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">FORTUNER</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">LEGENDER</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">NEW CAMRY HYBRID</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">ELECTRIC VEHICLE</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">VELLFIRE</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full sm:w-1/3 md:w-[15%]">
            <h4 className="font-display text-[13px] font-bold mb-5 tracking-wide text-white">FINANCE</h4>
            <ul className="space-y-3 text-[11px] text-gray-400 font-semibold tracking-wide mb-8">
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">APPLY FOR LOAN</Link></li>
            </ul>
            <h4 className="font-display text-[13px] font-bold mb-5 tracking-wide text-white">INSURANCE</h4>
            <ul className="space-y-3 text-[11px] text-gray-400 font-semibold tracking-wide">
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">APPLY FOR INSURANCE</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="w-full sm:w-1/2 md:w-[15%]">
            <h4 className="font-display text-[13px] font-bold mb-5 tracking-wide text-white">ONLINE REQUEST</h4>
            <ul className="space-y-3 text-[11px] text-gray-400 font-semibold tracking-wide mb-8">
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">TEST DRIVE</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">BROCHURE</Link></li>
            </ul>
            <h4 className="font-display text-[13px] font-bold mb-5 tracking-wide text-white cursor-pointer hover:text-[var(--toyota-red)] transition-colors">Q SERVICE</h4>
          </div>

          {/* Column 5 */}
          <div className="w-full sm:w-1/2 md:w-[15%]">
            <h4 className="font-display text-[13px] font-bold mb-5 tracking-wide text-white">U-TRUST</h4>
            <ul className="space-y-3 text-[11px] text-gray-400 font-semibold tracking-wide mb-8">
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">BUY NOW</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">SELL CAR</Link></li>
              <li><Link href="#" className="hover:text-[var(--toyota-red)] transition-colors">EXCHANGE CAR</Link></li>
            </ul>
            <h4 className="font-display text-[13px] font-bold mb-6 tracking-wide text-white cursor-pointer hover:text-[var(--toyota-red)] transition-colors">EVENTS</h4>
            <h4 className="font-display text-[13px] font-bold tracking-wide text-white cursor-pointer hover:text-[var(--toyota-red)] transition-colors">FEEDBACK</h4>
          </div>

          {/* Column 6: Contact Info */}
          <div className="w-full md:w-[25%] md:pl-8 md:border-l border-white/10 relative mt-8 md:mt-0">
            <h4 className="font-display text-[15px] font-bold mb-6 tracking-wide text-white">NIPPON TOYOTA</h4>
            
            <div className="text-[12px] text-gray-400 space-y-6 tracking-wide">
              {/* Address */}
              <div className="flex items-start group">
                <MapPin size={18} className="text-[var(--toyota-red)] mr-4 mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  <strong className="text-gray-200 font-semibold block mb-1">Nippon Motor Corporation Pvt. Ltd.,</strong>
                  X / 314 K, NH 47 Byepass,<br/>
                  Nettoor P.O., Cochin-682304
                </p>
              </div>
              
              {/* Phones */}
              <div className="flex items-start group">
                <Phone size={18} className="text-[var(--toyota-red)] mr-4 mt-0.5 shrink-0" />
                <div className="flex flex-col space-y-2.5">
                  <span className="hover:text-white transition-colors cursor-pointer">+91 48471 70000 <span className="text-gray-600 mx-1">|</span> +91 97447 12345</span>
                  <span className="hover:text-white transition-colors cursor-pointer">+91 48471 70000 <span className="text-gray-600 mx-1">|</span> +91 97447 12345</span>
                  <span className="hover:text-white transition-colors cursor-pointer">+91 48471 70000</span>
                </div>
              </div>
            </div>
            
            {/* Minimal Slider arrows for locations */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#2a2a2a] rounded-full hidden md:flex items-center justify-center cursor-pointer hover:bg-[var(--toyota-red)] transition-colors text-gray-400 hover:text-white shadow-md">
              <ChevronLeft size={14} />
            </div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#2a2a2a] rounded-full hidden md:flex items-center justify-center cursor-pointer hover:bg-[var(--toyota-red)] transition-colors text-gray-400 hover:text-white shadow-md">
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 bg-[#111]">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-center items-center text-[10px] text-gray-500">
          <div className="flex items-center">
            <span className="text-white font-display font-bold text-xl tracking-tighter">TOYOTA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
