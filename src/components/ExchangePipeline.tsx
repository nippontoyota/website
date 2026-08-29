"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, Loader2, MapPin, Repeat } from 'lucide-react';
import Image from 'next/image';
import { cars } from './Vehicles'; // reusing cars data

const LOCATIONS = [
  "Nettoor, Kochi",
  "Nippon Towers, Ernakulam",
  "Kazhakootam, Trivandrum",
  "Enchakkal, Trivandrum",
  "Nattakom, Kottayam",
  "Ayyanthole, Thrissur"
];

const BRANDS = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Toyota", "Kia", "Honda", 
  "Volkswagen", "Skoda", "MG", "Renault", "Nissan", "Jeep", "Other"
];

const MODELS: Record<string, string[]> = {
  "Maruti Suzuki": ["Swift", "Baleno", "WagonR", "Alto", "Dzire", "Brezza", "Ertiga", "Fronx", "Grand Vitara", "Other"],
  "Hyundai": ["Creta", "Venue", "i20", "Grand i10 Nios", "Verna", "Aura", "Tucson", "Alcazar", "Other"],
  "Tata": ["Nexon", "Punch", "Tiago", "Harrier", "Altroz", "Safari", "Tigor", "Other"],
  "Mahindra": ["Scorpio", "XUV700", "Thar", "XUV300", "Bolero", "XUV400", "Other"],
  "Toyota": ["Innova Crysta", "Innova Hycross", "Fortuner", "Glanza", "Urban Cruiser Hyryder", "Hilux", "Other"],
  "Kia": ["Seltos", "Sonet", "Carens", "Other"],
  "Honda": ["City", "Amaze", "Elevate", "Other"],
  "Volkswagen": ["Virtus", "Taigun", "Polo", "Vento", "Other"],
  "Skoda": ["Slavia", "Kushaq", "Octavia", "Superb", "Other"],
  "MG": ["Hector", "Astor", "Gloster", "Comet EV", "Other"],
  "Renault": ["Kiger", "Triber", "Kwid", "Other"],
  "Nissan": ["Magnite", "Kicks", "Other"],
  "Jeep": ["Compass", "Meridian", "Other"],
  "Other": ["Other"]
};

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 2010 + 1 }, (_, i) => currentYear - i);

