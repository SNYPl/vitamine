import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import styles from "./page.module.css";
import Search from "@/components/productMenu/productSearch/search/Search";
import ProfileComponent from "@/components/profile/Profile";
import { getUser } from "@/components/helper/getUser";

export default async function Profile() {
  const user = await getUser();

  return (
    <main className={styles.cart}>
      <div className={"container"}>
        <div className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </div>
        <ProfileComponent user={user?.user} />
      </div>
    </main>
  );
}
