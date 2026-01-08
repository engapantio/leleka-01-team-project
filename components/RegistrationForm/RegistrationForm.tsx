'use client';

import { useId } from 'react';
import { Formik, Form, Field } from 'formik';
// import css from './RegistrationForm.module.css'

const RegistrationForm = () => {
  const fieldId = useId();
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <fieldset>
          <legend>Реєстрація</legend>

          <label htmlFor={`${fieldId}-name`}>Імʼя*</label>
          <Field type="text" name="name" id={`${fieldId}-name`} />

          <label htmlFor={`${fieldId}-email`}>Пошта*</label>
          <Field type="email" name="email" id={`${fieldId}-email`} />

          <label htmlFor={`${fieldId}-password`}>Пароль*</label>
          <Field type="password" name="password" id={`${fieldId}-password`} />
        </fieldset>

        <button type="submit">Зареєструватись</button>
        <p>Вже маєте аккаунт? Увійти</p>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
