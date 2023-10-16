import styles from "./IconButton.module.scss";

type PropsType = {
  slug: string;
  Icon: JSX.Element;
};

export const IconButton = ({ slug, Icon }: PropsType) => {
  return <div className={`${styles.container} ${slug}`}>{Icon}</div>;
};
