import Image from 'next/image';
import css from './AuthContainer.module.css';

interface AuthContainerProps {
  children: React.ReactNode;
  imagePath: string;
}

export default function AuthContainer({ children, imagePath }: AuthContainerProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.logo}>
          <Image
            src="/company-logo.svg"
            alt="Leleka logo"
            className={css.logoImage}
            width={105}
            height={45}
          />
          {/* <p>Лелека</p> */}
        </div>
        <div className={css.content}>{children}</div>
      </div>
      <div className={css.hero}>
        <Image
          src={imagePath}
          alt="hero"
          priority
          className={css.heroImage}
          width={720}
          height={900}
        />
      </div>
    </div>
  );
}
