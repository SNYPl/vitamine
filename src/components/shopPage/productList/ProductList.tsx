import React from "react";
import style from "./style.module.scss";
import Sort from "./sort/Sort";
import ShopList from "./shopList/ShopList";
import PaginationComponent from "./pagination/Pagination";

const ProductList: React.FC = ({}) => {
  return (
    <section className={`${style.productList}`}>
      <Sort />
      <ShopList />
      <PaginationComponent />
    </section>
  );
};

export default ProductList;
