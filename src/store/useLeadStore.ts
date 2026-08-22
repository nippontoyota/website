import { create } from 'zustand';

type LeadStore = {
  isOpen: boolean;
  prefilledModel: string;
  openModal: (model?: string) => void;
  closeModal: () => void;
};

export const useLeadStore = create<LeadStore>((set) => ({
  isOpen: false,
  prefilledModel: '',
  openModal: (model = '') => set({ isOpen: true, prefilledModel: model }),
  closeModal: () => set({ isOpen: false, prefilledModel: '' }),
}));
