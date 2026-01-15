import { nextServer } from './api';
import type { Task } from '@/types/task';

/**
 * Отримати список завдань
 */
export const getTasks = async (): Promise<Task[]> => {
  const res = await nextServer.get<Task[]>('/tasks');
  return res.data;
};

/**
 * Оновити завдання
 */
export const updateTask = async (
  id: string,
  payload: Partial<Omit<Task, 'id'>>
): Promise<Task> => {
  const res = await nextServer.patch<Task>(`/tasks/${id}`, payload);
  return res.data;
};
