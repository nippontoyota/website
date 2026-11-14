"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';
import SocialIcon from '@/components/SocialIcon';

const DEFAULT_SOCIALS = [
  { id: 'social-instagram', platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/nippon.toyota/' },
  { id: 'social-facebook', platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/nipponkerala/' },
  { id: 'social-youtube', platform: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@NipponToyotaKerala' },
  { id: 'social-whatsapp', platform: 'whatsapp', label: 'WhatsApp Concierge', url: 'https://wa.me/919946101111' },
  { id: 'social-linkedin', platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/nippon-toyota/' },
];

export default function Footer() {
  const { openModal } = useLeadStore();
  const [socials, setSocials] = useState(DEFAULT_SOCIALS);

  useEffect(() => {
    fetch('/api/public/store')
      .then((res) => res.json())
      .then((data) => {
        if (data?.socialLinks && data.socialLinks.length > 0) {
          setSocials(data.socialLinks);
        }
      })
      .catch(() => {
        // Fallback to default socials on offline/error
      });
  }, []);

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
              <li><button onClick={() => useLeadStore.getState().openModal('', 'PRICE_LIST')} className="hover:text-[#eb0a1e] transition-colors text-left uppercase">PRICE LIST</button></li>
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
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-[#eb0a1e] hover:scale-105 transition-all duration-300 shadow-md"
                    title={s.label}
                    aria-label={s.label}
                  >
                    <SocialIcon platform={s.platform} size={18} />
                  </a>
                ))}
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
