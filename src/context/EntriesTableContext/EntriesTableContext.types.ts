import { Views, Entry } from "@/types/types";
import { CollectionJoinEntries } from "@/types/types";
import { LearnedEntriesType } from "@/types/types";

export type StateType = {
  currentView: Views;
  entries: Entry[];
};

export type ContextType = {
  state: StateType;
  dispatch: React.ActionDispatch<[action: ActionType]>;
};

export type ActionType = {
  type: "initial" | Views;
  payload: {
    collectionJoinEntries: CollectionJoinEntries;
    learnedEntries: LearnedEntriesType;
  };
};
