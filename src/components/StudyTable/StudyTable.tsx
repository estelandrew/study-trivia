"use client";

import { useState, useMemo, useEffect } from "react";
import { FaUndo } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import useStudyTable from "./useStudyTable";
import { Props } from "./StudyTable.types";
import styles from "./StudyTable.module.scss";
import { UIEntry } from "@/context/EntriesTableContext/EntriesTableContext.types";

const HeadingRow = () => {
  return (
    <div className={styles.headingRow}>
      <div className={styles.cell}>Clue</div>
      <div className={styles.cell}>Answer</div>
    </div>
  );
};

const Row = ({
  entry,
  toggleIsLearned,
}: {
  entry: UIEntry;
  toggleIsLearned: (isLearned: boolean, entryId: number) => void;
}) => {
  const { clue, answer, isLearned, id } = entry;
  const [isRevealed, setIsRevealed] = useState(false);
  const showAnswer = useMemo(() => {
    let result: boolean;
    if (isLearned || isRevealed) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isRevealed, isLearned]);

  const handleToggleIsLearned = (isEntryLearned: boolean) => {
    toggleIsLearned(isEntryLearned, entry.id);
    // reset revealed status if marking as not learned
    if (isEntryLearned) {
      setIsRevealed(false);
    }
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={id}
        initial={{ opacity: 0, x: -50 }} // Start invisible & shifted
        animate={{ opacity: 1, x: 0 }} // Animate to position
        exit={{ opacity: 0, x: 50 }} // Animate out
        transition={{ duration: 0.2 }}
        layout
        className={styles.row}
      >
        <div
          className={`${styles.cell} ${styles.clue} ${isLearned && styles.isLearned}`}
        >
          {clue}
        </div>
        <div
          className={`${styles.cell} ${styles.answer} ${showAnswer && styles.isRevealed} ${isLearned && styles.isLearned}`}
          onClick={() => setIsRevealed(!isRevealed)}
        >
          {showAnswer ? answer : "Reveal Answer"}
        </div>
        <div
          className={`${styles.cell} ${styles.icon} ${isLearned && styles.isLearned}`}
          onClick={() => handleToggleIsLearned(isLearned)}
        >
          {isLearned ? <FaUndo /> : <FaRegCircleCheck />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const CollectionStudyTable = ({ collectionJoinEntries }: Props) => {
  const { visibleEntries, toggleIsLearned } = useStudyTable(
    collectionJoinEntries,
  );
  return (
    <div className={styles.table}>
      <HeadingRow />
      {visibleEntries.map((entry) => (
        <Row key={entry.id} entry={entry} toggleIsLearned={toggleIsLearned} />
      ))}
    </div>
  );
};

export default CollectionStudyTable;
