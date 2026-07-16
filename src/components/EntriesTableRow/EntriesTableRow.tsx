import { useState, useMemo } from "react";
import { FaUndo } from "react-icons/fa";
import { FaRegSquare, FaUserGraduate, FaRegCircleCheck } from "react-icons/fa6";
import { motion } from "motion/react";
import { useEntriesTableContext } from "@/context/EntriesTableContext/EntriesTableContext";
import { Views } from "@/types/types";
import { Props } from "./EntriesTableRow.types";
import styles from "./EntriesTableRow.module.scss";

const EntriesTableRow = ({ clue, answer, entryId, isLearned, view }: Props) => {
  const { currentView, setEntries, toggleIsLearned } = useEntriesTableContext();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const showAnswer = useMemo(() => {
    let result: boolean;
    if (isLearned || isRevealed) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isRevealed, isLearned]);

  const toggleRevealed = () => {
    setIsRevealed(!isRevealed);
  };

  const handlToggleIsLearned = (isEntryLearned: boolean) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? { ...entry, isLearned: !entry.isLearned }
          : entry,
      ),
    );
    toggleIsLearned(isEntryLearned, entryId);
    // reset revealed status if marking as not learned
    if (isEntryLearned) {
      setIsRevealed(false);
    }
  };

  const NotLearnedRow = () => {
    return (
      <>
        <td>{clue}</td>
        <td
          className={`${styles.answerContainer} ${currentView !== Views.Remaining ? `${styles.defaultCursor}` : ``}`}
          onClick={toggleRevealed}
        >
          {showAnswer ? (
            <div className={styles.answer}>{answer}</div>
          ) : (
            <div className={styles.concealer}>Reveal answer</div>
          )}
        </td>
        <td
          className={styles.learnedCell}
          onClick={() => handlToggleIsLearned(isLearned)}
        >
          <FaRegCircleCheck className={styles.icon} />
        </td>
      </>
    );
  };

  const LearnedRow = () => {
    return (
      <>
        <td>
          <s className={styles.strike}>{clue}</s>
        </td>
        <td
          className={`${styles.answerContainer} ${currentView !== Views.Remaining ? `${styles.defaultCursor}` : ``}`}
          onClick={toggleRevealed}
        >
          <s className={styles.strike}>
            <div className={styles.answer}>{answer}</div>
          </s>
        </td>
        <td
          className={styles.learnedCell}
          onClick={() => handlToggleIsLearned(isLearned)}
        >
          <FaUndo className={styles.icon} />
        </td>
      </>
    );
  };

  return (
    <motion.tr
      key={entryId}
      initial={{ opacity: 0, x: -50 }} // Start invisible & shifted
      animate={{ opacity: 1, x: 0 }} // Animate to position
      exit={{ opacity: 0, x: 50 }} // Animate out
      transition={{ duration: 0.2 }}
      layout
    >
      {isLearned ? <LearnedRow /> : <NotLearnedRow />}
    </motion.tr>
  );
};

export default EntriesTableRow;
