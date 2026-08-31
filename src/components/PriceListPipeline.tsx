/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, X, ArrowRight } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';
import { Loader2 } from 'lucide-react';
import { cars } from './Vehicles';

const LOCATIONS = [
  "Nettoor, Kochi",
  "Nippon Towers, Ernakulam",
  "Kazhakootam, Trivandrum",
  "Enchakkal, Trivandrum",
  "Nattakom, Kottayam",
  "Ayyanthole, Thrissur"
];

export default function PriceListPipeline() {
  const { closeModal } = useLeadStore();
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [direction, setDirection] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', location: '' });
  const [status, setStatus] = useState('idle');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  
  const handleEmiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.name || !formData.phone) return;
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType: 'EMI_CHECK',
          name: formData.name,
          phone: formData.phone,
          targetCar: `${selectedCar?.name} (${selectedGrade})`,
          location: formData.location
        })
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      // No auto close, user can read the success message
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 h-full bg-[#111]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8 mx-auto"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
        <h3 className="font-druk text-3xl md:text-5xl text-white uppercase tracking-wider mb-4">Request Sent!</h3>
        <p className="text-white/70 max-w-md mx-auto font-light text-lg mb-12">
          Our team will contact you shortly with the best EMI offers for the <strong className="text-white">{selectedCar?.name}</strong>.
        </p>
        <button 
          onClick={closeModal}
          className="bg-[#eb0a1e] hover:bg-white text-white hover:text-[#eb0a1e] transition-colors duration-300 py-4 px-12 rounded-sm font-bold tracking-[0.2em] uppercase text-xs"
        >
          Close
        </button>
      </div>
    );
  }

  const generateVariants = (car: any) => {
    if (!car) return { petrol: [], hybridOrCng: [], type: '' };
    
    const priceStr = car.stats?.[0]?.value || "";
    const matches = [...priceStr.matchAll(/([\d.]+)/g)];
    let minLakhs = 8.00;
    let maxLakhs = 12.00;
    
    if (matches.length >= 2) {
      minLakhs = parseFloat(matches[0][0]);
      maxLakhs = parseFloat(matches[1][0]);
    } else if (matches.length === 1) {
      minLakhs = parseFloat(matches[0][0]);
      maxLakhs = minLakhs;
    }

    const formatPrice = (lakhs: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(lakhs * 100000);
    };

    const petrol = [];
    const hybridOrCng = [];
    let hybridType = "CNG";

    if (maxLakhs === minLakhs) {
      petrol.push({ id: 1, grade: "Standard", summary: "Automatic", priceStr: formatPrice(minLakhs) });
    } else {
      petrol.push({ id: 1, grade: "E MT", summary: "Manual", priceStr: formatPrice(minLakhs) });
      petrol.push({ id: 2, grade: "S MT", summary: "Manual", priceStr: formatPrice(minLakhs + (maxLakhs - minLakhs) * 0.25) });
      petrol.push({ id: 3, grade: "G CVT", summary: "Automatic", priceStr: formatPrice(minLakhs + (maxLakhs - minLakhs) * 0.6) });
      petrol.push({ id: 4, grade: "V AT", summary: "Automatic", priceStr: formatPrice(maxLakhs) });
    }

    const isHighEnd = car.name.includes("HYBRID") || car.name.includes("HYCROSS") || car.name.includes("CAMRY") || car.name.includes("VELLFIRE") || car.name.includes("LAND CRUISER");
    
    if (isHighEnd) {
      hybridType = "HYBRID";
      hybridOrCng.push({ id: 1, grade: "VX Hybrid", summary: "Automatic", priceStr: formatPrice(maxLakhs * 1.05) });
      hybridOrCng.push({ id: 2, grade: "ZX Hybrid", summary: "Automatic", priceStr: formatPrice(maxLakhs * 1.15) });
    } else if (car.name !== "HILUX" && car.name !== "FORTUNER") {
      hybridType = "CNG";
      hybridOrCng.push({ id: 1, grade: "S MT CNG", summary: "Manual", priceStr: formatPrice(minLakhs + 0.9) });
      hybridOrCng.push({ id: 2, grade: "G MT CNG", summary: "Manual", priceStr: formatPrice(minLakhs + 1.2) });
    }

    return { petrol, hybridOrCng, type: hybridType };
  };

  const currentVariants = generateVariants(selectedCar);
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(8px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(8px)'
    })
  };

  return (
    <div className="h-full bg-transparent flex flex-col relative text-white">
      {/* Top Nav */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50">
        <div className="w-12">
          {step > 1 && (
            <button 
              onClick={() => { setDirection(-1); setStep(step - 1); }}
              className="text-white/60 hover:text-white transition-colors p-2 -ml-2"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        <div className="flex-1 text-center">
          <h3 className="font-druk text-xl md:text-2xl text-[#eb0a1e] uppercase tracking-wider leading-none">
            Price Lists
          </h3>
          <p className="text-white/50 font-sans text-[10px] uppercase tracking-[0.2em] mt-1">
            Step {step} of 2
          </p>
        </div>
        <div className="w-12 flex justify-end">
          <button 
            onClick={closeModal}
            className="text-white/60 hover:text-white transition-colors p-2 -mr-2 bg-white/5 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative mt-24">
        <AnimatePresence mode="wait" custom={direction}>
          
          {/* STEP 1: SELECT MODEL */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col justify-start pt-8 pb-12 px-2"
            >
              <div className="max-w-2xl mx-auto w-full text-center mb-8">
                <h4 className="font-druk text-3xl md:text-4xl text-white uppercase tracking-widest mb-2">Select a Model</h4>
                <p className="text-white/60 font-light text-sm md:text-base">Which Toyota would you like to explore?</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto w-full">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => {
                      setSelectedCar(car);
                      setDirection(1);
                      setStep(2);
                    }}
                    className="group relative aspect-[4/3] bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden cursor-pointer hover:border-[#eb0a1e]/50 transition-all duration-300 flex flex-col items-center justify-center p-2 rounded-sm"
                  >
                    {car.image && (
                      <div className="relative w-full h-[70%] mb-2">
                        <Image src={car.image} alt={car.name} fill sizes="25vw" className="object-contain" />
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

          {/* STEP 2: PRICE TABLES */}
          {step === 2 && selectedCar && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent flex flex-col pt-4 pb-12 px-2 md:px-8"
            >
              <div className="w-full max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center space-x-6">
                    <div className="relative w-32 h-16 md:w-48 md:h-24">
                      <Image 
                        src={selectedCar.image} 
                        alt={selectedCar.name} 
                        fill sizes="25vw"
                        className="object-contain" 
                      />
                    </div>
                    <div>
                      <h2 className="font-druk text-3xl md:text-4xl text-white uppercase tracking-wider">
                        {selectedCar.name}
                      </h2>
                      <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
                        Ex-Showroom Estimates
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setDirection(-1);
                      setStep(1);
                    }}
                    className="hidden md:block text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors border border-white/20 px-4 py-2 rounded-sm hover:border-white/50"
                  >
                    Change Model
                  </button>
                </div>
                
                {/* Tables Grid */}
                <div className={`grid grid-cols-1 ${currentVariants.hybridOrCng.length > 0 ? 'lg:grid-cols-2' : ''} gap-8 md:gap-12 bg-white p-6 md:p-10 rounded-sm shadow-xl`}>
                  
                  {/* Primary Variants */}
                  <div>
                    <h3 className="font-sans font-bold text-2xl text-zinc-900 mb-4 flex items-center tracking-tight">
                      {selectedCar?.name === "HILUX" || selectedCar?.name === "FORTUNER" ? "Diesel" : "Petrol"}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-zinc-800">
                        <thead className="bg-[#444444] text-white font-bold text-[11px] tracking-wider">
                          <tr>
                            <th className="px-2 sm:px-4 py-3 whitespace-nowrap hidden sm:table-cell">Sl. No.</th>
                            <th className="px-2 sm:px-4 py-3">Grade</th>
                            <th className="px-2 sm:px-4 py-3 hidden md:table-cell">Summary</th>
                            <th className="px-2 sm:px-4 py-3">Ex-Showroom Price</th>
                            <th className="px-2 sm:px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {currentVariants.petrol.map((v, index) => (
                            <tr key={v.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-2 sm:px-4 py-3 sm:py-4 font-medium hidden sm:table-cell">{v.id}</td>
                              <td className="px-2 sm:px-4 py-3 sm:py-4">{v.grade}</td>
                              <td className="px-2 sm:px-4 py-3 sm:py-4 text-zinc-600 hidden md:table-cell">{v.summary}</td>
                              <td className="px-2 sm:px-4 py-3 sm:py-4 font-medium">{v.priceStr}</td>
                              <td className="px-2 sm:px-4 py-3 sm:py-4 text-right">
                                <button onClick={() => { setSelectedGrade(v.grade); setDirection(1); setStep(3); }} className="bg-[#666666] hover:bg-[#eb0a1e] text-white text-[9px] sm:text-[10px] px-2 sm:px-3 py-1.5 transition-colors whitespace-nowrap">Check EMI</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Secondary Variants (CNG/Hybrid) */}
                  {currentVariants.hybridOrCng.length > 0 && (
                    <div>
                      <h3 className="font-sans font-bold text-2xl text-zinc-900 mb-4 flex items-center tracking-tight">
                        {currentVariants.type}
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-zinc-800">
                          <thead className="bg-[#444444] text-white font-bold text-[11px] tracking-wider">
                            <tr>
                              <th className="px-2 sm:px-4 py-3 whitespace-nowrap hidden sm:table-cell">Sl. No.</th>
                              <th className="px-2 sm:px-4 py-3">Grade</th>
                              <th className="px-2 sm:px-4 py-3 hidden md:table-cell">Summary</th>
                              <th className="px-2 sm:px-4 py-3">Ex-Showroom Price</th>
                              <th className="px-2 sm:px-4 py-3"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {currentVariants.hybridOrCng.map((v, index) => (
                              <tr key={v.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="px-2 sm:px-4 py-3 sm:py-4 font-medium hidden sm:table-cell">{v.id}</td>
                                <td className="px-2 sm:px-4 py-3 sm:py-4">{v.grade}</td>
                                <td className="px-2 sm:px-4 py-3 sm:py-4 text-zinc-600 hidden md:table-cell">{v.summary}</td>
                                <td className="px-2 sm:px-4 py-3 sm:py-4 font-medium">{v.priceStr}</td>
                                <td className="px-2 sm:px-4 py-3 sm:py-4 text-right">
                                  <button onClick={() => { setSelectedGrade(v.grade); setDirection(1); setStep(3); }} className="bg-[#666666] hover:bg-[#eb0a1e] text-white text-[9px] sm:text-[10px] px-2 sm:px-3 py-1.5 transition-colors whitespace-nowrap">Check EMI</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
          {/* Step 3: EMI Lead Form */}
          <AnimatePresence mode="wait" custom={direction}>
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col justify-start pt-8 pb-12 px-2"
              >
                <div className="max-w-2xl mx-auto w-full text-center mb-10">
                  <h4 className="font-druk text-4xl text-white uppercase tracking-widest mb-3">Check EMI</h4>
                  <p className="text-white/60 font-light">
                    Get custom EMI offers for {selectedCar?.name} ({selectedGrade}).
                  </p>
                </div>

                <form onSubmit={handleEmiSubmit} className="space-y-6 max-w-xl mx-auto w-full">
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Preferred Location</label>
                    <input type="text" className="hidden" required value={formData.location} onChange={() => {}} />
                    <div className="relative">
                      <div 
                        onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        className={`w-full bg-white/5 border px-4 py-4 flex justify-between items-center cursor-pointer transition-colors ${
                          isLocationDropdownOpen ? 'border-[#eb0a1e]' : 'border-white/20 hover:border-white/50'
                        }`}
                      >
                        <span className={`text-lg font-display uppercase ${formData.location ? 'text-white' : 'text-white/40'}`}>
                          {formData.location || "Select Dealership"}
                        </span>
                        <motion.div animate={{ rotate: isLocationDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-white/40 text-xs">▼</motion.div>
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
                                  className={`px-4 py-3 cursor-pointer transition-colors text-sm font-bold uppercase tracking-wider ${
                                    formData.location === loc ? 'bg-[#eb0a1e] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  {loc}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/20 px-4 py-4 text-white text-lg font-display uppercase placeholder-white/20 outline-none focus:border-[#eb0a1e] focus:bg-white/10 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Phone Number</label>
                    <div className="flex">
                      <div className="bg-white/5 border border-white/20 border-r-0 px-4 py-4 flex items-center justify-center">
                        <span className="text-white/60 font-display text-lg">+91</span>
                      </div>
                      <input 
                        type="tel" 
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                        className="w-full bg-white/5 border border-white/20 px-4 py-4 text-white text-lg font-display uppercase placeholder-white/20 outline-none focus:border-[#eb0a1e] focus:bg-white/10 transition-colors"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <button 
                      type="button"
                      onClick={() => { setDirection(-1); setStep(2); }}
                      className="text-white/40 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors w-full md:w-auto py-4 md:py-0"
                    >
                      &larr; Back to Price List
                    </button>
                    
                    <button 
                      type="submit"
                      disabled={status !== 'idle'}
                      className="w-full md:w-auto bg-[#eb0a1e] hover:bg-white text-white hover:text-[#eb0a1e] transition-colors duration-300 py-4 px-12 rounded-sm font-bold tracking-[0.2em] uppercase text-xs disabled:opacity-50 flex items-center justify-center group"
                    >
                      {status === 'submitting' ? (
                        <><Loader2 size={16} className="animate-spin mr-2" /> Processing...</>
                      ) : status === 'success' ? (
                        "Request Sent!"
                      ) : status === 'error' ? (
                        "Error - Try Again"
                      ) : (
                        <><span className="mr-2">Get EMI Offers</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
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
