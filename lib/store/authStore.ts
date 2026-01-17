import { create } from 'zustand';
import { getUser, checkSession } from '../api/clientApi';
import { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateCompleted: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  reinitializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  updateCompleted: false,

  setUser: (user: User | null) =>
    set({
      user,
      isAuthenticated: user ? true : false,
      isLoading: false,
    }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  reinitializeAuth: async () => {
    const isAuthenticated = await checkSession();
    if (isAuthenticated) {
      const user = await getUser();
      set({ user, isAuthenticated: true , isLoading: false});
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
