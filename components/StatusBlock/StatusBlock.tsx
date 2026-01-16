import styles from './StatusBlock.module.css';

export type PregnancyStatusProps = {
  weeks: number | null;
  days: number | null;
};

export default function StatusBlock({ weeks, days }: PregnancyStatusProps) {
  return (
    <div className={styles.statusBlockContainer}>
      <div className={styles.statusBlockWrapper}>
        <h4 className={styles.statusBlockText}>Тиждень</h4>
        <p className={styles.statusBlockValue}>{weeks ?? '1'}</p>
      </div>

      <div className={styles.statusBlockWrapper}>
        <h4 className={styles.statusBlockText}>Днів до зустрічі</h4>
        <p className={styles.statusBlockValue}>~{days ?? '280'}</p>
      </div>
    </div>
  );
}
