'use client';

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useDeleteEntryStore } from '@/lib/store/useDeleteEntryStore';
import { useDiaryStore } from '@/lib/store/useDiaryStore';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDiaryEntryById } from '@/lib/api/clientApi';

interface DeleteEntryModalProps {
  isDesktop?: boolean;
}

export default function DeleteEntryModal({ isDesktop = true }: DeleteEntryModalProps) {
  const { isOpen, entry, closeModal } = useDeleteEntryStore();
  const { removeEntryFromList, entries, setSelectedEntry } = useDiaryStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteDiaryEntryById(id),
    onSuccess: (deletedEntry) => {
      removeEntryFromList(deletedEntry.id);

      if (isDesktop) {
        const remainingEntries = entries.filter(e => e.id !== deletedEntry.id);
        if (remainingEntries.length > 0) {
          setSelectedEntry(remainingEntries[0]); 
        } else {
          setSelectedEntry(null);
        }
      } else {
        router.push('/diaries');
      }

      queryClient.invalidateQueries({ queryKey: ['diaries'] });
    },
    onError: (error) => console.error('Не вдалося видалити запис:', error),
  });

  if (!isOpen || !entry) return null;

  const handleConfirm = () => {
    mutate(entry.id, {
      onSettled: () => closeModal(),
    });
  };

  return (
    <ConfirmationModal
      title={`Видалити "${entry.title}"?`}
      handler={handleConfirm}
      onClose={closeModal}
    />
  );
}
