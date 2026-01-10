'use client';
import Link from 'next/link';
import { useId } from 'react';
import { Formik, Form, Field } from 'formik';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const fieldId = useId();
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
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
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
