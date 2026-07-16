"use client";

import { useState, useEffect, useMemo } from "react";
import { CollectionJoinEntries, LearnedEntriesType } from "@/types/types";
import { useAuthContext } from "@/context/AuthContext";
import {
  getLearnedEntries,
  insertLearnedEntry,
  deleteLearnedEntry,
} from "@/lib/api";
import {
  buildEntries,
  addEntryToLocalStorage,
  deleteEntryFromLocalStorage,
  isEntryInLocalStorage,
} from "./lib";
import { UIEntry } from "./StudyTable.types";

const useStudyTable = (
  collectionJoinEntries: CollectionJoinEntries,
): {
  entries: UIEntry[];
  visibleEntries: UIEntry[];
  toggleIsLearned: (isLearned: boolean, entryId: number) => void;
} => {
  const collectionId = collectionJoinEntries.id;
  const { user, isAuthLoading } = useAuthContext();
  const [learnedData, setLearnedData] = useState<LearnedEntriesType>(null);
  const [entries, setEntries] = useState<UIEntry[]>([]);
  const [exitingIds, setExitingIds] = useState<Set<number>>(new Set());

  const visibleEntries = useMemo(() => {
    return entries.filter(
      (entry) => !entry.isLearned || exitingIds.has(entry.id),
    );
  }, [entries, exitingIds]);

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
    // the code below delays the UI animation if the learned items are set to hidden
    // the clicked items get addded to a pending removal state and then removed after half a second
    // this makes it so that the user briefly sees the learned styling update on the item before it disappears from the UI
    setEntries((prev) =>
      prev.map((_entry) =>
        _entry.id === entryId
          ? { ..._entry, isLearned: !_entry.isLearned }
          : _entry,
      ),
    );
    setExitingIds((prev: Set<number>) => {
      const updatedSet = new Set(prev);
      updatedSet.add(entryId);
      return updatedSet;
    });
    setTimeout(() => {
      setExitingIds((prev) => {
        const next = new Set(prev);
        next.delete(entryId);
        return next;
      });
    }, 500);
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
    // initially add all isLearnedIds to exitingIds
    setExitingIds((prev: Set<number>) => {
      const updatedSet = new Set(prev);
      builtEntries.forEach((entry) => {
        if (entry.isLearned) {
          updatedSet.add(entry.id);
        }
      });
      return updatedSet;
    });
    setEntries(builtEntries);
    // clear exiting Id's to trigger the delayed animation on UI
    setTimeout(() => {
      setExitingIds(new Set());
    }, 500);
  }, [learnedData, collectionJoinEntries]);

  return {
    entries,
    visibleEntries,
    toggleIsLearned,
  };
};

export default useStudyTable;
