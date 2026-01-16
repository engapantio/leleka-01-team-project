'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './GreetingBlock.module.css';

export default function GreetingBlock() {
  //const { user, isAuthenticated } = useAuthStore();
  const { user, isAuthenticated } = useAuthStore();

  const getGreetingByTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 60 + minutes;

    if (time >= 360 && time < 720) return 'Доброго ранку';
    if (time >= 720 && time < 1080) return 'Доброго дня';
    if (time >= 1080 && time < 1440) return 'Доброго вечора';
    return 'Доброї ночі';
  };

  return (
    <h1 className={css.greetingTitle}>
      {getGreetingByTime()}
      {isAuthenticated && user?.name ? `, ${user.name}!` : '!'}
    </h1>
  );
}
