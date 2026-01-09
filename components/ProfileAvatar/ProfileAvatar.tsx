'use client'

import Image from "next/image";
import css from './ProfileAvatar.module.css'
import { useRef } from "react";


interface ProfileAvatarProps {
    user?: {
        avatarUrl?: string,
        name: string,
        email: string
    }
}




export default function ProfileAvatar({ user }: ProfileAvatarProps) {

    const fileInputRef = useRef<HTMLInputElement>(null)

    
    const openFileDialog = () => {
        fileInputRef.current?.click()
}

    const updateAvatar = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log(file)
        
        // відправити на бекенд
    }

    return (
        <>
            <div className={css.wrapper}>
                <div>
                    {user?.avatarUrl ? (<Image
                    className={css.avatar}
                    src={user.avatarUrl}
                    alt={user.name}
                    height={132}
                    width={132}
                    // Підставити лого        
                />) : (<h1>Avatar</h1>)} 
                </div>
                
            
                <div>
                    <h1 className={css.name}>{user?.name}</h1>
                    <p className={css.email}>{ user?.email}</p>
                    <input type="file" hidden ref={fileInputRef} onChange={updateAvatar} />
                    <button className={css.uploadButton} onClick={openFileDialog}>Завантажити нове фото</button>

                {/* <button onClick={openFileDialog}></button> */}
                </div>
             
                
            </div>
        </>
    ) 
}