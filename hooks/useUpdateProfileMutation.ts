'use client';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { editProfile } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';

interface UpdateProfilePayload {
  gender?: string;
  dueDate?: string;
  name?: string;
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value !== undefined)
      );

      if (Object.keys(cleanPayload).length === 0) {
        throw new Error('No fields to update');
      }

      return editProfile(cleanPayload);
    },
    onSuccess: (updatedUser: User) => {
      const { setUser, reinitializeAuth } = useAuthStore.getState();
      setUser(updatedUser);
      reinitializeAuth();
   
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
