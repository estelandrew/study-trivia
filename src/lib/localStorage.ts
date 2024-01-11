import { CardDataType } from "../../types";

export const getConfidenceLevelStorage = () => {
  const storage = localStorage.getItem("confidenceLevels");
  const result = storage ? JSON.parse(storage) : storage;
  return result;
};

export const updateConfidenceLevelStorage = (id: string, value: string) => {
  let confidenceLevel = { id, value };
  let storage: object[] = [];
  // if confidence levels exist as local storage item, update accordingly; else create storage and set initial item
  if (localStorage.getItem("confidenceLevels")) {
    // if item already exists inside of local storage and conf level is same, nothing needed
    // else if item exists, update with new value
    // else push onto end of array
    let result = getConfidenceLevelStorage();
    const index = result.findIndex((item: { id: string }) => item.id === id);
    const noUpdateNeeded =
      index !== -1 && result[index].confidenceLevel === confidenceLevel;
    if (noUpdateNeeded) {
      return -1;
    } else if (index !== -1) {
      result[index] = { id, confidenceLevel };
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
