import styles from "./Search.module.scss";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <form action="/action_page.php">
      <div className={styles.formContainer}>
        <input type="text" placeholder="Search..." name="search" />

        <button type="submit">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default Search;
