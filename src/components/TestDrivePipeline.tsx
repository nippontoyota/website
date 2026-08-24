import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ArrowRight, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';
import { cars } from './Vehicles';

const LOCATIONS = [
  "KALAMASSERY - SHOWROOM",
  "NETTOOR - SHOWROOM",
  "TRIVANDRUM - SHOWROOM",
];

export default function TestDrivePipeline() {
  const { prefilledModel, closeModal } = useLeadStore();
  
  // If a car was pre-selected from the showroom, skip to Step 2
  const [step, setStep] = useState(prefilledModel ? 2 : 1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  
  const [formData, setFormData] = useState({
    car: prefilledModel || '',
    location: '',
    name: '',
    phone: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const goToStep = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Format model string for the backend payload
      const finalModelString = `[TEST DRIVE - ${formData.location.split(' -')[0]}] ${formData.car}`;

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          model: finalModelString
        }),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setTimeout(() => closeModal(), 3000);
    } catch {
      setStatus('error');
    }
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir === 1 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir === 1 ? -50 : 50 })
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-[400px] text-center"
      >
        <div className="w-20 h-20 rounded-full bg-[#eb0a1e]/20 flex items-center justify-center mb-6 text-[#eb0a1e]">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="font-druk text-3xl md:text-4xl text-white uppercase tracking-wider mb-3">Test Drive Confirmed</h3>
        <p className="text-white/70 font-light text-sm md:text-base max-w-sm">
          A Toyota specialist from our {formData.location.split(' -')[0]} showroom will contact you shortly to confirm your time.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full flex-1 w-full min-h-[450px]">
      
      {/* Header & Back Button */}
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6 relative z-10">
        <div className="flex items-center">
          {step > 1 && status !== 'submitting' && (
            <button 
              onClick={() => goToStep(step - 1)}
              className="mr-4 text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div>
            <h3 className="font-druk text-2xl md:text-3xl text-white uppercase tracking-wider leading-none">
              Book a Test Drive
            </h3>
            <p className="text-white/50 font-sans text-xs uppercase tracking-[0.2em] mt-2">
              Step {step} of 3
            </p>
          </div>
        </div>
      </div>

      {/* Step Content container */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          
          {/* STEP 1: SELECT CAR */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden pr-2"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-3 pb-8">
                {cars.map((car) => (
                  <div 
                    key={car.id}
                    onClick={() => {
                      setFormData({ ...formData, car: car.name });
                      goToStep(2);
                    }}
                    className={`group relative aspect-[4/3] bg-black/40 backdrop-blur-md border border-white/10 rounded-none overflow-hidden cursor-pointer hover:bg-black/60 hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center p-2 pb-2 ${formData.car === car.name ? 'ring-2 ring-[#eb0a1e] bg-black/80 border-transparent' : ''}`}
                  >
                    {car.image && (
                      <div className="relative w-full h-[75%] mb-1">
                        <Image src={car.image} alt={car.name} fill sizes="33vw" className="object-contain" />
                      </div>
                    )}
                    <span className="font-display font-bold text-xs md:text-sm text-center tracking-[0.2em] text-white uppercase mt-auto">
                      {car.name.replace('URBAN CRUISER ', '').replace('INNOVA ', '').replace(' 300', '')}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SELECT LOCATION */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col justify-start md:justify-center pt-4 md:pt-0 pb-12 pr-2"
            >
              <div className="max-w-4xl mx-auto w-full text-center mb-10">
                <p className="text-white/60 text-lg md:text-xl font-light">Where would you like to experience the <strong className="text-white font-display font-bold tracking-widest">{formData.car}</strong>?</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto w-full">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setFormData({ ...formData, location: loc });
                      goToStep(3);
                    }}
                    className="flex flex-col items-center justify-center p-8 bg-black/40 border border-white/10 hover:border-[#eb0a1e] hover:bg-black/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#eb0a1e]/10 transition-all duration-300 rounded-sm group text-center py-8 md:py-0 md:aspect-video relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#eb0a1e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <MapPin className="text-white/30 group-hover:text-[#eb0a1e] transition-colors duration-300 mb-4 transform group-hover:scale-110" size={36} strokeWidth={1.5} />
                    <span className="font-druk text-xl md:text-2xl text-white tracking-widest z-10">{loc.split(' -')[0]}</span>
                    <span className="text-white/40 text-xs tracking-[0.2em] mt-3 uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">Select Location</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONTACT DETAILS */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col justify-start md:justify-center pt-4 md:pt-0 pb-12 pr-2"
            >
              <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto w-full">
                {/* Name Input */}
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-2xl md:text-3xl font-druk uppercase tracking-wider placeholder-white/60 outline-none focus:border-[#eb0a1e] transition-colors caret-white"
                    placeholder="NAME"
                  />
                </div>

                {/* Phone Input */}
                <div className="relative flex items-center border-b border-white/20 focus-within:border-[#eb0a1e] transition-colors">
                  <span className="text-white/70 text-2xl md:text-3xl font-druk tracking-wider mr-4 py-4 select-none">+91</span>
                  <input 
                    type="tel" 
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setFormData({...formData, phone: val});
                    }}
                    className="w-full bg-transparent px-0 py-4 text-white text-2xl md:text-3xl font-druk uppercase tracking-wider placeholder-white/60 outline-none caret-white"
                    placeholder="PHONE"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-white hover:bg-[#eb0a1e] text-black hover:text-white transition-colors duration-500 py-5 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                  >
                    {status === 'submitting' ? (
                      <Loader2 size={18} className="animate-spin text-white/60" />
                    ) : (
                      <>
                        <span className="text-sm font-bold tracking-[0.3em] uppercase">Confirm Booking</span>
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  {status === 'error' && (
                    <p className="text-[#eb0a1e] text-xs text-center mt-4">Something went wrong. Please try again.</p>
                  )}
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
