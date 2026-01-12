import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Tab, JourneyBaby, JourneyMom } from '@/types/journey';

export const checkSession = async () => {
  const cookiesStore = await cookies();
  const response = await nextServer.get('auth/session', {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });
  return response;
};

// Journey //
export const getCurrentWeek = async () => {
  const response = await nextServer.get<{ weekNumber: number }>('/weeks/current');
  return response.data.weekNumber;
};

export const getJourneyByWeekAndTab = async (
  weekNumber: number,
  tab: Tab
) => {
    const cookieStore = await cookies();

  const response = await nextServer.get<JourneyBaby | JourneyMom>(
    `/weeks/${weekNumber}/${tab}`, {
       headers: {
      Cookie: cookieStore.toString(),
    },
    }
  );
  return response.data;
};