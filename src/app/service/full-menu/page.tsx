"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWidgets from '@/components/StickyWidgets';
import ServiceModal from '@/components/ServiceModal';

const COLORS = {
  red: "#f4522e",
  tan: "#ddc383",
  yellow: "#f5cf1e",
  orangeSecure: "#e0893c",
  orangeAssist: "#e2723a",
  gold: "#d4a53d",
  lightOrange: "#eda15c",
  maroon: "#a10c0c",
  orange2: "#e8873c",
};

type Tile = {
  title: string;
  subtitle: string;
  color: string;
  logo?: string;
  badge?: string;
  infoKey: string;
  className: string;
};

const tiles: Tile[] = [
  { title: "Toyota Express Maintenance", subtitle: "MAINTENANCE & SERVICE", color: COLORS.red, logo: "/q-service/full-menu/express-maintenance-icon.webp", infoKey: "toyota-express-maintenance", className: "lg:col-start-1 lg:row-start-1 lg:col-span-2 lg:row-span-1" },
  { title: "T CLUB", subtitle: "UNLOCK CLUB BENEFITS", color: COLORS.tan, logo: "/q-service/t-club-logo.webp", infoKey: "t-club", className: "lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-1" },
  { title: "Toyota Cost Of Maintenance", subtitle: "MAINTENANCE & SERVICE", color: COLORS.red, infoKey: "toyota-cost-of-maintenance", className: "lg:col-start-4 lg:row-start-1 lg:col-span-2 lg:row-span-1" },
  { title: "Toyota Body & Paint", subtitle: "BODY & PAINT", color: COLORS.yellow, logo: "/q-service/full-menu/body-and-paint.webp", infoKey: "toyota-body-paint", className: "lg:col-start-6 lg:row-start-1 lg:col-span-2 lg:row-span-1" },
  { title: "T SECURE", subtitle: "PROMISE UNMATCHED", color: COLORS.orangeSecure, logo: "/q-service/t-secure-logo.webp", infoKey: "t-secure", className: "lg:col-start-8 lg:row-start-1 lg:col-span-1 lg:row-span-2" },
  { title: "T SMILES", subtitle: "SAVE FOR MILES", color: COLORS.orangeSecure, logo: "/q-service/t-smiles-logo.webp", infoKey: "t-smiles", className: "lg:col-start-9 lg:row-start-1 lg:col-span-1 lg:row-span-1" },
  { title: "T ASSIST", subtitle: "CARE ON THE MOVE", color: COLORS.orangeAssist, logo: "/q-service/full-menu/road-side-assistance.webp", badge: "NEW", infoKey: "t-assist", className: "lg:col-start-1 lg:row-start-2 lg:col-span-2 lg:row-span-1" },
  { title: "Toyota BactaKlenz", subtitle: "HEALTH PRODUCTS", color: COLORS.gold, infoKey: "toyota-bactaklenz", className: "lg:col-start-3 lg:row-start-2 lg:col-span-1 lg:row-span-1" },
  { title: "Toyota CAF PM2.5", subtitle: "HEALTH PRODUCTS", color: COLORS.gold, infoKey: "toyota-caf-pm25", className: "lg:col-start-4 lg:row-start-2 lg:col-span-1 lg:row-span-1" },
  { title: "Toyota Car Sanitization", subtitle: "HEALTH PRODUCTS", color: COLORS.gold, infoKey: "toyota-car-sanitization", className: "lg:col-start-5 lg:row-start-2 lg:col-span-2 lg:row-span-1" },
  { title: "Toyota Motor Oil", subtitle: "PERFORMANCE PRODUCTS", color: COLORS.lightOrange, infoKey: "toyota-motor-oil", className: "lg:col-start-7 lg:row-start-2 lg:col-span-1 lg:row-span-1" },
  { title: "Toyota Engine Flush", subtitle: "PERFORMANCE PRODUCTS", color: COLORS.lightOrange, infoKey: "toyota-engine-flush", className: "lg:col-start-9 lg:row-start-2 lg:col-span-1 lg:row-span-2" },
  { title: "Toyota Injector Cleaner", subtitle: "PERFORMANCE PRODUCTS", color: COLORS.lightOrange, infoKey: "toyota-injector-cleaner", className: "lg:col-start-1 lg:row-start-3 lg:col-span-2 lg:row-span-1" },
  { title: "Battery Program", subtitle: "SERVICE SUPER MARKET", color: COLORS.maroon, infoKey: "battery-program", className: "lg:col-start-3 lg:row-start-3 lg:col-span-1 lg:row-span-1" },
  { title: "T GLOSS", subtitle: "SERVICE SUPER MARKET", color: COLORS.maroon, logo: "/q-service/t-gloss-logo.webp", infoKey: "t-gloss", className: "lg:col-start-4 lg:row-start-3 lg:col-span-2 lg:row-span-1" },
  { title: "Tyre Program", subtitle: "SERVICE SUPER MARKET", color: COLORS.maroon, infoKey: "tyre-program", className: "lg:col-start-6 lg:row-start-3 lg:col-span-1 lg:row-span-1" },
  { title: "Car Essential Store", subtitle: "SERVICE SUPER MARKET", color: COLORS.maroon, infoKey: "car-essential-store", className: "lg:col-start-7 lg:row-start-3 lg:col-span-1 lg:row-span-1" },
  { title: "Toyota Car Decals", subtitle: "SERVICE SUPER MARKET", color: COLORS.maroon, infoKey: "toyota-car-decals", className: "lg:col-start-8 lg:row-start-3 lg:col-span-1 lg:row-span-1" },
  { title: "Toyota Parts Connect", subtitle: "SERVICE SUPER MARKET", color: COLORS.maroon, logo: "/q-service/full-menu/parts-connect-icon.webp", infoKey: "toyota-parts-connect", className: "lg:col-start-1 lg:row-start-4 lg:col-span-2 lg:row-span-1" },
  { title: "TOYOTA GENUINE ACCESSORIES", subtitle: "SERVICE SUPER MARKET", color: COLORS.maroon, logo: "/q-service/full-menu/genuine-accessories.webp", infoKey: "toyota-genuine-accessories", className: "lg:col-start-3 lg:row-start-4 lg:col-span-2 lg:row-span-1" },
  { title: "Pick-up and Drop", subtitle: "CONVENIENCE", color: COLORS.gold, infoKey: "pickup-and-drop", className: "lg:col-start-5 lg:row-start-4 lg:col-span-2 lg:row-span-1" },
  { title: "Toyota Service Express Lite", subtitle: "CONVENIENCE", color: COLORS.gold, infoKey: "toyota-service-express-lite", className: "lg:col-start-7 lg:row-start-4 lg:col-span-2 lg:row-span-1" },
  { title: "i-connect", subtitle: "STAY CONNECTED", color: COLORS.tan, logo: "/q-service/full-menu/iconnect-icon.webp", infoKey: "iconnect", className: "lg:col-start-9 lg:row-start-4 lg:col-span-1 lg:row-span-1" },
  { title: "Talk to Toyota", subtitle: "CONNECT WITH US", color: COLORS.tan, infoKey: "talk-to-toyota", className: "lg:col-start-1 lg:row-start-5 lg:col-span-2 lg:row-span-1" },
  { title: "Toyota Quick Repair", subtitle: "MAINTENANCE & SERVICE", color: COLORS.red, infoKey: "toyota-quick-repair", className: "lg:col-start-3 lg:row-start-5 lg:col-span-1 lg:row-span-1" },
  { title: "No To Counterfeit", subtitle: "FOR YOUR SAFETY", color: COLORS.orange2, logo: "/q-service/full-menu/no-to-counterfeit.webp", infoKey: "no-to-counterfeit", className: "lg:col-start-4 lg:row-start-5 lg:col-span-2 lg:row-span-1" },
  { title: "T SHIELD", subtitle: "FOR YOUR SAFETY", color: COLORS.orange2, logo: "/q-service/full-menu/t-shield.webp", infoKey: "t-shield", className: "lg:col-start-6 lg:row-start-5 lg:col-span-2 lg:row-span-1" },
  { title: "Toyota Qualified Manpower", subtitle: "OUR FRONT LINERS", color: COLORS.orange2, infoKey: "toyota-qualified-manpower", className: "lg:col-start-8 lg:row-start-5 lg:col-span-2 lg:row-span-1" },
  { title: "Toyota TTEP", subtitle: "OUR FRONT LINERS", color: COLORS.orange2, infoKey: "toyota-ttep", className: "lg:col-start-1 lg:row-start-6 lg:col-span-1 lg:row-span-1" },
];

