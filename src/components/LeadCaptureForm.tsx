"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';
import TestDrivePipeline from './TestDrivePipeline';
import ExchangePipeline from './ExchangePipeline';

import { cars } from './Vehicles';
const TOYOTA_MODELS = cars.map(c => c.name);

const SERVICE_OPTIONS = [
  "GENERAL SERVICE",
  "BODY & PAINT REPAIR",
  "MAINTENANCE PACKAGE",
  "EXTENDED WARRANTY",
  "ROADSIDE ASSISTANCE",
  "OTHER SERVICE"
];

interface LeadCaptureFormProps {
  onSuccess?: () => void;
  standalone?: boolean;
}

export default function LeadCaptureForm({ onSuccess, standalone = false }: LeadCaptureFormProps) {
  const { prefilledModel, closeModal, intent } = useLeadStore();
  const [inquiryType, setInquiryType] = useState<'SALES' | 'SERVICE'>(intent === 'SERVICE' ? 'SERVICE' : 'SALES');
  const [formData, setFormData] = useState({ name: '', phone: '', model: prefilledModel || '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (intent === 'TEST_DRIVE' && !standalone) {
    return (
      <div className="w-full bg-[#050505] backdrop-blur-2xl p-6 md:p-8 relative overflow-hidden rounded-none border border-white/10 shadow-2xl h-[90dvh] md:h-auto md:min-h-[700px] flex flex-col">
        <button onClick={closeModal} className="absolute top-4 right-4 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors z-[100]">
          <X size={32} strokeWidth={1} />
        </button>
        <TestDrivePipeline />
      </div>
    );
  }

  if (intent === 'EXCHANGE' && !standalone) {
    return (
      <div className="w-full bg-[#050505] backdrop-blur-2xl p-6 md:p-8 relative overflow-hidden rounded-none border border-white/10 shadow-2xl h-[90dvh] md:h-auto md:min-h-[700px] flex flex-col">
        <button onClick={closeModal} className="absolute top-4 right-4 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors z-[100]">
          <X size={32} strokeWidth={1} />
        </button>
        <ExchangePipeline />
      </div>
    );
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const payload = {
        leadType: inquiryType,
        name: formData.name,
        phone: formData.phone,
        targetCar: formData.model || '-',
        location: '-',
        currentCar: '-',
        extraInfo: '-'
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Submission failed');
      
      setStatus('success');
      setFormData({ name: '', phone: '', model: '' });
      if (onSuccess) onSuccess();
      
      if (!standalone) {
        setTimeout(() => {
          closeModal();
          setStatus('idle');
        }, 3000);
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full relative">
      
      {!standalone && (
        <button 
          onClick={closeModal}
          className="fixed top-8 right-8 md:top-12 md:right-12 text-white/60 hover:text-white transition-colors z-[60]"
        >
          <X size={40} strokeWidth={1} />
        </button>
      )}

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-[320px] text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#eb0a1e]/20 flex items-center justify-center mb-6 text-[#eb0a1e]">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-druk text-3xl text-white uppercase tracking-wider mb-2">Request Received</h3>
            <p className="text-white/70 font-light text-sm">A Toyota specialist will contact you shortly.</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            {!standalone && (
              <div className="text-center mb-8">
                <h3 className="font-druk text-3xl text-white uppercase tracking-wider">Request Callback</h3>
                <p className="text-white/70 font-light text-sm mt-2">Connect with our Toyota specialists today.</p>
              </div>
            )}

            {/* Inquiry Type Toggle */}
            <div className="flex space-x-12 mb-8 border-b border-white/20">
              <button
                type="button"
                onClick={() => {
                  setInquiryType('SALES');
                  setFormData({...formData, model: ''});
                }}
                className={`pb-4 text-2xl md:text-3xl font-druk tracking-wider transition-colors relative ${
                  inquiryType === 'SALES' ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                SALES
                {inquiryType === 'SALES' && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#eb0a1e]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setInquiryType('SERVICE');
                  setFormData({...formData, model: ''});
                }}
                className={`pb-4 text-2xl md:text-3xl font-druk tracking-wider transition-colors relative ${
                  inquiryType === 'SERVICE' ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                SERVICE
                {inquiryType === 'SERVICE' && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#eb0a1e]" />
                )}
              </button>
            </div>
            
            {/* Name Input */}
            <div className="relative mt-4">
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
                  if (val.length <= 10) {
                    setFormData({...formData, phone: val});
                  }
                }}
                className="w-full bg-transparent px-0 py-4 text-white text-2xl md:text-3xl font-druk uppercase tracking-wider placeholder-white/60 outline-none caret-white"
                placeholder="PHONE"
              />
            </div>

            {/* Custom Model Dropdown */}
            <div className="relative">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full bg-transparent border-b px-0 py-4 flex justify-between items-center cursor-pointer transition-colors ${
                  isDropdownOpen ? 'border-[#eb0a1e]' : 'border-white/20 hover:border-white/50'
                }`}
              >
                <span className={`text-2xl md:text-3xl font-druk uppercase tracking-wider ${formData.model ? 'text-white' : 'text-white/60'}`}>
                  {formData.model || (inquiryType === 'SALES' ? "MODEL" : "SERVICE TYPE")}
                </span>
                <motion.div 
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                  transition={{ duration: 0.3 }}
                  className="text-white/60 text-xs"
                >
                  ▼
                </motion.div>
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 top-[100%] mt-2 bg-[#111] border border-white/10 rounded-sm shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-track]:bg-transparent">
                      {(inquiryType === 'SALES' ? TOYOTA_MODELS : SERVICE_OPTIONS).map(model => (
                        <div
                          key={model}
                          onClick={() => {
                            setFormData({...formData, model});
                            setIsDropdownOpen(false);
                          }}
                          className={`px-6 py-4 text-lg md:text-xl font-druk uppercase tracking-wider cursor-pointer transition-colors flex items-center justify-between ${
                            formData.model === model 
                              ? 'bg-[#eb0a1e] text-white' 
                              : 'text-white/60 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span>{model}</span>
                          {formData.model === model && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-white hover:bg-[#eb0a1e] text-black hover:text-white transition-colors duration-500 py-4 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <Loader2 size={18} className="animate-spin text-white/60" />
                ) : (
                  <>
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Request Callback</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-[#eb0a1e] text-xs text-center mt-4">Something went wrong. Please try again.</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
