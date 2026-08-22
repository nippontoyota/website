"use client";

import { useLeadStore } from '@/store/useLeadStore';
import { motion, AnimatePresence } from 'framer-motion';
import LeadCaptureForm from './LeadCaptureForm';

export default function GlobalLeadModal() {
  const { isOpen, closeModal } = useLeadStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg z-10"
          >
            <LeadCaptureForm />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
