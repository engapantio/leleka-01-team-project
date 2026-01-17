import Link from 'next/link';
import styles from './AuthBar.module.css';

export default function AuthBar() {
  return (
    <nav className={styles.authBar}>
      <Link href="/auth/register" className={styles.authLink}>
        <button className={styles.buttonReg}>
          <p className={styles.buttonText}>Зареєстуватись</p>
        </button>
      </Link>
      <Link href="/auth/login" className={styles.authLink}>
        <button className={styles.buttonLog}>
          <p className={styles.buttonText}>Увійти</p>
        </button>
      </Link>
    </nav>
  );
}
