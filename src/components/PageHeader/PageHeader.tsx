import styles from "./PageHeader.module.scss";
import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

type Props = {
  text: string;
  description?: string;
  categorySlug?: string;
};

export const PageHeader = ({ text, description, categorySlug }: Props) => {
  return (
    <div className={`${styles.container} ${styles[`${categorySlug}`]}`}>
      <h3 className={`${luckiestGuy.className} ${styles.text}`}>{text}</h3>
      {description && <div>{description}</div>}
    </div>
  );
};

export default PageHeader;
