import styles from "./style.module.scss";
import Search from "./search/Search";
import Ad from "./productAd/Ad";

const ProductSearch = () => {
  return (
    <section className={styles.productSearch}>
      <Search />
      <Ad />
    </section>
  );
};

export default ProductSearch;
