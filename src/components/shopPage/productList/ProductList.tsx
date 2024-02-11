import React from "react";
import style from "./style.module.scss";
import Sort from "./sort/Sort";
import ShopList from "./shopList/ShopList";
import PaginationComponent from "./pagination/Pagination";
import FeaturedList from "../featuredList/FeaturedList";

const ProductList: React.FC = ({}) => {
  return (
    <section className={`${style.productList}`}>
      <Sort />
      <ShopList />
      <PaginationComponent />
      <FeaturedList />
    </section>
  );
};

export default ProductList;
