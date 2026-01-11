'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useId } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import css from './RegistrationForm.module.css';
import { register, RegistrationDetails } from '@/lib/api/clientApi';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, ' Імʼя занадто коротке.')
    .max(32, 'Імʼя занадто довге.')
    .required('Будь ласка, введіть імʼя.'),
  email: Yup.string()
    .email('Невірно введена пошта.')
    .required('Будь ласка, введіть пошту.')
    .max(64, 'Пошта занадто довга.'),
  password: Yup.string()
    .min(8, 'Пароль занадто короткий.')
    .max(128, 'Пароль занадто довгий.')
    .required('Будь ласка, введіть пароль.'),
});

const initialValues: RegistrationDetails = {
  name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const router = useRouter();
  // const [error, setError] = useState('');
  const fieldId = useId();
  const handleSubmit = async (
    values: RegistrationDetails,
    actions: FormikHelpers<RegistrationDetails>
  ) => {
    console.log('Reg data:', values);
    try {
      const res = await register(values);
      if (res) {
        toast.success('Реєстрація успішна!');
        router.push('/profile/edit'); // ONBOARDING
      } else {
        // setError('Виникла помилка при реєстрації.');
        toast.error('Виникла помилка при реєстрації.', {
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={RegisterSchema}>
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.title}>Реєстрація</legend>
          <div className={css.field}>
            <label className={css.label} htmlFor={`${fieldId}-name`}>
              Імʼя*
            </label>
            <Field
              className={css.input}
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
              className={css.input}
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
              className={css.input}
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
    </Formik>
  );
};

export default RegistrationForm;
