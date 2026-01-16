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


    const {
        data: user,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = await getUser()
            return user
        },
    })
    console.log('query data:', user)


    
    // const setUser = useAuthStore(state => state.setUser)
    // const {user} = useAuthStore()


useEffect(() => {
  // if (isLoading) toast('Завантаження...')
  if (isLoading) {
      <p>Завантаження</p>
    }
  if (isError) toast.error('Сталася помилка')
  if (user) toast.success('Дані користувача завантажені')
}, [isLoading, isError, user])
    
  if (isLoading) return <p>Loading...</p>
  if (isError || !user) return <p>Сталася помилка</p>
    return (
     <>
        <ProfileAvatar user={user}/>
        <ProfileEditForm user={user} />
    </>
  );
}
