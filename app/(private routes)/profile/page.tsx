'use client'

import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { getCurrentUser } from "@/lib/api/clientApi";




export default function ProfilePage() {
    const [dataUser, setDataUser] = useState<User>()
    
    

    useEffect(() => {
        async function fetchData() {
            try {
                const user = await getCurrentUser()
                setDataUser(user)
            } catch (error){
                console.log(error, 'Дані не отримано')
            }
        }
        fetchData()
    }, [])

// замінити пропс
    return (
        <>
            <ProfileAvatar user={dataUser} />
            <ProfileEditForm dataUser={dataUser} />
        </>
    )
}