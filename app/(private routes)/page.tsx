'use client';

import DashboardPage from '@/components/DashboardPage/DashboardPage';
// import { useEmotionsStore } from '@/lib/store/emotionStore';
// import { useEffect } from 'react';

export default function Home() {
  // const { fetchEmotions } = useEmotionsStore();

  // useEffect(() => {
  //   fetchEmotions();
  // }, [fetchEmotions]);

  return (
    <section>
      <DashboardPage />
    </section>
  );
}