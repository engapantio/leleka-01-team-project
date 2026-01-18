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
          borderColor: 'transparent',
          backgroundColor: 'var(--color-neutral-lightest)',
          minHeight: '48px',
          boxShadow: 'none',
          '&:hover': {
            borderColor: 'transparent',
          },
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--color-neutral)',
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--color-neutral-dark)',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '12px',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected
            ? 'var(--color-primary)'
            : state.isFocused
            ? 'var(--color-neutral-lightest)'
            : 'white',
          color: state.isSelected ? 'white' : 'var(--color-neutral-dark)',
          '&:hover': {
            backgroundColor: state.isSelected
              ? 'var(--color-primary)'
              : 'var(--color-neutral-lightest)',
          },
        }),
      }}
    />
  );
}
