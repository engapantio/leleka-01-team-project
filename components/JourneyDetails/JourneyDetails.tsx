import { JourneyBaby, JourneyMom } from '@/types/journey';
import Image from 'next/image';
import styles from './JourneyDetails.module.css';
import clsx from 'clsx';
import { Icon } from '../ui/Icon/Icon';
import TaskReminderCard from '../TaskReminderCard/TaskReminderCard';
import {useTab} from '../../lib/store/tabStore'

interface JourneyDetailsProp {
  babyData: JourneyBaby;
  MomData: JourneyMom;
}

const JourneyDetails = ({
  babyData,
  MomData
}: JourneyDetailsProp) => {

const { tab, setBabyTab, setMomTag } = useTab();

  return (
    <div className={styles.journeyContainer}>
      <div className={styles.btnWrapper}>
        <button
          className={clsx(styles.btn, { [styles.activeBtn]: tab === 'baby' })}
          onClick={setBabyTab}
        >
          Розвиток малюка
        </button>
        <button
          className={clsx(styles.btn, { [styles.activeBtn]: tab === 'mom' })}
          onClick={setMomTag}
        >
          Тіло мами
        </button>
      </div>

      {babyData && tab === 'baby' && (
        <div className={styles.babyCard}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={babyData.image}
                width={461}
                height={379}
                alt={babyData.analogy ? babyData.analogy : 'Календар'}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 461px, 461px"
              />
            </div>
            {babyData.analogy && <p className={styles.analogy}>{babyData.analogy}</p>}
          </div>
          <div>
            <p className={styles.babyText}>{babyData.babyActivity}</p>
            <p className={styles.babyText}>{babyData.babyDevelopment}</p>
            <p className={styles.babyText}>{babyData.momDailyTips.join(' ')}</p>

            <div className={styles.interestingFactWrapper}>
              <div className={styles.interestingFact}>
                <Icon name={'icon-star'} width={24} height={24} />
                <h3 className={styles.interestingFactTitle}>Цікавий факт тижня</h3>
              </div>
              <p>{babyData.interestingFact}</p>
            </div>
          </div>
        </div>
      )}

      {MomData && tab === 'mom' && (
        <div className={styles.momCardWrapper}>
          <div className={styles.momCard}>
            <div className={styles.momBlock}>
              <h2 className={styles.momBlockTitle}>Як ви можете почуватись</h2>
              <div className={styles.momBlockFeelings}>
                <p className={styles.momBlockStiker}>{MomData.feelingsStates[0]}</p>
                <p className={styles.momBlockStiker}>{MomData.feelingsStates[1]}</p>
                <p className={styles.momBlockStiker}>{MomData.feelingsStates[2]}</p>
              </div>
              <p className={styles.momBlockText}>{MomData.sensationDescr}</p>
            </div>

            <div className={styles.momBlock}>
              <h2 className={styles.momBlockTitle}>Поради для вашого комфорту</h2>

              <div className={styles.momTips}>
                <Icon name={'icon-fork_spoon'} width={24} height={24} />
                <div>
                  <h3 className={styles.momTipTitle}>{MomData.comfortTips[0].category}</h3>
                  <p className={styles.momTipText}>{MomData.comfortTips[0].tip}</p>
                </div>
              </div>

              <div className={styles.momTips}>
                <Icon name={'icon-fitness_center'} width={24} height={24} />
                <div>
                  <h3 className={styles.momTipTitle}>{MomData.comfortTips[1].category}</h3>
                  <p className={styles.momTipText}>{MomData.comfortTips[1].tip}</p>
                </div>
              </div>

              <div className={styles.momTips}>
                <Icon name={'icon-chair'} width={24} height={24} />
                <div>
                  <h3 className={styles.momTipTitle}>{MomData.comfortTips[2].category}</h3>
                  <p className={styles.momTipText}>{MomData.comfortTips[2].tip}</p>
                </div>
              </div>
            </div>
          </div>
          <TaskReminderCard />
        </div>
      )}
    </div>
  );
};

export default JourneyDetails;
