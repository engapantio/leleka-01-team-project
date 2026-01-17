import css from './BabyTodayCard.module.css';
import Image from 'next/image';

export interface BabyTodayCardProps {
  img: string;
  height?: number;
  weight?: number;
  activity?: string;
  info?: string;
  analogy: string;
}

export default function BabyTodayCard({
  img,
  height,
  weight,
  activity,
  info,
  analogy,
}: BabyTodayCardProps) {
  return (
    <div className={css.BabyTodayContainer}>
      <h2 className={css.title}>Малюк сьогодні</h2>
      <div className={css.contentWrap}>
        <div className={css.imageWrap}>
          <Image
            src={img}
            alt={analogy}
            width={257}
            height={194}
            className={css.image}
          />
        </div>
        <div className={css.textWrap}>
          <p className={css.boldText}>
            Розмір: <span className={css.text}> Приблизно {height} см</span>
          </p>
          <p className={css.boldText}>
            Вага: <span className={css.text}> Близько {weight} грам</span>
          </p>
          <p className={css.boldText}>
            Активність: <span className={css.text}> {activity}</span>
          </p>
        </div>
      </div>
      <div>
        <p className={css.textInfo}>{info}</p>
      </div>
    </div>
  );
}