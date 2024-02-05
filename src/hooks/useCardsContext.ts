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
  shuffleCards: () => void;
  initCards: () => void;
  toolbarStatus: ToolbarStatusType;
  setToolbarStatus: React.Dispatch<React.SetStateAction<ToolbarStatusType>>;
};

type ToolbarStatusType = {
  filters: ConfidenceLevelsFilterSelectionsType;
  sortType: string;
  shuffledCards: CardDataType[];
};

export const CardsContext = createContext<CardDataContextType>({
  deckId: "",
  cards: [],
  liveCards: [],
  isCardsLoading: true,
  filterCards: () => {},
  sortCards: () => {},
  shuffleCards: () => {},
  initCards: () => {},
  toolbarStatus: {
    filters: {
      unevaluated: false,
      low: false,
      medium: false,
      high: false,
    },
    sortType: "",
    shuffledCards: [],
  },
  setToolbarStatus: () => {},
});

export const useCardsContext = (
  deckId: string,
  originalCards?: CardDataType[]
) => {
  const [liveCards, setLiveCards] = useState<CardDataType[]>([]);
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true);
  const [toolbarStatus, setToolbarStatus] = useState<ToolbarStatusType>({
    filters: {
      unevaluated: false,
      low: false,
      medium: false,
      high: false,
    },
    sortType: "",
    shuffledCards: [],
  });
  const filterUpdated = useRef(false);
  const shuffleUpdated = useRef(false);

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
    const shuffledCards = toolbarStatus.shuffledCards;
    let cards = shuffledCards.length
      ? shuffledCards
      : getAllCardsWithConfidenceLevel();
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
    setToolbarStatus((prev) => {
      return {
        ...prev,
        filters: { ...selections },
      };
    });
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
        setToolbarStatus((prev) => {
          return {
            ...prev,
            sortType: selection,
          };
        });
      }
    },
    [liveCards.length, sortCardsAlphabetically, sortCardsByConfidence]
  );

  const shuffleCards = useCallback(() => {
    shuffleUpdated.current = true;
    let cards = getAllCardsWithConfidenceLevel();
    let result: CardDataType[] = [];
    if (!liveCards.length) {
      return;
    } else {
      //const liveCardsCopy = liveCards.slice();
      if (cards) {
        result = shuffle(cards);
      }
      setLiveCards(result);
      setToolbarStatus((prev) => {
        return {
          ...prev,
          sortType: "",
          shuffledCards: result,
        };
      });
    }
  }, [getAllCardsWithConfidenceLevel, liveCards]);

  /** Fisher-Yates (aka Knuth) Shuffle. copied and pasted from stackoverflow */
  function shuffle(arr: CardDataType[]) {
    let currentIndex = arr.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  }

  useEffect(() => {
    if (liveCards.length > 0 && isCardsLoading) {
      setIsCardsLoading(false);
    }
    if (filterUpdated.current && toolbarStatus.sortType) {
      sortCards(toolbarStatus.sortType);
      filterUpdated.current = false;
    }
    if (shuffleUpdated.current) {
      filterCards(toolbarStatus.filters);
      shuffleUpdated.current = false;
    }
  }, [liveCards, isCardsLoading, toolbarStatus, sortCards]);

  return {
    CardsContext,
    liveCards,
    setLiveCards,
    isCardsLoading,
    filterCards,
    sortCards,
    shuffleCards,
    initCards,
    toolbarStatus,
    setToolbarStatus,
  };
};
