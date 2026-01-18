import { redirect } from 'next/navigation';
import { getCurrentWeek, getCurrentWeekPublic, checkSession } from '@/lib/api/serverApi';

const JourneyPage = async () => {
  try {
    const canUsePrivate = await checkSession().catch(() => false);

    const currentWeekData = canUsePrivate ? await getCurrentWeek() : await getCurrentWeekPublic();

    const weekNumber = currentWeekData?.weekNumber ?? 1;

    redirect(`/journey/${weekNumber}`);
  } catch (error) {
    // Якщо помилка, перенаправляємо на перший тиждень
    redirect('/journey/1');
  }
};

export default JourneyPage;
