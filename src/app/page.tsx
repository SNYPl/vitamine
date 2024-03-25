import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import styles from "./page.module.css";
import Search from "@/components/productMenu/productSearch/search/Search";
import ShopComponent from "@/components/shopPage/Shop";
import Ad from "@/components/productMenu/productSearch/productAd/Ad";
import FacebookChatPlugin from "@/components/facebookChat/FacebookChatPlugin";

export default function Shop({ params }: { params: { shop: string } }) {
  return (
    <main className={styles.shop}>
      <div className={"container"}>
        <div className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </div>
        <Ad />
        <ShopComponent />
      </div>
      <FacebookChatPlugin />
    </main>
  );
}
