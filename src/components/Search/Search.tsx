import styles from "./Search.module.scss";
import { FaSearch } from "react-icons/fa";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Search = () => {
  return (
    <form action="/action_page.php">
      <div className={styles.formContainer}>
        <input
          className={rubik.className}
          type="text"
          placeholder="Search..."
          name="search"
        />

        <button type="submit">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default Search;
