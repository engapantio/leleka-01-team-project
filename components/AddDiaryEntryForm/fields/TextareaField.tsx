'use client';

import { useField } from 'formik';
import { FieldControl } from './FieldControl';
import s from '../AddDiaryEntryForm.module.css';
interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder: string;
}

export function TextareaField({ name, label, placeholder }: TextareaFieldProps) {
  const [field, meta] = useField(name);
  const inputId = name as string;
  const className = meta.touched && meta.error ? `${s.textarea} ${s.invalid}` : s.textarea;

  return (
    <FieldControl label={label} htmlFor={inputId} error={meta.error} touched={meta.touched}>
      <textarea {...field} id={inputId} className={className} placeholder={placeholder} rows={6} />
    </FieldControl>
  );
}
