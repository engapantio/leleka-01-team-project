import { JourneyBaby, JourneyMom, Tab } from "@/types/journey";

interface JourneyDetailsProp {
    selectedTab: Tab;
    data: {
    mom?: JourneyMom;
    baby?: JourneyBaby;
  };
    selectBabyFn: () => void;
    selectMomFn: () => void;
}

const JourneyDetails = ({ selectedTab, data, selectBabyFn, selectMomFn }: JourneyDetailsProp) => {


const baby = data?.baby ? data?.baby : null;
const mom = data?.mom ? data?.mom : null;
    
    return (
        <div>
            <div>
                <button onClick={selectBabyFn}>Розвиток малюка</button>
                <button onClick={selectMomFn}>Тіло мами</button>
            </div>
            <div>
                {data && selectedTab === 'baby' ? (
                    <div>
                        <img src={baby?.image} alt={baby?.analogy} />
                        {baby?.analogy && <p>{baby.analogy}</p>}
                        <p>{baby?.babyActivity}</p>
                        <p>{baby?.babyDevelopment}</p>
                        <div>
                            <h3>Цікавий факт тижня</h3>
                            <p>{ baby?.interestingFact}</p>
                        </div>
                    </div>
                ) : (
                        <div>
                            <div>
                                <h2>Як ви можете почуватись</h2>
                                <div>
                                    <p>{mom?.feelingsStates[0] }</p>
                                    <p>{mom?.feelingsStates[1] }</p>
                                    <p>{mom?.feelingsStates[2] }</p>
                                </div>
                            </div>
                            <div>
                                <h2>Поради для вашого комфорту</h2>
                                <div>
                                    <h3>{ mom?.comfortTips[0].category}</h3>
                                    <p>{mom?.comfortTips[0].tip }</p>
                                </div>
                                <div>
                                    <h3>{ mom?.comfortTips[1].category}</h3>
                                    <p>{mom?.comfortTips[1].tip }</p>
                                </div>
                                <div>
                                    <h3>{ mom?.comfortTips[2].category}</h3>
                                    <p>{mom?.comfortTips[2].tip }</p>
                                </div>
                            </div>
                    </div>
                )}
            </div>
           
        </div>
    )
};

export default JourneyDetails