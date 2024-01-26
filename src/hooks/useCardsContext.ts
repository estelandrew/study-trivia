import { createContext, useState, useEffect, useCallback, useRef } from "react";
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
  sortCards: (selection: string) => void;
  initCards: () => void;
  toolbarStatus: ToolbarStatusType;
  setToolbarStatus: React.Dispatch<React.SetStateAction<ToolbarStatusType>>;
};

type ToolbarStatusType = {
  sort: string;
};

export const CardsContext = createContext<CardDataContextType>({
  deckId: "",
  cards: [],
  liveCards: [],
  isCardsLoading: true,
  filterCards: () => {},
  sortCards: () => {},
  initCards: () => {},
  toolbarStatus: { sort: "" },
  setToolbarStatus: () => {},
});

export const useCardsContext = (
  deckId: string,
  originalCards?: CardDataType[]
) => {
  const [liveCards, setLiveCards] = useState<CardDataType[]>([]);
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true);
  const [toolbarStatus, setToolbarStatus] = useState<ToolbarStatusType>({
    sort: "",
  });
  const filterUpdated = useRef(false);

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
    filterUpdated.current = true;
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

  const sortCardsByConfidence = useCallback(
    (direction: string) => {
      let arrs = {
        unevaluated: [] as CardDataType[],
        low: [] as CardDataType[],
        medium: [] as CardDataType[],
        high: [] as CardDataType[],
      };
      let result: CardDataType[] = [];
      for (let i = 0; i < liveCards.length; i++) {
        const confLevel = liveCards[i].confidenceLevel;
        arrs[confLevel as keyof typeof arrs].push(liveCards[i]);
      }
      result =
        direction === "asc"
          ? [...arrs.unevaluated, ...arrs.low, ...arrs.medium, ...arrs.high]
          : [...arrs.high, ...arrs.medium, ...arrs.low, ...arrs.unevaluated];
      return result;
    },
    [liveCards]
  );

  const sortCardsAlphabetically = useCallback(
    (direction: string) => {
      const result = liveCards.slice();
      if (direction === "asc") {
        result.sort(function (a, b) {
          if (a.clue < b.clue) {
            return -1;
          }
          if (a.clue > b.clue) {
            return 1;
          }
          return 0;
        });
      } else {
        result.sort(function (a, b) {
          if (a.clue > b.clue) {
            return -1;
          }
          if (a.clue < b.clue) {
            return 1;
          }
          return 0;
        });
      }
      return result;
    },
    [liveCards]
  );

  const sortCards = useCallback(
    (selection: string) => {
      if (!liveCards.length) {
        return;
      } else {
        let result: CardDataType[] = [];
        switch (selection) {
          case "confidenceAsc":
            result = sortCardsByConfidence("asc");
            break;
          case "confidenceDesc":
            result = sortCardsByConfidence("desc");
            break;
          case "clueAsc":
            result = sortCardsAlphabetically("asc");
            break;
          case "clueDesc":
            result = sortCardsAlphabetically("desc");
            break;
          default:
            break;
        }
        setLiveCards(result);
        setToolbarStatus({ sort: selection });
      }
    },
    [liveCards.length, sortCardsAlphabetically, sortCardsByConfidence]
  );

  useEffect(() => {
    if (liveCards.length > 0 && isCardsLoading) {
      setIsCardsLoading(false);
    }
    if (filterUpdated.current && toolbarStatus.sort) {
      sortCards(toolbarStatus.sort);
      filterUpdated.current = false;
    }
  }, [liveCards, isCardsLoading, toolbarStatus.sort, sortCards]);

  return {
    CardsContext,
    liveCards,
    setLiveCards,
    isCardsLoading,
    filterCards,
    sortCards,
    initCards,
    toolbarStatus,
    setToolbarStatus,
  };
};
