'use client';

import { useState } from 'react';

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
<<<<<<< HEAD
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { useAuthStore } from '@/lib/store/authStore';
=======
import dayjs from 'dayjs';
>>>>>>> main
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useUpdateProfileMutation } from '@/hooks/useUpdateProfileMutation';
import { useUpdateAvatarMutation } from '@/hooks/useUpdateAvatarMutation';

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
  gender: string | null;
  dueDate: string;
  avatar: File | null;
};

export default function OnboardingForm() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
<<<<<<< HEAD
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setUser = useAuthStore(state => state.setUser);

  const genderOptions = [
    { label: 'Оберіть стать' },
    { label: 'хлопчик' },
    { label: 'дівчинка' },
  ];
=======
  const [error, setError] = useState<string | null>(null);
  const profileMutation = useUpdateProfileMutation();
  const avatarMutation = useUpdateAvatarMutation();

  //const setUser = useAuthStore(state => state.setUser);
  const genderMap: Record<string, string | null> = {
    хлопчик: 'boy',
    дівчинка: 'girl',
    'Ще не знаю': null,
  };

  const genderOptions = [{ label: 'хлопчик' }, { label: 'дівчинка' }, { label: 'Ще не знаю' }];
>>>>>>> main

  const validGenders = ['хлопчик', 'дівчинка'];

  const initialValues: FormValues = {
    gender: 'Ще не знаю',
    dueDate: '',
    avatar: null,
  };

  const validationSchema = Yup.object({
    gender: Yup.string()
 HEAD
      .oneOf(validGenders, 'Оберіть стать')

      .oneOf(
        genderOptions.map(o => o.label),
        'Ще не знаю'
      )
main
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

  // const handleSubmit = async (formValues: FormValues) => {
  //   try {
  //     const formData = new FormData();

  //     // if (formValues.avatar) {
  //     //   formData.append('avatar', formValues.avatar);
  //     // }

  //     formData.append('gender', formValues.gender);
  //     formData.append('dueDate', formValues.dueDate);

  //     const res = await editProfile(formData);

  //     console.log(res);

  //     if (res) {
  //       setSuccess(true);
  //       return res;
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const handleSubmit = async (formValues: FormValues) => {
    setIsSubmitting(true);
    try {
      setError(null);
      console.log('📋 Form submitted:', formValues);

      if (formValues.avatar) {
        console.log('📸 Uploading avatar...');
        await new Promise<void>((resolve, reject) => {
          avatarMutation.mutate(formValues.avatar!, {
            onSuccess: () => {
              //console.log('✅ Avatar uploaded:', data);
              resolve();
            },
            onError: (err: any) => {
              console.error('❌ Avatar upload failed:', err);
              reject(err);
            },
          });
        });
      }

<<<<<<< HEAD
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
        setSuccess(true);
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
=======
      const profileUpdate: Record<string, string | null> = {};

      if (formValues.gender) {
        const englishGender = genderMap[formValues.gender];
        if (englishGender || null) {
          profileUpdate.gender = englishGender;
          console.log(`👤 Gender: ${formValues.gender} → ${englishGender}`);
        }
      }
      if (formValues.dueDate) {
        const formattedDate = dayjs(formValues.dueDate).format('YYYY-MM-DD');
        profileUpdate.dueDate = formattedDate;
        console.log(`📅 Date: ${formValues.dueDate} → ${formattedDate}`);
      }

      if (Object.keys(profileUpdate).length > 0) {
        console.log('👤 Updating profile:', profileUpdate);
        await new Promise<void>((resolve, reject) => {
          profileMutation.mutate(profileUpdate, {
            onSuccess: data => {
              console.log('✅ Profile updated:', data);
              resolve();
            },
            onError: (err: any) => {
              console.error('❌ Profile update failed:', err);
              reject(err);
            },
          });
        });
      }

      const { reinitializeAuth } = useAuthStore.getState();
      reinitializeAuth();
      console.log('✅ AuthProvider reinitialized after onboarding');

      console.log('🎉 All updates completed');
      setSuccess(true);

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: unknown) {
      const errorMessage = 'Failed to save profile';
      setError(errorMessage);
      console.error('❌ Error:', err, errorMessage);
>>>>>>> main
    }
  };

  const isLoading = profileMutation.isPending || avatarMutation.isPending;

  return (
<<<<<<< HEAD
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
=======
    <section className={styles.wrapper}>
      <div className={styles.formCard}>
        <div className={styles.logoBox}>
          <Image src={Logo} alt="Leleka" fill priority className={styles.logoImg} />
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Давайте познайомимося ближче</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
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
 main
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
            action={() => router.push('/')}
          >
            Готово
          </Button>
        </Modal>
      )}
    </AuthContainer>
  );
}
