"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  Views,
  CollectionJoinEntries,
  LearnedEntriesType,
} from "@/types/types";
import { useAuthContext } from "@/context/AuthContext";
import {
  getLearnedEntries,
  insertLearnedEntry,
  deleteLearnedEntry,
} from "@/lib/api";
import { ContextType, UIEntry } from "./EntriesTableContext.types";
import { buildEntries } from "./lib";

const EntriesTableContext = createContext<ContextType | undefined>(undefined);

const EntriesTableContextProvider = ({
  collectionJoinEntries,
  children,
}: {
  collectionJoinEntries: CollectionJoinEntries;
  children: React.ReactNode;
}) => {
  const collectionId = collectionJoinEntries.id;
  const { user } = useAuthContext();
  const [learnedData, setLearnedData] = useState<LearnedEntriesType>(null);
  const [currentView, setCurrentView] = useState<Views>(Views.Remaining);
  const [entries, setEntries] = useState<UIEntry[]>([]);
  //const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const visibleEntries = useMemo(() => {
    // learnedData has not been populated OR entries has not been populated
    if (!learnedData || learnedData.length < 1 || entries.length < 1) {
      return [];
    }
    switch (currentView) {
      case Views.Remaining:
        return entries.filter((entry) => !entry.isLearned);
      case Views.Learned:
        return entries.filter((entry) => entry.isLearned);
      case Views.Sheet:
      default:
        return entries;
    }
  }, [entries, currentView, learnedData]);

  const toggleIsLearned = (isLearned: boolean, entryId: number) => {
    // isLearned refers to status of entry prior to toggle
    if (!user) return;
    if (isLearned) {
      deleteLearnedEntry(collectionId, entryId, user.id);
    } else {
      insertLearnedEntry(collectionId, entryId, user.id);
    }
  };

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const data = await getLearnedEntries(userId, collectionJoinEntries.id);
      setLearnedData(data);
    };
    if (user?.id) {
      fetchData(user.id);
    }
  }, [user, collectionJoinEntries.id]);

  useEffect(() => {
    if (!learnedData || learnedData.length < 1) {
      return;
    }
    const builtEntries = buildEntries(collectionJoinEntries, learnedData);
    setEntries(builtEntries);
  }, [learnedData, collectionJoinEntries]);

  return (
    <EntriesTableContext.Provider
      value={{
        currentView,
        setCurrentView,
        setEntries,
        visibleEntries,
        toggleIsLearned,
        //isLoaded,
      }}
    >
      {children}
    </EntriesTableContext.Provider>
  );
};

export const useEntriesTableContext = () => {
  const context = useContext(EntriesTableContext);
  if (!context) {
    throw new Error(
      "useEntriesTableContext must be used as child of EntriesTableContextProvider",
    );
  }
  return context;
};

export default EntriesTableContextProvider;
