import { ReactNode, useRef, useState, useEffect } from "react";
import styles from "./ButtonWithDropdown.module.scss";
import { IconType } from "react-icons";

type PropsType = {
  icon: IconType;
  idForToggle: string;
  label?: string;
  children: ReactNode;
};

enum DropDownStates {
  Visible = "visible",
  Hidden = "hidden",
}

const ButtonWithDropdown = ({
  icon: Icon,
  idForToggle, // see note in last useEffect
  children,
  label,
}: PropsType) => {
  const dropDownContainer = useRef<HTMLDivElement>(null);
  const [dropDownState, setDropdownState] = useState<DropDownStates>(
    DropDownStates.Hidden
  );

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

  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    toggleDropdown();
    e.stopPropagation();
  };

  const toggleDropdown = () => {
    setDropdownState((prev) => {
      const newState =
        prev === DropDownStates.Hidden
          ? DropDownStates.Visible
          : DropDownStates.Hidden;
      return newState;
    });
  };

  useEffect(() => {
    setDropdownState(DropDownStates.Hidden);
    // take the id past in from state and attach toggleDropdown on click
    // this allows for closing the dropdown from outside of this component
    const clickableEl = document.querySelector(`#${idForToggle}`);
    clickableEl?.addEventListener("click", toggleDropdown);
  }, [idForToggle]);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer} onClick={handleButtonClick}>
        <Icon />
        {label}
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
