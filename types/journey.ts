export type Journey = {
    weekNumber: number;
  };
  
export type JourneyBaby = {
  weekNumber: number;
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
  weekNumber: number;
  feelingsStates: string[];
  sensationDescr: string;
  comfortTips: ComfortTip[];
  };
  
  export type Tab = 'baby' | 'mom';
  