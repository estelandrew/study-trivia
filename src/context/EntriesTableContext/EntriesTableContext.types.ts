export type UIEntry = {
  id: number;
  clue: string;
  answer: string;
  isLearned: boolean;
};

export type Counts = {
  total: number;
  remaining: number;
  learned: number;
};
