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
      
    } else {
      setFieldValue(name, '');
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <DesktopDatePicker
        format="DD.MM.YYYY"
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
              maxWidth: mxWidth || '100%',
              width: '100%',
              '&.MuiInputBase-input': { fontSize: '14px' },
              border: '2px solid var(--opacity-transparent)',
              background: 'var(--opacity-neutral-darkest-5)',
              borderRadius: '12px',
              boxSizing: 'border-box',
                 fontFamily: 'var(--font-family)',
fontWeight: 400,
lineHeight: '150%',           
              '& .MuiOutlinedInput-notchedOutline': {},
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                width: '100%',
                maxWidth: '100%',
                fontFamily: 'var(--font-family)',
fontWeight: 400,
lineHeight: '150%',
              },
              '& .MuiPickersSectionList-root': {
                padding: '10px 0',
                 fontFamily: 'var(--font-family)',
fontWeight: 400,
fontSize: '14px',
lineHeight: '150%',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
               '& .MuiOutlinedInput-input': {
                    color: 'var(--color-scheme-text)',
                    fontSize: '14px',
                    fontFamily: 'var(--font-family)',
                    '&::placeholder': {
                      color: 'var(--opacity-neutral-darkest-60)',
                    },
                  },
            },
          },
        }}
      />
    </div>
  );
};

