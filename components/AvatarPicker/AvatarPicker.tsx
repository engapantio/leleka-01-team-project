'use client';

import { useRef, useState } from 'react';

import { useFormikContext } from 'formik';

import css from './AvatarPicker.module.css';
import Button from '../ui/Button/Button';
import Image from 'next/image';

// import avatar from '@/public/img/avatarPreview.png'; // File not found, using fallback
import { useAuthStore } from '@/lib/store/authStore';

export const AvatarPicker = ({
  name,
  btnTitle,
  initialPhoto,
  styles,
  isContent,
  buttonStyles,
}: {
  name: string;
  initialPhoto?: string | null;
  btnTitle: string;
  styles?: object | null;
  isContent?: boolean | null;
  buttonStyles?: React.CSSProperties;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const { setFieldValue, errors, touched } = useFormikContext();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Only images');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Max file size 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setFieldValue(name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  // STATE

  const { user } = useAuthStore();

  return (
    <div className={css.avatar_picker_wrapper} style={{ ...styles }}>
      <div className={css.preview_avatar}>
        <Image
          src={previewUrl || initialPhoto || '/onboardingAvatar.svg'}
          alt="Preview avatar"
          width={132}
          height={132}
          className={css.avatar}
        ></Image>
      </div>
      <input
        ref={inputRef}
        id="avatar"
        type="file"
        accept="image/*"
        name={name}
        onChange={handleFileChange}
        className={css.custom_avatar_input}
      />
      <div className={css.user_info_wrapper}>
        {isContent && (
          <div className={css.content_wrapper}>
            <p className={css.user_name}>{user?.name}</p>
            <p className={css.user_email}>{user?.email}</p>
          </div>
        )}
        <Button
          type="button"
          alternative={true}
          styles={{ maxWidth: 218, zIndex: 1, position: 'relative', fontFamily: 'var(--font-family)',
fontWeight: 500,
fontSize: '16px',
lineHeight: '160%',
color: 'var(--color-scheme-text)', ...(buttonStyles || {})}}
          action={handleClick}
        >
          {btnTitle}
        </Button>
      </div>
    </div>
  );
};