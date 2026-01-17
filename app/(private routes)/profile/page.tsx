'use client';

import { useEffect } from 'react';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
// import { useEffect, useState } from "react";
import { useAuthStore } from '@/lib/store/authStore';

// const userFromStore = useAuthStore

export default function ProfilePage() {
  const setUser = useAuthStore(state => state.setUser);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  // замінити пропс
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ProfileAvatar user={user} />
      <ProfileEditForm dataUser={user} />
    </>
  );
}
