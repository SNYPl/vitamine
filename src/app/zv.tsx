import styles from "./page.module.css";
import ProductMenu from "@/components/productMenu/ProductMenu";
import Services from "@/components/services/Services";
import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";
import Deal from "@/components/weekDeal/Deal";
import Introduction from "@/components/introduction/Introduction";
import Companies from "@/components/companies/Companies";
import { Suspense } from "react";
import { Skeleton } from "antd";
import { getCurrentUser } from "@/components/helper/session";
import { getSession } from "next-auth/react";
import { getUser } from "@/components/helper/getUser";

export default async function Home() {
  const user = await getCurrentUser();
  const us = await getUser();
  const user1 = await getSession();

  // console.log(us);

  // const user2 = await revalidateUserSession();

  // console.log(user2);
  return (
    <main className={styles.main}>
      <div className={"container"}>
        <ProductMenu />
        <Services />
        <Suspense fallback={<Skeleton active />}>
          <FeaturedProducts userWishlist={user?.wishlist} />
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
