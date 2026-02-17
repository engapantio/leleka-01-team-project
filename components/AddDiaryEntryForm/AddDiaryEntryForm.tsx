'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import { useMemo } from 'react';
import { isAxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import s from './AddDiaryEntryForm.module.css';

import {
  AddDiaryEntryFormProps,
  AddDiaryEntryFormValues,
  DiaryCategoryOption,
} from '@/types/diaryEntry';

import { diaryEntrySchema } from '@/utils/diaryEntry';

import {
  createDiaryEntry,
  updateDiaryEntry,
  DiaryEntryRequestPayload,
} from '@/lib/api/diaryEntries';

import { TextField, TextareaField, CategoriesField } from './fields';

export default function AddDiaryEntryForm({
  mode = 'create',
  initialValues,
  categoryOptions,
  onSuccess,
  onError,
  notify,
  successMessage,
  errorMessage,
}: AddDiaryEntryFormProps) {
  /**
   * 🔹 Завантаження категорій (емоцій) ЧЕРЕЗ NEXT API (без CORS)
   */
  const { data: emotionData = { emotions: [] }, isLoading: isLoadingEmotions } = useQuery({
    queryKey: ['emotions'],
    queryFn: async () => {
      const res = await fetch('/api/emotions/');

      if (!res.ok) {
        throw new Error('Failed to load emotions');
      }

      return res.json(); // 👈 тут сразу массив
    },
  });

  const entryId = initialValues?.id;
  const emotionOptions: DiaryCategoryOption[] = emotionData.emotions;
  /**
   * 🔹 Якщо категорії передані через props — використовуємо їх
   */
  const options = categoryOptions && categoryOptions.length > 0 ? categoryOptions : emotionOptions;

  /**
   * 🔹 Початкові значення форми
   */
  const formInitialValues: AddDiaryEntryFormValues = useMemo(
    () => ({
      title: initialValues?.title ?? '',
      categories: initialValues?.categories ?? [],
      description:
        initialValues?.description ??
        (initialValues as { content?: string } | undefined)?.content ??
        '',
    }),
    [initialValues]
  );

  /**
   * 🔹 Сабміт
   */
  async function handleSubmit(
    values: AddDiaryEntryFormValues,
    helpers: FormikHelpers<AddDiaryEntryFormValues>
  ) {
    const { setSubmitting, resetForm } = helpers;

    const requestPayload: DiaryEntryRequestPayload = {
      title: values.title.trim(),
      emotions: values.categories.map(option => option.id),
      description: values.description.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      const shouldUpdate = mode === 'edit' || Boolean(entryId);

      if (shouldUpdate && entryId == null) {
        throw new Error('Не вдалося визначити запис для оновлення.');
      }

      const data = shouldUpdate
        ? await updateDiaryEntry(entryId!, requestPayload)
        : await createDiaryEntry(requestPayload);

      notify?.('success', successMessage ?? (shouldUpdate ? 'Запис оновлено' : 'Запис створено'));

      onSuccess?.(data);
      resetForm();
    } catch (error) {
      let message = errorMessage ?? 'Не вдалося зберегти запис.';

      if (isAxiosError(error)) {
        message = (error.response?.data as { message?: string })?.message ?? error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      notify?.('error', message);
      onError?.(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={diaryEntrySchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className={s.form} noValidate>
          <TextField
            name="title"
            label="Заголовок"
            placeholder="Введіть заголовок запису"
            autoFocus
          />

          <CategoriesField
            name="categories"
            label="Категорії"
            placeholder={isLoadingEmotions ? 'Завантаження...' : 'Оберіть категорії'}
            options={options}
          />

          <TextareaField
            name="description"
            label="Опис"
            placeholder="Запишіть, як ви себе відчуваєте"
          />

          <button type="submit" className={s.submit} disabled={isSubmitting || isLoadingEmotions}>
            {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
