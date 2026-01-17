import css from './MomTipCard.module.css'

export type MomTipCardProps = {
  adviceForMom?: string;
}
export default function MomTipCard({ adviceForMom}: MomTipCardProps) {
  return (
    <div className={css.MomTipCardContainer}>
      <h4 className={css.MomTipCardTitle}>Порада для мами</h4>
      <p className={css.MomTipCardText}>{adviceForMom}</p>
    </div>
  )
}