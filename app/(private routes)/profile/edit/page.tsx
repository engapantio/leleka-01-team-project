'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Formik, Form, ErrorMessage } from 'formik';
import { useMediaQuery } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import { useAuthStore } from '@/lib/store/authStore';
import { useUpdateProfileMutation } from '@/hooks/useUpdateProfileMutation';
import { useUpdateAvatarMutation } from '@/hooks/useUpdateAvatarMutation';

import { AvatarPicker } from '@/components/AvatarPicker/AvatarPicker';
import FormikSelect from '@/components/FormikSelect/FormikSelect';
import { FormikDatePickerBirthday } from '@/components/FormikDatePicker/FormikDatePicker';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/Modal/Modal';
import styles from './OnboardingForm.module.css';

type FormValues = {
  gender: string | null;
  dueDate: string;
  avatar: File | null;
};

export default function OnboardingForm() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const profileMutation = useUpdateProfileMutation();
  const avatarMutation = useUpdateAvatarMutation();

  //const setUser = useAuthStore(state => state.setUser);
  const genderMap: Record<string, string | null> = {
    хлопчик: 'boy',
    дівчинка: 'girl',
    'Ще не знаю': null,
  };

  const genderOptions = [{ label: 'Хлопчик' }, { label: 'Дівчинка' }, { label: 'Ще не знаю' }];

  const initialValues: FormValues = {
    gender: 'Ще не знаю',
    dueDate: '',
    avatar: null,
  };

  const validationSchema = Yup.object({
    gender: Yup.string()
      .oneOf(
        genderOptions.map(o => o.label),
        'Ще не знаю'
      )
      .required('Оберіть стать'),
    dueDate: Yup.string()
      .required('Вкажіть дату')
      .test('not-past', 'Дата не може бути в минулому', function (value) {
        if (!value) return false;
        const selected = dayjs(value);
        const today = dayjs().startOf('day');
        return selected.isAfter(today) || selected.isSame(today);
      }),
  });

  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const downloadBtnWidth = isDesktop ? 179 : 162;


  const handleSubmit = async (formValues: FormValues) => {
    try {
      setError(null);
     

      if (formValues.avatar) {
       
        await new Promise<void>((resolve, reject) => {
          avatarMutation.mutate(formValues.avatar!, {
            onSuccess: () => {
              //console.log('✅ Avatar uploaded:', data);
              resolve();
            },
            onError: (err: unknown) => {
              // console.error('❌ Avatar upload failed:', err);
              reject(err);
            },
          });
        });
      }

      const profileUpdate: Record<string, string | null> = {};

      if (formValues.gender) {
        const englishGender = genderMap[formValues.gender];
        if (englishGender || null) {
          profileUpdate.gender = englishGender;
          // console.log(`👤 Gender: ${formValues.gender} → ${englishGender}`);
        }
      }
      if (formValues.dueDate) {
        const formattedDate = dayjs(formValues.dueDate).format('YYYY-MM-DD');
        profileUpdate.dueDate = formattedDate;
        // console.log(`📅 Date: ${formValues.dueDate} → ${formattedDate}`);
      }

      if (Object.keys(profileUpdate).length > 0) {
        // console.log('👤 Updating profile:', profileUpdate);
        await new Promise<void>((resolve, reject) => {
          profileMutation.mutate(profileUpdate, {
            onSuccess:() => {
              // console.log('✅ Profile updated:', data);
              resolve();
            },
            onError: (err: unknown) => {
              // console.error('❌ Profile update failed:', err);
              reject(err);
            },
          });
        });
      }

      const { reinitializeAuth } = useAuthStore.getState();
      reinitializeAuth();
      // console.log('✅ AuthProvider reinitialized after onboarding');

      // console.log('🎉 All updates completed');
      setSuccess(true);

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: unknown) {
      const errorMessage = 'Failed to save profile';
      setError(errorMessage);
      // console.error('❌ Error:', err, errorMessage);
    }
  };

  const isLoading = profileMutation.isPending || avatarMutation.isPending;

  return (
    <section className={styles.wrapper}>
      <div className={styles.formCard}>
        <div className={styles.logoBox}>
          <Image src='/company-logo.svg' alt="Leleka" fill priority className={styles.logoImg} />
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>
            Давайте познайомимося ближче
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ }) => (
              <Form className={styles.form}>
                {error && (
                  <div
                    style={{
                      color: '#c01530',
                      marginBottom: '16px',
                      padding: '12px',
                      backgroundColor: 'rgba(192, 21, 47, 0.1)',
                      borderRadius: '8px',
                    }}
                  >
                    ❌ {error}
                  </div>
                )}
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
                  <ErrorMessage name="gender" component="div" className={styles.error} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="dueDate" className={styles.label}>
                    Планова дата пологів
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormikDatePickerBirthday name="dueDate" />
                  </LocalizationProvider>
                  <ErrorMessage name="dueDate" component="div" className={styles.error} />
                </div>
                <div className={styles.submitWrap}>
                  <Button type="submit" styles={{ width: '100%' }} aria-label="Зберегти">
                    {isLoading ? 'Збереження...' : 'Зберегти'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* Modal */}
        {success && (
          <Modal
            title="Реєстрацію завершено"
            onClose={() => setSuccess(false)}
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
              action={() => (window.location.href = '/')}
            >
              Готово
            </Button>
          </Modal>
        )}
      </div>

      <aside className={styles.illustration} aria-hidden="true" />
    </section>
  );
}
