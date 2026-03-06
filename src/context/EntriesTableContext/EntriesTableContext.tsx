"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  Views,
  CollectionJoinEntries,
  LearnedEntriesType,
} from "@/types/types";
import { useAuthContext } from "@/context/AuthContext";
import { getLearnedEntries } from "@/lib/api";
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
  const { user } = useAuthContext();
  const [learnedData, setLearnedData] = useState<LearnedEntriesType>(null);
  const [currentView, setCurrentView] = useState<Views>(Views.Remaining);
  const [entries, setEntries] = useState<UIEntry[]>([]);
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

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const data = await getLearnedEntries(userId, collectionJoinEntries.id);
      setLearnedData(data);
      console.log({ data });
    };
    if (user?.id) {
      fetchData(user.id);
    }
  }, [user, collectionJoinEntries.id]);

  useEffect(() => {
    if (learnedData?.length) {
      const builtEntries = buildEntries(collectionJoinEntries, learnedData);
      setEntries(builtEntries);
    }
  }, [learnedData, collectionJoinEntries]);

  return (
    <EntriesTableContext.Provider
      value={{
        currentView,
        setCurrentView,
        setEntries,
        visibleEntries,
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
