// "use client";
import React, { Suspense } from "react";
import style from "./style.module.scss";
import ProductList from "./productList/ProductList";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import {
  introductionBestSales,
  introductionDaleOfWeek,
  introductionDiscounted,
} from "@/lib/introduction";

const Introduction: React.FC = async ({}) => {
  const bestSellingItems = JSON.parse(await introductionBestSales());
  const daleOfWeek = JSON.parse(await introductionDaleOfWeek());
  const discounted = JSON.parse(await introductionDiscounted());

  // if (isLoading)
  //   return (
  //     <article className={`${style.skeletion} `}>
  //       <Skeleton active />
  //     </article>
  //   );

  // const weekDaleProductFilter = data?.filter(
  //   (el: { daleOfWeek: boolean; sold: number; productQuantity: number }) => {
  //     const solded =
  //       el.sold < el.productQuantity && el.sold !== el.productQuantity;

  //     if (el.daleOfWeek && solded) return el.daleOfWeek;
  //   }
  // );

  // const bestSoldProducts = data
  //   ?.filter((el: { sold: number }) => el.sold)
  //   .sort((a: any, b: any) => b.sold - a.sold);

  // const discountedProducts = data
  //   ?.filter((el: { discount: boolean }) => el.discount)
  //   .sort((a: any, b: any) => b.discount - a.discount);

  return (
    <section className={`${style.introduction}`}>
      <Suspense
        fallback={
          <article className={`${style.skeletion} `}>
            <Skeleton active />
          </article>
        }
      >
        <ProductList title="კვირის შემოთავაზება" products={daleOfWeek} />
      </Suspense>
      <Suspense
        fallback={
          <article className={`${style.skeletion} `}>
            <Skeleton active />
          </article>
        }
      >
        <ProductList title="საუკეთესო გაყიდვადი" products={bestSellingItems} />
      </Suspense>

      <Suspense
        fallback={
          <article className={`${style.skeletion} `}>
            <Skeleton active />
          </article>
        }
      >
        <ProductList title="ფასდაკლებული" products={discounted} />
      </Suspense>
    </section>
  );
};

export default Introduction;
