import { ConfidenceLevelType } from "@root/types";

export const getConfidenceLevelStorage = () => {
  const storage = localStorage.getItem("confidenceLevels");
  const result = storage ? JSON.parse(storage) : storage;
  return result;
};

export const getConfidenceLevelStorageByDeckId = (deckId: string) => {
  const storage = localStorage.getItem("confidenceLevels");
  const result = storage
    ? JSON.parse(storage).filter(
        (item: ConfidenceLevelType) => item.deckId === deckId
      )
    : storage;
  return result;
};

export const updateConfidenceLevelStorage = (
  deckId: string,
  cardId: string,
  value: string
) => {
  let confidenceLevel = { deckId, cardId, value };
  let storage: object[] = [];
  // if confidence levels exist as local storage item, update accordingly; else create storage and set initial item
  if (localStorage.getItem("confidenceLevels")) {
    // if item already exists inside of local storage and conf level is same, nothing needed
    // else if item exists, update with new value
    // else push onto end of array
    let result = getConfidenceLevelStorage();
    const index = result.findIndex(
      (item: { cardId: string }) => item.cardId === cardId
    );
    const noUpdateNeeded = index !== -1 && result[index].value === value;
    if (noUpdateNeeded) {
      return -1;
    } else if (index !== -1) {
      result[index] = { deckId, cardId, value };
      storage = [...result];
    } else {
      storage = [...result];
      storage.push(confidenceLevel);
    }
    localStorage.setItem("confidenceLevels", JSON.stringify(storage));
  } else {
    storage.push(confidenceLevel);
    localStorage.setItem("confidenceLevels", JSON.stringify(storage));
  }
};
