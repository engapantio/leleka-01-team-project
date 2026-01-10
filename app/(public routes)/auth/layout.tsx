'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthContainer from '@/components/AuthContainer/AuthContainer';

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
    <>{loading ? <div>Завантаження сторінки...</div> : <AuthContainer>{children}</AuthContainer>}</>
  );
}
