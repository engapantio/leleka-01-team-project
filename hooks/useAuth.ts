'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { login, logout, register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useJourneyStore } from '@/lib/store/journeyStore';
import { LoginDetails, RegistrationDetails } from '@/lib/api/clientApi';
import { User } from '@/types/user';
import { AxiosError } from 'axios';

/**
 * Login mutation with validation gate + toasts
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: (credentials: LoginDetails) => login(credentials),
    onSuccess: (user: User) => {
      const resetJourney = useJourneyStore.getState().resetJourney;
      setUser(user);
      resetJourney();

      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('Вхід успішно виконано!', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: () => {
      const errorMessage = 'Ой... сталася помилка при спробі логіну. Повторіть, будь ласка, спробу';

      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right',
      });
    },
  });
}

/**
 * Register mutation with validation gate + toasts
 */
export function useRegister() {
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: (credentials: RegistrationDetails) => register(credentials),
    onSuccess: (user: User) => {
      const resetJourney = useJourneyStore.getState().resetJourney;
      setUser(user);
      resetJourney();

      // Show success toast
      toast.success('Реєстрація успішна! Ви залогінені.', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: () => {
      const errorMessage = 'Ой... сталася помилка при реєстрації';

      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right',
      });
    },
  });
}

/**
 * Logout mutation
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore(state => state.clearAuth);

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      clearAuth();

      queryClient.clear();

      toast.success('Вихід успішно виконано!', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: () => {
      // Still clear auth even if logout request fails
      clearAuth();

      const errorMessage = 'Вихід виконано (помилка при очищенні на сервері)';
      toast.error(errorMessage, {
        duration: 3000,
        position: 'top-right',
      });
    },
  });
}
export function useAuth() {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
  };
}
