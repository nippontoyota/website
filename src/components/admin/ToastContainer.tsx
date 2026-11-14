"use client";

import { useToastStore, ToastItem } from '@/lib/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastContainerProps {
  theme?: 'dark' | 'light';
}

export default function ToastContainer({ theme = 'dark' }: ToastContainerProps) {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 sm:bottom-6 right-0 sm:right-6 left-0 sm:left-auto mx-auto sm:mx-0 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3.5 sm:px-0"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastCard
            key={t.id}
            toast={t}
            onDismiss={() => removeToast(t.id)}
            theme={theme}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
  theme,
}: {
  toast: ToastItem;
  onDismiss: () => void;
  theme: 'dark' | 'light';
}) {
  const isLight = theme === 'light';

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      iconColor: isLight ? 'text-emerald-600' : 'text-emerald-400',
      bladeColor: 'bg-emerald-500',
      badgeBg: isLight ? 'bg-emerald-50' : 'bg-emerald-500/10',
      title: 'Success',
    },
    error: {
      icon: AlertCircle,
      iconColor: isLight ? 'text-[#eb0a1e]' : 'text-[#eb0a1e]',
      bladeColor: 'bg-[#eb0a1e]',
      badgeBg: isLight ? 'bg-red-50' : 'bg-[#eb0a1e]/10',
      title: 'Error',
    },
    info: {
      icon: Info,
      iconColor: isLight ? 'text-zinc-700' : 'text-white/80',
      bladeColor: isLight ? 'bg-zinc-800' : 'bg-white',
      badgeBg: isLight ? 'bg-zinc-100' : 'bg-white/10',
      title: 'Notice',
    },
  }[toast.type];

  const Icon = typeConfig.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 480, damping: 32 }}
      className={`pointer-events-auto relative overflow-hidden border flex items-start gap-3 p-3.5 sm:p-4 shadow-2xl transition-colors ${
        isLight
          ? 'bg-white text-zinc-900 border-zinc-200 shadow-zinc-950/15'
          : 'bg-[#0e0e11] text-white border-white/15 shadow-black/90'
      }`}
      role="alert"
    >
      {/* Precision Left Blade Accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${typeConfig.bladeColor}`} />

      {/* Status Icon */}
      <div className={`p-1.5 shrink-0 ${typeConfig.badgeBg} ${typeConfig.iconColor}`}>
        <Icon size={16} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2">
          <span
            className={`font-display text-[9px] font-bold tracking-widest uppercase ${
              isLight ? 'text-zinc-500' : 'text-white/40'
            }`}
          >
            {toast.title || typeConfig.title}
          </span>
        </div>
        <p className={`text-xs mt-0.5 leading-relaxed font-sans ${isLight ? 'text-zinc-800 font-medium' : 'text-white/90'}`}>
          {toast.message}
        </p>
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={onDismiss}
        className={`p-1 -mr-1 transition-colors shrink-0 cursor-pointer ${
          isLight ? 'text-zinc-400 hover:text-zinc-800' : 'text-white/40 hover:text-white'
        }`}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
