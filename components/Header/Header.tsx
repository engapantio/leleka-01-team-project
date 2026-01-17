'use client';
import Link from 'next/link';
import Image from 'next/image';
import css from './Header.module.css';

type HeaderProps = {
  onMenuClick: () => void;
};


export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logoLink}>
        <Image
          src="/company-logo.svg"
          alt="Logo"
          className={css.logoImg}
          width={105}
          height={45}
        />
      </Link>
      <button className={css.burgerBtn} onClick={onMenuClick}>
        <svg width="32" height="32" aria-label="Open menu">
          <use href="/sprite.svg#icon-menu" />
        </svg>
      </button>
    </header>
  );
}
