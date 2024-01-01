import { IconButton } from "@components/IconButton/IconButton";
import { DisplayCardType } from "../../../types";
import { FaUndoAlt } from "react-icons/fa";
import styles from "./RevealedAnswer.module.scss";

export const RevealedAnswer = ({
  card,
  i,
  updateCardIsRevealed,
  slug,
}: {
  card: DisplayCardType;
  i: number;
  updateCardIsRevealed: (i: number) => void;
  slug: string;
}) => {
  return (
    <div className={styles.container} onClick={() => updateCardIsRevealed(i)}>
      <div className={styles.resetButton}>
        <IconButton Icon={<FaUndoAlt />} />
      </div>
      <div className={styles.answer}>{card.answer}</div>
    </div>
  );
};
