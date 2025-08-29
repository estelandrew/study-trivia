import { luckiestGuy } from "@utils/fonts";
import { Props } from "./PageSection.types";
import styles from "./PageSection.module.scss";

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
