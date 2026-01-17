import { nextServer } from '@/lib/api/api';
import type { DiaryCategoryOption } from '@/types/diaryEntry';

export const fetchEmotions = async (): Promise<DiaryCategoryOption[]> => {
  const response = await nextServer.get<DiaryCategoryOption[]>('/emotions');
  return response.data;
};
