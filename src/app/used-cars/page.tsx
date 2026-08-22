"use client";

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWidgets from '@/components/StickyWidgets';

const locations = [
  {
    city: "KOTTAYAM",
    image: "/used-cars/kottayam.jpg",
    address: "MC Road, Nattakom, Kottayam",
  },
  {
    city: "TRIVANDRUM",
    image: "/used-cars/trivandrum.jpg",
    address: "Nippon Motor Corporation Pvt. Ltd., NH ByPass, Attinkuzhi Kazhakuttom PO., Trivandrum - 695582",
  },
  {
    city: "KOLLAM",
    image: "/used-cars/kollam.jpg",
    address: "Parakkulam junction Kottiyam, NH Road, Kollam - 691571",
  },
  {
    city: "COCHIN",
    image: "/used-cars/cochin.jpg",
    address: "XIX/9 C, Nippon Towers, NH 47, Kalamassery Post, Ernakulam, Cochin",
  },
  {
    city: "THRISSUR",
    image: "/used-cars/thrissur.jpg",
    address: "Nippon Motor Corporation Pvt. Ltd., X314 NH Bye Pass Road, Nettor PO Thrissur",
  },
];

export default function UsedCarsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col">
        {/* Hero Banner */}
        <section className="relative w-full h-[180px] md:h-[260px] overflow-hidden">
          <Image
            src="/used-cars/banner.jpg"
            alt="Used Cars"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight drop-shadow-md"
            >
              Used Cars
            </motion.h1>
          </div>
        </section>

        {/* Locations Section */}
        <section className="w-full bg-[#f3f4f6] py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 md:mb-14"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-[#333] tracking-tight">
                Select Your Nearest Location
              </h2>
              <div className="w-16 h-[3px] bg-[var(--toyota-red)] mt-3" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((loc, idx) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-white shadow-sm group"
                >
                  <div className="relative w-full h-[210px] overflow-hidden">
                    <Image
                      src={loc.image}
                      alt={`Nippon Toyota ${loc.city} Showroom`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-[#4a4a4a] text-white text-center text-sm font-bold tracking-widest py-2.5">
                    {loc.city}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-[#111] mb-2">
                      Nippon U Trust
                    </h3>
                    <p className="flex items-start text-sm text-gray-600 leading-relaxed">
                      <MapPin size={16} className="text-[var(--toyota-red)] mr-2 mt-0.5 shrink-0" />
                      {loc.address}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWidgets />
    </div>
  );
}
