'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import { logout, getUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useJourneyStore } from '@/lib/store/journeyStore';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import styles from './UserBar.module.css';

interface UserBarUser {
  name: string;
  email: string;
  avatarUrl: string;
}

export default function UserBar() {
  const router = useRouter();
  const { clearAuth, reinitializeAuth } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: user, isError } = useQuery<UserBarUser>({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await getUser();
      return {
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
      };
    },
    staleTime: 0,
    retry: false,
  });

  if (isError) {
    clearAuth();
    return null;
  }

  const handleLogoutConfirm = async () => {
    setIsLoading(true);
    try {
      await logout();
      clearAuth();
      const { resetJourney } = useJourneyStore.getState();
      resetJourney();
      setIsModalOpen(false);
      reinitializeAuth();
      router.push('/?auth_refresh=' + Date.now());
      setTimeout(() => {
        router.replace('/');
      }, 200);
    } catch {
      toast.error('Не вдалося вийти з акаунта. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <section className={styles.userBar}>
      <div className={styles.userInfo}>
        <Link href="/profile">
          <Image
            className={styles.avatar}
            src={user.avatarUrl}
            alt="User avatar"
            width={40}
            height={40}
          />
        </Link>
        <div>
          <p className={styles.name}>{user.name}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      <button
        type="button"
        className={styles.logoutBtn}
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        aria-label="Logout"
      >
        <svg width={24} height={24}>
          <use href="/sprite.svg#icon-logout" />
        </svg>
      </button>

      {isModalOpen && (
        <ConfirmationModal
          title="Ви точно хочете вийти?"
          handler={handleLogoutConfirm}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
