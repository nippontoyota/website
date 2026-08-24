"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLeadStore } from '@/store/useLeadStore';

const connectFeatures = [
  {
    title: "Smart Connect",
    desc: "Stay in the know with real-time alerts, notifications and updates about your car and Toyota.",
    image: "/i-connect/smart-connect.webp",
  },
  {
    title: "Remote Connect",
    desc: "Remotely check status and control vehicle functions like doors and hazard lights from your phone.",
    image: "/i-connect/remote-connect.webp",
  },
  {
    title: "Safety Connect",
    desc: "Automatic notification to your emergency contacts in case of an accident, for total peace of mind.",
    image: "/i-connect/safety-connect.webp",
  },
];

const smartWayCards = [
  {
    title: "Your Service",
    desc: "Book, track & pay for your periodic maintenance service online, hassle-free.",
    image: "/i-connect/your-service.webp",
  },
  {
    title: "Vehicle Assistance",
    desc: "24/7 roadside assistance whenever and wherever you need it.",
    image: "/i-connect/vehicle-assistance.webp",
  },
  {
    title: "Owner's Manual",
    desc: "Everything about your Toyota, right in the palm of your hand.",
    image: "/i-connect/owner-guide.webp",
  },
];

const faqs = [
  {
    q: "What is Toyota i-Connect?",
    a: "Toyota i-Connect is a one stop intelligent solution to provide integrated & seamless experience to all Toyota vehicle owners. It offers a plethora of features to intelligently stay connected with your car, family & Toyota.",
  },
  {
    q: "Can all Toyota customers use Toyota i-Connect app?",
    a: "Toyota i-Connect app caters to the needs of all our customers. Yes, all Toyota vehicle owners can download the app. Depending on the vehicle type, the supported features will be available in the app.",
  },
  {
    q: "What are the features offered in Toyota i-Connect app?",
    a: "Toyota i-Connect is a combination of connected vehicle features and vehicle ownership enhancement features — remotely check status & control vehicle functions, automatic accident notification to emergency contacts, finding your parked car, plus easy online service booking, tracking, payment, and hassle-free insurance & loan management.",
  },
  {
    q: "Are all Toyota i-Connect features free?",
    a: "Vehicle ownership enhancement features like maintenance, insurance and loan are available for free. Features to stay connected to your car — remote operations, find my car, driver alerts etc. — are available on a complimentary basis for 3 years from your vehicle purchase.",
  },
  {
    q: "Why does my car take a long time to respond to remote features?",
    a: "Response times can vary depending on network connectivity and signal strength at your vehicle's current location.",
  },
];

export default function IConnectPage() {
  const { openModal } = useLeadStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col bg-white">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full overflow-hidden bg-black"
        >
          <Image
            src="/i-connect/hero-hilux.webp"
            alt="Toyota i-Connect — Seamless tech for every adventure"
            width={1920}
            height={808}
            priority
            className="w-full h-auto object-cover"
          />
        </motion.section>

        <section className="w-full py-10 md:py-14 bg-[#111]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white/80 text-base md:text-lg max-w-2xl"
            >
              Track your car, check its status, control it remotely and do so much more — all from your smartphone or smartwatch.
            </motion.p>
          </div>
        </section>

        {/* Intelligent way to connect */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-[#111] tracking-tight">
                The Intelligent Way to Connect
              </h2>
              <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
                We&apos;re your one-stop solution for all things car-related. Track your car, check its status, control it remotely and do so much more using your smartphone or smartwatch.
              </p>
              <div className="w-16 h-[3px] bg-[var(--toyota-red)] mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {connectFeatures.map((f, idx) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden bg-gray-100"
                >
                  <div className="relative w-full h-[420px] overflow-hidden">
                    <Image
                      src={f.image}
                      alt={f.title}
                      fill sizes="100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-display font-bold text-xl mb-2">{f.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect to Toyota the smart way */}
        <section className="w-full py-16 md:py-24 bg-[#f3f4f6]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-[#111] tracking-tight">
                Connect to Toyota the Smart Way
              </h2>
              <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
                No matter which Toyota you&apos;re driving, we&apos;ve got your back with 24/7 roadside assistance and real-time service booking.
              </p>
              <div className="w-16 h-[3px] bg-[var(--toyota-red)] mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {smartWayCards.map((c, idx) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white group cursor-pointer shadow-sm"
                >
                  <div className="relative w-full h-[240px] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill sizes="100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-[#111] mb-2">{c.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <button
                onClick={() => openModal('Toyota i-Connect Brochure', 'BROCHURE')}
                className="bg-[var(--toyota-red)] hover:bg-[#c80000] transition-colors text-white px-8 py-3 text-sm font-bold tracking-widest text-center"
              >
                DOWNLOAD BROCHURE
              </button>
              <button
                onClick={() => openModal('Toyota i-Connect EV Brochure', 'BROCHURE')}
                className="border border-[var(--toyota-red)] text-[var(--toyota-red)] hover:bg-[var(--toyota-red)] hover:text-white transition-colors px-8 py-3 text-sm font-bold tracking-widest text-center"
              >
                BEV BROCHURE
              </button>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-4xl font-display font-extrabold text-[#111] tracking-tight mb-10"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-3">
              {faqs.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`border ${isOpen ? "border-[var(--toyota-red)]" : "border-gray-200"} transition-colors`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span className={`font-display font-bold text-sm md:text-base ${isOpen ? "text-[var(--toyota-red)]" : "text-[#111]"}`}>
                        {item.q}
                      </span>
                      {isOpen ? (
                        <Minus size={18} className="text-[var(--toyota-red)] shrink-0 ml-4" />
                      ) : (
                        <Plus size={18} className="text-[#333] shrink-0 ml-4" />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
