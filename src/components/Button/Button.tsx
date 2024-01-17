import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface PropsType {
  onClick: (e: React.MouseEvent) => void;
  children: ReactNode;
}

const Button = ({ onClick, children }: PropsType) => {
  return (
    <div onClick={onClick} className={styles.container}>
      {children}
    </div>
  );
};

export default Button;
