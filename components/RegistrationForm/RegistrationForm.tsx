'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useId } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { useAuthStore } from '@/lib/store/authStore';
import css from './RegistrationForm.module.css';
import { register, RegistrationDetails } from '@/lib/api/clientApi';
import { registerSchema } from '@/utils/validationSchemas';

const initialValues: RegistrationDetails = {
  name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const router = useRouter();
  // const [error, setError] = useState('');
  const fieldId = useId();
  const setUser = useAuthStore(state => state.setUser);
  const reinitializeAuth = useAuthStore(state => state.reinitializeAuth);
  const handleSubmit = async (
    values: RegistrationDetails,
    actions: FormikHelpers<RegistrationDetails>
  ) => {
    // console.log('Reg data:', values);
    try {
      const res = await register(values);
      if (res) {
        toast.success('Реєстрація успішна!');
        setUser(res);
        reinitializeAuth();
        router.push('/profile/edit');
      } else {
        // setError('Виникла помилка при реєстрації.');
        toast.error('Виникла помилка при реєстрації. Пошту вже зареєстровано', {
          position: 'top-left',
        });
      }
      actions.resetForm();
    } catch (err) {
      // setError(
      //   (err as ApiError).response?.data?.error ??
      //     (err as ApiError).message ??
      //     'Виникла помилка при реєстрації.'
      // );
      toast.error('Виникла помилка при реєстрації.', {
        position: 'top-left',
      });
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}>
      {({ errors, touched }) => (
        <Form className={css.form}>
          <fieldset className={css.fieldset}>
            <legend className={css.title}>Реєстрація</legend>
            <div className={css.field}>
              <label className={css.label} htmlFor={`${fieldId}-name`}>
                Імʼя*
              </label>
              <Field
                className={`${css.input} ${errors.name && touched.name ? css.inputError : ''}`}
                type="text"
                name="name"
                id={`${fieldId}-name`}
                placeholder="Ваше імʼя"
              />
              <ErrorMessage name="name" component="span" className={css.error} />
            </div>
            <div className={css.field}>
              <label className={css.label} htmlFor={`${fieldId}-email`}>
                Пошта*
              </label>
              <Field
                className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
                type="email"
                name="email"
                id={`${fieldId}-email`}
                placeholder="hello@leleka.com"
              />
              <ErrorMessage name="email" component="span" className={css.error} />
            </div>
            <div className={css.field}>
              <label className={css.label} htmlFor={`${fieldId}-password`}>
                Пароль*
              </label>
              <Field
                className={`${css.input} ${
                  errors.password && touched.password ? css.inputError : ''
                }`}
                type="password"
                name="password"
                id={`${fieldId}-password`}
                placeholder="********"
              />
              <ErrorMessage name="password" component="span" className={css.error} />
            </div>
          </fieldset>

          <button type="submit" className={css.button}>
            Зареєструватись
          </button>
          <p className={css.login}>
            Вже маєте аккаунт?
            <Link href="/auth/login" aria-label="Login" className={css.link}>
              Увійти
            </Link>
          </p>
          <Toaster />
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
