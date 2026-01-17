'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadAvatar } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export function useUpdateAvatarMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);

      return uploadAvatar(formData);
    },
    onSuccess: () => {
      const { reinitializeAuth } = useAuthStore.getState();

      reinitializeAuth();
      console.log('✅ AuthProvider reinitialized after avatar');

      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
