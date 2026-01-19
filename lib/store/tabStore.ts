import { Tab } from '@/types/journey';
import { create } from 'zustand';

type SelectedTab = {
  tab: Tab;
  setBabyTab: () => void;
  setMomTag: () => void;
};

export const useTab = create<SelectedTab>()((set) => ({
  tab: 'baby',
  setBabyTab: () => set(() => ({ tab: 'baby' })),
  setMomTag: () => set(() => ({ tab: 'mom' })),
}));