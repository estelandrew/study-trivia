import styles from "./RevealAnswerButton.module.scss";
import { DisplayCardType } from "../../../types";

export const RevealAnswerButton = ({
  slug,
  i,
  updateCardIsRevealed,
}: {
  slug: string;
  i: number;
  updateCardIsRevealed: (i: number) => void;
}) => {
  return (
    <div
      className={styles.revealButtonContainer}
      onClick={() => updateCardIsRevealed(i)}
    >
      <div className={`${styles.revealButton} ${slug}`}>Reveal</div>
    </div>
  );
};
