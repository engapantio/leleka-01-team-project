'use client'

import { useState } from "react"
import css from './ProfileEditForm.module.css'

// interface FormDataProps {
//     formData: {
//         name: string,
//         email: string,
//         gender: string,
//         dateOfBirth: string,
//     }
    
// }




// значення приходять з бекенду
export default function ProfileEditForm() {


    const formData = {
    name: 'Hanna',
    email: 'testemail@Gmail.com',
    gender: 'girl',
    dateOfBirth: '2026-04-04',
    }
    
    const [isOpen, setIsOpen] = useState(false)
    const [initialValues, setInitialValues] = useState(formData)
    const [currentValues, setCurrentValues] = useState(formData)

    const handleCancel = () => {
        setCurrentValues(initialValues)
    }
    
    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInitialValues(currentValues)
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <form onSubmit={handleSave} className={css.formWrapper}>
            <label className={css.label}>
                Імя
                <input name="name" className={css.input} type="text" value={currentValues.name} onChange={(e) => setCurrentValues(
                    {
                        ...currentValues,
                        name: e.target.value
                    }
                )}/>
            </label>
            <label className={css.label}>
                Пошта
                <input name="email" className={css.input} type="email" value={currentValues.email} onChange={(e) => setCurrentValues(
                    {
                        ...currentValues,
                        email: e.target.value
                    }
                )}/>
            </label>
            <label className={css.label}>
                Стать дитини


                
                <div className={css.select_container}>
                    <div className={css.select_option} onClick={toggleDropdown}>
                        {currentValues.gender === 'girl' && 'Дівчинка'}
                        {currentValues.gender === 'boy' && 'Хлопчик'}
                        {!currentValues.gender && 'Оберіть стать'}
                    </div>
                    <div className={`${css.dropdown} ${isOpen ? css.dropdownOpen : ''}`}>
                        <div className={css.option} onClick={() => { setCurrentValues(p => ({ ...p, gender: 'girl' })); setIsOpen(false) }}>Дівчинка</div>
                        <div className={css.option} onClick={() => { setCurrentValues(p => ({ ...p, gender: 'boy' })); setIsOpen(false) }}>Хлопчик</div>
                        <div className={css.option} onClick={() => { setCurrentValues(p => ({ ...p, gender: '' })); setIsOpen(false)}}>Ще не знаю</div>
                    </div>
                </div>
                

            </label>
            <label className={css.label}>
                Планова дата пологів
                <input name="data" className={css.input} type="date" value={currentValues.dateOfBirth} onChange={(e) => setCurrentValues(
                    {
                        ...currentValues,
                        dateOfBirth: e.target.value
                    }
                )}/>
            </label>
                <div className={css.actions}>
            <button className={css.cancel} type="button" onClick={handleCancel}>Відмінити зміни</button>
            <button className={css.save} type="submit">Зберегти зміни</button>
                </div>
        </form>
    )
}