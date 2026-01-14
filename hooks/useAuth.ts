'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { login, logout, register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
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
      // Update Zustand store with user from response
      // Note: Cookies are already set by backend via Set-Cookie header
      setUser(user);

      // Invalidate queries to refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // Show success toast
      toast.success('Вхід успішно виконано!', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: (error: AxiosError) => {
      // Extract error message
      const errorMessage = error?.message || 'Ой... сталася помилка при вході';

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
      // Update Zustand store
      setUser(user);

      // Show success toast
      toast.success('Реєстрація успішна! Ви залогінені.', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error?.message || 'Ой... сталася помилка при реєстрації';

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
      // Clear Zustand store
      clearAuth();

      // Clear all queries
      queryClient.clear();

      // Show success toast
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
