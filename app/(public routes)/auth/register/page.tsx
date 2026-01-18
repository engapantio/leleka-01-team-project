import AuthContainer from '@/components/AuthContainer/AuthContainer';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

const Register = () => {
  return (
    <AuthContainer imagePath="/register.webp">
      <RegistrationForm />
    </AuthContainer>
  );
};

export default Register;
