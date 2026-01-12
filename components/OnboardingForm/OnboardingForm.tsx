'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import { editProfile } from '@/lib/api/clientApi';
import { ApiError } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';

import styles from './OnboardingForm.module.css';
import Button from '@/components/ui/Button/Button';
import Logo from '@/public/logo.svg';
import Image from 'next/image';
import { AvatarPicker } from '@/components/AvatarPicker/AvatarPicker';
import FormikSelect from '@/components/FormikSelect/FormikSelect';

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
  const setUser = useAuthStore(state => state.setUser);

  const genderOptions = [
    { label: 'хлопчик' },
    { label: 'дівчинка' },
    { label: 'Ще не знаю' },
  ];

  const initialValues: FormValues = {
    gender: '',
    dueDate: '',
    avatar: null,
  };

  const validationSchema = Yup.object({
    gender: Yup.string()
      .oneOf(
        genderOptions.map(o => o.label),
        'Оберіть стать'
      )
      .required('Оберіть стать')
      .notOneOf([''], 'Оберіть стать'),
    dueDate: Yup.string()
      .required('Вкажіть дату')
      .min(1, 'Вкажіть дату'),
  });

  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const downloadBtnWidth = isDesktop ? 179 : 162;

  const handleSubmit = async (
    formValues: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const formData = new FormData();

      if (formValues.avatar) {
        formData.append('avatar', formValues.avatar);
      }

      formData.append('gender', formValues.gender);
      formData.append('dueDate', formValues.dueDate);

      const res = await editProfile(formData);

      if (res) {
        setUser(res);
        setSuccsess(true);
        toast.success('Профіль успішно оновлено!');
      } else {
        toast.error('Виникла помилка при збереженні профілю.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      const errorMessage =
        (error as ApiError).response?.data?.error ??
        (error as ApiError).message ??
        'Ой... сталася помилка';
      toast.error(errorMessage, {
        position: 'top-center',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className={styles.wrapper}>
      <div className={styles.formCard}>
        <div className={styles.logoBox}>
          <Image
            src={Logo}
            alt="Leleka"
            fill
            priority
            className={styles.logoImg}
          />
        </div>
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
                  <FormikSelect 
                    name="gender" 
                    options={genderOptions} 
                    placeholder="Оберіть стать"
                  />
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
                  >
                    Зберегти
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
              action={() => {
                setSuccsess(false);
                router.push('/');
              }}
            >
              Готово
            </Button>
          </Modal>
        )}
      </div>

      <aside className={styles.illustration} aria-hidden="true" />
    </section>
    </>
  );
}
