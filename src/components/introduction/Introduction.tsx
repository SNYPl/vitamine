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

export const revalidate = 43200;

const Introduction: React.FC = async ({}) => {
  const bestSellingItems = JSON.parse(await introductionBestSales());
  const daleOfWeek = JSON.parse(await introductionDaleOfWeek());
  const discounted = JSON.parse(await introductionDiscounted());

  return (
    <section className={`${style.introduction}`}>
      <ProductList title="კვირის შემოთავაზება" products={daleOfWeek} />

      <ProductList title="საუკეთესო გაყიდვადი" products={bestSellingItems} />

      <ProductList title="ფასდაკლებული" products={discounted} />
    </section>
  );
};

export default Introduction;
