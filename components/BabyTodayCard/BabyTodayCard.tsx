import Image from 'next/image';
import styles from './BabyTodayCard.module.css';

type BabyTodayCardProps = {
  title?: string;
  imageUrl?: string;
  sizeText?: string;
  achievementText?: string;
};

export default function BabyTodayCard({
  title = 'Baby today',
  imageUrl,
  sizeText,
  achievementText,
}: BabyTodayCardProps) {
  return (
    <section className={styles.BabyTodayContainer}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.contentWrap}>
        <div className={styles.imageWrap}>
          {imageUrl ? (
            <Image className={styles.image} src={imageUrl} alt="Baby" width={600} height={600} />
          ) : null}
        </div>

        <div className={styles.textWrap}>
          {sizeText ? (
            <p className={styles.text}>
              <span className={styles.boldText}>{sizeText}</span>
            </p>
          ) : null}

          {achievementText ? <p className={styles.textInfo}>{achievementText}</p> : null}
        </div>
      </div>
    </section>
  );
}
