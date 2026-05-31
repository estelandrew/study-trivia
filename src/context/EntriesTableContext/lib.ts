import { UIEntry } from "./EntriesTableContext.types";
import {
  CollectionJoinEntries,
  LearnedEntry,
  LearnedEntriesType,
} from "@/types/types";

const LEARNED_ENTRIES_KEY = "learned-entries";

export const buildEntries = (
  collection: CollectionJoinEntries,
  learned: LearnedEntriesType | null,
): UIEntry[] => {
  const learnedIdSet = new Set(learned?.map((l) => l.entry_id) ?? []);
  return collection.entries.map((entry) => ({
    id: entry.id,
    clue: entry.clue,
    answer: entry.answer,
    isLearned: learnedIdSet.has(entry.id),
  }));
};

export const addEntryToLocalStorage = (
  collectionId: number,
  entryId: number,
) => {
  const entry = {
    collection_id: collectionId,
    entry_id: entryId,
  };

  const existingItems = localStorage.getItem(LEARNED_ENTRIES_KEY);
  const result = existingItems ? JSON.parse(existingItems) : [];
  result.push(entry);
  localStorage.setItem(LEARNED_ENTRIES_KEY, JSON.stringify(result));
};

export const deleteEntryFromLocalStorage = (
  collectionId: number,
  entryId: number,
) => {
  let result;
  const existingItems = localStorage.getItem(LEARNED_ENTRIES_KEY);
  result = existingItems && JSON.parse(existingItems);
  result = result.filter((item: LearnedEntry) => {
    return !(item.collection_id === collectionId && item.entry_id === entryId);
  });
  localStorage.setItem(LEARNED_ENTRIES_KEY, JSON.stringify(result));
};

export const isEntryInLocalStorage = (
  collectionId: number,
  entryId: number,
): boolean => {
  const learnedEntries = getLearnedEntries();
  if (!learnedEntries) return false;
  const entryExists = learnedEntries.some(
    (item: LearnedEntry) =>
      item.collection_id === collectionId && item.entry_id === entryId,
  );
  return entryExists;
};

export const getLearnedEntries = () => {
  const storage = localStorage.getItem(LEARNED_ENTRIES_KEY);
  const result = storage ? JSON.parse(storage) : storage;
  return result;
};
