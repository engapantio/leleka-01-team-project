'use client';

import { useParams, useRouter } from 'next/navigation';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import styles from './JourneyLayoutClient.module.css';

type Props = {
  children: React.ReactNode;
  currentWeek: number;
};

export default function JourneyLayoutClient({ children, currentWeek }: Props) {
  const router = useRouter();
  const params = useParams<{ weekNumber?: string }>();

  const weekFromUrl = Number(params.weekNumber);
  const selectedWeek = Number.isFinite(weekFromUrl)
    ? weekFromUrl
    : currentWeek;

  const handleSelectWeek = (weekNumber: number) => {
    if (weekNumber === selectedWeek) return;
    router.push(`/journey/${weekNumber}`);
  };

  return (
    <div>
      <div className={styles.weekSelectorWrapper}>
        <WeekSelector
          currentWeek={currentWeek}
          selectedWeek={selectedWeek}
          onSelectedWeek={handleSelectWeek}
        />
      </div>
      {children}
    </div>
  );
}
