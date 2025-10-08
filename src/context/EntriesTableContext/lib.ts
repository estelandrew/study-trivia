import { Views, Entry } from "@/types/types";
import { LearnedEntriesType } from "@/types/types";
import { StateType, ActionType } from "./EntriesTableContext.types";

export const tableDataReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case Views.Remaining:
      return {
        currentView: Views.Remaining,
        entries: action.payload.collectionJoinEntries.entries.filter((entry) =>
          isEntryLearned(
            entry,
            action.payload.collectionJoinEntries.id,
            action.payload.learnedEntries
          )
        ),
      };
    case Views.Learned:
      return {
        currentView: Views.Learned,
        entries: action.payload.collectionJoinEntries.entries.filter(
          (entry) =>
            !isEntryLearned(
              entry,
              action.payload.collectionJoinEntries.id,
              action.payload.learnedEntries
            )
        ),
      };
    case Views.Sheet:
      return {
        currentView: Views.Sheet,
        entries: action.payload.collectionJoinEntries.entries,
      };
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
};

const isEntryLearned = (
  entry: Entry,
  collectionId: number,
  learnedEntries: LearnedEntriesType
) => {
  // if entry.id and collectionId have matching entry in learnedEntries return true
  const matchingEntry = learnedEntries?.filter(
    (_entry) =>
      _entry["collection_id"] === collectionId &&
      _entry["entry_id"] === entry.id
  )[0];
  return !matchingEntry;
};
