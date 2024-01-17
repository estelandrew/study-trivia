import { createContext, useState } from "react";
import { CardDataType } from "@root/types";
import { getConfidenceLevelStorage } from "@lib/localStorage";
import { ConfidenceLevelsFilterSelectionsType } from "@root/types";

type CardDataContextType = {
  cards: CardDataType[] | undefined;
  cardsFS: CardDataType[]; // cards filtered/sorted
  filterCards: (selections: ConfidenceLevelsFilterSelectionsType) => void;
};

export const CardsContext = createContext<CardDataContextType>({
  cards: [],
  cardsFS: [],
  filterCards: () => {},
});

export const useCardsContext = (originalCards?: CardDataType[]) => {
  const [cardsFS, setCardsFS] = useState<CardDataType[]>([]);

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

  return { CardsContext, cardsFS, setCardsFS, filterCards };
};
