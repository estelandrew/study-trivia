import { createContext, useState, useEffect, useCallback } from "react";
import { CardDataType, ConfidenceLevelType } from "@root/types";
import {
  getConfidenceLevelStorage,
  getConfidenceLevelStorageByDeckId,
} from "@lib/localStorage";
import { ConfidenceLevelsFilterSelectionsType } from "@root/types";

type CardDataContextType = {
  deckId: string;
  cards: CardDataType[] | undefined;
  liveCards: CardDataType[]; // cards filtered/sorted
  isCardsLoading: boolean;
  filterCards: (selections: ConfidenceLevelsFilterSelectionsType) => void;
  initCards: () => void;
};

export const CardsContext = createContext<CardDataContextType>({
  deckId: "",
  cards: [],
  liveCards: [],
  isCardsLoading: true,
  filterCards: () => {},
  initCards: () => {},
});

export const useCardsContext = (
  deckId: string,
  originalCards?: CardDataType[]
) => {
  const [liveCards, setLiveCards] = useState<CardDataType[]>([]);
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (liveCards.length > 0 && isCardsLoading) {
      setIsCardsLoading(false);
    }
  }, [liveCards, isCardsLoading]);

  const getAllCardsWithConfidenceLevel = useCallback(() => {
    const storage = getConfidenceLevelStorageByDeckId(deckId);
    const cards = originalCards?.map((card) => {
      const index = storage.findIndex(
        (item: ConfidenceLevelType) => card.id === item.cardId
      );
      return {
        ...card,
        confidenceLevel: index > -1 ? storage[index].value : "unevaluated",
      };
    });
    return cards;
  }, [deckId, originalCards]);

  const initCards = useCallback(() => {
    const cards = getAllCardsWithConfidenceLevel();
    cards && setLiveCards(cards);
  }, [getAllCardsWithConfidenceLevel]);

  const filterCards = (selections: ConfidenceLevelsFilterSelectionsType) => {
    let cards = getAllCardsWithConfidenceLevel();
    const showAll =
      !selections.unevaluated &&
      !selections.low &&
      !selections.medium &&
      !selections.high;
    if (showAll) {
      cards && setLiveCards(cards);
      return;
    }
    let result: CardDataType[] = [];
    if (cards) {
      result = cards.filter(
        (card: CardDataType) =>
          card.confidenceLevel &&
          selections[
            card.confidenceLevel as keyof ConfidenceLevelsFilterSelectionsType
          ]
      );
    }
    cards && setLiveCards(result);
  };

  return {
    CardsContext,
    liveCards,
    setLiveCards,
    isCardsLoading,
    filterCards,
    initCards,
  };
};
