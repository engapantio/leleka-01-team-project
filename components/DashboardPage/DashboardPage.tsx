import style from './DashboardPage.module.scss';
import { useJourneyStore } from '@/lib/store/journeyStore'; // Импорт нового стора
import StatusBlock from '..//StatusBlock/StatusBlock';
import BabyTodayCard from '..//BabyTodayCard/BabyTodayCard';
import Loader from '@/components/ui/Loader/Loader';

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