"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';

const POPULAR_MODELS = [
  "Innova Hycross",
  "Fortuner",
  "Hyryder",
  "Glanza",
  "Innova Crysta",
  "Hilux",
  "Legender",
  "All Models"
];

const STORAGE_KEY = 'nippon_exit_intent_dismissed';
const COOLDOWN_DAYS = 7;

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedModel, setSelectedModel] = useState('Innova Hycross');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [offerConfig, setOfferConfig] = useState({
    enabled: true,
    headline: 'BEFORE YOU GO.',
    subheadline: 'Get the official 2026 Kerala on-road price breakdown, waiting periods, and current showroom exchange bonuses sent directly to your phone.',
    voucherAmount: '₹25,000',
    perkDetails: ['Applicable on All 2026 Toyota Bookings', 'Instant WhatsApp Voucher Delivery', 'Valid at Kochi, Trivandrum & Thrissur Showrooms'],
  });

  const { isOpen: isGlobalLeadOpen, openModal } = useLeadStore();

  // Sync with Admin Campaign settings
  useEffect(() => {
    fetch('/api/public/store')
      .then((res) => res.json())
      .then((data) => {
        if (data?.campaigns?.exitIntentOffer) {
          setOfferConfig(data.campaigns.exitIntentOffer);
        }
      })
      .catch((err) => console.log('Exit offer sync error:', err));
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // Storage unavailable
    }
  }, []);

  useEffect(() => {
    if (!offerConfig.enabled) return;

    try {
      const lastDismissed = localStorage.getItem(STORAGE_KEY);
      if (lastDismissed) {
        const timeDiff = Date.now() - parseInt(lastDismissed, 10);
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        if (daysDiff < COOLDOWN_DAYS) {
          return;
        }
      }
    } catch {
      // Storage unavailable
    }

    // Desktop/fine-pointer only
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    let isEligible = false;
    const timer = setTimeout(() => {
      isEligible = true;
    }, 6000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && isEligible && !isGlobalLeadOpen && offerConfig.enabled) {
        setIsOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGlobalLeadOpen, handleClose, offerConfig.enabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 10) {
      setErrorMessage('PLEASE ENTER A VALID 10-DIGIT PHONE NUMBER');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType: 'PRICE_LIST',
          name: name.trim() || 'Valued Visitor',
          phone: phone.trim(),
          targetCar: selectedModel,
          location: 'Website Exit Intent',
          currentCar: '-',
          extraInfo: 'Requested 2026 Kerala On-Road Price List & Offers via Exit-Intent Popup'
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setStatus('success');
      try {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      } catch {
        // Storage unavailable
      }

      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch {
      setStatus('error');
      setErrorMessage('SUBMISSION FAILED. PLEASE TRY AGAIN.');
    }
  };

  const switchToTestDrive = () => {
    handleClose();
    openModal(selectedModel === 'All Models' ? '' : selectedModel, 'TEST_DRIVE');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#080808] border border-white/15 p-5 sm:p-10 md:p-12 z-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] text-white max-h-[92vh] overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#eb0a1e] rounded-full animate-pulse" />
                <span className="font-display font-bold text-[10px] tracking-[0.25em] text-white/60 uppercase">
                  NIPPON TOYOTA KERALA
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Close dialog"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#eb0a1e]/20 flex items-center justify-center mb-6 text-[#eb0a1e]">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-druk text-4xl text-white uppercase tracking-wider mb-3">
                  PRICE LIST DISPATCHED
                </h3>
                <p className="text-white/70 font-light text-sm max-w-md leading-relaxed">
                  A Toyota specialist will share the latest 2026 Kerala on-road pricing and showroom benefits for <strong className="text-white font-medium">{selectedModel}</strong> shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Headline & Description */}
                <div className="flex items-center gap-2 mb-2">
                  {offerConfig.voucherAmount && (
                    <span className="px-2.5 py-0.5 text-[9px] font-display font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {offerConfig.voucherAmount} Voucher Active
                    </span>
                  )}
                </div>
                <h2 className="font-druk text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-3">
                  {offerConfig.headline || 'BEFORE YOU GO.'}
                </h2>
                <p className="text-white/60 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-lg mb-8">
                  {offerConfig.subheadline || 'Get the official 2026 Kerala on-road price breakdown, waiting periods, and current showroom exchange bonuses sent directly to your phone.'}
                </p>

                {/* Model Selector */}
                <div className="mb-8">
                  <label className="block text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase mb-3 font-display">
                    CHOOSE YOUR CAR
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {POPULAR_MODELS.map((model) => (
                      <button
                        key={model}
                        type="button"
                        onClick={() => setSelectedModel(model)}
                        className={`py-3 px-2 text-center text-[10px] font-display font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                          selectedModel === model
                            ? 'border-[#eb0a1e] bg-[#eb0a1e] text-white'
                            : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/30'
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase mb-1 font-display">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ENTER NAME"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white text-xl md:text-2xl font-druk uppercase tracking-wider placeholder-white/25 outline-none focus:border-[#eb0a1e] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase mb-1 font-display">
                      PHONE NUMBER <span className="text-[#eb0a1e]">*</span>
                    </label>
                    <div className="flex items-center border-b border-white/20 focus-within:border-[#eb0a1e] transition-colors">
                      <span className="text-white/50 text-xl md:text-2xl font-druk tracking-wider mr-3 py-3 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-DIGIT NUMBER"
                        className="w-full bg-transparent py-3 text-white text-xl md:text-2xl font-druk uppercase tracking-wider placeholder-white/25 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-[10px] font-bold tracking-widest text-[#eb0a1e] uppercase mb-4 font-display">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group/btn relative w-full overflow-hidden bg-[#eb0a1e] border border-[#eb0a1e] text-white py-5 px-8 font-bold text-[11px] tracking-[0.25em] uppercase transition-all duration-500 hover:bg-[#c90013] hover:shadow-[0_0_40px_rgba(235,10,30,0.4)] flex items-center justify-between disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        PROCESSING REQUEST...
                      </>
                    ) : (
                      'GET ON-ROAD PRICE & OFFERS'
                    )}
                  </span>
                  <ArrowRight size={16} className="transform group-hover/btn:translate-x-2 transition-transform duration-500 relative z-10" />
                </button>

                {/* Microcopy & Secondary Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 mt-6 border-t border-white/10 text-[10px] font-display font-bold tracking-[0.2em] text-white/40 uppercase">
                  <span>DIRECT ON-ROAD PRICING · NO SPAM</span>
                  <button
                    type="button"
                    onClick={switchToTestDrive}
                    className="text-white hover:text-[#eb0a1e] transition-colors underline underline-offset-4"
                  >
                    BOOK DOORSTEP TEST DRIVE INSTEAD →
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
