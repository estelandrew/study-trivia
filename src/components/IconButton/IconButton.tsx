import styles from "./IconButton.module.scss";

type PropsType = {
  Icon: JSX.Element;
};

export const IconButton = ({ Icon }: PropsType) => {
  return <div className={`${styles.container}`}>{Icon}</div>;
};
