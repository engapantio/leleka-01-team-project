'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../lib/store/authStore';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import styles from './SideBar.module.css';

const navItemsAuth = [
  { icon: 'icon-today', name: 'Мій день', href: '/' },
  { icon: 'icon-conversion_path', name: 'Подорож', href: '/journey' },
  { icon: 'icon-book_2', name: 'Щоденник', href: '/diary' },
  { icon: 'icon-account_circle', name: 'Профіль', href: '/profile' },
];

const navItemsUnauth = [
  { icon: 'icon-today', name: 'Мій день', href: '/auth/login' },
  { icon: 'icon-conversion_path', name: 'Подорож', href: '/auth/login' },
  { icon: 'icon-book_2', name: 'Щоденник', href: '/auth/login' },
  { icon: 'icon-account_circle', name: 'Профіль', href: '/auth/login' },
];


type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  const navItems = isAuthenticated ? navItemsAuth : navItemsUnauth;

 useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" onClick={onClose}>
            <Image
              src="/company-logo.svg"
              alt="Logo"
              className={styles.logoImg}
              width={105}
              height={45}
            />
          </Link>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width={32} height={32} aria-label="Закрити меню">
              <use href="/sprite.svg#icon-close" />
            </svg>
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
              onClick={onClose}
            >
              <svg width={24} height={24} aria-hidden="true">
                <use href={`/sprite.svg#${item.icon}`} />
              </svg>
              <p className={styles.navName}>{item.name}</p>
            </Link>
          ))}
          <div className={styles.bottomDivider} />
        </nav>

        {isAuthenticated ? <UserBar /> : <AuthBar />}
      </aside>

      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
      />
    </>
  );
}
