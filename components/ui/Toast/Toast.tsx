'use client';
import React from 'react';
import { useToastStore } from '@/lib/store/toastStore';
import './style.css';
export const Toast = () => {
  const { message, type, visible } = useToastStore();

  if (!visible) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
    </div>
  );
};
