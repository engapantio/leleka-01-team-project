<<<<<<< HEAD
'use client'

import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { getCurrentUser } from "@/lib/api/clientApi";


const fakeUser: User = {
  id: "1f143f82-bb18-4795-af3d-52ccf272ffd8",
  name: "testName",
  email: "test@test.com",
  gender: "boy",
  dueDate: "2026-02-12",
  avatar: "https://res.cloudinary.com/dwvvx8vqk/image/upload/default-avatar_zkouxm.png",
  createdAt: "2026-01-12T20:38:59.722Z",
  updatedAt: "2026-01-12T20:38:59.722Z"
=======
export default async function ProfilePage(props: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await props.params;
  await props.searchParams;
  return <div>Empty Placeholder</div>;
>>>>>>> origin/main
}


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


    return (
        <>
            <ProfileAvatar user={fakeUser} />
            <ProfileEditForm dataUser={fakeUser} />
        </>
    )
}