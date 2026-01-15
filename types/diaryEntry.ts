// types/diaryEntry.ts
import type { DiaryEntry, Emotion } from './diary';

export type DiaryCategoryOption = Emotion;

export type AddDiaryEntryFormValues = {
  title: string;
  categories: DiaryCategoryOption[];
  description: string;
};

export type DiaryEntryFormMode = 'create' | 'edit';

export type NotifyHandler = (
  type: 'success' | 'error',
  message: string
) => void;

export type DiaryEntryInitialValues = Partial<
  AddDiaryEntryFormValues & { id?: string }
>;

export interface AddDiaryEntryFormProps {
  mode?: DiaryEntryFormMode;
  initialValues?: DiaryEntryInitialValues;
  categoryOptions?: DiaryCategoryOption[];
  onSuccess?: (data: DiaryEntry) => void;
  onError?: (error: unknown) => void;
  notify?: NotifyHandler;
  successMessage?: string;
  errorMessage?: string;
}
