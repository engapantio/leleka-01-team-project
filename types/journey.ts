export type Journey = {
  weekNumber: number;
};

export type JourneyBaby = {
  weekNumber: number;
  analogy: string;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
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

export type JourneyWeekData = {
  weekNumber: number;
  baby?: JourneyBaby;
  mom?: JourneyMom;
};
