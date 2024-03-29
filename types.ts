{
  /* TODO: figure out if way to not allow null to be returned */
}
export type DeckDataType = {
  id: any;
  slug: any;
  name: any;
  description: any;
  categories:
    | {
        slug: any;
      }[]
    | any;
  cards: {
    id: any;
    clue: any;
    answer: any;
  }[];
} | null;

export type CardDataType = {
  id: string;
  clue: string;
  answer: string;
  confidenceLevel?: string;
};

export type CardUIFieldsType = {
  isRevealed: boolean;
  confidenceLevel: string;
};

export type DisplayCardType = CardDataType & CardUIFieldsType;

export enum DeckViews {
  Cards = "cards",
  Table = "table",
}

export interface ConfidenceLevelType {
  deckId: string;
  cardId: string;
  value: string;
}

export type ConfidenceLevelStorageType = ConfidenceLevelType[] | null;

export type ConfidenceLevelsFilterSelectionsType = {
  unevaluated: boolean;
  low: boolean;
  medium: boolean;
  high: boolean;
};
