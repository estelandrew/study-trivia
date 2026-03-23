import {
  Entry,
  LearnedEntriesType,
  Views,
  CollectionJoinEntries,
} from "@/types/types";

export type StateType = {
  currentView: Views;
  entries: Entry[];
};

export type UIEntry = {
  id: number;
  clue: string;
  answer: string;
  isLearned: boolean;
};

export type ContextType = {
  currentView: Views;
  setCurrentView: React.Dispatch<React.SetStateAction<Views>>;
  setEntries: React.Dispatch<React.SetStateAction<UIEntry[]>>;
  visibleEntries: UIEntry[];
  toggleIsLearned: (isLearned: boolean, entryId: number) => void;
  counts: Counts;
  setCounts: React.Dispatch<React.SetStateAction<Counts>>;
};

export type ActionType = {
  type: "initial" | Views;
  payload: {
    collectionJoinEntries: CollectionJoinEntries;
    learnedEntries: LearnedEntriesType;
  };
};

export type Counts = {
  total: number;
  remaining: number;
  learned: number;
};
