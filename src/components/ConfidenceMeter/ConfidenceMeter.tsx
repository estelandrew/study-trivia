"use client";

import { useState, useEffect } from "react";
import styles from "./ConfidenceMeter.module.scss";
import { CardDataType } from "../../../types";
import { updateConfidenceLevelStorage } from "@lib/localStorage";
import { ConfidenceLevelStorageType } from "../../../types";

type PropsType = {
  cardId: string;
  confidenceLevelStorage: ConfidenceLevelStorageType;
};

export const ConfidenceMeter = ({
  cardId,
  confidenceLevelStorage,
}: PropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentConfidenceLevel, setCurrentConfidenceLevel] = useState<
    string | null
  >(null);
  const [tempConfidenceLevel, setTempConfidenceLevel] = useState<string>("");

  useEffect(() => {
    if (confidenceLevelStorage && confidenceLevelStorage.length) {
      const index = confidenceLevelStorage.findIndex(
        (item) => item.id === cardId
      );
      if (index !== -1) {
        const item = confidenceLevelStorage[index];
        setCurrentConfidenceLevel(item.value);
      }
    }
    setIsLoading(false);
  }, [confidenceLevelStorage, cardId]);

  const handleOnMouseOver = (level: string) => {
    setTempConfidenceLevel(level);
  };

  const handleOnMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const theDiv = e.currentTarget;
    theDiv.parentElement?.classList.remove("selected");
    setTempConfidenceLevel("");
  };

  const handleNotchClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const theDiv = e.currentTarget;
    const theId = theDiv.id;
    const confidenceLevelNum = theId.replace("notch-", "");
    let newConfidenceLevel;
    switch (confidenceLevelNum) {
      case "1":
        newConfidenceLevel = "low";
        break;
      case "2":
        newConfidenceLevel = "medium";
        break;
      case "3":
        newConfidenceLevel = "high";
        break;
      default:
        newConfidenceLevel = "default";
    }
    theDiv.parentElement?.classList.add(styles["selected"]);
    updateConfidenceLevelStorage(cardId, newConfidenceLevel);
    setCurrentConfidenceLevel(newConfidenceLevel);
  };

  return (
    <div
      className={`${styles.container} ${isLoading && styles.loading} ${
        styles[
          `${
            tempConfidenceLevel
              ? `${tempConfidenceLevel}`
              : `${currentConfidenceLevel}`
          }`
        ]
      }`}
    >
      <div
        id="notch-1"
        className={`${styles.notchWrapper} ${styles.notchWrapperLow}`}
        onMouseOver={() => handleOnMouseOver("low-temp")}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
        onClick={(e) => handleNotchClick(e)}
      >
        <div className={`${styles.notch} ${styles.notchLow}`}></div>
        <div className={styles.loadingAnimation}></div>
      </div>
      <div
        id="notch-2"
        className={`${styles.notchWrapper} ${styles.notchWrapperMedium}`}
        onMouseOver={() => handleOnMouseOver("medium-temp")}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
        onClick={(e) => handleNotchClick(e)}
      >
        <div className={`${styles.notch} ${styles.notchMedium}`}></div>
        <div className={styles.loadingAnimation}></div>
      </div>
      <div
        id="notch-3"
        className={`${styles.notchWrapper} ${styles.notchWrapperHigh}`}
        onMouseOver={() => handleOnMouseOver("high-temp")}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
        onClick={(e) => handleNotchClick(e)}
      >
        <div className={`${styles.notch} ${styles.notchHigh}`}></div>
        <div className={styles.loadingAnimation}></div>
      </div>
    </div>
  );
};
