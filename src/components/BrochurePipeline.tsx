import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, X, Download } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';
import { cars } from './Vehicles';

export default function BrochurePipeline() {
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
            E-Brochures
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

          {/* STEP 2: DOWNLOAD */}
          {step === 2 && selectedCar && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col items-center justify-start pt-8 pb-12"
            >
              <div className="max-w-xl mx-auto w-full text-center px-4">
                
                <div className="relative w-full max-w-md aspect-[2/1] mx-auto mb-8">
                  <Image 
                    src={selectedCar.image} 
                    alt={selectedCar.name} 
                    fill sizes="50vw"
                    className="object-contain drop-shadow-2xl" 
                  />
                </div>
                
                <h2 className="font-druk text-4xl md:text-5xl text-white uppercase tracking-tighter mb-4">
                  {selectedCar.name}
                </h2>
                
                <p className="text-white/60 mb-10 max-w-md mx-auto">
                  Download the official brochure to explore detailed specifications, features, and variants.
                </p>

                <a
                  href={`https://www.nippontoyota.co.in/brochure/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center w-full max-w-sm bg-white hover:bg-[#eb0a1e] text-black hover:text-white transition-colors duration-500 py-5 px-8 rounded-sm mx-auto"
                >
                  <Download size={20} className="mr-4" />
                  <span className="font-bold tracking-[0.2em] uppercase text-sm">Download Brochure</span>
                </a>

                <button 
                  onClick={() => {
                    setDirection(-1);
                    setStep(1);
                  }}
                  className="block mx-auto mt-6 text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                >
                  Choose Another Model
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
