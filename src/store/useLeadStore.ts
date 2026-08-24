import { create } from 'zustand';

export type LeadIntent = 'TEST_DRIVE' | 'SERVICE' | 'EXCHANGE' | 'BROCHURE' | 'PRICE_LIST' | 'GENERIC';

type LeadStore = {
  isOpen: boolean;
  prefilledModel: string;
  intent: LeadIntent;
  openModal: (model?: string, intent?: LeadIntent) => void;
  closeModal: () => void;
};

export const useLeadStore = create<LeadStore>((set) => ({
  isOpen: false,
  prefilledModel: '',
  intent: 'GENERIC',
  openModal: (model = '', intent = 'GENERIC') => set({ isOpen: true, prefilledModel: model, intent }),
  closeModal: () => set({ isOpen: false, prefilledModel: '', intent: 'GENERIC' }),
}));
