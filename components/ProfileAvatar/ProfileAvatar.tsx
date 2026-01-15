'use client'

import Image from "next/image";
import css from './ProfileAvatar.module.css'
import { useRef } from "react";
import { User } from "@/types/user";
import { uploadAvatar } from "@/lib/api/clientApi";


interface ProfileAvatarProps {
    user?: User | null
}


export default function ProfileAvatar({ user }: ProfileAvatarProps) {

    const fileInputRef = useRef<HTMLInputElement>(null)

    
    const openFileDialog = () => {
        fileInputRef.current?.click()
}

    const updateAvatar = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            return
        }
            
        const formData = new FormData()
        formData.append('avatar', file)
        try {
            await uploadAvatar(formData)

        } catch (error){
            console.error(error)
        }
        

        // відправити на бекенд
    }

    return (
        <>
            <div className={css.wrapper}>
                <div className={css.avatarWrapper}>
                    {user?.avatarUrl ? (<Image
                    className={css.avatar}
                    src={user.avatarUrl}
                    alt={user.name}
                    height={132}
                    width={132}
                    // Підставити лого        
                />) : (<div className={css.avatarPlaceholder}>Avatar</div>)} 
                </div>
                
            
                <div className={css.nameEmail}>
                    <h1 className={css.name}>{user?.name}</h1>
                    <p className={css.email}>{ user?.email}</p>
                    <input type="file" hidden ref={fileInputRef} onChange={updateAvatar} />
                    <button className={css.uploadButton} onClick={openFileDialog}>Завантажити нове фото</button>

                </div>
             
                
            </div>
        </>
    ) 
}