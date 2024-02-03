import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import styles from "./page.module.css";
import Search from "@/components/productMenu/productSearch/search/Search";
import ShopComponent from "@/components/shopPage/Shop";

export default function Shop() {
  return (
    <main className={styles.shop}>
      <div className={"container"}>
        <div className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </div>
        <ShopComponent />
      </div>
    </main>
  );
}
