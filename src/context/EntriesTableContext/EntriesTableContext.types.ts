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
};

export type ActionType = {
  type: "initial" | Views;
  payload: {
    collectionJoinEntries: CollectionJoinEntries;
    learnedEntries: LearnedEntriesType;
  };
};
