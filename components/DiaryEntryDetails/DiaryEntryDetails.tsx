'use client';

import type { DiaryEntry } from '@/types/diary';
import css from './DiaryEntryDetails.module.css';
import Loader from '../Loader/Loader';
import dateTransform from '../../utils/dateTransform';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDiaryEntryById } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import DiaryEntryDetailsPlaceholder from '../DiaryEntryDetailsPlaceholder/DiaryEntryDetailsPlaceholder';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '../ConfirmationModalDelete/ConfirmationModalDelete';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  isLoading?: boolean;
    onEdit?: (entry: DiaryEntry) => void;
}

export default function DiaryEntryDetails({
  entry: initialEntry,
  isLoading = false,
}: DiaryEntryDetailsProps) {
    const router = useRouter();
  const queryClient = useQueryClient();
  const [entry, setEntry] = useState<DiaryEntry | null>(initialEntry);

  useEffect(() => {
  setEntry(initialEntry);
}, [initialEntry]);


  const [isDesktop, setIsDesktop] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth >= 1440 : true
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const { mutate: deleteEntry } = useMutation({
    mutationFn: (id: string) => deleteDiaryEntryById(id),
onSuccess: () => {
  toast.success('Запис видалено');
  queryClient.invalidateQueries({ queryKey: ['diaries'] });

  if (isDesktop) {
    setEntry(null);

  } else {
    router.back();
  }
  setIsModalOpen(false); 
},
      onError: (err) => {
        toast.error('Не вдалося видалити запис');
      console.error('Не вдалося видалити запис', err);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!entry) {
    return isDesktop ? <DiaryEntryDetailsPlaceholder /> : null;
  }

  return (
    <div className={css.container}>
      <div className={css.infoContainer}>
        <div className={css.titleContainer}>
          <h2 className={css.title}>{entry.title}</h2>

          <button
            className={css.btn}
            onClick={() => setIsEditModalOpen(true)}
            aria-label="Edit diary entry"
          >
            <svg width="24" height="24" viewBox="0 0 32 32">
              <use href="/sprite.svg#icon-edit_square" />
            </svg>
          </button>
        </div>

        <div className={css.dateContainer}>
          <p className={css.date}>{dateTransform(entry.date)}</p>

          <button
            className={css.btn}
            onClick={() => setIsModalOpen(true)}

            aria-label="Delete diary entry"
          >
            <svg width="24" height="24" viewBox="0 0 32 32">
              <use href="/sprite.svg#icon-delete_forever" />
            </svg>
            
          </button>
        </div>
      </div>

      <p className={css.text}>{entry.description}</p>

      {entry.emotions.length > 0 && (
        <ul className={css.list}>
          {entry.emotions.map((emotion) => (
            <li key={emotion.id} className={css.emotions}>
              {emotion.title}
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && entry && (
        <ConfirmationModal
          title={`Видалити "${entry.title}"?`}
          handler={() => deleteEntry(entry.id)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
{isEditModalOpen && entry && (
  <AddDiaryEntryModal
    isOpen={isEditModalOpen}
    onClose={() => setIsEditModalOpen(false)}
    mode="edit"
    title="Редагувати запис"
    formProps={{
      initialValues: {
        id: entry.id,
        title: entry.title,
        description: entry.description,
        categories: entry.emotions,
      },
      onSuccess: (updatedData: DiaryEntry) => {
        setEntry(updatedData);
        setIsEditModalOpen(false);
        toast.success('Запис оновлено');
        queryClient.invalidateQueries({ queryKey: ['diaries'] });
      },
      notify: (type, message) => {
        type === 'success' ? toast.success(message) : toast.error(message);
      },
    }}
  />
)}

    </div>
  );
}
