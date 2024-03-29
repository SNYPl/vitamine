import styles from "./style.module.scss";
import BurgerMenu from "./burgerMenu/BurgerMenu";
import ProductSearch from "./productSearch/ProductSearch";

const ProductMenu = () => {
  return (
    <section className={styles.productMenu}>
      <BurgerMenu activeMenu />
      <ProductSearch />
    </section>
  );
};

export default ProductMenu;