export default function QServiceFullMenuPage() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col bg-white">
        {/* Heading */}
        <section className="w-full max-w-[1800px] mx-auto px-6 md:px-12 pt-14 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-display font-extrabold text-[#333] tracking-tight"
          >
            Toyota Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-2 text-lg md:text-xl font-display font-bold text-[#111] tracking-wide"
          >
            FOR ALL YOUR TOYOTA NEEDS
          </motion.p>
        </section>

        {/* Full Bento Grid */}
        <section className="w-full max-w-[1800px] mx-auto px-6 md:px-12 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 auto-rows-[170px] gap-2">
            {tiles.map((tile, idx) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
                style={{ backgroundColor: tile.color }}
                onClick={() => setActiveKey(tile.infoKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setActiveKey(tile.infoKey); }}
                className={`relative overflow-hidden group cursor-pointer ${tile.className}`}
              >
                {tile.logo && (
                  <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Image src={tile.logo} alt="" width={26} height={26} className="object-contain" />
                  </div>
                )}
                {tile.badge && (
                  <span className="absolute top-5 right-5 text-white text-[10px] font-bold tracking-widest uppercase">
                    {tile.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-white font-display font-extrabold text-sm md:text-base leading-tight tracking-tight">
                    {tile.title}
                  </h3>
                  <p className="text-white/80 text-[10px] font-bold tracking-widest mt-1 uppercase">
                    {tile.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Back tile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: tiles.length * 0.02 }}
              className="lg:col-start-2 lg:row-start-6 lg:col-span-1 lg:row-span-1"
            >
              <Link
                href="/q-service"
                className="relative overflow-hidden group cursor-pointer bg-[#111] flex items-center justify-center p-5 w-full h-full"
              >
                <span className="text-white font-display font-extrabold text-base tracking-tight group-hover:text-[var(--toyota-red)] transition-colors">
                  &lt; BACK
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWidgets />
      <ServiceModal infoKey={activeKey} onClose={() => setActiveKey(null)} />
    </div>
  );
}
