"use client";

import { createContext, useState } from "react";
import styles from "./DeckViewToolbar.module.scss";
import { FilterDeckButton } from "@components/FilterDeckButton/FilterDeckButton";
import { SortDeckButton } from "@components/SortDeckButton/SortDeckButton";
import { ShuffleDeckButton } from "@components/ShuffleDeckButton/ShuffleDeckButton";

type DropdownOpenStateType = {
  filter: boolean;
  sort: boolean;
  shuffle: boolean;
};

type ToolbarStatusType = {
  sort: string;
};

type ToolbarContextType = {
  dropdownOpenState: DropdownOpenStateType;
  setDropdownOpenState: React.Dispatch<
    React.SetStateAction<DropdownOpenStateType>
  >;
  toggleDropdown: (context: string) => void;
  toolbarStatus: ToolbarStatusType;
  setToolbarStatus: React.Dispatch<React.SetStateAction<ToolbarStatusType>>;
};

export const DeckviewToolbarContext = createContext<ToolbarContextType>(
  {} as ToolbarContextType
);

const DeckViewToolbar = () => {
  const [dropdownOpenState, setDropdownOpenState] =
    useState<DropdownOpenStateType>({
      filter: false,
      sort: false,
      shuffle: false,
    });
  const [toolbarStatus, setToolbarStatus] = useState<ToolbarStatusType>({
    sort: "",
  });

  const toggleDropdown = (context: string) => {
    setDropdownOpenState((prev: DropdownOpenStateType) => {
      return {
        filter: false,
        sort: false,
        shuffle: false,
        [context]: !prev[context as keyof typeof dropdownOpenState],
      };
    });
  };
  return (
    <DeckviewToolbarContext.Provider
      value={{
        dropdownOpenState,
        setDropdownOpenState,
        toggleDropdown,
        toolbarStatus,
        setToolbarStatus,
      }}
    >
      <div className={styles.toolbar}>
        <FilterDeckButton />
        <SortDeckButton />
        <ShuffleDeckButton />
      </div>
    </DeckviewToolbarContext.Provider>
  );
};

export default DeckViewToolbar;
