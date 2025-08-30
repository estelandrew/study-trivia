// api types
export type Entry = {
  id: number;
  clue: string;
  group: string;
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

export type CollectionJoinEntries = Collection & { entries: Entry[] };
