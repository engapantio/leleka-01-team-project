// components/TanStackProvider/TanStackProvider.tsx

'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: React.ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        containerStyle={{
    top: '20px',
    right: '20px',
    maxHeight: '400px', // Limit the max height of the toaster container
    overflowY: 'auto',  // Enable scrolling if too many toasts
    zIndex: 9999
  }}
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          success: {
            style: {
              background: '#10b981',
              color: '#fff',
            },
            duration: 3000,
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
            duration: 4000,
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default TanStackProvider;
