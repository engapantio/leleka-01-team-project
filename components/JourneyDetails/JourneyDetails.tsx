import { JourneyBaby, JourneyMom, Tab } from '@/types/journey';
import Image from 'next/image';

interface JourneyDetailsProp {
  selectedTab: Tab;
  babyData: JourneyBaby;
  MomData: JourneyMom;
  selectBabyFn: () => void;
  selectMomFn: () => void;
}

const JourneyDetails = ({
  selectedTab,
  babyData,
  MomData,
  selectBabyFn,
  selectMomFn,
}: JourneyDetailsProp) => {
  return (
    <div>
      <div>
        <button onClick={selectBabyFn}>Розвиток малюка</button>
        <button onClick={selectMomFn}>Тіло мами</button>
      </div>
      <div>
        {babyData && selectedTab === 'baby' && (
          <div>
            <Image src={babyData.image} alt={babyData.analogy} />
            {babyData.analogy && <p>{babyData.analogy}</p>}
            <p>{babyData.babyActivity}</p>
            <p>{babyData.babyDevelopment}</p>
            <div>
              <h3>Цікавий факт тижня</h3>
              <p>{babyData.interestingFact}</p>
            </div>
          </div>
        )}
        {MomData && selectedTab === 'mom' && (
          <div>
            <div>
              <h2>Як ви можете почуватись</h2>
              <div>
                <p>{MomData.feelingsStates[0]}</p>
                <p>{MomData.feelingsStates[1]}</p>
                <p>{MomData.feelingsStates[2]}</p>
              </div>
            </div>
            <div>
              <h2>Поради для вашого комфорту</h2>
              <div>
                <h3>{MomData.comfortTips[0].category}</h3>
                <p>{MomData.comfortTips[0].tip}</p>
              </div>
              <div>
                <h3>{MomData.comfortTips[1].category}</h3>
                <p>{MomData.comfortTips[1].tip}</p>
              </div>
              <div>
                <h3>{MomData.comfortTips[2].category}</h3>
                <p>{MomData.comfortTips[2].tip}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyDetails;
