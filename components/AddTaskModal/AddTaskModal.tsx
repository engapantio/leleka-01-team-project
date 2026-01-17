'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import styles from './AddTaskModal.module.css';
import type { Task } from '@/types/task';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
}

export default function AddTaskModal({ isOpen, onClose, taskToEdit = null }: AddTaskModalProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * 🔹 Створюємо portal-контейнер ТІЛЬКИ на клієнті
   */
  useEffect(() => {
    setMounted(true);

    if (!containerRef.current) {
      const el = document.createElement('div');
      el.setAttribute('data-modal-root', 'add-task-modal');
      document.body.appendChild(el);
      containerRef.current = el;
    }

    return () => {
      containerRef.current?.remove();
      containerRef.current = null;
    };
  }, []);

  /**
   * 🔹 Escape + блокування скролу
   */
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

  /**
   * ❗ КЛЮЧЕВО:
   * - не mounted → null
   * - не isOpen → null
   * - немає container → null
   */
  if (!mounted || !isOpen || !containerRef.current) return null;

  const title = taskToEdit ? 'Редагувати завдання' : 'Нове завдання';

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modal = (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Закрити">
          <svg className={styles.closeIcon} aria-hidden="true" focusable="false">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={styles.modalTitle}>{title}</h2>

        <AddTaskForm taskToEdit={taskToEdit} onClose={onClose} />
      </div>
    </div>
  );

  return createPortal(modal, containerRef.current);
}
