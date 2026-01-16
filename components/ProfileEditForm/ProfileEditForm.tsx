'use client'

// import { useState, useRef, useEffect } from "react"
import css from './ProfileEditForm.module.css'
import { ErrorMessage, Field, Form, Formik} from "formik"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { User } from '@/types/user'
import { updateProfile } from '@/lib/api/clientApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Ім’я обовязкове'),
  gender: yup
    .string()
    .oneOf(['boy', 'girl'], 'Оберіть стать'),
  dueDate: yup
    .date()
    .min(new Date(), 'Дата має бути в майбутньому')
    .required('Дата обов’язкова'),
});



interface ProfileEditFormProps {
  user: User | null
}

interface OrderFormValues {
    name: string
    email: string
    gender: "boy" | "girl" | ''
    dueDate: string
}



// значення приходять з бекенду
export default function ProfileEditForm({user}: ProfileEditFormProps) {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        
    })
    

    const handleSubmit = async (values: OrderFormValues) => {

        mutation.mutate({
        name: values.name,
        gender: values.gender,
        dueDate: values.dueDate,
    })
    }

    console.log('значенння перед initialValues', user)
    
    const initialValues: OrderFormValues = {
    name: user?.name ?? 'Дані не отримано',
    email: user?.email ?? '',
    gender: user?.gender ?? '',
    dueDate: user?.dueDate ?? '',
}
    console.log('initialValues:', initialValues)
    return (
        <Formik<OrderFormValues>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={schema}
            enableReinitialize
            >
            {({ values, setFieldValue, resetForm }) => (
                <Form className={css.formWrapper}>
                    <div className={css.inputWrapper}>
                        <label htmlFor="name-Id" className={css.label}>Імя</label>
                        <Field type='text' name='name' id='name-Id' className={css.input} />
                        <ErrorMessage name='name'/>
                    </div>
                
                    <div className={css.inputWrapper}>
                        <label htmlFor="email-Id" className={css.label}>Пошта</label>
                        <Field type='email' disabled name='email' id='email-Id' className={css.input} />
                        <ErrorMessage name='email'/>
                    </div>
                    <div className={css.inputWrapper}>
                        <label htmlFor="gender-Id" className={css.label}>Стать дитини</label>
                        <Field
                        as='select'
                        name='gender'
                        id='gender-Id'
                        className={`${css.input} ${css.gender}`} >
                            <option value=''>Оберіть стать</option>
                            <option value='girl'>Дівчинка</option>
                            <option value='boy'>Хлопчик</option>
                        </Field>
                        <svg className={css.iconDown} width="24" height="24">
                            <use href='/sprite.svg#icon-keyboard_arrow_down'/>
                        </svg>
                    </div>
                    <div className={css.inputWrapper}>
                          <label htmlFor="dueDate-Id" className={css.label}>Планова дата пологів</label>
                        
                    <DatePicker
                        selected={values.dueDate ? new Date(values.dueDate) : null}
                        onChange={(date: Date | null) =>
                        setFieldValue('dueDate', date ? date.toISOString().split('T')[0] : '')
                        }
                        className={`${css.input} ${css.inputDate}`}
                        dateFormat="yyyy-MM-dd"
                        popperPlacement="top-start"
                        name='dueDate'
                        />  
                        <ErrorMessage name='dueDate'/>
                    </div>
                
                
                    <div className={css.divButtons}>
                        <button type="button" onClick={() => resetForm()} className={css.buttonCancel}>Відмінити зміни</button>
                        <button type='submit' className={css.buttonSave}>Зберегти зміни</button>
                    </div>
                
            </Form>   
            )}
            
        </Formik>
    )
}