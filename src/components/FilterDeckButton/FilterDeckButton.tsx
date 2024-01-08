import ButtonWithDropdown from "@components/ButtonWithDropdown/ButtonWithDropdown";
import { FaFilter } from "react-icons/fa";
import styles from "./FilterDeckButton.module.scss";
import Button from "@components/Button/Button";

export const FilterDeckButton = () => {
  return (
    <ButtonWithDropdown icon={FaFilter}>
      <div>
        <div className={styles.heading}>Filter by confidence:</div>
        <div className={styles.filters}>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label htmlFor="vehicle1"> I have a bike</label>
          <br />
          <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
          <label htmlFor="vehicle2"> I have a car</label>
          <br />
          <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
          <label htmlFor="vehicle3"> I have a boat</label>
          <br />
        </div>
        <Button>Apply</Button>
      </div>
    </ButtonWithDropdown>
  );
};
