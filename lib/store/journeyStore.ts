import { create } from 'zustand';
import { getCurrentWeek, getCurrentWeekPublic } from '../api/clientApi';
import {FullWeekData} from '@/types/journey';

interface JourneyState {
  currentWeek: number | null;
  daysToDue: number | null;
  baby: BabyInfo | null;
  mom: MomInfo | null;
  isLoaded: boolean;
  fetchJourneyData: (dueDate: string) => Promise<void>;
}

export const useJourneyStore = create<JourneyState>(set => ({
  currentWeek: null,
  daysToDue: null,
  baby: null,
  mom: null,
  isPublic: false,
  isLoaded: false,

  fetchJourneyData: async (dueDate: string) => {
    if (!dueDate) getCurrentWeekPublic();

    try {
      const data = await getCurrentWeek(dueDate);
      if (!data) return;

      set({
        currentWeek: data.week ?? null,
        daysToDue: data.daysToDue ?? null,
        baby: data.pack.baby ?? null,
        mom: data.pack.mom ?? null,
        isLoaded: true,
      });
    } catch (error) {
      console.error('Failed to fetch journey data:', error);
      set({ isLoaded: false });
    }
  },
}));