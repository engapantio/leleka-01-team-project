import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}



export const useAuthStore = create<AuthStore>()(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Loading until session check completes

  setUser: (user: User | null) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  updateUser: (updatedUser: Partial<User>) =>
    set(state => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    })),
}));
