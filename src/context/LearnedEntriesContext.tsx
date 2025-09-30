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
import { LearnedEntriesType } from "@/types/types";

type LearnedEntriesContextType = {
  learnedEntries: LearnedEntriesType;
  toggleIsEntryLearned: (
    isLearned: boolean,
    entryId: number,
    collectionId: number
  ) => void;
};

const LearnedEntriesContext = createContext<LearnedEntriesContextType>({
  learnedEntries: null,
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

  // Variable isLearned below refers to the current state of the entry at the time when the user clicks to mark as learned
  const toggleIsEntryLearned = useCallback(
    (isLearned: boolean, entryId: number, collectionId: number) => {
      // optimistically update the UI
      setLearnedEntries((prev) => {
        if (isLearned) {
          const newState = prev?.filter(
            (entry) =>
              entry.entry_id !== entryId && entry.collection_id !== collectionId
          );
          return newState ?? null;
        } else {
          return prev
            ? [...prev, { entry_id: entryId, collection_id: collectionId }]
            : [{ entry_id: entryId, collection_id: collectionId }];
        }
      });

      // backend update
      // TODO if backend fails, need to rollback UI update
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
      const data = await getLearnedEntries(userId);
      setLearnedEntries(data);
      return data;
    };

    if (user?.id) {
      fetchData(user.id);
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
