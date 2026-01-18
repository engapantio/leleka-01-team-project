'use client';

import { useEffect, useState } from 'react';
import { checkSession, getUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Loader from '../Loader/Loader';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { setUser, clearAuth, setLoading } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isAuthenticated = await checkSession();
        
        if (isAuthenticated) {
          const user = await getUser();
          setUser(user);

        } else {
          clearAuth();
        
        }
      } catch (error) {
      
        clearAuth();
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setUser, clearAuth, setLoading]);

  if (!isInitialized) {
    return <Loader />;
  }
  return children;
};

export default AuthProvider;
