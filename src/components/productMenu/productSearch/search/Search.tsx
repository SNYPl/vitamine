import styles from "./style.module.scss";
import Button from "@/components/button/Button";

const Search = () => {
  return (
    <section className={styles.search}>
      <input type="text" placeholder="what you need" />
      <Button>Search</Button>
    </section>
  );
};

export default Search;
