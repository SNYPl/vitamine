"use client";
import React from "react";
import style from "./style.module.scss";
import ProductList from "./productList/ProductList";
import axios from "axios";
import { useQuery } from "react-query";

const Introduction: React.FC = ({}) => {
  const { data, isLoading, isError } = useQuery(
    "getAllSupplement",
    async () => {
      try {
        const response = await axios.get("/api/supplements/get", {
          params: { category: "all" },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  const weekDaleProductFilter = data?.filter(
    (el: { daleofWeek: boolean }) => el.daleofWeek
  );

  const bestSoldProducts = data
    ?.filter((el: { sold: number }) => el.sold)
    .sort((a: any, b: any) => b.sold - a.sold);

  const discountedProducts = data
    ?.filter((el: { discount: boolean }) => el.discount)
    .sort((a: any, b: any) => b.discount - a.discount);

  return (
    <section className={`${style.introduction}`}>
      <ProductList
        title="კვირის შემოთავაზება"
        products={weekDaleProductFilter}
      />
      <ProductList title="საუკეთესო გაყიდვადი" products={bestSoldProducts} />
      <ProductList title="ფასდაკლებული" products={discountedProducts} />
    </section>
  );
};

export default Introduction;
