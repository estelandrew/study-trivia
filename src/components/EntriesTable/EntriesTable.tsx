"use client";

import { AnimatePresence } from "motion/react";
import { luckiestGuy } from "@utils/fonts";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useEntriesTableContext } from "@/context/EntriesTableContext/EntriesTableContext";
import { Views } from "@/types/types";
import EntriesTableRow from "../EntriesTableRow/EntriesTableRow";
import { Props } from "./EntriesTable.types";
import styles from "./EntriesTable.module.scss";

const EntriesTable = ({ collectionJoinEntries }: Props) => {
  const { currentView, visibleEntries } = useEntriesTableContext();
  return (
    <div className={styles.container}>
      <h2 className={`${luckiestGuy.className}`}>
        {collectionJoinEntries.name}
      </h2>
      <div className={styles.description}>
        {collectionJoinEntries.description}
      </div>
      <Toolbar />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Clue</th>
            <th colSpan={2}>Answer</th>
          </tr>
        </thead>
        <tbody>
          {/* need to mount/unmount AnimatePresence when view changes to achieve desired entry animation, hence the mostly repeating code below */}
          {currentView === Views.Remaining && (
            <AnimatePresence>
              {visibleEntries.map((entry) => (
                <EntriesTableRow
                  key={`${entry.id}_remaining`}
                  clue={entry.clue}
                  answer={entry.answer}
                  entryId={entry.id}
                  isLearned={entry.isLearned}
                  view={Views.Remaining}
                />
              ))}
            </AnimatePresence>
          )}
          {currentView === Views.Learned && (
            <AnimatePresence>
              {visibleEntries.map((entry) => (
                <EntriesTableRow
                  key={`${entry.id}_learned`}
                  clue={entry.clue}
                  answer={entry.answer}
                  entryId={entry.id}
                  isLearned={entry.isLearned}
                  view={Views.Learned}
                />
              ))}
            </AnimatePresence>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
