"use client";

import React, { useState } from "react";
import style from "./style.module.scss";
import FeaturedMenu from "./featuredMenu/FeaturedMenu";
import Product from "../product/Product";
import { useQuery } from "react-query";
import axios from "axios";
import { Skeleton } from "antd";
import NoProduct from "../emptyProduct/noProduct";

const FeaturedProducts: React.FC = ({}) => {
  const [activeMenu, setActiveMenu] = useState("all");

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

  const filteredData = data?.filter((product: any) => {
    if (activeMenu === "all") {
      return product;
    } else if (product.category.includes(activeMenu)) {
      return product;
    }

    return false;
  });

  return (
    <section className={`${style.featured}`}>
      <article className={`${style.title}`}>
        <h2>პოპულალური პროდუქტები</h2>
        <div></div>
      </article>
      <FeaturedMenu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      <section className={`${style.featuredProductsList}`}>
        {isLoading && (
          <article className={`${style.skeletion} `}>
            <Skeleton active />
          </article>
        )}
        {!filteredData?.length && !isLoading && (
          <NoProduct title={"პროდუქტი არ არის"} />
        )}

        {filteredData?.slice(0, 9).map((el: any) => (
          <Product {...el} key={el._id} />
        ))}
      </section>
    </section>
  );
};

export default FeaturedProducts;
