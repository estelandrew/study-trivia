import { useState } from "react";
import styles from "./CardAnswer.module.scss";
import { IconButton } from "@components/IconButton/IconButton";
import { FaUndoAlt } from "react-icons/fa";

interface PropsType {
  answer: string;
}

const RevealButton = ({ onClickReveal }: { onClickReveal: () => void }) => {
  return (
    <div className={styles.buttonContainer} onClick={onClickReveal}>
      Reveal Answer
    </div>
  );
};

const Answer = ({
  value,
  onClickReset,
}: {
  value: string;
  onClickReset: () => void;
}) => {
  return (
    <div className={styles.answerContainer} onClick={onClickReset}>
      <div className={styles.resetButton}>
        <IconButton Icon={<FaUndoAlt />} />
      </div>
      <div className={styles.answer}>{value}</div>
    </div>
  );
};

const CardAnswer = ({ answer }: PropsType) => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  return (
    <>
      {isRevealed ? (
        <Answer value={answer} onClickReset={() => setIsRevealed(false)} />
      ) : (
        <RevealButton onClickReveal={() => setIsRevealed(true)} />
      )}
    </>
  );
};

export default CardAnswer;
