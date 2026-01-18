'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getBabyState, getMomState } from '@/lib/api/clientApi';
import type { Tab } from '@/types/journey';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import Loader from '@/components/Loader/Loader';
import toast from 'react-hot-toast';


const JourneyPageClient = () => {
  const { weekNumber } = useParams<{ weekNumber: string }>();
  const week = Number(weekNumber);

  const [selectedTab, setselectedTab] = useState<Tab>('baby');

  const {
    data: babyData,
    isLoading: isLoadingBabyInfo,
    error: isErrorBabyInfo,
  } = useQuery({
    queryKey: ['weekBaby', week],
    queryFn: () => getBabyState(week),
    refetchOnMount: false,
  });

  const {
    data: MomData,
    isLoading: isLoadingMomInfo,
    error: isErrorMomInfo,
  } = useQuery({
    queryKey: ['weekMom', week, 'mom'],
    queryFn: () => getMomState(week),
    refetchOnMount: false,
  });

  if (isLoadingBabyInfo || isLoadingMomInfo) return <Loader />;

  if (isErrorBabyInfo || isErrorMomInfo) return toast.error('При завантаженні даних сталася помилка. Спробуйте, будь ласка, пізніше', {
  style: {
    border: '1px solid black', background: 'var(--color-scheme-foreground-alt)', color: 'black'
  },
});

  const handleTabBaby = () => {
    setselectedTab('baby');
  };

  const handleTabMom = () => {
    setselectedTab('mom');
  };

  return (
    <div>
      {babyData && MomData && (
        <JourneyDetails
          selectedTab={selectedTab}
          babyData={babyData}
          MomData={MomData}
          selectBabyFn={handleTabBaby}
          selectMomFn={handleTabMom}
        />
      )}
    </div>
  );
};

export default JourneyPageClient;