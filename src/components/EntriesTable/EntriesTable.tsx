"use client";

import { luckiestGuy } from "@utils/fonts";
import EntriesTableRow from "../EntriesTableRow/EntriesTableRow";
import { Props } from "./EntriesTable.types";
import styles from "./EntriesTable.module.scss";

const EntriesTable = ({ collectionJoinEntries }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={`${luckiestGuy.className}`}>
        {collectionJoinEntries.name}
      </h2>
      <div className={styles.description}>
        {collectionJoinEntries.description}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Clue</th>
            <th colSpan={2}>Answer</th>
            {/* <th>Learned</th> */}
          </tr>
        </thead>
        <tbody>
          {collectionJoinEntries.entries.map((entry, i) => (
            <EntriesTableRow key={i} clue={entry.clue} answer={entry.answer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
