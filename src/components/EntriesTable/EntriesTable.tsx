"use client";

import { AnimatePresence } from "motion/react";
import { luckiestGuy } from "@utils/fonts";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useEntriesTableContext } from "@/context/EntriesTableContext/EntriesTableContext";
import { Views } from "@/types/types";
import ContentWrapper from "@components/ContentWrapper/ContentWrapper";
import EntriesTableRow from "../EntriesTableRow/EntriesTableRow";
import { Props } from "./EntriesTable.types";
import styles from "./EntriesTable.module.scss";

const EntriesTable = ({ collectionJoinEntries }: Props) => {
  const { entries } = useEntriesTableContext();
  return (
    <div className={styles.container}>
      {/* <Toolbar /> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Clue</th>
            <th colSpan={2}>Answer</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {entries.map((entry) => (
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
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
