import { createContext, useState } from "react";
import { CardDataType } from "@root/types";
import {
  getConfidenceLevelStorage,
  getConfidenceLevelStorageByDeckId,
  getConfidenceLevelStorageByDeckIdSortedAsc,
} from "@lib/localStorage";
import { ConfidenceLevelsFilterSelectionsType } from "@root/types";

type CardDataContextType = {
  deckId: string;
  cards: CardDataType[] | undefined;
  cardsFS: CardDataType[]; // cards filtered/sorted
  filterCards: (selections: ConfidenceLevelsFilterSelectionsType) => void;
  initCards: () => void;
};

export const CardsContext = createContext<CardDataContextType>({
  deckId: "",
  cards: [],
  cardsFS: [],
  filterCards: () => {},
  initCards: () => {},
});

export const useCardsContext = (
  deckId: string,
  originalCards?: CardDataType[]
) => {
  const [cardsFS, setCardsFS] = useState<CardDataType[]>([]);

  const initCards = () => {
    const storage = getConfidenceLevelStorageByDeckId(deckId);
    if (!storage) return;
    // if confidence level storage does exist, sort items by confidence in ascending order (unevaluated -> high conf)
    if (cardsFS.length) {
      // work with cardsFS
    } else {
      // work with original cards and set cardsFS
      let result = [];
      const unevaluated = [],
        low = [],
        medium = [],
        high = [];
      const storageSortedAsc =
        getConfidenceLevelStorageByDeckIdSortedAsc(deckId);
      if (originalCards) {
        for (let i = 0; i < originalCards.length; i++) {
          let notFound = true;
          let j = 0;
          while (notFound && j < storageSortedAsc.length) {
            if (originalCards[i].id === storageSortedAsc[j].cardId) {
              notFound = false;
              const value = storageSortedAsc[j].value;
              switch (value) {
                case "low":
                  low.push(originalCards[i]);
                  break;
                case "medium":
                  medium.push(originalCards[i]);
                  break;
                case "high":
                  high.push(originalCards[i]);
                  break;
                default:
                  break;
              }
            }
            j++;
          }
          if (notFound) unevaluated.push(originalCards[i]);
        }
      }
      result = [...unevaluated, ...low, ...medium, ...high];
      setCardsFS(result);
    }
  };

  const filterCards = (selections: ConfidenceLevelsFilterSelectionsType) => {
    const showAll =
      !selections.unevaluated &&
      !selections.low &&
      !selections.medium &&
      !selections.high;
    if (showAll) {
      setCardsFS([]);
      return;
    }
    let result: CardDataType[] = [];
    let originalCopy;
    originalCopy = originalCards?.slice();
    const storage = getConfidenceLevelStorage();
    originalCopy?.forEach((card) => {
      // filter storage down to just card
      const itemFromStorage = storage.filter(
        (item: any) => item.id === card.id
      )[0];
      const showUnevaluated = !itemFromStorage && selections.unevaluated;
      const showLow = itemFromStorage?.value === "low" && selections.low;
      const showMedium =
        itemFromStorage?.value === "medium" && selections.medium;
      const showHigh = itemFromStorage?.value === "high" && selections.high;
      if (showUnevaluated || showLow || showMedium || showHigh) {
        result.push(card);
      }
    });
    setCardsFS(result);
  };

  return { CardsContext, cardsFS, setCardsFS, filterCards, initCards };
};
