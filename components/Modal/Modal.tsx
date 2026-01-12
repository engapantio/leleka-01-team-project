'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { Icon } from '../ui/Icon/Icon';

interface Props {
  children: React.ReactNode;
  title: string;
  styles?: object;
  onClose: () => void;
}

export default function Modal({ children, title, onClose, styles }: Props) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const backdropClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', backdropClose);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', backdropClose);
      document.body.style.overflow = '';
    };
  });

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} style={styles}>
        <div className={css.icon_wrapper}>
          <Icon
            name={'close_btn'}
            action={onClose}
            width={14}
            height={14}
          ></Icon>
        </div>
        <h1 className={css.title}>{title}</h1>
        {children}
      </div>
    </div>,
    document.body
  );
}
