'use client';

import { useEffect } from 'react';
import { useJourneyStore } from '@/lib/store/journeyStore';
import JourneyLayoutClient from './JourneyLayoutClient';

type Props = {
  children: React.ReactNode;
};

export default function JourneyLayout({ children }: Props) {
  const weekNumber = useJourneyStore(s => s.weekNumber);
  const fetchJourneyData = useJourneyStore(s => s.fetchJourneyData);
  
  useEffect(() => {
    fetchJourneyData();
  }, [fetchJourneyData]);

  const currentWeek = weekNumber ?? 16; // fallback на 16, якщо ще не завантажилось

  return (
    <JourneyLayoutClient currentWeek={currentWeek}>
      {children}
    </JourneyLayoutClient>
  );
}