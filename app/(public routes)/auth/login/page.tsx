'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useId } from 'react';
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import AuthContainer from '@/components/AuthContainer/AuthContainer';
import { loginSchema } from '@/utils/validationSchemas';
import { useLogin } from '@/hooks/useAuth';
import { LoginDetails } from '@/lib/api/clientApi';
import css from './LoginPage.module.css';

const initialValues: LoginDetails = {
  password: '',
  email: '',
};

const Login = () => {
  const router = useRouter();
  // const [error, setError] = useState('');
  const fieldId = useId();

  // TanStack Query mutation hook
  const loginMutation = useLogin();

  /**
   * Formik onSubmit - only called if validation passes
   * Formik + Yup act as validation gate
   */
  const handleSubmit = (values: LoginDetails, actions: FormikHelpers<LoginDetails>) => {
    // Validation already passed at this point
    // Call mutation (which triggers API call)
    loginMutation.mutate(values, {
      onSuccess: () => {
        // Redirect to home page on success
        // Toast already shown by mutation hook
        router.push('/');
      },
      onSettled: () => {
        // Reset form after mutation settles
        actions.resetForm();
      },
    });
  };

  return (
    <AuthContainer imagePath="/login.jpg">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isValid, dirty }) => (
          <Form className={css.form} noValidate>
            <h1 className={css.formTitle}>Вхід</h1>
            <div className={css.formGroup}>
              <Field
                id={`${fieldId}-email`}
                type="text"
                name="email"
                className={css.input}
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
                className={css.input}
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
