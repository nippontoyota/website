"use client";

import { useState } from 'react';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { carDetails } from '@/data/carDetails';
import { useLeadStore } from '@/store/useLeadStore';
import ConfigurationShare from '@/components/vehicle/ConfigurationShare';
import InteractiveCarViewer from '@/components/vehicle/InteractiveCarViewer';
import { configurationUrl } from '@/lib/vehicleConfiguration';
import {
  ArrowLeft, CheckCircle2, Fuel, Settings2, ChevronDown,
  ChevronRight, Zap, PhoneCall, X
} from 'lucide-react';

const tabList = ["Overview", "Variants", "Colours", "Features", "Specs"];

const badgeColors: Record<string, string> = {
  HYBRID: "bg-green-500/20 text-green-400 border-green-500/30",
  EV: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function CarDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const car = carDetails[slug];

  const { openModal } = useLeadStore();
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedColor, setSelectedColor] = useState(() => {
    const index = car?.colors.findIndex((item: any) => item.id === searchParams.get('colour')) ?? -1;
    return index >= 0 ? index : 0;
  });
  const [selectedVariant, setSelectedVariant] = useState(() => {
    const index = car?.variants.findIndex((item: any) => item.id === searchParams.get('variant')) ?? -1;
    return index >= 0 ? index : 0;
  });
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [showTip, setShowTip] = useState(true);

  if (!car) return notFound();

  const currentVariant = car.variants[selectedVariant];
  const activeColor = car.colors[selectedColor];
  const currentConfiguration = { slug: car.slug, color: activeColor?.id, variant: currentVariant?.id };

  return (
    <div className="flex min-h-screen flex-col font-sans bg-[#080808]">
      {/* Configurator Stage — mirrors the 360 tour & configure screen */}
      <section className="relative h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#0d0d0d] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(255,255,255,0.06),transparent_60%)]" />

        <Link
          href="/virtual-showroom"
          className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 border border-white/15 text-white hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </Link>

        <motion.div
          key={`hero-${selectedColor}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="relative h-[45vh] w-full max-w-4xl sm:h-[55vh]">
            <InteractiveCarViewer key={car.slug} image={car.image} alt={car.name} modelSlug={car.slug} showroomHref="/virtual-showroom" />
          </div>
        </motion.div>

        {/* Model name + badge, top-left */}
        <div className="absolute top-5 left-5 z-20">
          {car.badge && (
            <span className={`inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.25em] px-2.5 py-1 rounded-full border mb-2 ${badgeColors[car.badge]}`}>
              {car.badge === "EV" && <Zap size={9} />}
              {car.badge}
            </span>
          )}
          <h1 className="font-druk text-2xl sm:text-3xl text-white uppercase leading-none tracking-tighter drop-shadow-lg">
            {car.name}
          </h1>
        </div>

        {/* Onboarding tooltip, matches the reference's "Click on any color..." hint */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-24 left-5 z-20 w-72 bg-white rounded-lg shadow-2xl p-4"
            >
              <button onClick={() => setShowTip(false)} className="absolute top-3 right-3 text-zinc-400 hover:text-black">
                <X size={14} />
              </button>
              <p className="text-[#111] text-sm font-medium pr-4">
                Click on any <span className="text-[#eb0a1e] font-bold">colour</span> below to see how it looks.
              </p>
              <div className="flex justify-end gap-4 mt-3 text-[11px] font-bold tracking-wide">
                <button onClick={() => setShowTip(false)} className="text-zinc-500 hover:text-black">SKIP</button>
                <button onClick={() => setShowTip(false)} className="text-[#eb0a1e]">GOT IT</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Colour picker, bottom-left */}
        <div className="absolute bottom-5 left-5 z-20">
          <button
            onClick={() => setColorPickerOpen((v) => !v)}
            className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md rounded-full pl-2 pr-3 py-2 border border-white/15 hover:bg-black/75 transition-colors"
          >
            <div
              className="w-6 h-6 rounded-full border-2 border-white/30 shrink-0"
              style={{ backgroundColor: activeColor?.hex }}
            />
            <span className="text-white text-xs font-medium whitespace-nowrap">
              {activeColor?.name}{activeColor?.dualTone && " (Dual)"}
            </span>
            <ChevronDown size={14} className={`text-white/60 transition-transform ${colorPickerOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {colorPickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-2 bg-black/70 backdrop-blur-md rounded-xl border border-white/15 p-3 flex flex-wrap gap-2.5 max-w-[220px]"
              >
                {car.colors.map((color: any, idx: number) => (
                  <button
                    key={color.id}
                    onClick={() => { setSelectedColor(idx); setShowTip(false); }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === idx ? "border-white" : "border-white/20"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA row, bottom-right — matches "Book a Test Drive" / "Configure & Book Online" */}
        <div className="absolute bottom-5 right-5 z-20 flex max-w-[calc(100%-2.5rem)] flex-wrap justify-end gap-3">
          <ConfigurationShare configuration={currentConfiguration} />
          <Link
            href={configurationUrl(currentConfiguration)}
            className="hidden items-center gap-2 rounded-lg border border-white/20 bg-white/[0.08] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-white/[0.14] sm:flex"
          >
            Save setup
          </Link>
          <button
            onClick={() => openModal(car.name, 'TEST_DRIVE')}
            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-lg font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-zinc-200 transition-colors"
          >
            Book a Test Drive
          </button>
          <button
            onClick={() => openModal(car.name, 'GENERIC')}
            className="flex items-center gap-2 bg-[#eb0a1e] text-white px-5 py-3 rounded-lg font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-[#c8081a] transition-colors"
          >
            Configure & Book Online
          </button>
        </div>

        {/* Scroll hint to the detail sections below */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase">
          <span>Details</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      <Header />

      {/* Breadcrumb */}
      <div className="pt-6 pb-0 px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-zinc-600 text-xs font-medium py-4">
          <Link href="/virtual-showroom" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <ArrowLeft size={12} />
            Virtual Showroom
          </Link>
          <ChevronRight size={10} />
          <span className="text-zinc-400">{car.name}</span>
        </div>
      </div>

      {/* Quick facts */}
      <section className="px-6 pb-10 max-w-7xl mx-auto w-full">
        <p className="text-zinc-500 font-light text-sm md:text-base mb-6 max-w-2xl">{car.tagline}</p>
        <div className="flex flex-wrap items-baseline gap-2 mb-6">
          <span className="text-[10px] text-zinc-600 font-bold tracking-[0.15em] uppercase">Starting From</span>
          <span className="font-display font-black text-2xl md:text-3xl text-white">{currentVariant.price}</span>
        </div>
        <div className="grid grid-cols-2 sm:w-fit sm:flex gap-3">
          <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06] sm:w-40">
            <Fuel size={14} className="text-[#eb0a1e] mb-1" />
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Fuel Type</p>
            <p className="text-white text-sm font-bold">{currentVariant.fuel}</p>
          </div>
          <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06] sm:w-40">
            <Settings2 size={14} className="text-[#eb0a1e] mb-1" />
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Transmission</p>
            <p className="text-white text-sm font-bold">{currentVariant.transmission}</p>
          </div>
        </div>
        <button
          onClick={() => openModal(car.name, 'GENERIC')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-medium mt-5"
        >
          <PhoneCall size={12} /> Enquire Now
        </button>
      </section>

      {/* Tabs */}
      <div className="sticky top-[65px] z-40 bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {tabList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 px-5 py-4 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                  activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="carTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#eb0a1e]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* OVERVIEW */}
            {activeTab === "Overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="font-display font-black text-white text-2xl md:text-3xl mb-2">{car.fullName}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">{car.tagline}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {car.specs.slice(0, 4).map((spec: any) => (
                      <div key={spec.label} className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                        <p className="text-[9px] text-zinc-600 font-bold tracking-[0.2em] uppercase mb-1">{spec.label}</p>
                        <p className="text-white font-display font-bold text-base">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-black text-white text-lg mb-4 uppercase tracking-wide">Key Highlights</h3>
                  <div className="space-y-3">
                    {car.features[0]?.items.map((item: any) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={14} className="text-[#eb0a1e] mt-0.5 shrink-0" />
                        <p className="text-zinc-300 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 rounded-xl border border-[#eb0a1e]/20 bg-[#eb0a1e]/5">
                    <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-1">Starting From</p>
                    <p className="font-display font-black text-white text-3xl">{car.basePrice}</p>
                    <p className="text-zinc-600 text-[10px] mt-1">Ex-Showroom, Kochi</p>
                    <button
                      onClick={() => openModal(car.name, 'PRICE_LIST')}
                      className="mt-3 text-[#eb0a1e] text-xs font-bold tracking-wider uppercase hover:opacity-80 transition-opacity flex items-center gap-1"
                    >
                      Get Full Price List <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VARIANTS */}
            {activeTab === "Variants" && (
              <div>
                <h2 className="font-display font-black text-white text-2xl mb-8">Choose Your Variant</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {car.variants.map((v: any, idx: number) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(idx)}
                      className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                        selectedVariant === idx
                          ? "border-[#eb0a1e] bg-[#eb0a1e]/5"
                          : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-display font-black text-white text-lg">{v.name}</span>
                        {selectedVariant === idx && (
                          <CheckCircle2 size={18} className="text-[#eb0a1e]" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[9px] bg-white/10 text-zinc-300 font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">
                          {v.fuel}
                        </span>
                        <span className="text-[9px] bg-white/10 text-zinc-300 font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">
                          {v.transmission}
                        </span>
                      </div>
                      <p className="font-display font-black text-white text-xl">{v.price}</p>
                      <p className="text-zinc-600 text-[10px] mt-0.5">Ex-Showroom, Kochi</p>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openModal(car.name, 'TEST_DRIVE')}
                    className="flex-1 bg-[#eb0a1e] text-white px-6 py-4 font-bold text-[11px] tracking-[0.2em] uppercase rounded-lg hover:bg-[#c8081a] transition-colors flex items-center justify-center gap-2"
                  >
                    Book Test Drive
                    <ArrowLeft size={14} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => openModal(car.name, 'PRICE_LIST')}
                    className="flex-1 bg-white/[0.06] text-white border border-white/10 px-6 py-4 font-bold text-[11px] tracking-[0.2em] uppercase rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Full Price List
                  </button>
                </div>
              </div>
            )}

            {/* COLOURS */}
            {activeTab === "Colours" && (
              <div>
                <h2 className="font-display font-black text-white text-2xl mb-2">Choose Your Colour</h2>
                <p className="text-zinc-500 text-sm mb-8">Select a colour to preview</p>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {car.colors.map((color: any, idx: number) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(idx)}
                        className={`group flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
                          selectedColor === idx
                            ? "border-white/40 bg-white/[0.06]"
                            : "border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full mb-2 shadow-lg border-2 border-white/20 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-white text-[10px] font-bold text-center leading-tight">{color.name}</span>
                        {color.dualTone && (
                          <span className="text-[8px] text-zinc-500 mt-0.5">Dual Tone</span>
                        )}
                        {selectedColor === idx && (
                          <div className="w-1 h-1 rounded-full bg-[#eb0a1e] mt-1.5" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedColor}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-[250px] md:h-[300px]"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(235,10,30,0.07),transparent_60%)]" />
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-center mt-4">
                      <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2">
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: car.colors[selectedColor]?.hex }} />
                        <span className="text-sm text-white font-medium">{car.colors[selectedColor]?.name}</span>
                        {car.colors[selectedColor]?.dualTone && (
                          <span className="text-[9px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full px-1.5 py-0.5">DUAL</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FEATURES */}
            {activeTab === "Features" && (
              <div>
                <h2 className="font-display font-black text-white text-2xl mb-8">Features and Equipment</h2>
                <div className="space-y-3">
                  {car.features.map((feat: any) => (
                    <div key={feat.category} className="border border-white/[0.08] rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedFeature(expandedFeature === feat.category ? null : feat.category)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
                      >
                        <span className="font-display font-black text-white text-lg">{feat.category}</span>
                        <ChevronDown
                          size={18}
                          className={`text-zinc-500 transition-transform duration-300 ${expandedFeature === feat.category ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedFeature === feat.category && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-white/[0.06]">
                              {feat.items.map((item: any) => (
                                <div key={item} className="flex items-start gap-2.5 pt-3">
                                  <CheckCircle2 size={14} className="text-[#eb0a1e] mt-0.5 shrink-0" />
                                  <p className="text-zinc-300 text-sm">{item}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SPECS */}
            {activeTab === "Specs" && (
              <div>
                <h2 className="font-display font-black text-white text-2xl mb-8">Technical Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {car.specs.map((spec: any) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-white/20 transition-colors"
                    >
                      <span className="text-zinc-500 text-sm font-medium">{spec.label}</span>
                      <span className="text-white font-display font-bold text-base text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase mb-3">Disclaimer</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{car.disclaimer}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="sticky bottom-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/[0.08] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-500 font-medium">{car.name} - {currentVariant.name}</p>
            <p className="font-display font-black text-white text-xl">{currentVariant.price}</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => openModal(car.name, 'TEST_DRIVE')}
              className="flex-1 sm:flex-none bg-[#eb0a1e] text-white px-8 py-3.5 font-bold text-[11px] tracking-[0.2em] uppercase rounded-lg hover:bg-[#c8081a] transition-colors"
            >
              Book Test Drive
            </button>
            <button
              onClick={() => openModal(car.name, 'GENERIC')}
              className="flex-1 sm:flex-none bg-white/[0.08] text-white border border-white/10 px-6 py-3.5 font-bold text-[11px] tracking-[0.2em] uppercase rounded-lg hover:bg-white/15 transition-colors"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
