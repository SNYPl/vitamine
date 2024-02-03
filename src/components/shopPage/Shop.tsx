import React from "react";
import style from "./style.module.scss";
import Filter from "./filter/Filter";
import ParamInfo from "./paramInfo/ParamInfo";
import ProductList from "./productList/ProductList";

const Shop: React.FC = ({}) => {
  return (
    <section className={`${style.shop}`}>
      <ParamInfo />

      <div className={`${style.shopContent}`}>
        <Filter />
        <ProductList />
      </div>
    </section>
  );
};

export default Shop;
