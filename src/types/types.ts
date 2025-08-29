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

export type CategoryJoinCollections = Category & { decks: Collection[] };

export type CollectionJoinEntries = Collection & { cards: Entry[] };
