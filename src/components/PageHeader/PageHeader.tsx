import styles from "./PageHeader.module.scss";

type Props = {
  text: string;
  description?: string;
  categorySlug?: string;
};

export const PageHeader = ({ text, description, categorySlug }: Props) => {
  return (
    <div className={`${styles.container} ${styles[`${categorySlug}`]}`}>
      <h3 className={`${styles.text}`}>{text}</h3>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
};

export default PageHeader;
