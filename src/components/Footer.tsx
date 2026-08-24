"use client";

import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';

export default function Footer() {
  const { openModal } = useLeadStore();

  return (
    <footer className="bg-zinc-900 text-white relative z-20 uppercase">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-24">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16">
          
          {/* Column 1 */}
          <div className="col-span-1">
            <h4 className="font-display text-[11px] font-bold mb-6 tracking-widest text-zinc-400">ABOUT US</h4>
            <ul className="space-y-4 text-[11px] text-gray-300 font-bold tracking-widest">
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">MISSION</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">DEALER PRINCIPAL</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">CONTACT US</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">CONTACT PERSON</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">FACILITIES</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="col-span-1">
            <h4 className="font-display text-[11px] font-bold mb-6 tracking-widest text-zinc-400">PRODUCTS</h4>
            <ul className="space-y-4 text-[11px] text-gray-300 font-bold tracking-widest">
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">GLANZA</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">URBAN CRUISER</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">HYRYDER</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">INNOVA CRYSTA</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">INNOVA HYCROSS</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">HILUX</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">FORTUNER</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">LEGENDER</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">CAMRY HYBRID</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">VELLFIRE</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-span-1">
            <h4 className="font-display text-[11px] font-bold mb-6 tracking-widest text-zinc-400">SERVICES</h4>
            <ul className="space-y-4 text-[11px] text-gray-300 font-bold tracking-widest mb-10">
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">APPLY FOR LOAN</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">APPLY FOR INSURANCE</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">Q SERVICE</Link></li>
            </ul>
            <h4 className="font-display text-[11px] font-bold mb-6 tracking-widest text-zinc-400">ONLINE REQUEST</h4>
            <ul className="space-y-4 text-[11px] text-gray-300 font-bold tracking-widest">
              <li><button onClick={() => openModal('', 'TEST_DRIVE')} className="hover:text-[#eb0a1e] transition-colors">TEST DRIVE</button></li>
              <li><button onClick={() => openModal('', 'BROCHURE')} className="hover:text-[#eb0a1e] transition-colors">BROCHURE</button></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-span-1">
            <h4 className="font-display text-[11px] font-bold mb-6 tracking-widest text-zinc-400">U-TRUST</h4>
            <ul className="space-y-4 text-[11px] text-gray-300 font-bold tracking-widest mb-10">
              <li><Link href="/used-cars" className="hover:text-[#eb0a1e] transition-colors">BUY NOW</Link></li>
              <li><button onClick={() => openModal('', 'EXCHANGE')} className="hover:text-[#eb0a1e] transition-colors">SELL CAR</button></li>
              <li><button onClick={() => openModal('', 'EXCHANGE')} className="hover:text-[#eb0a1e] transition-colors">EXCHANGE CAR</button></li>
            </ul>
            <ul className="space-y-4 text-[11px] text-gray-300 font-bold tracking-widest">
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">PRICE LIST</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">EVENTS</Link></li>
              <li><Link href="#" className="hover:text-[#eb0a1e] transition-colors">FEEDBACK</Link></li>
            </ul>
          </div>

          {/* Column 5 & 6: Contact Info & Socials */}
          <div className="col-span-2 lg:pl-12 lg:border-l border-zinc-800 flex flex-col justify-between">
            <div>
              <h4 className="font-display text-2xl font-bold mb-8 tracking-tight text-white">NIPPON TOYOTA</h4>
              
              <div className="space-y-6 text-xs text-gray-400 font-bold tracking-widest leading-relaxed">
                <div className="flex items-start group">
                  <MapPin size={20} className="text-[#eb0a1e] mr-4 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block mb-1">NIPPON MOTOR CORPORATION (P) LTD.</strong>
                    XIX/9C, NIPPON TOWERS, NH - 544, HMT JUNCTION,<br/>
                    KALAMASSERY, COCHIN - 683104, KERALA - INDIA<br/>
                    <a href="mailto:nippon@nippontoyota.com" className="block mt-2 text-white hover:text-[#eb0a1e] transition-colors">NIPPON@NIPPONTOYOTA.COM</a>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <Phone size={20} className="text-[#eb0a1e] mr-4 shrink-0" />
                  <div className="text-white">
                    <a href="tel:+914847170000" className="hover:text-[#eb0a1e] transition-colors">+91 48471 70000</a>
                    <span className="text-zinc-600 mx-3">|</span>
                    <a href="tel:+919744712345" className="hover:text-[#eb0a1e] transition-colors">+91 97447 12345</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 pt-12 border-t border-zinc-800">
              <h4 className="font-display text-[11px] font-bold mb-6 tracking-widest text-zinc-400">CONNECT WITH US</h4>
              <div className="flex space-x-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-[#eb0a1e] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://www.instagram.com/nippon.toyota/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-[#eb0a1e] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://www.facebook.com/nipponkerala/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-[#eb0a1e] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-[#eb0a1e] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 py-6 bg-[#111]">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-center items-center text-[10px] text-gray-500">
          <div className="flex items-center">
            <span className="text-white font-display font-bold text-xl tracking-tighter">TOYOTA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
