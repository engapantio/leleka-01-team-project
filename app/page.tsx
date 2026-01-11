'use client';

import MomTipCard from '@/components/MomTipCard/MomTipCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';

export default function Home() {
  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        gap: 32,
        flexWrap: 'wrap',
      }}
    >
      <MomTipCard adviceForMom="Пий воду і відпочивай ❤️" />
      <FeelingCheckCard />
    </section>
  );
}
