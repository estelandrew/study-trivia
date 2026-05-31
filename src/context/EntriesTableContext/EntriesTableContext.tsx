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
import { ContextType, UIEntry, Counts } from "./EntriesTableContext.types";
import {
  buildEntries,
  addEntryToLocalStorage,
  deleteEntryFromLocalStorage,
  isEntryInLocalStorage,
} from "./lib";

const EntriesTableContext = createContext<ContextType | undefined>(undefined);

const EntriesTableContextProvider = ({
  collectionJoinEntries,
  children,
}: {
  collectionJoinEntries: CollectionJoinEntries;
  children: React.ReactNode;
}) => {
  const collectionId = collectionJoinEntries.id;
  const { user, isAuthLoading } = useAuthContext();
  const [learnedData, setLearnedData] = useState<LearnedEntriesType>(null);
  const [currentView, setCurrentView] = useState<Views>(Views.Remaining);
  const [entries, setEntries] = useState<UIEntry[]>([]);
  const [counts, setCounts] = useState<Counts>({
    total: collectionJoinEntries.entries_count[0].count,
    remaining: 0,
    learned: 0,
  });
  //const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const visibleEntries = useMemo(() => {
    switch (currentView) {
      case Views.Remaining:
        return entries.filter((entry) => !entry.isLearned);
      case Views.Learned:
        return entries.filter((entry) => entry.isLearned);
      case Views.Sheet:
      default:
        return entries;
    }
  }, [entries, currentView]);

  const toggleIsLearned = (isLearned: boolean, entryId: number) => {
    // isLearned refers to status of entry prior to toggle
    if (!user?.id) {
      if (isEntryInLocalStorage(collectionId, entryId)) {
        deleteEntryFromLocalStorage(collectionId, entryId);
      } else {
        addEntryToLocalStorage(collectionId, entryId);
      }
    } else {
      if (isLearned) {
        deleteLearnedEntry(collectionId, entryId, user.id);
      } else {
        insertLearnedEntry(collectionId, entryId, user.id);
      }
    }
  };

  useEffect(() => {
    const fetchLearnedData = async (userId?: string) => {
      let data = null;
      if (userId) {
        data = await getLearnedEntries(userId, collectionJoinEntries.id);
      } else {
        const localData = localStorage.getItem("learned-entries");
        if (localData) {
          data = JSON.parse(localData);
        }
      }
      setLearnedData(data);
    };
    if (!isAuthLoading) {
      fetchLearnedData(user?.id);
    }
  }, [user, collectionJoinEntries.id, isAuthLoading]);

  useEffect(() => {
    const builtEntries = buildEntries(collectionJoinEntries, learnedData);
    setEntries(builtEntries);
  }, [learnedData, collectionJoinEntries]);

  // update counts when entries get updated
  useEffect(() => {
    if (entries && entries.length > 0) {
      const remainingCount = entries.filter((entry) => !entry.isLearned).length;
      setCounts((prev) => {
        return {
          ...prev,
          remaining: remainingCount,
          learned: prev.total - remainingCount,
        };
      });
    }
  }, [entries]);

  return (
    <EntriesTableContext.Provider
      value={{
        currentView,
        setCurrentView,
        setEntries,
        visibleEntries,
        toggleIsLearned,
        counts,
        setCounts,
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
