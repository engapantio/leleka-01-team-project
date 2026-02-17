export type Emotion = {
  id: number;
  title: string;
};

export type DiaryEntry = {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  emotions: Emotion[];
  createdAt: string;
  updatedAt: string;
};
