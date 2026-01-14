'use client'

import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
// import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";


const fakeUser: User = {
  id: "1f143f82-bb18-4795-af3d-52ccf272ffd8",
  name: "testName",
  email: "test@test.com",
  gender: "boy",
  dueDate: "2026-02-12",
  avatarUrl: "https://res.cloudinary.com/dwvvx8vqk/image/upload/default-avatar_zkouxm.png",
  createdAt: "2026-01-12T20:38:59.722Z",
  updatedAt: "2026-01-12T20:38:59.722Z"
}
// const userFromStore = useAuthStore

export default function ProfilePage() {
    const setUser = useAuthStore(state => state.setUser)
    const userStore = useAuthStore(state => state.user)

    useEffect(() => {
        setUser(fakeUser)
    }, [setUser])



    // замінити пропс
    if (!userStore) {
        return <p>Loading...</p>
    }
    return (
        <>
            <ProfileAvatar user={userStore} />
            <ProfileEditForm dataUser={userStore} />
        </>
    )
}