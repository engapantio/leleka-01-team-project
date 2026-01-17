'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { DiaryEntry } from '@/types/diary';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { deleteDiaryEntryById, fetchDiaryEntryById } from '@/lib/api/clientApi';
//import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import ConfirmationModal from '@/components/ConfirmationModalDelete/ConfirmationModalDelete';
import Loading from '@/app/loading';

export default function DiaryEntryIdPage() {
  const params = useParams();
  const entryId = Array.isArray(params.entryId) ? params.entryId[0] : params.entryId;
  // const router = useRouter();

  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!entryId) return;

    const fetchEntry = async () => {
      try {
        setIsLoading(true);
        const res = await fetchDiaryEntryById(entryId);
        setEntry(res);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('Сталася невідома помилка');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [entryId]);

  const handleEdit = () => setIsEditModalOpen(true);
  const handleDelete = () => setIsDeleteModalOpen(true);

  //   const handleDeleteConfirm = async () => {
  //     if (!entry || !entryId) return;

  //     try {
  //       await deleteDiaryEntryById(entryId);
  //       toast.success('Запис успішно видалено');
  //       router.push('/diary');
  //     } catch (err: unknown) {
  //       if (err instanceof Error) {
  //         toast.error(err.message);
  //       } else {
  //         toast.error('Сталася невідома помилка');
  //       }
  //     } finally {
  //       setIsDeleteModalOpen(false);
  //     }
  //   };

  if (isLoading) return <Loading />;
  if (!entry) return <p>Запис не знайдено</p>;

  return (
    <div>
      <DiaryEntryDetails entry={entry} onEdit={handleEdit} onDelete={handleDelete} />
      {/* {isEditModalOpen && <AddDiaryEntryModal  />} */}

      {/* {isDeleteModalOpen && <ConfirmationModal />} */}
    </div>
  );
}
