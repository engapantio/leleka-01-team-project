import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}



export const useAuthStore = create<AuthStore>()(set => ({
  user: null,
  isAuthenticated: false,

  setUser: user =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  updateUser: updatedUser =>
    set(state => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    })),
}));
