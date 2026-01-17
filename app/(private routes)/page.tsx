'use client';

import MomTipCard from '@/components/MomTipCard/MomTipCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import TaskReminderCard from '@/components/TaskReminderCard/TaskReminderCard';
import DiaryPage from './diary/DIaryPageClient';

const MOCK = {
  weeks: 14,
  days: 165,
  sizeText: 'Ваш малюк зараз розміром з авокадо',
  achievementText:
    'Розмір: Приблизно 12 см\n' +
    'Вага: Близько 45 грамів.\n\n' +
    'Активність: М’язи обличчя вже працюють! Малюк вчиться моргати, мружитись і навіть може зловити гикавку.\n\n' +
    'У цей час тіло малюка починає вкриватися лануго — надзвичайно ніжним пушком, який зберігає тепло. Його шкіра стає міцнішою, а рухи — більш скоординованими.',
};

export default function Home() {
  // const { fetchEmotions } = useEmotionsStore();

  // useEffect(() => {
  //   fetchEmotions();
  // }, [fetchEmotions]);

  return (
    <main className="main-container">
      <GreetingBlock />
      <div className="widgets-wrapper">
        <div className="left-section">
          <StatusBlock weeks={MOCK.weeks} days={MOCK.days} />
          <BabyTodayCard
            title="Малюк сьогодні"
            sizeText={MOCK.sizeText}
            achievementText={MOCK.achievementText}
          />
          <MomTipCard adviceForMom="Пий воду і відпочивай" />
        </div>
        <div className="right-section">
          <TaskReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
      <div className='diary-page'>
      </div>
    </main>
  );
}