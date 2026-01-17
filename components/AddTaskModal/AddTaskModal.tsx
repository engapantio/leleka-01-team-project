'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import styles from './AddTaskModal.module.css';
import type { Task } from '@/types/task';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  taskToEdit = null,
}: AddTaskModalProps) {
  // 🔹 ESC + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = taskToEdit ? 'Редагувати завдання' : 'Нове завдання';

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрити"
        >
          <svg className={styles.closeIcon} aria-hidden="true" focusable="false">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={styles.modalTitle}>{title}</h2>

        <AddTaskForm taskToEdit={taskToEdit} onClose={onClose} />
      </div>
    </div>,
    document.body
  );
}
