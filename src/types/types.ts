// api types
export type Entry = {
  id: number;
  clue: string;
  answer: string;
};

export type Collection = {
  id: number;
  slug: string;
  name: string;
  description: string;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
};

export type CategoryJoinCollections = Category & { collections: Collection[] };

export type CollectionJoinEntries = Collection & { entries: Entry[] } & {
  entries_count: { count: number }[];
};

// shared
export enum Views {
  Remaining = "remaining",
  Learned = "learned",
  Sheet = "sheet",
}

export type LearnedEntriesType =
  | {
      entry_id: number;
      collection_id: number;
    }[]
  | null;
