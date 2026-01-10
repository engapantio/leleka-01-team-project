import Image from 'next/image';
import css from './AuthContainer.module.css';

interface AuthContainerProps {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <Image src="../../public/leleka-logo.svg" alt="Leleka logo" className={css.logo} />
        {children}
      </div>
    </div>
  );
}
