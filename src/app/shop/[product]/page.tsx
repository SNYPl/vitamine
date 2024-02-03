import styles from "./page.module.css";
import ProductPageComponent from "@/components/productPage/ProductPage";
import Companies from "@/components/companies/Companies";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";

export default function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  return (
    <main className={styles.product}>
      <div className={"container"}>
        <section className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </section>
        <ProductPageComponent />
        <Companies />
      </div>
    </main>
  );
}
