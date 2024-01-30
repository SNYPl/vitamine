import React from "react";
import style from "./style.module.scss";
import ProductList from "./productList/ProductList";

const Introduction: React.FC = ({}) => {
  return (
    <section className={`${style.introduction}`}>
      <ProductList />
      <ProductList />
      <ProductList />
    </section>
  );
};

export default Introduction;
