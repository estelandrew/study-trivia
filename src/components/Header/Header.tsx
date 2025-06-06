import Logo from "@components/Logo/Logo";
import Nav from "@components/Nav/Nav";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.headerItem}>
        <Logo />
      </div>
      <div className={styles.headerItem}>
        <nav>
          <Nav />
        </nav>
      </div>
    </div>
  );
};

export default Header;
