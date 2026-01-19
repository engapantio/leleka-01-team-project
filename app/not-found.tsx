// app/not-found.tsx

import Link from 'next/link';
import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>
          <span className={styles.digit}>4</span>
          <div className={styles.digit}>0</div>
          <span className={styles.digit}>4</span>
        </div>

        <h1 className={styles.title}>Сторінку не знайдено</h1>

        <p className={styles.description}>
          Сторінки, яку ви шукаєте, не існує. Перевірте, будь ласка, адресу
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.buttonPrimary}>
            На головну
          </Link>
        </div>

      </div>

      <div className={styles.decoration}></div>
    </div>
  );
};

export default NotFound;