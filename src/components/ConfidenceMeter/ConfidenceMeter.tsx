"use client";

import { useState } from "react";
import styles from "./ConfidenceMeter.module.scss";
import { DisplayCardType } from "../../../types";
import { updateConfidenceLevelStorage } from "@lib/localStorage";

type PropsType = {
  card: DisplayCardType;
};

export const ConfidenceMeter = ({ card }: PropsType) => {
  const { id, confidenceLevel } = card;
  const [currentConfidenceLevel, setCurrentConfidenceLevel] =
    useState<string>(confidenceLevel);
  const [tempConfidenceLevel, setTempConfidenceLevel] = useState<string>("");

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
    updateConfidenceLevelStorage(id, newConfidenceLevel);
    setCurrentConfidenceLevel(newConfidenceLevel);
  };

  return (
    <div
      className={`${styles.container} ${
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
        className={styles.notchWrapper}
        onMouseOver={() => handleOnMouseOver("low-temp")}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
        onClick={(e) => handleNotchClick(e)}
      >
        <div className={`${styles.notch} ${styles.notchLow}`}></div>
      </div>
      <div
        id="notch-2"
        className={styles.notchWrapper}
        onMouseOver={() => handleOnMouseOver("medium-temp")}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
        onClick={(e) => handleNotchClick(e)}
      >
        <div className={`${styles.notch} ${styles.notchMedium}`}></div>
      </div>
      <div
        id="notch-3"
        className={styles.notchWrapper}
        onMouseOver={() => handleOnMouseOver("high-temp")}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
        onClick={(e) => handleNotchClick(e)}
      >
        <div className={`${styles.notch} ${styles.notchHigh}`}></div>
      </div>
    </div>
  );
};
