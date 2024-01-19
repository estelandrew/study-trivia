import {
  ReactNode,
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import styles from "./ButtonWithDropdown.module.scss";
import { IconType } from "react-icons";
import { DeckviewToolbarContext } from "@components/DeckViewToolbar/DeckViewToolbar";

type PropsType = {
  icon: IconType;
  context: string;
  label?: string;
  children: ReactNode;
};

enum DropDownStates {
  Visible = "visible",
  Hidden = "hidden",
}

const ButtonWithDropdown = ({
  icon: Icon,
  context,
  children,
  label,
}: PropsType) => {
  const { dropdownOpenState, setDropdownOpenState, toggleDropdown } =
    useContext(DeckviewToolbarContext);
  const dropDownContainer = useRef<HTMLDivElement>(null);
  const [dropdownVisibility, setDropdownVisibility] = useState<DropDownStates>(
    DropDownStates.Hidden
  );

  const handleOuterClick = useCallback(
    (e: MouseEvent) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(e.target as Node)
      ) {
        setDropdownOpenState({
          sort: false,
          filter: false,
        });
      }
    },
    [setDropdownOpenState]
  );

  useEffect(() => {
    if (
      dropdownOpenState &&
      dropdownOpenState[context as keyof typeof dropdownOpenState]
    ) {
      setDropdownVisibility(DropDownStates.Visible);
    } else {
      setDropdownVisibility(DropDownStates.Hidden);
    }
  }, [dropdownOpenState, context]);

  useEffect(() => {
    return () => window.removeEventListener("click", handleOuterClick);
  }, [setDropdownOpenState, handleOuterClick]);

  useEffect(() => {
    if (dropdownVisibility === DropDownStates.Hidden) {
      return;
    }
    window.addEventListener("click", handleOuterClick);
    // clean up
    return () => window.removeEventListener("click", handleOuterClick);
  }, [dropdownVisibility, setDropdownOpenState, handleOuterClick]);

  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    toggleDropdown(context);
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer} onClick={handleButtonClick}>
        <Icon />
        {label}
      </div>
      <div
        ref={dropDownContainer}
        className={`${styles.dropdownContainer} ${styles[dropdownVisibility]}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ButtonWithDropdown;
