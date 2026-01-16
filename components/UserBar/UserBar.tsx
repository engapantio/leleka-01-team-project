'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { logout, getUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Modal from '../Modal/Modal';
import styles from './UserBar.module.css';

interface UserBarUser {
  name: string;
  email: string;
  avatarUrl: string;
}

export default function UserBar() {
  const router = useRouter();
  const { clearAuth, reinitializeAuth } = useAuthStore();

  const [user, setUser] = useState<UserBarUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser({
          name: data.name,
          email: data.email,
          avatarUrl: data.avatarUrl,
        });
      } catch {
        clearAuth();
      }
    };

    fetchUser();
  }, [clearAuth]);

  const handleLogoutConfirm = async () => {
    setIsLoading(true);
    try {
      await logout();
      clearAuth();
      setIsModalOpen(false);
      await reinitializeAuth();
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
        <Image
          className={styles.avatar}
          src={user.avatarUrl}
          alt="User avatar"
          width={40}
          height={40}
        />
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
        <Modal title="Ви точно хочете вийти?" onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalActions}>
            <button type="button" className={styles.buttonNo} onClick={() => setIsModalOpen(false)}>
              <p className={styles.buttonText}>Ні</p>
            </button>

            <button
              type="button"
              className={styles.buttonYes}
              onClick={handleLogoutConfirm}
              disabled={isLoading}
            >
              <p className={styles.buttonText}>Так</p>
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
