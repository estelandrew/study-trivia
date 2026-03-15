import { useState, useMemo, useRef } from "react";
import { FiCheck } from "react-icons/fi";
import { FaRegSquare } from "react-icons/fa6";
import { motion } from "motion/react";
import { useEntriesTableContext } from "@/context/EntriesTableContext/EntriesTableContext";
import { Views } from "@/types/types";
import { Props } from "./EntriesTableRow.types";
import styles from "./EntriesTableRow.module.scss";

const EntriesTableRow = ({ clue, answer, entryId, isLearned, view }: Props) => {
  const { currentView, setEntries, toggleIsLearned } = useEntriesTableContext();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const exitX = useRef(0);

  if (view === Views.Remaining) {
    exitX.current = 50;
  } else {
    exitX.current = -50;
  }

  const showAnswer = useMemo(() => {
    let result: boolean;
    if (
      currentView === Views.Learned ||
      currentView === Views.Sheet ||
      isRevealed
    ) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [currentView, isRevealed]);

  const toggleRevealed = () => {
    if (currentView !== Views.Remaining) return -1;
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
  };

  return (
    <motion.tr
      key={entryId}
      initial={{ opacity: 0, x: -50 }} // Start invisible & shifted
      animate={{ opacity: 1, x: 0 }} // Animate to position
      exit={{ opacity: 0, x: exitX.current }} // Animate out
      transition={{ duration: 0.2 }}
      layout
    >
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

      {currentView !== Views.Sheet && (
        <td
          className={styles.learnedCell}
          onClick={() => handlToggleIsLearned(isLearned)}
        >
          <div className={styles.isLearnedCheck}>
            {currentView === Views.Remaining ? <FaRegSquare /> : <FiCheck />}
          </div>
        </td>
      )}
    </motion.tr>
  );
};

export default EntriesTableRow;
