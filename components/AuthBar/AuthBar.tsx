import Link from 'next/link';
import styles from './AuthBar.module.css';

export default function AuthBar() {
  return (
    <nav className={styles.authBar}>
      <Link href="/auth/register" className={styles.authLink}>
        <button className={styles.buttonReg}>Зареєстуватись</button>
      </Link>
      <Link href="/auth/login" className={styles.authLink}>
        <button className={styles.buttonLog}>Увійти</button>
      </Link>
    </nav>
  );
}
