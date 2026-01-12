export type Journey = {
    weekNumber: number;
  };
  
  export type JourneyBaby = {
    analogy: string;
    image: string;
    babyDevelopment: string;
    babyActivity: string;
    interestingFact: string;
  };
  
  type ComfortTip = {
    category: string;
    tip: string;
  };
  
  export type JourneyMom = {
    feelings: {
      states: string[];
      sensationDescr: string;
    };
    comfortTips: ComfortTip[];
  };
  
  export type Tab = 'baby' | 'mom';
  
  export type JourneyWeekData = {
    weekNumber: number;
    baby?: JourneyBaby;
    mom?: JourneyMom;
  };