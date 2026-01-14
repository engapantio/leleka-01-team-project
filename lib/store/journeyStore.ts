import { create } from 'zustand';

// 1. Описываем детальную структуру данных ребенка
interface BabyData {
  image?: string;
  babySize?: string;      // Вес/Рост
  babyWeight?: string;
  babyActivity?: string;
  babyDevelopment?: string; // Описание того, что происходит на этой неделе
  analogy?: string;         // "Размером с яблоко"
}

// 2. Описываем структуру данных мамы
interface MomTip {
  tip: string;
}

interface MomData {
  comfortTips: MomTip[];
}

// 3. Описываем само хранилище
interface JourneyStore {
  currentWeek: number | null;
  daysToDue: number | null;
  isLoaded: boolean;
  baby: BabyData | null;
  mom: MomData | null;
  
  // Экшены (функции для управления данными)
  setJourneyData: (data: Partial<Omit<JourneyStore, 'setJourneyData' | 'isLoaded'>>) => void;
  setLoading: (loading: boolean) => void;
  resetJourney: () => void;
}

export const useJourneyStore = create<JourneyStore>((set) => ({
  // Начальное состояние
  currentWeek: null,
  daysToDue: null,
  isLoaded: false,
  baby: null,
  mom: null,

  // Устанавливаем данные и автоматически выключаем лоадер
  setJourneyData: (data) => 
    set((state) => ({ 
      ...state, 
      ...data, 
      isLoaded: true 
    })),

  // Ручное управление загрузкой (если нужно)
  setLoading: (loading) => set({ isLoaded: loading }),

  // Сброс данных (например, при выходе из аккаунта)
  resetJourney: () => set({
    currentWeek: null,
    daysToDue: null,
    isLoaded: false,
    baby: null,
    mom: null,
  }),
}));