'use client'

import css from './ProfileEditForm.module.css'
import { ErrorMessage, Field, Form, Formik} from "formik"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { User } from '@/types/user'
import { updateProfile } from '@/lib/api/clientApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as yup from 'yup'
import Select from 'react-select'


const schema = yup.object().shape({
  name: yup
    .string()
    .required('Ім’я обовязкове'),
  gender: yup
    .string()
    .oneOf(['boy', 'girl', '', 'unknown'], 'Оберіть стать'),
  dueDate: yup
    .date()
    .min(new Date(), 'Дата має бути в майбутньому')
    .required('Дата обов’язкова'),
});




interface ProfileEditFormProps {
  user: User | null
}

type GenderFormValue = 'boy' | 'girl' | 'unknown'

interface OrderFormValues {
    name: string
    email: string
    gender: GenderFormValue
    dueDate: string
}

const options = [
    { value: 'unknown', label: 'Ще не знаю' },
    { value: 'girl', label: 'Дівчинка' },
    { value: 'boy', label: 'Хлопчик'}
]

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
        gender: values.gender === 'unknown' ? '' : values.gender,

        dueDate: values.dueDate,
    })
    }

    console.log('значенння перед initialValues', user)
    
    const initialValues: OrderFormValues = {
    name: user?.name ?? 'Дані не отримано',
    email: user?.email ?? '',
    gender: user?.gender ?? 'unknown',
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
                        <label htmlFor="name-Id" className={css.label}>Ім’я</label>
                        <Field type='text' name='name' id='name-Id' className={css.input} />
                        <ErrorMessage name='name'/>
                    </div>
                
                    <div className={css.inputWrapper}>
                        <label htmlFor="email-Id" className={css.label}>Пошта</label>
                        <Field type='email' disabled name='email' id='email-Id' className={css.input} />
                        <ErrorMessage name='email'/>
                    </div>
                    <div className={css.inputWrapper}>
                        <label htmlFor="gender-id" className={css.label}>Оберіть стать</label>
                        <Select
                            options={options}
                            placeholder='Оберіть стать'
                            className={css.genderSelect}
                            classNamePrefix="gender"

                            value={options.find(opt => opt.value === values.gender)}
                            onChange={(option)=> setFieldValue('gender', option?.value)}
                        />
                    </div>
                    <div className={css.inputWrapper} >
                        <label htmlFor="dueDate-Id" className={css.label}>Планова дата пологів</label>
                        
                    <DatePicker
                        selected={values.dueDate ? new Date(values.dueDate) : null}
                        onChange={(date: Date | null) =>
                        setFieldValue('dueDate', date ? date.toISOString().split('T')[0] : '')}
                        className={`${css.input} ${css.inputDate}`}
                        dateFormat="yyyy-MM-dd"
                        popperPlacement="top-start"
                        name='dueDate'
                        id='dueDate-id'
                        />  
                        {/* <svg className={css.iconDown} width="24" height="24">
                            <use href='/sprite.svg#icon-keyboard_arrow_down'/>
                        </svg> */}
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