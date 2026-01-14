import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loaderText}>Завантаження...</p>
    </div>
  );
};

export default Loader;