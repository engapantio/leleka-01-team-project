import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useFormikContext } from 'formik';
import dayjs, { Dayjs } from 'dayjs';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  name: keyof FormValues;
  mxWidth?: number;
}

interface FormValues {
  dueDate?: string;
  date?: string;
}

export const FormikDatePickerBirthday = ({ name, mxWidth }: Props) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const value: Dayjs | null = values[name] ? dayjs(values[name]) : null;

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      setFieldValue(name, newValue.toISOString());
      console.log(newValue.toISOString());
    } else {
      setFieldValue(name, '');
    }
  };

  return (
    <DesktopDatePicker
      format="DD/MM/YY"
      value={value}
      onChange={handleChange}
      slots={{
        openPickerIcon: KeyboardArrowDownIcon,
      }}
      slotProps={{
        popper: {
          sx: {
            zIndex: 9999,
          },
        },

        textField: {
          sx: {
            maxWidth: mxWidth,
            width: '100%',
            borderColor: 'transparent',
            background: 'var(--color-neutral-lightest)',
            borderRadius: '12px',

            '& .MuiOutlinedInput-notchedOutline': {},
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
            '& .MuiPickersSectionList-root': {
              color: 'var(--color-neutral)',
              padding: '10px 0',
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          },
        },
      }}
    />
  );
};
