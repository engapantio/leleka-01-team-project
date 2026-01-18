'use client';

import styles from './DashboardPage.module.css';
import { useJourneyStore } from '@/lib/store/journeyStore';
import { useAuthStore } from '@/lib/store/authStore';
import StatusBlock from '..//StatusBlock/StatusBlock';
import MomTipCard from '../MomTipCard/MomTipCard';
import FeelingCheckCard from '../FeelingCheckCard/FeelingCheckCard';
import TaskReminderCard from '../TaskReminderCard/TaskReminderCard';
import BabyTodayCard from '..//BabyTodayCard/BabyTodayCard';
import Loader from '../ui/Loader/Loader';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const weekNumber = useJourneyStore(s => s.weekNumber);
  const daysToChildbirth = useJourneyStore(s => s.daysToChildbirth);
  const mom = useJourneyStore(s => s.mom);
  const baby = useJourneyStore(s => s.baby);
  const fetchJourneyData = useJourneyStore(s => s.fetchJourneyData);
  const resetJourney = useJourneyStore(s => s.resetJourney);
  const isLoaded = useJourneyStore(s => s.isLoaded);

  useEffect(() => {
    
    resetJourney();
    fetchJourneyData(true);
  }, [isAuthenticated, user?.id, resetJourney, fetchJourneyData]);

  useEffect(() => {
    if (!isLoaded) {
    
      fetchJourneyData();
    }
  }, [isLoaded, fetchJourneyData]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className={styles.dashboardContainer}>
      <StatusBlock weeks={weekNumber} days={daysToChildbirth} />
      <BabyTodayCard
        img={baby?.image ?? 'https://ftp.goit.study/img/lehlehka/6895ce04a5c677999ed2af25.webp'}
        height={baby?.babySize}
        weight={baby?.babyWeight}
        activity={baby?.babyActivity}
        info={baby?.babyDevelopment}
        analogy={baby?.analogy ?? 'Фото дитини'}
      />
      <MomTipCard adviceForMom={`${mom?.dailyTip ?? ''} ${mom?.comfortTip?.tip ?? ''}`} />
      <TaskReminderCard />
      <FeelingCheckCard />
    </div>
  );
}
