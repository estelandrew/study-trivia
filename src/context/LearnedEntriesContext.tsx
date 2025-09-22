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
import {
  getLearnedEntries,
  insertLearnedEntry,
  deleteLearnedEntry,
} from "@/lib/api";

type LearnedEntriesType =
  | {
      entry_id: number;
      collection_id: number;
    }[];

type LearnedEntriesContextType = {
  learnedEntries: LearnedEntriesType;
  toggleIsEntryLearned: (
    isLearned: boolean,
    entryId: number,
    collectionId: number
  ) => void;
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
  const [learnedEntries, setLearnedEntries] = useState<LearnedEntriesType>([]);

  const toggleIsEntryLearned = useCallback(
    (isLearned: boolean, entryId: number, collectionId: number) => {
      console.log("toggle triggered");
      // optimistically update the UI
      setLearnedEntries((prev) => {
        if (isLearned) {
          const newState = prev.filter(
            (entry) =>
              entry.entry_id !== entryId && entry.collection_id !== collectionId
          );
          return newState;
        } else {
          return [...prev, { entry_id: entryId, collection_id: collectionId }];
        }
      });

      // backend update
      if (isLearned) {
        deleteLearnedEntry(entryId, collectionId);
      } else {
        if (user?.id) {
          insertLearnedEntry(entryId, collectionId, user?.id);
        }
      }
    },
    [user?.id]
  );

  const contextValue: LearnedEntriesContextType = useMemo(
    () => ({ learnedEntries, toggleIsEntryLearned }),
    [learnedEntries, toggleIsEntryLearned]
  );

  useEffect(() => {
    const fetchData = async (userId: string) => {
      if (userId) {
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
