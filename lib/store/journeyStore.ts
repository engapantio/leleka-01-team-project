import { create } from 'zustand';
import { checkSession, getCurrentWeek, getCurrentWeekPublic } from '../api/clientApi';
import type { MomTip, Baby } from '@/types/journey';

interface JourneyState {
  weekNumber: number | null;
  daysToChildbirth: number | null;
  baby: Baby | null;
  mom: MomTip | null;

  isLoaded: boolean;      // "хоч раз завершили спробу"
  isLoading: boolean;     // "зараз вантажимо"
  isPublic: boolean;      // чи використали public endpoint
  error: string | null;

  fetchJourneyData: (force?: boolean) => Promise<void>;
  resetJourney: () => void;
}

export const useJourneyStore = create<JourneyState>((set, get) => ({
  weekNumber: null,
  daysToChildbirth: null,
  baby: null,
  mom: null,

  isLoaded: false,
  isLoading: false,
  isPublic: false,
  error: null,

  resetJourney: () =>
    set({
      weekNumber: null,
      daysToChildbirth: null,
      baby: null,
      mom: null,
      isLoaded: false,
      isLoading: false,
      isPublic: false,
      error: null,
    }),

  fetchJourneyData: async (force = false) => {
    const { isLoading, isLoaded } = get();
    if (isLoading) return;
    if (isLoaded && !force) return;

    set({ isLoading: true, error: null });

    try {
      // 1) перевіряємо сесію, але НЕ даємо їй завалити весь флоу
      const canUsePrivate = await checkSession().catch(() => false);

      // 2) рівно ОДИН запит: або private, або public
      const data = canUsePrivate
        ? await getCurrentWeek()
        : await getCurrentWeekPublic();

      if (!data) {
        set({
          error: 'Empty response from server',
          isPublic: !canUsePrivate,
        });
        return;
      }

      set({
        weekNumber: data.weekNumber ?? null,
        daysToChildbirth: data.daysToChildbirth ?? null,
        baby: data.baby ?? null,
        mom: data.momTip ?? null,

        isPublic: !canUsePrivate,
      });
    } catch (e) {
      console.error('Failed to fetch journey data:', e);

      set({
        error: 'Failed to fetch journey data',
      });
    } finally {
      // 3) ВАЖЛИВО: щоб не висів Loader вічно
      set({
        isLoading: false,
        isLoaded: true,
      });
    }
  },
}));
