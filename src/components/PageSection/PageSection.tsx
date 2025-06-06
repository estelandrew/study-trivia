import { luckiestGuy } from "@utils/fonts";
import styles from "./PageSection.module.scss";

type Props = {
  children: React.ReactNode;
  headerText: string;
};

const PageSection = ({ children, headerText }: Props) => {
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
