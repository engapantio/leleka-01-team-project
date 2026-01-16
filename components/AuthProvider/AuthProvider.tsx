'use client';

import { useEffect } from 'react';
import { checkSession, getUser } from '@/lib/api/clientApi';
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
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getUser();
        setUser(user);
      } else {
        isAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearAuth, setLoading]);

  return <>{children}</>;
};

export default AuthProvider;
