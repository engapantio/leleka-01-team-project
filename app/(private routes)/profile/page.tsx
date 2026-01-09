import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";




export default function ProfilePage() {

    const user = {
        avatarUrl: undefined,
        name: 'Hanna',
        email: 'testemail@gmail.com'
    }
    return (
        <>
            <ProfileAvatar user={user} />
            <ProfileEditForm />
        </>
    )
}