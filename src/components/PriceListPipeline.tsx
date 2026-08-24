import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, X, Download } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';
import { cars } from './Vehicles';

export default function PriceListPipeline() {
  const { closeModal } = useLeadStore();
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [direction, setDirection] = useState(1);

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
              className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col justify-start md:justify-center pt-4 md:pt-0 pb-12 pr-2"
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
                    className="group relative aspect-[4/3] bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden cursor-pointer hover:bg-[#eb0a1e]/10 hover:border-[#eb0a1e]/50 transition-all duration-300 flex flex-col items-center justify-center p-2 rounded-sm"
                  >
                    {car.image && (
                      <div className="relative w-full h-[70%] mb-2">
                        <Image src={car.image} alt={car.name} fill sizes="25vw" className="object-contain transform group-hover:scale-110 transition-transform duration-500" />
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
                        fill 
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-white p-6 md:p-10 rounded-sm shadow-xl">
                  
                  {/* Petrol Variants */}
                  <div>
                    <h3 className="font-sans font-bold text-2xl text-zinc-900 mb-4 flex items-center tracking-tight">
                      <span className="text-zinc-800 mr-2 text-3xl">⛽</span> Petrol
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-zinc-800">
                        <thead className="bg-[#444444] text-white font-bold text-[11px] tracking-wider">
                          <tr>
                            <th className="px-4 py-3 whitespace-nowrap">Sl. No.</th>
                            <th className="px-4 py-3">Grade</th>
                            <th className="px-4 py-3">Summary</th>
                            <th className="px-4 py-3">Ex-Showroom Price</th>
                            <th className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="bg-white">
                            <td className="px-4 py-4 font-medium">1</td>
                            <td className="px-4 py-4">E MT</td>
                            <td className="px-4 py-4 text-zinc-600">Manual</td>
                            <td className="px-4 py-4 font-medium">₹ 6,73,000</td>
                            <td className="px-4 py-4 text-right">
                              <button className="bg-[#666666] hover:bg-[#eb0a1e] text-white text-[10px] px-3 py-1.5 transition-colors">Check Your EMI</button>
                            </td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-4 py-4 font-medium">2</td>
                            <td className="px-4 py-4">S MT</td>
                            <td className="px-4 py-4 text-zinc-600">Manual</td>
                            <td className="px-4 py-4 font-medium">₹ 7,63,000</td>
                            <td className="px-4 py-4 text-right">
                              <button className="bg-[#666666] hover:bg-[#eb0a1e] text-white text-[10px] px-3 py-1.5 transition-colors">Check Your EMI</button>
                            </td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-4 py-4 font-medium">3</td>
                            <td className="px-4 py-4">S AMT</td>
                            <td className="px-4 py-4 text-zinc-600">Automatic</td>
                            <td className="px-4 py-4 font-medium">₹ 8,28,000</td>
                            <td className="px-4 py-4 text-right">
                              <button className="bg-[#666666] hover:bg-[#eb0a1e] text-white text-[10px] px-3 py-1.5 transition-colors">Check Your EMI</button>
                            </td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-4 py-4 font-medium">4</td>
                            <td className="px-4 py-4">G MT</td>
                            <td className="px-4 py-4 text-zinc-600">Manual</td>
                            <td className="px-4 py-4 font-medium">₹ 8,65,000</td>
                            <td className="px-4 py-4 text-right">
                              <button className="bg-[#666666] hover:bg-[#eb0a1e] text-white text-[10px] px-3 py-1.5 transition-colors">Check Your EMI</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* CNG / Hybrid Variants */}
                  <div>
                    <h3 className="font-sans font-bold text-2xl text-zinc-900 mb-4 flex items-center tracking-tight">
                      <span className="text-zinc-800 mr-2 text-3xl">⛽</span> CNG
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-zinc-800">
                        <thead className="bg-[#444444] text-white font-bold text-[11px] tracking-wider">
                          <tr>
                            <th className="px-4 py-3 whitespace-nowrap">Sl. No.</th>
                            <th className="px-4 py-3">Grade</th>
                            <th className="px-4 py-3">Summary</th>
                            <th className="px-4 py-3">Ex-Showroom Price</th>
                            <th className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="bg-white">
                            <td className="px-4 py-4 font-medium">1</td>
                            <td className="px-4 py-4">S MT</td>
                            <td className="px-4 py-4 text-zinc-600">Manual</td>
                            <td className="px-4 py-4 font-medium">₹ 8,49,000</td>
                            <td className="px-4 py-4 text-right">
                              <button className="bg-[#666666] hover:bg-[#eb0a1e] text-white text-[10px] px-3 py-1.5 transition-colors">Check Your EMI</button>
                            </td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-4 py-4 font-medium">2</td>
                            <td className="px-4 py-4">G MT</td>
                            <td className="px-4 py-4 text-zinc-600">Manual</td>
                            <td className="px-4 py-4 font-medium">₹ 9,53,000</td>
                            <td className="px-4 py-4 text-right">
                              <button className="bg-[#666666] hover:bg-[#eb0a1e] text-white text-[10px] px-3 py-1.5 transition-colors">Check Your EMI</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                <div className="mt-12 text-center">
                  <a
                    href="https://www.nippon-toyota.com/pricelist/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#eb0a1e] hover:bg-white text-white hover:text-[#eb0a1e] transition-colors duration-300 py-3 px-8 rounded-sm font-bold tracking-[0.2em] uppercase text-xs"
                  >
                    Download Full PDF Price List
                  </a>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
