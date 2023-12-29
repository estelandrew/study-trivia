"use client";

import { useState } from "react";
import { DeckViews } from "@root/types";
import { type } from "os";

type CurrentViewType = {
  type: DeckViews;
};

export const useToolbar = () => {
  const [currentView, setCurrentView] = useState<CurrentViewType>({
    type: DeckViews.Table,
  });

  const toggleView = (viewType: DeckViews) => {
    setCurrentView({ type: viewType });
  };

  return { currentView, toggleView };
};
