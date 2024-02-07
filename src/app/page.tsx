import styles from "./page.module.css";
import ProductMenu from "@/components/productMenu/ProductMenu";
import Services from "@/components/services/Services";
import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";
import Deal from "@/components/weekDeal/Deal";
import Introduction from "@/components/introduction/Introduction";
import Companies from "@/components/companies/Companies";
import { Suspense } from "react";
import { Skeleton } from "antd";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={"container"}>
        <ProductMenu />
        <Services />
        <Suspense fallback={<Skeleton active />}>
          <FeaturedProducts />
        </Suspense>
        <Deal />
        <Introduction />
        <Companies />
      </div>
    </main>
  );
}
