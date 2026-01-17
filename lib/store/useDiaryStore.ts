// useDiaryStore.ts
import { create } from 'zustand';
import type { DiaryEntry } from '@/types/diary';

interface DiaryState {
  entries: DiaryEntry[];
  selectedEntry: DiaryEntry | null;

  setEntries: (entries: DiaryEntry[]) => void;
  setSelectedEntry: (entry: DiaryEntry | null) => void;
  removeEntryFromList: (id: string) => void;
}

export const useDiaryStore = create<DiaryState>((set, get) => ({
  entries: [],
  selectedEntry: null,

  setEntries: (entries) =>
    set({
      entries,
      selectedEntry: entries[0] || null,
    }),

  setSelectedEntry: (entry) => set({ selectedEntry: entry }),

  removeEntryFromList: (id) => {
    const updated = get().entries.filter((e) => e.id !== id);

    set({
      entries: updated,
      selectedEntry: updated[0] || null,
    });
  },
}));
