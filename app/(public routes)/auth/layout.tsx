'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './Layout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  return (
    <>
      <header className={css.header}>
        <Image src="/logo.svg" alt="Логотип" width={95} height={29} className={css.logo} />
      </header>

      {loading ? <div>Завантаження сторінки...</div> : children}
    </>
  );
}
