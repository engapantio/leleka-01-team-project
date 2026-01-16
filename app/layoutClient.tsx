'use client'; // ✅ Client component

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import '@/app/globals.css';

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [authKey, setAuthKey] = useState(0);
  const prevRef = useRef<boolean | null>(null);

  useEffect(() => {
    const isAuthRoute = pathname?.includes('/auth');
    if (isAuthRoute !== prevRef.current) {
      setAuthKey(prev => prev + 1);
      prevRef.current = isAuthRoute;
    }
  }, [pathname]);

  return <AuthProvider key={authKey}>{children}</AuthProvider>;
}
