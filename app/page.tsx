'use client';

import MomTipCard from '@/components/MomTipCard/MomTipCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";

const MOCK = {
  weeks: 14,
  days: 165,
  sizeText: "Ваш малюк зараз розміром з авокадо",
  achievementText:
    "Розмір: Приблизно 12 см\n" +
    "Вага: Близько 45 грамів.\n\n" +
    "Активність: М’язи обличчя вже працюють! Малюк вчиться моргати, мружитись і навіть може зловити гикавку.\n\n" +
    "У цей час тіло малюка починає вкриватися лануго — надзвичайно ніжним пушком, який зберігає тепло. Його шкіра стає міцнішою, а рухи — більш скоординованими.",
};

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <StatusBlock weeks={MOCK.weeks} days={MOCK.days} />

      <BabyTodayCard
        title="Малюк сьогодні"
        sizeText={MOCK.sizeText}
        achievementText={MOCK.achievementText}
      />
      <section
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        gap: 32,
        flexWrap: 'wrap',
      }}
      >
        <MomTipCard adviceForMom="Пий воду і відпочивай" />
        <FeelingCheckCard />
      </section>     
    </main>
  );
}
