'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import css from './FeelingCheckCard.module.css';

export default function FeelingCheckCard() {
  const router = useRouter();
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
        <p className={css.text}>Рекомендація на сьогодні:</p>
        <br />
        <p className={css.text}>Занотуйте незвичні відчуття у тілі.</p>
      </div>

      {/* кнопка без сторонніх компонентів */}
      <button
        className={css.button}
        style={{ height: 42, width: 225 }}
        onClick={handleClick}
        type="button"
      >
        Зробити запис у щоденник
      </button>

      {/* тимчасова заглушка замість Modal */}
      {isOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modal}>
            <h3>Щоденник</h3>

            <p>Форма щоденника буде підключена пізніше</p>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={css.closeButton}
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
