'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../lib/store/authStore';
import { useJourneyStore } from '@/lib/store/journeyStore';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import styles from './SideBar.module.css';

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NavItem = {
  icon: string;
  name: string;
  href: string;
  external?: boolean;
  action?: 'crm-feedback' | 'crm-donation';
};

const CONSULT_URL = 'https://booking-system-test-omega.vercel.app/sign-up';

// Mini CRM (public widgets). Direct integration, no env required on this front.
const CRM_API_BASE = 'https://mini-crm-core.onrender.com';
const CRM_PROJECT_SLUG = 'volunteers-odesa-dev';
const CRM_PROJECT_KEY = 'c86fe040be4c8e75db468e308ef4c1309e67511d062f782c';

const CRM_HIDDEN_CONTAINER_ID = 'mini-crm-hidden-widgets';
const CRM_HIDDEN_STYLE_ID = 'mini-crm-hidden-widgets-style';

function ensureCrmScriptsMounted() {
  if (typeof document === 'undefined') return;

  // One global style to keep the auto-generated widget buttons out of sight.
  if (!document.getElementById(CRM_HIDDEN_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = CRM_HIDDEN_STYLE_ID;
    style.textContent = `
      .mini-crm-hidden-host{position:fixed;left:-99999px;top:0;width:1px;height:1px;overflow:hidden;}
      .mini-crm-hidden-host .mini-crm-btn{display:none !important;}
    `;
    document.head.appendChild(style);
  }
  if (document.getElementById(CRM_HIDDEN_CONTAINER_ID)) return;

  const host = document.createElement('div');
  host.id = CRM_HIDDEN_CONTAINER_ID;
  host.className = 'mini-crm-hidden-host';
  document.body.appendChild(host);

  const mkScript = (formKey: 'feedback' | 'donation') => {
    const mount = document.createElement('div');
    mount.id = `mini-crm-mount-${formKey}`;
    host.appendChild(mount);

    const s = document.createElement('script');
    s.src = `${CRM_API_BASE}/widget/${formKey}-form.js`;
    s.async = true;
    s.dataset.projectSlug = CRM_PROJECT_SLUG;
    s.dataset.projectKey = CRM_PROJECT_KEY;
    s.dataset.apiBase = CRM_API_BASE;
    // If buttonText is missing, widget uses defaults. We hide the auto-button anyway.
    mount.appendChild(s);
  };

  mkScript('feedback');
  mkScript('donation');
}

async function openCrmModal(action: 'crm-feedback' | 'crm-donation') {
  if (typeof document === 'undefined') return;

  ensureCrmScriptsMounted();

  const host = document.getElementById(CRM_HIDDEN_CONTAINER_ID);
  if (!host) return;

  const formKey = action === 'crm-feedback' ? 'feedback' : 'donation';

  // The widget creates a button next to its <script>. We click it programmatically.
  // Wait a bit for script to load and button to be enabled.
  const deadline = Date.now() + 4000;
  while (Date.now() < deadline) {
    const mount = document.getElementById(`mini-crm-mount-${formKey}`);
    const btn = mount?.querySelector<HTMLButtonElement>('.mini-crm-btn') ?? null;
    if (btn && !btn.disabled) {
      btn.click();
      return;
    }
    await new Promise((r) => setTimeout(r, 120));
  }
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const { isAuthenticated } = useAuthStore();
  const { weekNumber } = useJourneyStore();
  const pathname = usePathname();

  const navItemsAuth: NavItem[] = [
    { icon: 'icon-today', name: 'Мій день', href: '/' },
    { icon: 'icon-conversion_path', name: 'Подорож', href: `/journey/${weekNumber ?? 1}` },
    { icon: 'icon-book_2', name: 'Щоденник', href: '/diary' },
    { icon: 'icon-account_circle', name: 'Профіль', href: '/profile' },
    {
      icon: 'icon-consultation',
      name: 'Онлайн консультація',
      href: CONSULT_URL,
      external: true,
    },
    {
      icon: 'icon-feedback',
      name: 'Залишити відгук',
      href: '#',
      action: 'crm-feedback',
    },
    {
      icon: 'icon-donate',
      name: 'Донат на ЗСУ',
      href: '#',
      action: 'crm-donation',
    },
  ];

  const navItemsUnauth: NavItem[] = [
    { icon: 'icon-today', name: 'Мій день', href: '/auth/login' },
    { icon: 'icon-conversion_path', name: 'Подорож', href: '/auth/login' },
    { icon: 'icon-book_2', name: 'Щоденник', href: '/auth/login' },
    { icon: 'icon-account_circle', name: 'Профіль', href: '/auth/login' },
    {
      icon: 'icon-consultation',
      name: 'Онлайн консультація',
      href: CONSULT_URL,
      external: true,
    },
    {
      icon: 'icon-feedback',
      name: 'Залишити відгук',
      href: '#',
      action: 'crm-feedback',
    },
    {
      icon: 'icon-donate',
      name: 'Донат на ЗСУ',
      href: '#',
      action: 'crm-donation',
    },
  ];

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
          {navItems.map(item => {
            const isActive = !item.external && pathname === item.href;

            if (item.external) {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navItem}
                  onClick={onClose}
                >
                  <svg width={24} height={24} aria-hidden="true">
                    <use href={`/sprite.svg#${item.icon}`} />
                  </svg>
                  <p className={styles.navName}>{item.name}</p>
                </a>
              );
            }

            if (item.action) {
              return (
                <button
                  key={item.name}
                  type="button"
                  className={styles.navButton}
                  onClick={() => {
                    openCrmModal(item.action!);
                    onClose();
                  }}
                >
                  <svg width={24} height={24} aria-hidden="true">
                    <use href={`/sprite.svg#${item.icon}`} />
                  </svg>
                  <p className={styles.navName}>{item.name}</p>
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={onClose}
              >
                <svg width={24} height={24} aria-hidden="true">
                  <use href={`/sprite.svg#${item.icon}`} />
                </svg>
                <p className={styles.navName}>{item.name}</p>
              </Link>
            );
          })}
          <div className={styles.bottomDivider} />
        </nav>

        {isAuthenticated ? <UserBar /> : <AuthBar />}
      </aside>

      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
    </>
  );
}
