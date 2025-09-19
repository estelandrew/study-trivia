"use client";

import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getLearnedEntries } from "@/lib/api";

type LearnedEntriesType =
  | {
      entry_id: number;
      collection_id: number;
    }[]
  | null;

type LearnedEntriesContextType = {
  learnedEntries: LearnedEntriesType;
  toggleIsEntryLearned: () => void;
};

const LearnedEntriesContext = createContext<LearnedEntriesContextType>({
  learnedEntries: [],
  toggleIsEntryLearned: () => {},
});

const LearnedEntriesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, session } = useAuthContext();
  const [learnedEntries, setLearnedEntries] =
    useState<LearnedEntriesType>(null);

  // create function that toggles a entry as learned or unlearned
  // update state first, then update  database (if db insert fails, roll back UI state and throw error)
  // use useCallback so as to not have necessary rerenders
  const toggleIsEntryLearned = useCallback(() => {
    // toggle
  }, []);

  const contextValue: LearnedEntriesContextType = useMemo(
    () => ({ learnedEntries, toggleIsEntryLearned }),
    [learnedEntries, toggleIsEntryLearned]
  );

  useEffect(() => {
    const fetchData = async (userId: string) => {
      if (user?.id) {
        const data = await getLearnedEntries(userId);
        setLearnedEntries(data);
        return data;
      } else {
        // TODO : check localstorage and return if exists
        return [];
      }
    };
    if (user?.id) {
      fetchData(user.id);
    } else {
    }
  }, [user, session]);

  return (
    <LearnedEntriesContext.Provider value={contextValue}>
      {children}
    </LearnedEntriesContext.Provider>
  );
};

export const useLearnedEntriesContext = () => {
  const context = useContext<LearnedEntriesContextType>(LearnedEntriesContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export default LearnedEntriesContextProvider;
