"use client";
import React from "react";
import style from "./style.module.scss";
import Product from "@/components/featuredProducts/product/Product";
import { useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const ShopList: React.FC = ({}) => {
  const searchParams = useSearchParams();

  const categoryList = searchParams.get("category");

  const { data, isLoading, isError } = useQuery(
    ["getAllSupplement", categoryList],
    async () => {
      try {
        const response = await axios.get("/api/supplements/get", {
          params: { category: categoryList },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  return (
    <section className={`${style.shopList}`}>
      {data?.map((item: any, index: any) => (
        <Product {...item} key={item._id} />
      ))}
    </section>
  );
};

export default ShopList;
