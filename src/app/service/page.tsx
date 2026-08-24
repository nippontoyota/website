"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceModal from '@/components/ServiceModal';

type Tile = {
  title: string;
  subtitle: string;
  image?: string;
  logo?: string;
  solid?: boolean;
  infoKey: string;
  className: string;
};

const tiles: Tile[] = [
  {
    title: "T GLOSS",
    subtitle: "SERVICE SUPER MARKET",
    logo: "/q-service/t-gloss-logo.webp",
    solid: true,
    infoKey: "t-gloss",
    className: "lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-1",
  },
  {
    title: "T SECURE",
    subtitle: "PROMISE UNMATCHED",
    image: "/q-service/t-secure-bg.webp",
    logo: "/q-service/t-secure-logo.webp",
    infoKey: "t-secure",
    className: "lg:col-start-2 lg:row-start-1 lg:col-span-1 lg:row-span-1",
  },
  {
    title: "TOYOTA BACTAKLENZ",
    subtitle: "HEALTH PRODUCTS",
    image: "/q-service/bactaklenz-bg.webp",
    infoKey: "toyota-bactaklenz",
    className: "lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-2",
  },
  {
    title: "T SMILES",
    subtitle: "SAVE FOR MILES",
    image: "/q-service/t-smiles-bg.webp",
    logo: "/q-service/t-smiles-logo.webp",
    infoKey: "t-smiles",
    className: "lg:col-start-4 lg:row-start-1 lg:col-span-1 lg:row-span-1",
  },
  {
    title: "TYRE PROGRAM",
    subtitle: "SERVICE SUPER MARKET",
    image: "/q-service/tyre-program-bg.webp",
    infoKey: "tyre-program",
    className: "lg:col-start-5 lg:row-start-1 lg:col-span-2 lg:row-span-1",
  },
  {
    title: "T CLUB",
    subtitle: "UNLOCK CLUB BENEFITS",
    logo: "/q-service/t-club-logo.webp",
    solid: true,
    infoKey: "t-club",
    className: "lg:col-start-1 lg:row-start-2 lg:col-span-1 lg:row-span-1",
  },
  {
    title: "TOYOTA EXPRESS MAINTENANCE",
    subtitle: "MAINTENANCE & SERVICE",
    image: "/q-service/express-maintenance-bg.webp",
    infoKey: "toyota-express-maintenance",
    className: "lg:col-start-2 lg:row-start-2 lg:col-span-1 lg:row-span-1",
  },
  {
    title: "TOYOTA PARTS CONNECT",
    subtitle: "SERVICE SUPER MARKET",
    image: "/q-service/parts-connect-bg.webp",
    infoKey: "toyota-parts-connect",
    className: "lg:col-start-4 lg:row-start-2 lg:col-span-2 lg:row-span-1",
  },
];

export default function QServicePage() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col bg-white">
        {/* Heading */}
        <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-14 pb-8">
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

        {/* Bento Grid */}
        <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 auto-rows-[220px] gap-1.5">
            {tiles.map((tile, idx) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setActiveKey(tile.infoKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setActiveKey(tile.infoKey); }}
                className={`relative overflow-hidden group cursor-pointer ${tile.className} ${
                  tile.solid ? "bg-gradient-to-br from-[#c40000] to-[#8a0000]" : ""
                }`}
              >
                {tile.image && (
                  <>
                    <Image
                      src={tile.image}
                      alt={tile.title}
                      fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8a0000]/90 via-[#c40000]/50 to-[#c40000]/30" />
                  </>
                )}

                {tile.logo && (
                  <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Image src={tile.logo} alt="" width={26} height={26} className="object-contain w-auto h-auto" />
                  </div>
                )}

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white font-display font-extrabold text-lg md:text-xl leading-tight tracking-tight">
                    {tile.title}
                  </h3>
                  <p className="text-white/80 text-[11px] font-bold tracking-widest mt-1 uppercase">
                    {tile.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* View All tile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: tiles.length * 0.05 }}
              className="lg:col-start-6 lg:row-start-2 lg:col-span-1 lg:row-span-1"
            >
              <Link
                href="/q-service/full-menu"
                className="relative overflow-hidden group cursor-pointer bg-[#111] flex items-center justify-end p-5 w-full h-full"
              >
                <span className="text-white font-display font-extrabold text-lg tracking-tight text-right leading-snug group-hover:text-[var(--toyota-red)] transition-colors">
                  +<br />
                  VIEW ALL
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <ServiceModal infoKey={activeKey} onClose={() => setActiveKey(null)} />
    </div>
  );
}
