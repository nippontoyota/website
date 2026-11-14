import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { ...toast, id };
    
    set((state) => ({
      // Keep at most 4 active toasts to avoid cluttering the screen
      toasts: [...state.toasts.slice(-3), newToast],
    }));

    const duration = toast.duration ?? 3500;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
    return id;
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));

export const toast = {
  success: (message: string, options?: { title?: string; duration?: number }) => {
    return useToastStore.getState().addToast({
      type: 'success',
      message,
      title: options?.title,
      duration: options?.duration,
    });
  },
  error: (message: string, options?: { title?: string; duration?: number }) => {
    return useToastStore.getState().addToast({
      type: 'error',
      message,
      title: options?.title,
      duration: options?.duration,
    });
  },
  info: (message: string, options?: { title?: string; duration?: number }) => {
    return useToastStore.getState().addToast({
      type: 'info',
      message,
      title: options?.title,
      duration: options?.duration,
    });
  },
  dismiss: (id: string) => {
    useToastStore.getState().removeToast(id);
  },
};
