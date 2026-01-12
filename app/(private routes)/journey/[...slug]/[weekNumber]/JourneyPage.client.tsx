'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Tab } from '@/types/journey';

export default function JourneyPageClient() {
  const params = useParams<{ slug?: string[] }>();
  const weekNumber = Number(params.slug?.[0]) || 1;
  const [activeTab, setActiveTab] = useState<Tab>('baby');

  return (
    <div>
      <h2>Journey Week {weekNumber}</h2>
      <div>
        <button onClick={() => setActiveTab('baby')}>Baby</button>
        <button onClick={() => setActiveTab('mom')}>Mom</button>
      </div>
      <p>Active tab: {activeTab}</p>
    </div>
  );
}
