'use client'

import Image from "next/image";
import css from './ProfileAvatar.module.css'
import { useRef } from "react";
import { User } from "@/types/user";
import { uploadAvatar } from "@/lib/api/clientApi";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


interface ProfileAvatarProps {
    user?: User | null
}


export default function ProfileAvatar({ user }: ProfileAvatarProps) {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: uploadAvatar,
        onSuccess: () => {
            toast.success('Аватар оновлено')
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })

    const fileInputRef = useRef<HTMLInputElement>(null)

    
    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    const updateAvatar = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
         if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
        toast.error('Дозволені тільки файли .jpg або .jpeg');
        return;
        }
            
        const formData = new FormData()
        formData.append('avatar', file)
        
            mutation.mutate(formData)
        
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
                    <button className={css.uploadButton} onClick={openFileDialog}>{mutation.isPending ? 'Завантаження...' : 'Завантажити нове фото'}</button>
                    
                </div>
             
                
            </div>
        </>
    ) 
}