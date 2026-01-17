'use client';

import type { DiaryEntry } from '@/types/diary';
import css from './DiaryEntryDetails.module.css';
import Loader from '../Loader/Loader';
import dateTransform from '../../utils/dateTransform';
import { useDeleteEntryStore } from '@/lib/store/useDeleteEntryStore';

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  isLoading?: boolean;
  onEdit?: (entry: DiaryEntry) => void;
}

export default function DiaryEntryDetails({
  entry,
  isLoading = false,
  onEdit,
}: DiaryEntryDetailsProps) {
  const openModal = useDeleteEntryStore((state) => state.openModal);

  if (isLoading) {
    return <Loader />;
  }

  if (!entry) {
    return
  }

  return (
    <div className={css.container}>
      <div className={css.infoContainer}>
        <div className={css.titleContainer}>
          <h2 className={css.title}>{entry.title}</h2>

          <button
            className={css.btn}
            onClick={() => onEdit?.(entry)}
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
            onClick={() => openModal(entry)}
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
    </div>
  );
}
