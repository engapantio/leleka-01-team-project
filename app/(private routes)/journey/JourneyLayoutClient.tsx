'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import WeekSelector from '@/components/WeekSelector/WeekSelector';

type Props = {
  children: React.ReactNode;
  currentWeek: number;
};

export default function JourneyLayoutClient({ children, currentWeek }: Props) {
  const router = useRouter();
  const params = useParams<{ weekNumber?: string }>();

  const weekFromUrl = Number(params.weekNumber);

  const [selectedWeek, setSelectedWeek] = useState<number>(
    Number.isFinite(weekFromUrl) ? weekFromUrl : currentWeek
  );

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
