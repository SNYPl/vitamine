import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import styles from "./page.module.css";
import Search from "@/components/productMenu/productSearch/search/Search";
import CartPage from "@/components/cartPage/CartPage";

export default function Cart() {
  return (
    <main className={styles.cart}>
      <div className={"container"}>
        <div className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </div>
        <CartPage />
      </div>
    </main>
  );
}
