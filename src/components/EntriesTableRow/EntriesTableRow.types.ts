import { Views } from "@/types/types";

export type Props = {
  clue: string;
  answer: string;
  entryId: number;
  isLearned: boolean;
  view: Views;
};
