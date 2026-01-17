import type { ReactNode } from 'react';

export type FieldControlProps = {
  label: string;
  htmlFor?: string;
  labelId?: string;
  error?: string;
  touched?: boolean;
  children: ReactNode;
};