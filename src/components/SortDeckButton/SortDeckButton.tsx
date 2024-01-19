import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaSort } from "react-icons/fa6";
import { useState } from "react";
import styles from "./SortDeckButton.module.scss";

export const SortDeckButton = () => {
  const [selection, setSelection] = useState({
    confidenceAsc: false,
    confidenceDesc: false,
    clueAsc: false,
    clueDesc: false,
  });

  const handleSelect = (e: React.MouseEvent) => {
    const id = e.currentTarget.id;
    setSelection((prev) => {
      return {
        confidenceAsc: false,
        confidenceDesc: false,
        clueAsc: false,
        clueDesc: false,
        [id]: true,
      };
    });
  };

  return (
    <ButtonWithDropdown icon={FaSort} context="sort">
      <div className={styles.container}>
        <div className={styles.heading}>Sort By:</div>
        <ul className={styles.list}>
          <li
            id="confidenceAsc"
            className={selection.confidenceAsc ? `${styles.selected}` : ""}
            onClick={handleSelect}
          >
            Confidence (low to high)
          </li>
          <li
            id="confidenceDesc"
            className={selection.confidenceDesc ? `${styles.selected}` : ""}
            onClick={handleSelect}
          >
            Confidence (high to low)
          </li>
          <li
            id="clueAsc"
            className={selection.clueAsc ? `${styles.selected}` : ""}
            onClick={handleSelect}
          >
            Clue (A-Z)
          </li>
          <li
            id="clueDesc"
            className={selection.clueDesc ? `${styles.selected}` : ""}
            onClick={handleSelect}
          >
            Clue (Z-A)
          </li>
        </ul>
      </div>
    </ButtonWithDropdown>
  );
};
