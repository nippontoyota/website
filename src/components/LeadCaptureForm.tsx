"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';
import { useLeadStore } from '@/store/useLeadStore';

const TOYOTA_MODELS = [
  "URBAN CRUISER TAISOR",
  "GLANZA",
  "URBAN CRUISER HYRYDER",
  "INNOVA CRYSTA",
  "INNOVA HYCROSS",
  "HILUX",
  "FORTUNER",
  "LEGENDER",
  "CAMRY",
  "VELLFIRE",
  "LAND CRUISER 300",
  "Not sure yet"
];

interface LeadCaptureFormProps {
  onSuccess?: () => void;
  standalone?: boolean;
}

export default function LeadCaptureForm({ onSuccess, standalone = false }: LeadCaptureFormProps) {
  const { prefilledModel, closeModal } = useLeadStore();
  const [formData, setFormData] = useState({ name: '', phone: '', model: prefilledModel || '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (prefilledModel) {
      setFormData(prev => ({ ...prev, model: prefilledModel }));
    }
  }, [prefilledModel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-sm border border-white/10 relative overflow-hidden">
      
      {!standalone && (
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={24} />
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
            <p className="text-zinc-400 font-light text-sm">A Toyota specialist will contact you shortly.</p>
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
                <p className="text-zinc-400 font-light text-sm mt-2">Connect with our Toyota specialists today.</p>
              </div>
            )}
            
            {/* Name Input */}
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                Full Name
              </label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white placeholder-zinc-700 outline-none focus:border-[#eb0a1e] transition-colors"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone Input */}
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                Phone Number
              </label>
              <div className="flex items-center border-b border-white/20 focus-within:border-[#eb0a1e] transition-colors">
                <span className="text-zinc-500 mr-3 pb-2 text-sm">+91</span>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent px-0 py-2 text-white placeholder-zinc-700 outline-none"
                  placeholder="Enter your number"
                />
              </div>
            </div>

            {/* Custom Model Dropdown */}
            <div className="flex flex-col space-y-3 relative">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                Interested Model
              </label>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full bg-transparent border-b px-0 py-2 flex justify-between items-center cursor-pointer transition-colors ${
                  isDropdownOpen ? 'border-[#eb0a1e] text-white' : 'border-white/20 text-white/50 hover:border-white/50 hover:text-white'
                }`}
              >
                <span className={`text-sm tracking-wide ${formData.model ? 'text-white' : 'text-zinc-600'}`}>
                  {formData.model || "Select a model"}
                </span>
                <motion.div 
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                  transition={{ duration: 0.3 }}
                  className="text-zinc-500 text-xs"
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
                    <div className="max-h-[240px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
                      {TOYOTA_MODELS.map(model => (
                        <div
                          key={model}
                          onClick={() => {
                            setFormData({...formData, model});
                            setIsDropdownOpen(false);
                          }}
                          className={`px-4 py-3 text-xs md:text-sm tracking-wide cursor-pointer transition-colors flex items-center justify-between ${
                            formData.model === model 
                              ? 'bg-[#eb0a1e] text-white' 
                              : 'text-zinc-400 hover:bg-white/5 hover:text-white'
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
                  <Loader2 size={18} className="animate-spin text-zinc-500" />
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
