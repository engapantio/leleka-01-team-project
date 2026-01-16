'use client';

import { useEffect } from 'react';
import { getUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const setLoading = useAuthStore(state => state.setLoading);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // isLoading = true на початку завантаження
      try {
        const response = await getUser();
        if (response.status === 200 && response.user) {
          setUser(response.user); // автоматично ставить isLoading = false
        } else {
          clearAuth(); // автоматично ставить isLoading = false
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        clearAuth();
      }
    };

    fetchUser();
  }, [setUser, clearAuth, setLoading]);

  return <>{children}</>;
};

export default AuthProvider;
