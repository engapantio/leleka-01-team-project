'use client';

import MomTipCard from '@/components/MomTipCard/MomTipCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import TaskReminderCard from '@/components/TaskReminderCard/TaskReminderCard';
import Loader from '@/components/ui/Loader/Loader';
import { useJourneyStore } from '@/lib/store/journeyStore';
import style from './DashboardPage.module.scss';


export default function DashboardPage() {
  // Вытаскиваем всё необходимое из journeyStore
  const { isLoaded, currentWeek, daysToDue, baby } = useJourneyStore();

  if (!isLoaded) return <Loader />;

  return (
    <div className={style.dashboardContainer}>
      <StatusBlock 
        weeks={currentWeek} 
        days={daysToDue} 
      />

      <BabyTodayCard
        imageUrl={baby?.image}
        sizeText={baby?.analogy} // "Размером с лимон"
        achievementText={baby?.babyDevelopment} // Описание развития
      />
      
      {/* Остальные компоненты */}
    </div>
  );
}