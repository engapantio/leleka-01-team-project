import { create } from 'zustand';
import type { DiaryEntry } from '@/types/diary';
import { deleteDiaryEntryById } from '@/lib/api/clientApi';

interface DeleteEntryState {
  isOpen: boolean;
  entry: DiaryEntry | null;
  isLoading: boolean;

  openModal: (entry: DiaryEntry) => void;
  closeModal: () => void;
  confirmDelete: (onSuccess?: () => void) => Promise<void>;
}

export const useDeleteEntryStore = create<DeleteEntryState>((set, get) => ({
  isOpen: false,
  entry: null,
  isLoading: false,

  openModal: (entry) => set({ isOpen: true, entry }),
  closeModal: () => set({ isOpen: false, entry: null, isLoading: false }),

  confirmDelete: async (onSuccess) => {
    const entry = get().entry;
    if (!entry) return;

    set({ isLoading: true });

    try {
      await deleteDiaryEntryById(entry.id);


      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error('Delete diary entry failed:', error.message);
      else console.error('Delete diary entry failed:', error);
    } finally {
      set({ isOpen: false, entry: null, isLoading: false });
    }
  },
}));
