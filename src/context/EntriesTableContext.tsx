"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { useLearnedEntriesContext } from "@/context/LearnedEntriesContext";
import { Views, Entry } from "@/types/types";
import { CollectionJoinEntries } from "@/types/types";
import { LearnedEntriesType } from "@/types/types";

type StateType = {
  currentView: Views;
  entries: Entry[];
};

type ContextType = {
  state: StateType;
  dispatch: React.ActionDispatch<[action: ActionType]>;
};

const EntriesTableContext = createContext<ContextType>({
  state: {
    currentView: Views.Remaining,
    entries: [],
  },
  dispatch: () => {},
});

type ActionType = {
  type: "initial" | Views;
  payload: {
    collectionJoinEntries: CollectionJoinEntries;
    learnedEntries: LearnedEntriesType;
  };
};

const isEntryLearned = (
  entry: Entry,
  collectionId: number,
  learnedEntries: LearnedEntriesType
) => {
  // if entry.id and collectionId have matching entry in learnedEntries return true
  const matchingEntry = learnedEntries?.filter(
    (_entry) =>
      _entry["collection_id"] === collectionId &&
      _entry["entry_id"] === entry.id
  )[0];
  return !matchingEntry;
};

const tableDataReducer = (state: StateType, action: ActionType) => {
  console.log("reducer triggered");
  switch (action.type) {
    case Views.Remaining:
      console.log("REMAINING triggered");
      return {
        currentView: Views.Remaining,
        entries: action.payload.collectionJoinEntries.entries.filter((entry) =>
          isEntryLearned(
            entry,
            action.payload.collectionJoinEntries.id,
            action.payload.learnedEntries
          )
        ),
      };
    case Views.Learned:
      console.log("LEARNED triggered");
      return {
        currentView: Views.Remaining,
        entries: action.payload.collectionJoinEntries.entries.filter(
          (entry) =>
            !isEntryLearned(
              entry,
              action.payload.collectionJoinEntries.id,
              action.payload.learnedEntries
            )
        ),
      };
    case Views.Sheet:
      console.log("SHEET triggered");
      return {
        currentView: Views.Sheet,
        entries: action.payload.collectionJoinEntries.entries,
      };
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
};

const EntriesTableContextProvider = ({
  collectionJoinEntries,
  children,
}: {
  collectionJoinEntries: CollectionJoinEntries;
  children: React.ReactNode;
}) => {
  const { learnedEntries } = useLearnedEntriesContext();
  const initialData = {
    currentView: Views.Remaining,
    entries: collectionJoinEntries.entries,
  };

  const [state, dispatch] = useReducer(tableDataReducer, initialData);

  useEffect(() => {
    if (learnedEntries) {
      dispatch({
        type: Views.Remaining,
        payload: { collectionJoinEntries, learnedEntries },
      });
    }
  }, [learnedEntries, collectionJoinEntries]);

  return (
    <EntriesTableContext.Provider value={{ state, dispatch }}>
      {children}
    </EntriesTableContext.Provider>
  );
};

export const useEntriesTable = () => {
  const context = useContext(EntriesTableContext);
  if (!context) {
    throw new Error(
      "useEntriesTableContext must be used as child of EntriesTableContextProvider"
    );
  }
  return context;
};

export default EntriesTableContextProvider;
