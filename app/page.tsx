"use client";

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

export default function Page() {
  return (
    <main style={{ padding: 20 }}>
      <StatusBlock weeks={MOCK.weeks} days={MOCK.days} />

      <BabyTodayCard
        title="Малюк сьогодні"
        sizeText={MOCK.sizeText}
        achievementText={MOCK.achievementText}
      />
    </main>
  );
}

