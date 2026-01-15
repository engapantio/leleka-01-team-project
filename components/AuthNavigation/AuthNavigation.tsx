'use client';

import { useAuthStore } from '@/lib/store/authStore';

import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
const AuthNavigation = () => {
  const { isAuthenticated, user } = useAuthStore();

  return isAuthenticated && user ? <UserBar user={user} /> : <AuthBar />;
};

export default AuthNavigation;
