import css from './TaskReminderCard.module.css';

export default function TaskReminderCard() {
  return (
    <div className={css.TaskReminderCard}>
      <div className={css.TopBlock}>
        <h4 className={css.TaskReminderTitle}>Важливі завдання</h4>
        <button className={css.AddTaskIconButton}>
          <svg width={24} height={24} aria-label="Add new item">
            <use href="/sprite.svg#add-icon" />
          </svg>
        </button>
      </div>
      <div className={css.TasksContainer}>
        <div className={css.NoTasksContainer}>
             <h3 className={css.NoTasksYetTitle}>Наразі немає жодних завдань</h3>
            <p className={css.AddTsksText}>Створіть мершій нове завдання!</p>
        </div>
           
            <button className={css.AddTaskButton}>Створити завдання</button>
      </div>
    </div>
  );
}
