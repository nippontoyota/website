"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  Repeat,
  Tag,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useLeadStore, LeadIntent } from '@/store/useLeadStore';

interface ActionPill {
  label: string;
}

interface QuickAction {
  id: string;
  tag: string;
  subTag: string;
  title: string;
  description: string;
  pillsTitle: string;
  pills: ActionPill[];
  perks: string[];
  cta: string;
  intent: LeadIntent;
  Icon: typeof Car;
  badge?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'test-drive',
    tag: 'VIP ACCESS',
    subTag: 'DOORSTEP OR SHOWROOM',
    title: 'BOOK A VIP TEST DRIVE',
    description: 'Skip the showroom queue. Experience the performance, hybrid efficiency, and prestige of your favorite Toyota first-hand.',
    pillsTitle: 'AVAILABLE FLEET READY FOR DRIVE',
    pills: [
      { label: 'Innova Hycross' },
      { label: 'Fortuner Legender' },
      { label: 'Hyryder Hybrid' },
      { label: 'Hilux 4x4' },
      { label: 'Glanza' },
    ],
    perks: ['Same-Day Slot Guarantee', 'Doorstep Delivery Available', 'Product Specialist Walkthrough'],
    cta: 'SCHEDULE TEST DRIVE',
    intent: 'TEST_DRIVE',
    Icon: Car,
    badge: 'PRIORITY SLOTS',
  },
  {
    id: 'exchange',
    tag: 'BEST VALUE',
    subTag: 'MULTI-BRAND TRADE-IN',
    title: 'EXCHANGE & UPGRADE',
    description: 'Upgrade your current car into a brand-new Toyota. Receive a transparent, top-of-market valuation in under 30 minutes with instant paperwork.',
    pillsTitle: 'TRANSPARENT 3-STEP VALUATION',
    pills: [
      { label: '1. 15-Min Doorstep Check' },
      { label: '2. Instant Market Price' },
      { label: '3. Immediate Key Handover' },
    ],
    perks: ['Any Make & Model Accepted', 'Zero Ownership Transfer Hassle', 'Up to ₹50,000 Exchange Bonus'],
    cta: 'GET CAR VALUATION',
    intent: 'EXCHANGE',
    Icon: Repeat,
    badge: 'TOP VALUATION',
  },
  {
    id: 'price-list',
    tag: '2026 PRICING',
    subTag: 'KERALA ON-ROAD SHEET',
    title: 'ON-ROAD PRICE LIST & EMI',
    description: 'Access official Kochi, Trivandrum, and Thrissur on-road pricing sheets with complete RTO tax breakdowns, insurance tiers, and customized EMI schemes.',
    pillsTitle: 'INSTANT PRICE BREAKDOWNS',
    pills: [
      { label: 'Ex-Showroom vs On-Road' },
      { label: 'Kerala RTO & Taxes' },
      { label: 'Low EMI Schemes' },
      { label: 'Festive Benefits' },
    ],
    perks: ['100% Verified Dealer Pricing', 'Zero Hidden Registration Fees', 'Instant Delivery to WhatsApp'],
    cta: 'VIEW ON-ROAD PRICE LIST',
    intent: 'PRICE_LIST',
    Icon: Tag,
    badge: 'LATEST OFFERS',
  },
  {
    id: 'brochure',
    tag: 'DIGITAL SPECS',
    subTag: 'OFFICIAL FLEET BROCHURES',
    title: 'DOWNLOAD DIGITAL BROCHURE',
    description: 'Get high-resolution official model brochures packed with comprehensive technical specs, hybrid synergy drive schematics, safety features, and genuine accessories.',
    pillsTitle: 'BROCHURE CONTENTS',
    pills: [
      { label: 'Technical Engine Specs' },
      { label: 'Interior Trims & Dimensions' },
      { label: 'Toyota Safety Sense ADAS' },
      { label: 'Color Palette' },
    ],
    perks: ['Official Toyota Bharat Specs', 'High-Res Digital Catalog', 'Instant PDF Download'],
    cta: 'DOWNLOAD BROCHURE',
    intent: 'BROCHURE',
    Icon: BookOpen,
    badge: 'OFFICIAL CATALOG',
  },
];

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getCardWidthSnapshot() {
  if (typeof window === 'undefined') return 640;
  const w = window.innerWidth;
  if (w < 640) return Math.min(w - 56, 360);
  if (w < 1024) return 540;
  if (w < 1440) return 620;
  return 680;
}

