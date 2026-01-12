import AuthContainer from '@/components/AuthContainer/AuthContainer';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

export default async function Register(props: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await props.params;
  await props.searchParams;
  return (
    <AuthContainer imagePath="/register.jpg">
      <RegistrationForm />
    </AuthContainer>
  );
}
