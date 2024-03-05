import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import styles from "./page.module.css";
import Search from "@/components/productMenu/productSearch/search/Search";
import ProfileComponent from "@/components/profile/Profile";

export default function Profile() {
  return (
    <main className={styles.cart}>
      <div className={"container"}>
        <div className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </div>
        <ProfileComponent />
      </div>
    </main>
  );
}
