import Link from 'next/link';
import styles from './AuthBar.module.css';

export default function AuthBar() {
  return (
    <div className={styles.authBar}>
      <Link href="/auth/register" className={styles.authLink}>
        Зареєстуватись
      </Link>
      <Link href="/auth/login" className={styles.authLink}>
        Увійти
      </Link>
    </div>
  );
}