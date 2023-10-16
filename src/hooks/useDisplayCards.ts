import { useState } from "react";
import { CardDataType, DisplayCardType } from "../../types";
import { getConfidenceLevelStorage } from "@lib/localStorage";

export const useDisplayCards = (cardsFromDeck: CardDataType[]) => {
  const confidenceLevelsFromStorage = getConfidenceLevelStorage();

  const constructCardsWithAdditionalProps = () => {
    const cards: DisplayCardType[] = [];
    cardsFromDeck.forEach((cardFromDeck) => {
      let index;
      if (confidenceLevelsFromStorage) {
        index = confidenceLevelsFromStorage.findIndex(
          (item: { id: string }) => item.id === cardFromDeck.id
        );
      }
      const confidenceLevel =
        index > -1 ? confidenceLevelsFromStorage[index].confidenceLevel : "0";
      cards.push({
        ...cardFromDeck,
        isRevealed: false,
        confidenceLevel: confidenceLevel,
      });
    });
    return cards;
  };

  const updatedCards = constructCardsWithAdditionalProps();

  const [cards, setCards] = useState<DisplayCardType[]>([...updatedCards]);

  const updateCardIsRevealed = (indexRevealed: number) => {
    setCards((prev) => {
      const newState = [...prev];
      newState.forEach((card, i) => {
        if (i === indexRevealed) {
          card.isRevealed = !card.isRevealed;
        }
      });
      return [...newState];
    });
  };

  return { cards, updateCardIsRevealed };
};