export default function ExchangePipeline() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMakeDropdownOpen, setIsMakeDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    currentMake: '',
    currentModel: '',
    currentYear: '',
    targetCar: '',
    location: '',
    name: '',
    phone: '',
  });

  const goToStep = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.currentMake && formData.currentModel && formData.currentYear) {
      goToStep(2);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.name || !formData.phone) return;
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType: 'EXCHANGE',
          name: formData.name,
          phone: formData.phone,
          targetCar: formData.targetCar,
          location: formData.location,
          currentCar: `${formData.currentYear} ${formData.currentMake} ${formData.currentModel}`
        })
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95
    })
  };

  if (status === 'success') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
        <h3 className="font-druk text-3xl md:text-5xl text-white uppercase tracking-wider mb-4">Request Received</h3>
        <p className="text-white/70 max-w-md font-light text-lg">
          Our valuation expert from <strong className="text-white">{formData.location}</strong> will contact you shortly regarding your {formData.currentMake} {formData.currentModel}.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      {/* Header */}
      <div className="shrink-0 mb-8 md:mb-12 border-b border-white/10 pb-6">
        <div className="flex items-center">
          {step > 1 && (
            <button 
              onClick={() => goToStep(step - 1)}
              className="mr-6 text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div>
            <h3 className="font-druk text-2xl md:text-3xl text-[#eb0a1e] uppercase tracking-wider leading-none flex items-center gap-3">
              <Repeat size={24} className="text-[#eb0a1e]" />
              Exchange & Upgrade
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
          
          {/* STEP 1: CURRENT CAR */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col justify-start md:justify-center pt-4 md:pt-0 pb-12 pr-2"
            >
              <div className="max-w-2xl mx-auto w-full text-center mb-10">
                <h4 className="font-druk text-4xl text-white uppercase tracking-widest mb-3">Your Current Car</h4>
                <p className="text-white/60 font-light">Tell us what you&apos;re driving to get an instant valuation estimate.</p>
              </div>
              
              <form onSubmit={handleStep1Submit} className="space-y-6 max-w-xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Make Select */}
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Make / Brand</label>
                    <input type="text" className="hidden" required value={formData.currentMake} onChange={() => {}} />
                    <div className="relative">
                      <div 
                        onClick={() => { setIsMakeDropdownOpen(!isMakeDropdownOpen); setIsModelDropdownOpen(false); setIsYearDropdownOpen(false); }}
                        className={`w-full bg-white/5 border px-4 py-4 flex justify-between items-center cursor-pointer transition-colors ${
                          isMakeDropdownOpen ? 'border-[#eb0a1e]' : 'border-white/20 hover:border-white/50'
                        }`}
                      >
                        <span className={`text-lg font-display uppercase ${formData.currentMake ? 'text-white' : 'text-white/40'}`}>
                          {formData.currentMake || "Select Make"}
                        </span>
                        <motion.div animate={{ rotate: isMakeDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-white/40 text-xs">▼</motion.div>
                      </div>
                      <AnimatePresence>
                        {isMakeDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 top-[100%] mt-1 bg-[#111] border border-white/20 rounded-sm shadow-2xl z-50 overflow-hidden"
                          >
                            <div className="max-h-[250px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-track]:bg-transparent">
                              {BRANDS.map(brand => (
                                <div
                                  key={brand}
                                  onClick={() => {
                                    setFormData({...formData, currentMake: brand, currentModel: ''});
                                    setIsMakeDropdownOpen(false);
                                  }}
                                  className={`px-4 py-3 cursor-pointer transition-colors text-sm font-bold uppercase tracking-wider ${
                                    formData.currentMake === brand ? 'bg-[#eb0a1e] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  {brand}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Model Select */}
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Model</label>
                    <input type="text" className="hidden" required value={formData.currentModel} onChange={() => {}} />
                    <div className="relative">
                      <div 
                        onClick={() => { 
                          if(formData.currentMake) {
                            setIsModelDropdownOpen(!isModelDropdownOpen); 
                            setIsMakeDropdownOpen(false); 
                            setIsYearDropdownOpen(false);
                          }
                        }}
                        className={`w-full bg-white/5 border px-4 py-4 flex justify-between items-center transition-colors ${
                          !formData.currentMake ? 'opacity-50 cursor-not-allowed border-white/10' : 
                          isModelDropdownOpen ? 'border-[#eb0a1e] cursor-pointer' : 'border-white/20 hover:border-white/50 cursor-pointer'
                        }`}
                      >
                        <span className={`text-lg font-display uppercase ${formData.currentModel ? 'text-white' : 'text-white/40'}`}>
                          {formData.currentModel || (formData.currentMake ? "Select Model" : "Select Make First")}
                        </span>
                        <motion.div animate={{ rotate: isModelDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-white/40 text-xs">▼</motion.div>
                      </div>
                      <AnimatePresence>
                        {isModelDropdownOpen && formData.currentMake && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 top-[100%] mt-1 bg-[#111] border border-white/20 rounded-sm shadow-2xl z-50 overflow-hidden"
                          >
                            <div className="max-h-[250px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-track]:bg-transparent">
                              {(MODELS[formData.currentMake] || ["Other"]).map(model => (
                                <div
                                  key={model}
                                  onClick={() => {
                                    setFormData({...formData, currentModel: model});
                                    setIsModelDropdownOpen(false);
                                  }}
                                  className={`px-4 py-3 cursor-pointer transition-colors text-sm font-bold uppercase tracking-wider ${
                                    formData.currentModel === model ? 'bg-[#eb0a1e] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  {model}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Year Select */}
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Registration Year</label>
                  <input type="text" className="hidden" required value={formData.currentYear} onChange={() => {}} />
                  <div className="relative">
                    <div 
                      onClick={() => { setIsYearDropdownOpen(!isYearDropdownOpen); setIsMakeDropdownOpen(false); setIsModelDropdownOpen(false); }}
                      className={`w-full bg-white/5 border px-4 py-4 flex justify-between items-center cursor-pointer transition-colors ${
                        isYearDropdownOpen ? 'border-[#eb0a1e]' : 'border-white/20 hover:border-white/50'
                      }`}
                    >
                      <span className={`text-lg font-display uppercase ${formData.currentYear ? 'text-white' : 'text-white/40'}`}>
                        {formData.currentYear || "Select Year"}
                      </span>
                      <motion.div 
                        animate={{ rotate: isYearDropdownOpen ? 180 : 0 }} 
                        transition={{ duration: 0.3 }}
                        className="text-white/40 text-xs"
                      >
                        ▼
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isYearDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 right-0 top-[100%] mt-1 bg-[#111] border border-white/20 rounded-sm shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="max-h-[250px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-track]:bg-transparent">
                            {YEARS.map(y => (
                              <div
                                key={y}
                                onClick={() => {
                                  setFormData({...formData, currentYear: String(y)});
                                  setIsYearDropdownOpen(false);
                                }}
                                className={`px-4 py-3 text-sm font-display uppercase cursor-pointer transition-colors flex items-center justify-between ${
                                  formData.currentYear === String(y)
                                    ? 'bg-[#eb0a1e] text-white' 
                                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                <span>{y}</span>
                                {formData.currentYear === String(y) && (
                                  <span className="text-white text-xs">✓</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    className="w-full bg-white hover:bg-[#eb0a1e] text-black hover:text-white transition-colors duration-500 py-4 flex items-center justify-center space-x-3 group rounded-sm"
                  >
                    <span className="text-sm font-bold tracking-[0.3em] uppercase">Next Step</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2: SELECT UPGRADE CAR */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="text-center mb-8 shrink-0">
                <h4 className="font-druk text-3xl md:text-4xl text-white uppercase tracking-widest mb-2">Select Your Upgrade</h4>
                <p className="text-white/60 font-light text-sm">Which Toyota are you looking to drive home?</p>
              </div>

              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pr-2 pb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cars.map((car) => (
                    <div 
                      key={car.id}
                      onClick={() => {
                        setFormData({ ...formData, targetCar: car.name });
                        goToStep(3);
                      }}
                      className="group relative aspect-[4/3] bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden cursor-pointer hover:bg-[#eb0a1e]/10 hover:border-[#eb0a1e]/50 transition-all duration-300 flex flex-col items-center justify-center p-2"
                    >
                      {car.image && (
                        <div className="relative w-full h-[70%] mb-2">
                          <Image src={car.image} alt={car.name} fill sizes="33vw" className="object-contain transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      <span className="font-display font-bold text-xs md:text-sm text-center tracking-[0.2em] text-white uppercase mt-auto">
                        {car.name.replace('URBAN CRUISER ', '').replace('INNOVA ', '').replace(' 300', '')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: VALUATION CONTACT DETAILS */}
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
              <div className="max-w-2xl mx-auto w-full text-center mb-10">
                <h4 className="font-druk text-4xl text-white uppercase tracking-widest mb-3">Get Your Valuation</h4>
                <p className="text-white/60 font-light">Where should we send the valuation for your {formData.currentMake}?</p>
              </div>

              <form onSubmit={handleFinalSubmit} className="space-y-6 max-w-xl mx-auto w-full">
                
                {/* Location Select */}
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Preferred Dealership</label>
                  <input type="text" className="hidden" required value={formData.location} onChange={() => {}} />
                  <div className="relative flex items-center border border-white/20 focus-within:border-[#eb0a1e] bg-white/5 transition-colors">
                    <MapPin className="text-white/40 ml-4" size={20} />
                    <div className="relative w-full">
                      <div 
                        onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        className={`w-full bg-transparent px-4 py-4 flex justify-between items-center cursor-pointer`}
                      >
                        <span className={`text-lg font-display ${formData.location ? 'text-white' : 'text-white/40'}`}>
                          {formData.location || "Select Nearest Showroom"}
                        </span>
                        <motion.div 
                          animate={{ rotate: isLocationDropdownOpen ? 180 : 0 }} 
                          transition={{ duration: 0.3 }}
                          className="text-white/40 text-xs"
                        >
                          ▼
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {isLocationDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 top-[100%] mt-1 bg-[#111] border border-white/20 rounded-sm shadow-2xl z-50 overflow-hidden"
                          >
                            <div className="max-h-[250px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-track]:bg-transparent">
                              {LOCATIONS.map(loc => (
                                <div
                                  key={loc}
                                  onClick={() => {
                                    setFormData({...formData, location: loc});
                                    setIsLocationDropdownOpen(false);
                                  }}
                                  className={`px-4 py-3 text-sm font-display cursor-pointer transition-colors flex items-center justify-between ${
                                    formData.location === loc
                                      ? 'bg-[#eb0a1e] text-white' 
                                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  <span>{loc}</span>
                                  {formData.location === loc && (
                                    <span className="text-white text-xs">✓</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/20 px-4 py-4 text-white text-lg font-display uppercase placeholder-white/20 outline-none focus:border-[#eb0a1e] focus:bg-white/10 transition-colors"
                      placeholder=""
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Mobile (WhatsApp)</label>
                    <div className="relative flex items-center border border-white/20 focus-within:border-[#eb0a1e] bg-white/5 transition-colors">
                      <span className="text-white/50 text-sm font-bold ml-4">+91</span>
                      <input 
                        type="tel" 
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setFormData({...formData, phone: val});
                        }}
                        className="w-full bg-transparent px-3 py-4 text-white text-lg font-display tracking-widest placeholder-white/20 outline-none"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-[#eb0a1e] hover:bg-white text-white hover:text-[#eb0a1e] transition-colors duration-500 py-5 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-[0_0_20px_rgba(235,10,30,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                  >
                    {status === 'submitting' ? (
                      <Loader2 size={20} className="animate-spin text-white" />
                    ) : (
                      <>
                        <span className="text-sm font-bold tracking-[0.3em] uppercase">Get Valuation</span>
                        <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
