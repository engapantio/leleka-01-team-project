'use client';

// import { useState, useRef, useEffect } from "react"
import css from './ProfileEditForm.module.css';
import { Field, Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { User } from '@/types/user';
import { updateProfile } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface ProfileEditFormProps {
  dataUser?: User | null;
}

interface OrderFormValues {
  name: string;
  email: string;
  gender: 'boy' | 'girl' | '';
  dueDate: string;
}

export interface FormValuesForBackend {
  name: string;
  gender: 'boy' | 'girl' | '';
  dueDate: string;
}

// значення приходять з бекенду
export default function ProfileEditForm({ dataUser }: ProfileEditFormProps) {
  // const { setUser } = useAuthStore();
  const initialValues: OrderFormValues = {
    name: dataUser?.name || '',
    email: dataUser?.email || '',
    gender: dataUser?.gender || '',
    dueDate: dataUser?.dueDate || '',
  };

  const handleSubmit = async (formValues: FormValuesForBackend) => {
    // console.log(formValues)

    const dataForm = (values: FormValuesForBackend) => {
      return {
        name: values.name,
        gender: values.gender,
        dueDate: values.dueDate,
      };
    };
    const payload = dataForm(formValues);
    const payloadJSON = JSON.stringify(payload);

    console.log('payload:', payloadJSON);
    const res = await updateProfile(payload);
    console.log(res);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, resetForm }) => (
        <Form className={css.formWrapper}>
          <div className={css.inputWrapper}>
            <label htmlFor="name-Id" className={css.label}>
              Імя
            </label>
            <Field type="text" name="name" id="name-Id" className={css.input} />
          </div>

          <div className={css.inputWrapper}>
            <label htmlFor="email-Id" className={css.label}>
              Пошта
            </label>
            <Field type="email" name="email" id="email-Id" className={css.input} />
          </div>
          <div className={css.inputWrapper}>
            <label htmlFor="gender-Id" className={css.label}>
              Стать дитини
            </label>
            <Field
              as="select"
              name="gender"
              id="gender-Id"
              className={`${css.input} ${css.gender}`}
            >
              <option value="">Оберіть стать</option>
              <option value="girl">Дівчинка</option>
              <option value="boy">Хлопчик</option>
            </Field>
            <svg className={css.iconDown} width="24" height="24">
              <use href="/sprite.svg#icon-keyboard_arrow_down" />
            </svg>
          </div>
          <div className={css.inputWrapper}>
            <label htmlFor="dueDate-Id" className={css.label}>
              Планова дата пологів
            </label>
            {/* <Field type='date' name='dateOfBirth' id='dateOfBirth-id'/> */}

            <DatePicker
              selected={values.dueDate ? new Date(values.dueDate) : null}
              onChange={(date: Date | null) =>
                setFieldValue('dueDate', date ? date.toISOString().split('T')[0] : '')
              }
              className={`${css.input} ${css.inputDate}`}
              dateFormat="yyyy-MM-dd"
              popperPlacement="top-start"
            />
          </div>

          <div className={css.divButtons}>
            <button type="button" onClick={() => resetForm()} className={css.buttonCancel}>
              Відмінити зміни
            </button>
            <button type="submit" className={css.buttonSave}>
              Зберегти зміни
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
