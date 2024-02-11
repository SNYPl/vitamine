"use client";
import React from "react";
import style from "./style.module.scss";
import { useQuery } from "react-query";
import axios from "axios";
import { Skeleton } from "antd";
import Product from "@/components/product/Product";

const FeaturedList: React.FC = ({}) => {
  const { data, isLoading, isError, isFetching } = useQuery(
    "featuredProducts",
    async () => {
      try {
        const response = await axios.get("/api/featuredProducts/get");
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  return (
    <section className={`${style.featured}`}>
      {data?.length && (
        <>
          <article className={`${style.title}`}>
            <h2>პოპულალური პროდუქტები</h2>
            <div></div>
          </article>
          <section className={`${style.featuredProductsList}`}>
            {isLoading && (
              <article className={`${style.skeletion} `}>
                <Skeleton active />
              </article>
            )}

            {data?.slice(0, 4).map((el: any, id: any) => (
              <div className={`${style.product} `} key={el._id}>
                <Product {...el} introduction />
              </div>
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default FeaturedList;
