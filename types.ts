export type DeckDataType = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categories: {
    slug: string;
  };
  cards: CardDataType[];
};

export type CardDataType = {
  id: string;
  clue: string;
  answer: string;
};

export type CardUIFieldsType = {
  isRevealed: boolean;
  confidenceLevel: string;
};

export type DisplayCardType = CardDataType & CardUIFieldsType;
