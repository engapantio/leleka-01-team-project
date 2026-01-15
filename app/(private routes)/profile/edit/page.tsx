'use client';

import React, { useState } from 'react';

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

import { editProfile } from '@/lib/api/clientApi';

import styles from './OnboardingForm.module.css';
import Button from '@/components/ui/Button/Button';
import { AvatarPicker } from '@/components/AvatarPicker/AvatarPicker';
import FormikSelect from '@/components/FormikSelect/FormikSelect';
import AuthContainer from '@/components/AuthContainer/AuthContainer';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikDatePickerBirthday } from '@/components/FormikDatePicker/FormikDatePicker';
import { useMediaQuery } from '@mui/system';
import Modal from '@/components/Modal/Modal';

type FormValues = {
  gender: string;
  dueDate: string;
  avatar: File | null;
};

export default function OnboardingForm() {
  const router = useRouter();
  const [succsess, setSuccsess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setUser = useAuthStore(state => state.setUser);

  const genderOptions = [
    { label: 'Оберіть стать' },
    { label: 'хлопчик' },
    { label: 'дівчинка' },
  ];

  const validGenders = ['хлопчик', 'дівчинка'];

  const initialValues: FormValues = {
    gender: 'Оберіть стать',
    dueDate: '',
    avatar: null,
  };

  const validationSchema = Yup.object({
    gender: Yup.string()
      .oneOf(validGenders, 'Оберіть стать')
      .required('Оберіть стать'),
    dueDate: Yup.string().required('Вкажіть дату'),
  });

  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const downloadBtnWidth = isDesktop ? 179 : 162;

  const handleSubmit = async (formValues: FormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      if (formValues.avatar) {
        formData.append('avatar', formValues.avatar);
      }

      // Convert gender from Ukrainian to backend format
      const genderMap: Record<string, string> = {
        'хлопчик': 'boy',
        'дівчинка': 'girl',
        'Оберіть стать': ''
      };
      const backendGender = genderMap[formValues.gender] || formValues.gender;

      formData.append('gender', backendGender);
      formData.append('dueDate', formValues.dueDate);

      const res = await editProfile(formData);

      if (res) {
        setUser(res);
        toast.success('Профіль успішно оновлено!');
        setSuccsess(true);
        return res;
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string; message?: string }>;
      const status = axiosError.response?.status;
      let errorMessage = 'Виникла помилка при збереженні профілю.';

      if (status === 400) {
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          'Невірні дані. Перевірте правильність введених даних.';
      } else if (status === 401) {
        errorMessage = 'Сесія закінчилася. Будь ласка, увійдіть знову.';
      } else if (axiosError.response?.data) {
        errorMessage =
          axiosError.response.data.message ||
          axiosError.response.data.error ||
          axiosError.message ||
          errorMessage;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }

      toast.error(errorMessage, {
        position: 'top-left',
        duration: 5000,
      });
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainer imagePath="/onboard.jpg">
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Давайте познайомимося ближче</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className={styles.form}>
              <AvatarPicker
                name="avatar"
                btnTitle="Завантажити фото"
                buttonStyles={{ width: downloadBtnWidth }}
              />
              <div className={styles.field}>
                <label htmlFor="gender" className={styles.label}>
                  Стать дитини
                </label>
                <FormikSelect name="gender" options={genderOptions} />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="dueDate" className={styles.label}>
                  Планова дата пологів
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormikDatePickerBirthday name="dueDate" />
                </LocalizationProvider>
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.submitWrap}>
                <Button
                  type="submit"
                  styles={{ width: '100%' }}
                  aria-label="Зберегти"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Збереження...' : 'Зберегти'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Modal */}
      {succsess && (
        <Modal
          title="Реєстрацію завершено"
          onClose={() => setSuccsess(false)}
          styles={{
            justifyContent: 'center',
            gap: 25,
            padding: 25,
            maxHeight: 250,
          }}
        >
          <Button
            type="button"
            styles={{ maxWidth: 144, height: 44 }}
            action={() => router.push('/')}
          >
            Готово
          </Button>
        </Modal>
      )}
    </AuthContainer>
  );
}
