import { useContext, useState } from "react";
import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaFilter } from "react-icons/fa";
import styles from "./FilterDeckButton.module.scss";
import Button from "@components/Button/Button";
import { CardsContext } from "@root/src/hooks/useCardsContext";
import { DeckviewToolbarContext } from "@components/DeckViewToolbar/DeckViewToolbar";

export const FilterDeckButton = () => {
  const { cards, filterCards } = useContext(CardsContext);
  const { toggleDropdown } = useContext(DeckviewToolbarContext);
  const [selections, setSelections] = useState({
    unevaluated: false,
    low: false,
    medium: false,
    high: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setSelections((prev) => {
      return {
        ...prev,
        [target.id]: target.checked,
      };
    });
  };

  const onClickApply = () => {
    toggleDropdown("filter");
    filterCards(selections);
  };

  return (
    <ButtonWithDropdown icon={FaFilter} context="filter">
      <div className={styles.container}>
        <div className={styles.heading}>Confidence Levels:</div>
        <div className={styles.filters}>
          <div className={styles.labelWrapper}>
            <input
              type="checkbox"
              id="unevaluated"
              name="unevaluated"
              value="unevaluated"
              checked={selections.unevaluated}
              onChange={handleChange}
            />
            <div>Unevaluted</div>{" "}
            <div>
              <div
                className={`${styles.square} ${styles.squareUnevaluated}`}
              ></div>
            </div>
          </div>
          <div className={styles.labelWrapper}>
            <input
              type="checkbox"
              id="low"
              name="low"
              value="low"
              checked={selections.low}
              onChange={handleChange}
            />
            <div>Low</div>{" "}
            <div>
              <div className={`${styles.square} ${styles.squareLow}`}></div>
            </div>
          </div>
          <div className={styles.labelWrapper}>
            <input
              type="checkbox"
              id="medium"
              name="medium"
              value="medium"
              checked={selections.medium}
              onChange={handleChange}
            />
            <div>Medium </div>
            <div>
              <div className={`${styles.square} ${styles.squareMedium}`}></div>
            </div>
          </div>
          <div className={styles.labelWrapper}>
            <input
              type="checkbox"
              id="high"
              name="high"
              value="high"
              checked={selections.high}
              onChange={handleChange}
            />
            <div>High</div>
            <div>
              <div className={`${styles.square} ${styles.squareHigh}`}></div>
            </div>
          </div>
          <br />
          <div id="apply-filter-button">
            <Button onClick={onClickApply}>Apply</Button>
          </div>
        </div>
      </div>
    </ButtonWithDropdown>
  );
};
