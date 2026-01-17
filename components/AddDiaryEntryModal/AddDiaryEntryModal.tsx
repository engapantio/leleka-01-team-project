'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import styles from './AddDiaryEntryModal.module.css';
import type { AddDiaryEntryFormProps } from '@/types/diaryEntry';

type AddDiaryEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
  title?: string;
  className?: string;
  backdropClassName?: string;
  contentClassName?: string;
  formProps?: Partial<AddDiaryEntryFormProps>;
};

export default function AddDiaryEntryModal({
  isOpen,
  onClose,
  mode = 'create',
  title,
  className,
  backdropClassName,
  contentClassName,
  formProps,
}: AddDiaryEntryModalProps) {
  // 🔹 ESC + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalTitle =
    title ?? (mode === 'edit' ? 'Редагувати запис' : 'Новий запис');

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={modalTitle}
      onClick={handleBackdropClick}
      className={[styles.backdrop, backdropClassName].filter(Boolean).join(' ')}
    >
      <div
        className={[styles.panel, className, contentClassName]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{modalTitle}</h3>
          <button
            type="button"
            aria-label="Закрити"
            onClick={onClose}
            className={styles.closeBtn}
          >
            <svg className={styles.closeIcon} aria-hidden="true">
              <use href="/sprite.svg#icon-close" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <AddDiaryEntryForm {...(formProps || {})} />
        </div>
      </div>
    </div>,
    document.body
  );
}
