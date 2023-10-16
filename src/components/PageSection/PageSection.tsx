import styles from "./PageSection.module.scss";
import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  headerText: string;
};

export const PageSection = ({ children, headerText }: Props) => {
  return (
    <div className={`${styles.container}`}>
      <h3 className={`${luckiestGuy.className} ${styles.header}`}>
        {headerText}
      </h3>
      {children}
    </div>
  );
};

export default PageSection;
