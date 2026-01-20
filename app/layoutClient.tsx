'use client'; // ✅ Client component

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import '@/app/globals.css';

const LELEKA_AI_WIDGET_SRC = 'https://leleka-ai-service.onrender.com/widget/widget.js';
const LELEKA_AI_PROJECT_KEY = 'leleka-dev';

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

  const isAuthRoute = pathname?.includes('/auth');

  return (
    <AuthProvider key={authKey}>
      {children}

      {/* Leleka AI widget (served from our Render backend). */}
      {!isAuthRoute && (
        <Script
          src={LELEKA_AI_WIDGET_SRC}
          data-project={LELEKA_AI_PROJECT_KEY}
          data-locale="uk"
          strategy="afterInteractive"
        />
      )}
    </AuthProvider>
  );
}
