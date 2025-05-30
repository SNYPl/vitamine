import styles from "./page.module.css";
import ProductMenu from "@/components/productMenu/ProductMenu";
import Services from "@/components/services/Services";
import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";
import Deal from "@/components/weekDeal/Deal";
import Introduction from "@/components/introduction/Introduction";
import Companies from "@/components/companies/Companies";
import { Suspense } from "react";
import { Skeleton } from "antd";
import { getAllWishListProductsIds } from "@/lib/wishlist";
import { getFeaturesProducts } from "@/lib/featuresProducts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featureProducts = await getFeaturesProducts();
  const productIds = await getAllWishListProductsIds();

  // Convert the array to the expected format
  const formattedIds: [string] =
    productIds?.length > 0 ? [productIds[0]] : [""];

  return (
    <main className={styles.main}>
      <div className={"container"}>
        <ProductMenu />
        <Services />
        <Suspense fallback={<Skeleton active />}>
          <FeaturedProducts
            userWishlist={formattedIds}
            featureProducts={featureProducts}
          />
        </Suspense>
        {/* <Deal /> */}
        <Suspense fallback={<Skeleton active />}>
          <Introduction />
        </Suspense>
        <Companies />
      </div>
    </main>
  );
}
