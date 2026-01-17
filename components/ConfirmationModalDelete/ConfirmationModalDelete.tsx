'use client';

import css from './ConfirmationModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../ui/Button/Button';
import { useEffect, useState } from 'react';

interface ConfirmationModalProps {
  title: string;
  handler?: () => void;
  onClose: () => void;
  style?: object;
}

const styleObjBtn = {
  maxWidth: 268,
};
export default function ConfirmationModal({
  title,
  handler,
  onClose,
}: ConfirmationModalProps) {
  const [modalStyle, setModalStyle] = useState({
    maxHeight: '413px',
  });

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setModalStyle({ maxHeight: '413px' });
      } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        setModalStyle({ maxHeight: '261px' });
      } else if (window.innerWidth >= 1200) {
        setModalStyle({ maxHeight: '338px' });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Modal title={title} styles={modalStyle} onClose={onClose}>
      <div className={css.actions}>
        <Button styles={styleObjBtn} action={handler}>
          Так
        </Button>
        <Button styles={styleObjBtn} action={onClose} alternative={true}>
          Ні
        </Button>
      </div>
    </Modal>
  );
}