import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";

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
