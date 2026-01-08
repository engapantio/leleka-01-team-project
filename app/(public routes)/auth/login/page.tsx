'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useId } from 'react';
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { login, LoginDetails } from '@/lib/api/clientApi';
import { ApiError } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import css from './LoginPage.module.css';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  password: '',
  email: '',
};

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const fieldId = useId();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
    try {
      const response = await login(values);

      if (response) {
        setUser(response);
        router.push('/profile');
      } else {
        setError('Невірний пароль чи пошта');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Ой... сталася помилка'
      );
    } finally {
      actions.resetForm();
    }
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Неправильна адреса електронної пошти')
      .max(64, 'Занадто довга адреса електронної пошти')
      .required("Обов'язкове до заповнення поле"),
    password: Yup.string()
      .min(8, 'Пароль занадто короткий')
      .max(128, 'Пароль занадто довгий')
      .required("Обов'язкове до заповнення поле"),
  });

  return (
    <main className={css.mainContent}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
        <Form className={css.form}>
          <h1 className={css.formTitle}>Вхід</h1>
          <Field
            id={`${fieldId}-email`}
            type="email"
            name="email"
            className={css.input}
            placeholder="Пошта"
          />
          <ErrorMessage name="email" component="span" className={css.error} />
          <Field
            id={`${fieldId}-password`}
            type="password"
            name="password"
            placeholder="Пароль"
            className={css.input}
          />
          <ErrorMessage name="password" component="span" className={css.error} />
          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Увійти
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </Form>
      </Formik>
      <p className={css.links}>
        {' '}
        Немає аккаунту?
        <Link href="/auth/register">Зареєструватися</Link>
      </p>

      <Image src="/login.jpg" alt="login" width={720} height={900} priority className={css.image} />
    </main>
  );
};

export default Login;