function getCardWidthServerSnapshot() {
  return 640;
}

export default function BannerSlider() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actionCards, setActionCards] = useState<QuickAction[]>(QUICK_ACTIONS);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardWidth = useSyncExternalStore(subscribe, getCardWidthSnapshot, getCardWidthServerSnapshot);
  const { openModal, isOpen: isLeadModalOpen } = useLeadStore();

  const gap = 24;
  const AUTOPLAY_DURATION = 5500; // 5.5s autoplay per card

  const isPaused = isHovered || isDragging || isLeadModalOpen;

  // Sync with live marketing campaign configuration
  useEffect(() => {
    fetch('/api/public/store')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.heroCards) && data.heroCards.length > 0) {
          const iconMap: Record<string, typeof Car> = {
            TEST_DRIVE: Car,
            EXCHANGE: Repeat,
            PRICE_LIST: Tag,
            BROCHURE: BookOpen,
          };
          const mapped: QuickAction[] = data.heroCards.map((c: {
            id: string;
            tag: string;
            subTag: string;
            title: string;
            description: string;
            pillsTitle: string;
            pills: ActionPill[];
            perks: string[];
            cta: string;
            intent: LeadIntent;
            badge?: string;
          }) => ({
            id: c.id,
            tag: c.tag,
            subTag: c.subTag,
            title: c.title,
            description: c.description,
            pillsTitle: c.pillsTitle,
            pills: c.pills,
            perks: c.perks,
            cta: c.cta,
            intent: c.intent,
            Icon: iconMap[c.intent] || Car,
            badge: c.badge || undefined,
          }));
          setActionCards(mapped);
        }
      })
      .catch((err) => console.log('Hero cards sync error:', err));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    }
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? actionCards.length - 1 : prev - 1));
  }, [actionCards.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === actionCards.length - 1 ? 0 : prev + 1));
  }, [actionCards.length]);

  // Smooth Autoplay interval with clean reset on slide change / interaction
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === actionCards.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex, actionCards.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <div
      className="w-full relative min-h-[780px] lg:min-h-[880px] xl:h-[95dvh] overflow-hidden bg-black flex flex-col justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-90 scale-105 transition-transform duration-1000"
        >
          <source src="/toyota-video.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle cinematic gradient fade towards the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Center-Stage Carousel Container */}
      <div className="relative z-10 w-full overflow-hidden pb-8 sm:pb-12">
        {/* Center-Stage Carousel Track */}
        <div className="relative w-full overflow-visible py-4">
          <div className="relative w-full" style={{ height: 'auto' }}>
            <motion.div
              className="flex items-center"
              style={{
                position: 'relative',
                left: '50%',
                gap: `${gap}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              animate={{
                x: -(currentIndex * (cardWidth + gap) + cardWidth / 2),
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
                mass: 0.85,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => {
                setIsDragging(false);
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
                  handlePrev();
                }
              }}
            >
              {actionCards.map((action, idx) => {
                const { Icon } = action;
                const isActive = currentIndex === idx;

                return (
                  <motion.div
                    key={action.id}
                    onClick={() => {
                      if (isActive) {
                        openModal('', action.intent);
                      } else {
                        setCurrentIndex(idx);
                      }
                    }}
                    animate={{
                      scale: isActive ? 1 : 0.93,
                      opacity: isActive ? 1 : 0.42,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative shrink-0 rounded-none border transition-all duration-500 ease-[0.25,1,0.5,1] overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col justify-between ${
                      isActive
                        ? 'border-white/20 bg-gradient-to-b from-white/[0.06] via-black/90 to-black/95 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(235,10,30,0.08),inset_0_1px_0_0_rgba(255,255,255,0.18)] z-20 cursor-pointer'
                        : 'border-white/10 bg-black/60 backdrop-blur-md shadow-lg z-10 cursor-pointer hover:opacity-75 hover:border-white/20'
                    }`}
                    style={{
                      width: `${cardWidth}px`,
                      minHeight: '340px',
                    }}
                  >
                    {/* Ambient Interior Depth Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-[#eb0a1e]/[0.06] transition-opacity duration-700 pointer-events-none ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Card Header */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* Architectural Squircle Badge */}
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                              isActive
                                ? 'border border-white/25 bg-white/[0.08] text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                                : 'border border-white/10 bg-white/[0.03] text-white/70'
                            }`}
                          >
                            <Icon size={22} strokeWidth={1.6} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#eb0a1e] animate-pulse" />
                              )}
                              <span className="font-display text-[9px] font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block">
                                {action.tag}
                              </span>
                            </div>
                            <span className="font-display text-[9px] font-medium tracking-[0.15em] text-white/50 uppercase">
                              {action.subTag}
                            </span>
                          </div>
                        </div>

                        {action.badge && (
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-display font-bold tracking-[0.2em] uppercase bg-white/[0.05] border border-white/10 text-white/80">
                            <Sparkles size={10} className="text-[#eb0a1e]" />
                            {action.badge}
                          </span>
                        )}
                      </div>

                      {/* Card Title */}
                      <h3 className="font-druk text-3xl sm:text-4xl text-white uppercase tracking-wider mb-2 leading-tight">
                        {action.title}
                      </h3>

                      {/* Card Description */}
                      <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-5">
                        {action.description}
                      </p>

                      {/* Action Pills Section */}
                      <div className="mb-4">
                        <span className="font-display text-[8px] font-bold tracking-[0.25em] text-white/40 uppercase block mb-2">
                          {action.pillsTitle}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {action.pills.map((pill, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2.5 py-1 text-[10px] font-display font-semibold tracking-wider uppercase bg-white/[0.03] border border-white/10 text-white/80"
                            >
                              {pill.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="relative z-10 pt-4 border-t border-white/10 mt-auto">
                      {/* Perks */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 text-[10px] font-display font-medium tracking-wider text-white/60 uppercase">
                        {action.perks.map((perk, kIdx) => (
                          <div key={kIdx} className="flex items-center gap-1.5 truncate">
                            <CheckCircle2 size={12} className="text-[#eb0a1e] shrink-0" />
                            <span className="truncate">{perk}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="flex items-center justify-between pt-2 text-[11px] font-display font-bold tracking-[0.2em] uppercase text-white group-hover:text-[#eb0a1e] transition-colors">
                        <span className="flex items-center gap-2">
                          {action.cta}
                          <ArrowRight size={16} className="text-[#eb0a1e]" />
                        </span>
                        <span className="text-[10px] text-white/40 font-mono tracking-widest hidden sm:inline">
                          NIPPON TOYOTA KERALA
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Pagination Circles with Circular Countdown Progress Ring */}
        <div className="flex justify-center items-center gap-3.5 mt-6">
          {actionCards.map((action, dotIdx) => {
            const isActive = currentIndex === dotIdx;
            return (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className="group relative flex items-center justify-center w-8 h-8 p-0 focus:outline-none transition-transform"
                aria-label={`Go to slide ${dotIdx + 1}: ${action.title}`}
              >
                {isActive ? (
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    {/* SVG Circular Countdown Ring */}
                    <svg className="w-7 h-7 -rotate-90 origin-center" viewBox="0 0 28 28">
                      {/* Outer Dim Track Circle */}
                      <circle
                        cx="14"
                        cy="14"
                        r="11"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="1.5"
                      />
                      {/* Active Smooth Animated Progress Circle */}
                      <motion.circle
                        key={`circle-progress-${currentIndex}-${isPaused}`}
                        cx="14"
                        cy="14"
                        r="11"
                        fill="none"
                        stroke="#eb0a1e"
                        strokeWidth="2"
                        strokeDasharray={69.12}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 69.12 }}
                        animate={{ strokeDashoffset: isPaused ? undefined : 0 }}
                        transition={{
                          duration: isPaused ? 0 : AUTOPLAY_DURATION / 1000,
                          ease: 'linear',
                        }}
                      />
                    </svg>
                    {/* Center Active Dot */}
                    <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                  </div>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-white/25 group-hover:bg-white/70 group-hover:scale-125 transition-all duration-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
