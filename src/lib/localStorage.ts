export const getLearnedEntries = () => {
  const storage = localStorage.getItem("learned-entries");
  const result = storage ? JSON.parse(storage) : storage;
  return result;
};
