'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useId } from 'react';
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import AuthContainer from '@/components/AuthContainer/AuthContainer';
import { loginSchema } from '@/utils/validationSchemas';
import { useLogin } from '@/hooks/useAuth';
import { LoginDetails } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './LoginPage.module.css';

const initialValues: LoginDetails = {
  password: '',
  email: '',
};

const Login = () => {
  const router = useRouter();

  const fieldId = useId();
  const { reinitializeAuth } = useAuthStore();
  // TanStack Query mutation hook
  const loginMutation = useLogin();

  const handleSubmit = (values: LoginDetails, actions: FormikHelpers<LoginDetails>) => {
    loginMutation.mutate(values, {
      onSuccess: async () => {
        reinitializeAuth();
        router.push('/?auth_refresh=' + Date.now());
        setTimeout(() => {
          router.replace('/');
        }, 200);
      }
    });
  };

  return (
    <AuthContainer imagePath="/login.webp">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isValid, dirty, errors, touched }) => (
          <Form className={css.form} >
            <h1 className={css.formTitle}>Вхід</h1>
            <div className={css.formGroup}>
              <Field
                id={`${fieldId}-email`}
                type="text"
                name="email"
                className={`${css.input} ${errors && touched  ? css.inputInvalid : ''}`}
                placeholder="Пошта"
                disabled={loginMutation.isPending}
              />
              <ErrorMessage name="email" component="div" className={css.error} />
            </div>
            <div className={css.formGroup}>
              <Field
                id={`${fieldId}-password`}
                type="password"
                name="password"
                placeholder="Пароль"
                className={`${css.input} ${errors && touched  ? css.inputInvalid : ''}`}
                disabled={loginMutation.isPending}
              />
              <ErrorMessage name="password" component="div" className={css.error} />
            </div>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || !dirty || loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Завантаження...' : 'Увійти'}
            </button>

            <p className={css.links}>
              Немає аккаунту?<span> </span>
              <Link href="/auth/register">Зареєструватися</Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

export default Login;
