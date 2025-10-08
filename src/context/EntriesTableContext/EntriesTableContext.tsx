"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { useLearnedEntriesContext } from "@/context/LearnedEntriesContext";
import { Views } from "@/types/types";
import { CollectionJoinEntries } from "@/types/types";
import { ContextType } from "./EntriesTableContext.types";
import { tableDataReducer } from "./lib";

const EntriesTableContext = createContext<ContextType>({
  state: {
    currentView: Views.Remaining,
    entries: [],
  },
  dispatch: () => {},
});

const EntriesTableContextProvider = ({
  collectionJoinEntries,
  children,
}: {
  collectionJoinEntries: CollectionJoinEntries;
  children: React.ReactNode;
}) => {
  const { learnedEntries } = useLearnedEntriesContext();

  const [state, dispatch] = useReducer(tableDataReducer, {
    currentView: Views.Remaining,
    entries: collectionJoinEntries.entries,
  });

  useEffect(() => {
    if (learnedEntries) {
      dispatch({
        type: state.currentView,
        payload: { collectionJoinEntries, learnedEntries },
      });
    }
  }, [learnedEntries, collectionJoinEntries, state.currentView]);

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
