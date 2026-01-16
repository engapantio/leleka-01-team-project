'use client'


import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/clientApi";
// import { useToastStore } from "@/lib/store/toastStore";
import toast from "react-hot-toast";
import { useEffect } from "react";



export default function ProfilePage() {



    const {
        data: user,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await getUser()
            return res.user
        },
    })
    console.log('query data:', user)


    
    // const setUser = useAuthStore(state => state.setUser)
    // const {user} = useAuthStore()


useEffect(() => {
  if (isLoading) toast('Завантаження...')
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