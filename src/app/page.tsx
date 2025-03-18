import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import styles from "./page.module.scss";
import Search from "@/components/productMenu/productSearch/search/Search";
import ShopComponent from "@/components/shopPage/Shop";
import Ad from "@/components/productMenu/productSearch/productAd/Ad";
import Companies from "@/components/companies/Companies";

export default function Shop({ params }: { params: { shop: string } }) {
  return (
    <main className={styles.shop}>
     
      
      <div className={styles.mainContent}>
        <div className="container">
          <div className={styles.searchWrapper}>
            <div className={styles.searchMenu}>
              <BurgerMenu activeMenu={false} />
              <Search />
            </div>
          </div>
          
          <Ad />
          
          <div className={styles.shopSection}>
            <div className={styles.filterBar}>
              <h2>ჩვენი პროდუქტები</h2>
            </div>
            
            <ShopComponent />
          </div>
        </div>
      </div>
      
      <Companies />
    </main>
  );
}
