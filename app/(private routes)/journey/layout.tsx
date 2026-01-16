'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import WeekSelector from '@/components/WeekSelector/WeekSelector';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';

type Props = {
  children: React.ReactNode;
};

export default function JourneyLayout({ children }: Props) {
  const router = useRouter();
  const params = useParams<{ slug?: string[] }>();

  const weekFromUrl = Number(params.slug?.[0]);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(
    Number.isFinite(weekFromUrl) ? weekFromUrl : null
  );

  const currentWeek = 16; // тимчасово, потім буде зі стора/беку

  useEffect(() => {
    if (Number.isFinite(weekFromUrl)) setSelectedWeek(weekFromUrl);
  }, [weekFromUrl]);

  const handleSelectWeek = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
    router.push(`/journey/${weekNumber}`);
  };

  return (
    <div>
      <WeekSelector
        currentWeek={currentWeek}
        selectedWeek={selectedWeek}
        onSelectedWeek={handleSelectWeek}
      />
      {children}
    </div>
  );
}
