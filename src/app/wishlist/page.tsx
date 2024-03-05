import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import styles from "./page.module.css";
import Search from "@/components/productMenu/productSearch/search/Search";
import WishlistComponent from "@/components/wishlist/Wishlist";

export default function Wishlist() {
  return (
    <main className={styles.cart}>
      <div className={"container"}>
        <div className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </div>
        <WishlistComponent />
      </div>
    </main>
  );
}
