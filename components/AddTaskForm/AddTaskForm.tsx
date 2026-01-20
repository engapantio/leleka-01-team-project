import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import styles from './AddTaskForm.module.css';
import type { Task } from '@/types/task';
import { createTask, updateTask } from '@/lib/api/tasksApi';

interface AddTaskFormProps {
  taskToEdit: Task | null;
  onClose: () => void;
  onTaskCreated?: (task: Task) => void;
}

type TaskFormValues = {
  name: string;
  date: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Назва завдання обов’язкова'),
  date: Yup.string().required('Дата обов’язкова'),
});

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  taskToEdit,
  onClose,
  onTaskCreated,
}) => {
  const mutation = useMutation<Task, Error, TaskFormValues>({
    mutationFn: values =>
      taskToEdit?.id ? updateTask(taskToEdit.id, values) : createTask(values),
    onSuccess: newTask => {
      toast.success('Завдання успішно збережено!');
      if (!taskToEdit && onTaskCreated) {
        onTaskCreated(newTask);
      }
      onClose();
    },
    onError: error => {
      toast.error(error.message || 'Помилка при збереженні завдання');
    },
  });

  const initialValues: TaskFormValues = {
    name: taskToEdit?.name ?? '',
    date: taskToEdit?.date ?? new Date().toISOString().split('T')[0],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        mutation.mutate(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Назва завдання</label>
            <Field id="name" name="name" type="text" className={styles.input} />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </div>

          <div className={styles.field}>
            <label htmlFor="date">Дата</label>
            <Field id="date" name="date" type="date" className={styles.input} />
            <ErrorMessage name="date" component="div" className={styles.error} />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTaskForm;
