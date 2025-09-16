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
import { getUserLearnedEntries } from "@/lib/api";

type LearnedEntriesType =
  | {
      entry_id: number;
      collection_id: number;
    }[]
  | null;

type UserLearnedEntriesContextType = {
  userLearnedEntries: LearnedEntriesType;
  toggleIsEntryLearned: () => void;
};

const UserLearnedEntriesContext = createContext({});

const UserLearnedEntriesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, session } = useAuthContext();
  const [userLearnedEntries, setUserLearnedEntries] =
    useState<LearnedEntriesType>(null);

  // create function that toggles a entry as learned or unlearned
  // update state first, then update  database (if db insert fails, roll back UI state and throw error)
  // use useCallback so as to not have necessary rerenders
  const toggleIsEntryLearned = useCallback(() => {
    // toggle
  }, []);

  const contextValue: UserLearnedEntriesContextType = useMemo(
    () => ({ userLearnedEntries, toggleIsEntryLearned }),
    [userLearnedEntries, toggleIsEntryLearned]
  );

  useEffect(() => {
    const fetchData = async (userId: string) => {
      if (user?.id) {
        const data = await getUserLearnedEntries(userId);
        setUserLearnedEntries(data);
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
    <UserLearnedEntriesContext.Provider value={contextValue}>
      {children}
    </UserLearnedEntriesContext.Provider>
  );
};

export const useUserLearnedEntriesContext = () => {
  const context = useContext(UserLearnedEntriesContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export default UserLearnedEntriesContextProvider;
