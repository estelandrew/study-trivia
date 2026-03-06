import { UIEntry } from "./EntriesTableContext.types";
import { CollectionJoinEntries, LearnedEntriesType } from "@/types/types";

export const buildEntries = (
  collection: CollectionJoinEntries,
  learned: LearnedEntriesType,
): UIEntry[] => {
  const learnedIdSet = new Set(learned?.map((l) => l.entry_id) ?? []);

  return collection.entries.map((entry) => ({
    id: entry.id,
    clue: entry.clue,
    answer: entry.answer,
    isLearned: learnedIdSet.has(entry.id),
  }));
};
