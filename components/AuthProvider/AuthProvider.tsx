'use client';

import { useEffect } from 'react';
import { getUser, refreshTokens } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearAuth);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      const isAuthenticated = response.status == 200;
      if (isAuthenticated && response.user) {
        setUser(response.user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
