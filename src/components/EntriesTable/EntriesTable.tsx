"use client";

import { luckiestGuy } from "@utils/fonts";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useEntriesTable } from "@/context/EntriesTableContext";
import EntriesTableRow from "../EntriesTableRow/EntriesTableRow";
import { Props } from "./EntriesTable.types";
import styles from "./EntriesTable.module.scss";

const EntriesTable = ({ collectionJoinEntries }: Props) => {
  const { state } = useEntriesTable();
  return (
    <div className={styles.container}>
      <h2 className={`${luckiestGuy.className}`}>
        {collectionJoinEntries.name}
      </h2>
      <div className={styles.description}>
        {collectionJoinEntries.description}
      </div>
      <Toolbar collectionJoinEntries={collectionJoinEntries} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Clue</th>
            <th colSpan={2}>Answer</th>
            {/* <th>Learned</th> */}
          </tr>
        </thead>
        <tbody>
          {state.entries.map((entry) => (
            <EntriesTableRow
              key={entry.id}
              clue={entry.clue}
              answer={entry.answer}
              collectionId={collectionJoinEntries.id}
              entryId={entry.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
