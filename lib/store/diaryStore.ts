import { create } from "zustand";
import type { DiaryEntry } from "@/types/diary";

export interface DiaryStore {
  selectedEntry: DiaryEntry | null;
  setSelectedEntry: (entry: DiaryEntry) => void;
  clearSelectedEntry: () => void;
}

export const useDiaryStore = create<DiaryStore>((set) => ({
  selectedEntry: null,
  setSelectedEntry: (entry) => set({ selectedEntry: entry }),
  clearSelectedEntry: () => set({ selectedEntry: null }),
}));
