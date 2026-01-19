'use client';

import { useFormikContext } from 'formik';
import Select from 'react-select';

interface Option {
  label: string;
  value?: string;
}

interface FormikSelectProps {
  name: string;
  options: Option[];
  placeholder?: string;
}


export default function FormikSelect({ name, options, placeholder }: FormikSelectProps) {
  const { values, setFieldValue } = useFormikContext<any>();

  const currentValue = options.find(
    option => option.label === values[name] || option.value === values[name]
  ) || null;

  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      setFieldValue(name, selectedOption.label);
    } else {
      setFieldValue(name, '');
    }
  };

  const selectOptions = options.map(option => ({
    label: option.label,
    value: option.value || option.label,
  }));



  return (
    <Select
      options={selectOptions}
      value={currentValue}
      onChange={handleChange}
      placeholder={placeholder}
      isSearchable={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '12px',
          border: '1px solid var(--opacity-transparent)',
          backgroundColor: 'var(--color-neutral-lightest)',
          height: '40px',
          boxShadow: 'none',
          width: '100%',
          maxWidth: '100%',
          '&:hover': {
            borderColor: 'transparent',
          },
        }),
        container: (baseStyles) => ({
          ...baseStyles,
          width: '100%',
          maxWidth: '100%',
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--color-neutral)',
          fontFamily: 'var(--font-family)',
                    fontSize: '14px',
          lineHeight: 1.5,
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--color-neutral-darkest)',
          fontFamily: 'var(--font-family)',
                    fontSize: '14px',
          lineHeight: 1.5,
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '0 0 12px 12px',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: '8px',
          height: '37px',
          backgroundColor: state.isSelected
            ? 'var(--opacity-neutral-darkest-5)'
            : state.isFocused
            ? 'var(--opacity-neutral-darkest-5)'
            : 'var(--color-neutral-lightest)',
          color: 'var(--color-neutral-darkest)',
           fontFamily: 'var(--font-family)',
                    fontSize: '14px',
          lineHeight: 1.5,
          '&:hover': {
            backgroundColor:  'var(--opacity-neutral-darkest-5)'
            ,
          },
        }),
      }}
    />
  );
}
