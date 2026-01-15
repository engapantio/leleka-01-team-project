'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';
import Modal from '../Modal/Modal';
import Button from '../ui/Button/Button';
import { User } from '@/types/user';
import css from './UserBar.module.css';

interface Props {
  user: User;
}

export default function UserBar({ user }: Props) {
  const router = useRouter();
  //const user = useAuthStore(state => state.user);
  console.log(user);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoutConfirm = async () => {
    setIsLoading(true);
    try {
      await logout();
      clearAuth();
      setIsModalOpen(false);
      router.replace('/');
    } catch {
      toast.error('Не вдалося вийти з акаунта. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={css.userBar}>
      (
      <div className={css.userInfo}>
        <Image
          className={css.avatar}
          //just as an example
          src={user.avatarUrl}
          alt="User avatar"
          width={40}
          height={40}
        />
        <div>
          <p className={css.name}>{user.name}</p>
          <p className={css.email}>{user.email}</p>
        </div>
      </div>
      )
      <button
        type="button"
        className={css.logoutBtn}
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
          <div className={css.modalActions}>
            <Button action={() => setIsModalOpen(false)}>Ні</Button>
            <Button alternative action={handleLogoutConfirm}>
              Так
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
}
