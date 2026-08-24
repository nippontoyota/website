"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, ChevronDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const locations = [
  "KALAMASSERY P.O., COCHIN - SHOWROOM & SERVICE CENTER",
  "NETTOOR P.O., COCHIN - SHOWROOM & SERVICE CENTER",
  "TRIVANDRUM - SHOWROOM & SERVICE CENTER",
  "TRIVANDRUM - SERVICE CENTER",
  "TRIVANDRUM - SHOWROOM",
  "TRIVANDRUM - SERVICE & BODY & PAINT",
  "THRISSUR - SHOWROOM & SERVICE CENTER",
  "NADATHARA P.O., THRISSUR - SERVICE CENTER",
  "ARTHAT P.O., THRISSUR - SERVICE CENTER",
  "KOTTAYAM - SHOWROOM & SERVICE CENTER",
  "KOTTAYAM - SERVICE CENTER",
  "KOTTAYAM - SHOWROOM",
  "KOLLAM - SHOWROOM & SERVICE CENTER",
  "KOLLAM - SERVICE CENTER",
  "THIRUVALLA - SHOWROOM & SERVICE CENTER",
  "IRINJALKUDA - SHOWROOM & SERVICE CENTER",
  "MUVATTUPUZHA - SHOWROOM & SERVICE CENTER",
  "KAYAMKULLAM - SHOWROOM & SERVICE CENTER",
  "PATHANAMTHITTA - SHOWROOM & SERVICE CENTER",
  "ERNAKULAM, KOCHI - SERVICE CENTER"
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function ContactContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const [city, type] = selectedLocation.split(" - ");

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[450px] w-full bg-zinc-900">
        <Image 
          src="/nippon-towers.jpg" 
          alt="Nippon Toyota Locations" 
          fill sizes="100vw"
          className="object-cover opacity-60 object-center mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[#eb0a1e] font-bold tracking-[0.2em] uppercase text-[11px] mb-4"
            >
              Get in Touch
            </motion.p>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-druk text-white tracking-tight uppercase"
            >
              Locations
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Branch Selection */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-8">
              Select Branch
            </h2>
            
            {/* Custom Dropdown Trigger */}
            <div 
              className="relative group cursor-pointer border-b-2 border-zinc-900 pb-4 mb-12"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg md:text-xl font-medium text-zinc-900 uppercase tracking-wide">
                  {city}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className={`transition-colors ${isOpen ? 'text-[#eb0a1e]' : 'text-zinc-400 group-hover:text-[#eb0a1e]'}`} />
                </motion.div>
              </div>
              <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mt-2">
                {type}
              </p>
            </div>

            {/* Custom Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[140px] left-0 w-full bg-white shadow-2xl border border-gray-100 max-h-[350px] overflow-y-auto z-50 rounded-b-md"
                >
                  {locations.map((loc, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsOpen(false);
                      }}
                      className="px-6 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <span className="block text-[13px] font-bold text-zinc-800 uppercase tracking-wide">
                        {loc.split(" - ")[0]}
                      </span>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {loc.split(" - ")[1]}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <a href="#" className="inline-flex items-center text-[12px] font-bold tracking-[0.15em] uppercase text-zinc-900 hover:text-[#eb0a1e] transition-colors group">
              View All Locations
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right Column: Contact Details */}
          <motion.div 
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="flex flex-col space-y-12">
              
              {/* Address */}
              <div className="border-b border-gray-100 pb-12">
                <div className="flex items-center mb-4 text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Address</span>
                </div>
                <h3 className="text-2xl md:text-3xl text-zinc-900 font-medium leading-[1.4] tracking-tight">
                  X1X/9C, Nippon Towers, <br />
                  NH 47, HMT Junction, <br />
                  {city}, <br />
                  Kerala
                </h3>
              </div>

              {/* Hours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-gray-100 pb-12">
                <div>
                  <div className="flex items-center mb-4 text-gray-400">
                    <Clock size={16} className="mr-2" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Sales Hours</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-lg font-medium text-zinc-900">09:00 AM - 07:00 PM</p>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mt-1">All days open</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-4 text-gray-400">
                    <Clock size={16} className="mr-2" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Service Hours</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-lg font-medium text-zinc-900">09:00 AM - 06:00 PM</p>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#eb0a1e] mt-1">Sunday Holiday</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12">
                <div>
                  <div className="flex items-center mb-4 text-gray-400">
                    <Phone size={16} className="mr-2" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Phone</span>
                  </div>
                  <div className="space-y-3">
                    <a href="tel:+914847170000" className="block text-xl font-medium text-zinc-900 hover:text-[#eb0a1e] transition-colors">
                      +91 48471 70000
                    </a>
                    <a href="tel:+919744712345" className="block text-xl font-medium text-zinc-900 hover:text-[#eb0a1e] transition-colors">
                      +91 97447 12345
                    </a>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-4 text-gray-400">
                    <Mail size={16} className="mr-2" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Email</span>
                  </div>
                  <a href="mailto:salesinfo@nippontoyota.com" className="block text-xl font-medium text-zinc-900 hover:text-[#eb0a1e] transition-colors break-all">
                    salesinfo@nippontoyota.com
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[50vh] min-h-[400px] bg-zinc-100 relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src={`https://maps.google.com/maps?q=Nippon+Toyota+${encodeURIComponent(city)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </div>
  );
}
