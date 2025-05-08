import styles from "./PageSection.module.scss";
import { luckiestGuy } from "@utils/fonts";

type Props = {
  children: React.ReactNode;
  headerText: string;
};

export const PageSection = ({ children, headerText }: Props) => {
  return (
    <div className={`${styles.container}`}>
      <h3 className={`${styles.header} ${luckiestGuy.className}`}>
        {headerText}
      </h3>
      {children}
    </div>
  );
};

export default PageSection;
