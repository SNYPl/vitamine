"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import FeaturedMenu from "./featuredMenu/FeaturedMenu";
import Product from "../product/Product";
import NoProduct from "../emptyProduct/noProduct";

const FeaturedProducts = ({
  userWishlist,
  featureProducts,
}: {
  userWishlist: [string] | null | undefined;
  featureProducts: [string] | null | undefined;
}) => {
  const [activeMenu, setActiveMenu] = useState("all");

  const filteredData = featureProducts?.filter((product: any) => {
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
        {!filteredData?.length && <NoProduct title={"პროდუქტი არ არის"} />}

        {filteredData?.slice(0, 9).map((el: any) => (
          <Product {...el} key={el._id} userWishlist={userWishlist} />
        ))}
      </section>
    </section>
  );
};

export default FeaturedProducts;
