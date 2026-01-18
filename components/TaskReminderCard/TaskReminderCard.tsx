'use client';

import { useEffect, useState } from 'react';
import css from './TaskReminderCard.module.css';
import { getTasks, updateTask } from '@/lib/api/tasksApi';
import type { Task } from '@/types/task';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function TaskReminderCard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const tasksFromServer = await getTasks();
        setTasks(tasksFromServer);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAddClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
    } else {
      setIsModalOpen(true);
    }
  };
  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };
  const toggleTask = async (task: Task) => {
    if (!task.id) return;

    try {
      const updatedTask = await updateTask(task.id, { isDone: !task.isDone });
      setTasks(prev => prev.map(t => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className={css.TaskReminderCard}>
      <div className={css.TopBlock}>
        <h4 className={css.TaskReminderTitle}>Важливі завдання</h4>
        <button className={css.AddTaskIconButton} onClick={handleAddClick}>
          <svg width={24} height={24} aria-label="Add new item">
            <use href="/sprite.svg#add-icon" />
          </svg>
        </button>
      </div>

      <div className={css.TasksContainer}>
        {isLoading ? (
          <p>Завантаження...</p>
        ) : tasks.length === 0 ? (
          <div className={css.NoTasksContainer}>
            <h3 className={css.NoTasksYetTitle}>Наразі немає жодних завдань</h3>
            <p className={css.AddTsksText}>Створіть мерщій нове завдання!</p>
            <button className={css.AddTaskButton} onClick={handleAddClick}>
              Створити завдання
            </button>
          </div>
        ) : (
          <ul className={css.TasksList}>
            {sortedTasks.map(task => (
              <li key={task.id} className={css.TaskItem}>
                <label className={css.TaskCheckboxWrapper}>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => toggleTask(task)}
                  />
                  <span className={css.CustomCheckbox} />
                </label>

                <div className={css.TaskTextBlock}>
                  <span className={css.TaskDate}>
                    {new Date(task.date).toLocaleDateString('uk-UA')}
                  </span>
                  <p className={`${css.TaskText} ${task.isDone ? css.Completed : ''}`}>
                    {task.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}
