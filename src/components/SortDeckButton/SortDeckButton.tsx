import { useContext } from "react";
import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaSort } from "react-icons/fa6";
import { useState } from "react";
import styles from "./SortDeckButton.module.scss";
import { CardsContext } from "@root/src/hooks/useCardsContext";
import { DeckviewToolbarContext } from "@components/DeckViewToolbar/DeckViewToolbar";

export const SortDeckButton = () => {
  const { sortCards, toolbarStatus, setToolbarStatus } =
    useContext(CardsContext);
  const { toggleDropdown } = useContext(DeckviewToolbarContext);
  // const [selection, setSelection] = useState({
  //   confidenceAsc: false,
  //   confidenceDesc: false,
  //   clueAsc: false,
  //   clueDesc: false,
  // });

  const handleSelect = (e: React.MouseEvent) => {
    const id = e.currentTarget.id;
    setToolbarStatus((prev) => {
      return {
        ...prev,
        sortType: id,
      };
    });
    // setSelection((prev) => {
    //   return {
    //     confidenceAsc: false,
    //     confidenceDesc: false,
    //     clueAsc: false,
    //     clueDesc: false,
    //     [id]: true,
    //   };
    // });
    sortCards(id);
    toggleDropdown("sort");
  };

  return (
    <ButtonWithDropdown icon={FaSort} context="sort">
      <div className={styles.container}>
        <div className={styles.heading}>Sort By:</div>
        <ul className={styles.list}>
          <li
            id="confidenceAsc"
            className={
              toolbarStatus.sortType === "confidenceAsc"
                ? `${styles.selected}`
                : ""
            }
            onClick={handleSelect}
          >
            Confidence (low to high)
          </li>
          <li
            id="confidenceDesc"
            className={
              toolbarStatus.sortType === "confidenceDesc"
                ? `${styles.selected}`
                : ""
            }
            onClick={handleSelect}
          >
            Confidence (high to low)
          </li>
          <li
            id="clueAsc"
            className={
              toolbarStatus.sortType === "clueAsc" ? `${styles.selected}` : ""
            }
            onClick={handleSelect}
          >
            Clue (A-Z)
          </li>
          <li
            id="clueDesc"
            className={
              toolbarStatus.sortType === "clueDesc" ? `${styles.selected}` : ""
            }
            onClick={handleSelect}
          >
            Clue (Z-A)
          </li>
        </ul>
      </div>
    </ButtonWithDropdown>
  );
};
