"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import FeaturedMenu from "./featuredMenu/FeaturedMenu";
import Product from "../product/Product";
import NoProduct from "../emptyProduct/noProduct";
import Button from "../button/Button";

const FeaturedProducts = ({
  userWishlist,
  featureProducts,
}: {
  userWishlist: [string] | null | undefined;
  featureProducts: [string];
}) => {
  const [activeMenu, setActiveMenu] = useState("all");
  const [isFeaturedCount, setIsFeaturedCount] = useState(9);

  const filteredData = featureProducts?.filter((product: any) => {
    if (activeMenu === "all") {
      return product;
    } else if (product.category.includes(activeMenu)) {
      return product;
    }

    return false;
  });

  const changeCountNumber = () => {
    if (isFeaturedCount > filteredData?.length) {
      return;
    }
    const num = 9;

    setIsFeaturedCount((state) => state + num);
  };

  return (
    <section className={`${style.featured}`}>
      <article className={`${style.title}`}>
        <h2>პოპულალური პროდუქტები</h2>
        <div></div>
      </article>
      <FeaturedMenu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      <section className={`${style.featuredProductsList}`}>
        {!filteredData?.length && <NoProduct title={"პროდუქტი არ არის"} />}

        {filteredData?.slice(0, isFeaturedCount).map((el: any) => (
          <Product {...el} key={el._id} userWishlist={userWishlist} />
        ))}
      </section>
      <Button
        className={`${style.moreBtn} ${
          isFeaturedCount > filteredData?.length && style.disabled
        }`}
        onSubmitButton={changeCountNumber}
      >
        მეტის ჩვენება
      </Button>
    </section>
  );
};

export default FeaturedProducts;
