import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface PropsType {
  children: ReactNode;
}

const Button = ({ children }: PropsType) => {
  return <div className={styles.container}>{children}</div>;
};

export default Button;
