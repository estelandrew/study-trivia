import styles from "./Logo.module.scss";
import { Luckiest_Guy } from "next/font/google";
import Link from "next/link";

const luckiestGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

export const Logo = () => {
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
