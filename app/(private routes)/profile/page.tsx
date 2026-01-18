'use client';


import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { useEffect } from "react";



export default function ProfilePage() {



    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = await getUser()
            return (user)
        },
    })
    console.log('query data:', user)




useEffect(() => {
  if (isLoading) {
      <p>Завантаження</p>
    }
  if (isError) toast.error('Сталася помилка')
}, [isLoading, isError])
    
  if (isLoading) return <p>Loading...</p>
  if (isError || !user) return <p>Сталася помилка</p>
    return (
     <>
        <ProfileAvatar user={user}/>
        <ProfileEditForm user={user} />
    </>
);
}
