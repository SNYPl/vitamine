import React from "react";
import style from "./style.module.scss";
import Filter from "./filter/Filter";
import ProductList from "./productList/ProductList";

const Shop: React.FC = ({}) => {
  return (
    <section className={`${style.shop}`}>
      <div className={`${style.shopContent}`}>
        <Filter />
        <ProductList />
      </div>
    </section>
  );
};

export default Shop;
