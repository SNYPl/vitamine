import styles from "./page.module.css";
import ProductMenu from "@/components/productMenu/ProductMenu";
import Services from "@/components/services/Services";
import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";
import Deal from "@/components/weekDeal/Deal";
import Introduction from "@/components/introduction/Introduction";
import Companies from "@/components/companies/Companies";
import { Suspense } from "react";
import { Skeleton } from "antd";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";
import Contact from "@/components/contactPage/Contact";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={"container"}>
        <section className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </section>
        <Contact />
        <Companies />
      </div>
    </main>
  );
}
