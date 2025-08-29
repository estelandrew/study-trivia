import Link from "next/link";
import { luckiestGuy } from "@utils/fonts";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={`${luckiestGuy.className} ${styles.container}`}>
      <Link href="/">
        <div>Study</div>
        <div className={`${styles.fancyLetter} ${styles.t} purple-card`}>T</div>
        <div className={`${styles.fancyLetter} ${styles.r}`}>R</div>
        <div className={`${styles.fancyLetter} ${styles.i}`}>I</div>
        <div className={`${styles.fancyLetter} ${styles.v}`}>V</div>
        <div className={`${styles.fancyLetter} ${styles.i2}`}>I</div>
        <div className={`${styles.fancyLetter} ${styles.a}`}>A</div>
      </Link>
    </div>
  );
};

export default Logo;
