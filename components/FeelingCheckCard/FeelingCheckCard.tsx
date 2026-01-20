'use client';

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';

import css from './FeelingCheckCard.module.css';

export default function FeelingCheckCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      setIsOpen(true);
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <div className={css.feelingCheckCardContainer}>
      <div className={css.contentWrap}>
        <h4 className={css.title}>Як ви себе почуваєте?</h4>
        <p className={css.subtitle}>Рекомендація на сьогодні:</p>
        <p className={css.text}>Занотуйте незвичні відчуття у тілі.</p>
      </div>

     
      <button
        className={css.AddTaskButton}
        onClick={handleClick}
        type="button"
      >
        Зробити запис у щоденник
      </button>

      <AddDiaryEntryModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  mode="create"
  formProps={{
    onSuccess: () => {
  setIsOpen(false);
  toast.success('Запис додано');
  queryClient.invalidateQueries({ queryKey: ['diaries'] });
},
  }}
/>
    </div>
  );
}
