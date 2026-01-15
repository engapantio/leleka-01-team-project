'use client';

import React, { useState } from 'react';

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

  // STATE

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
        setSuccsess(true);
        return res;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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
            action={() => router.push('/')}
          >
            Готово
          </Button>
        </Modal>
      )}
    </AuthContainer>
  );
}
