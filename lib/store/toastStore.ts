import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface ToastStore {
  message: string;
  type: ToastType;
  visible: boolean;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>()(set => ({
  message: '',
  type: 'info',
  visible: false,

  showToast: (message: string, type: ToastType = 'info') =>
    set({
      message,
      type,
      visible: true,
    }),

  hideToast: () =>
    set({
      visible: false,
      message: '',
    }),
}));
