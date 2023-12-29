import { ReactNode, useRef, useState, useEffect } from "react";
import styles from "./ButtonWithDropdown.module.scss";
import { IconType } from "react-icons";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { DeckViews } from "@root/types";

type PropsType = {
  text: string;
  icon: IconType;
  label: string;
  children: ReactNode;
  currentView: {
    type: DeckViews;
  };
};

enum DropDownStates {
  Visible = "visible",
  Hidden = "hidden",
}

const ButtonWithDropdown = ({
  text,
  icon: Icon,
  children,
  label,
  currentView,
}: PropsType) => {
  const dropDownContainer = useRef<HTMLDivElement>(null);
  const [dropDownState, setDropdownState] = useState<DropDownStates>(
    DropDownStates.Hidden
  );

  useEffect(() => {
    setDropdownState(DropDownStates.Hidden);
  }, [currentView]);

  useEffect(() => {
    if (dropDownState === DropDownStates.Hidden) {
      return;
    }
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target as Node)
      ) {
        setDropdownState(DropDownStates.Hidden);
      }
    }
    window.addEventListener("click", handleOutsideClick);
    // clean up
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [dropDownState]);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDropdownState((prev) => {
      const newState =
        prev === DropDownStates.Hidden
          ? DropDownStates.Visible
          : DropDownStates.Hidden;
      return newState;
    });
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer} onClick={toggleDropdown}>
        <Icon /> &nbsp;
        {label}&nbsp;
        {dropDownState === DropDownStates.Hidden ? (
          <MdExpandMore />
        ) : (
          <MdExpandLess />
        )}
      </div>
      <div
        ref={dropDownContainer}
        className={`${styles.dropdownContainer} ${styles[dropDownState]}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ButtonWithDropdown;
