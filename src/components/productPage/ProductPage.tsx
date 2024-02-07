import React from "react";
import style from "./style.module.scss";
import Categories from "../shopPage/filter/categories/Categories";
import ProductInfo from "./productInfo/ProductInfo";

const ProductPage: React.FC = ({}) => {
  return (
    <section className={`${style.productpage}`}>
      <div className={`${style.categoriesContainer}`}>
        <Categories />
      </div>
      <ProductInfo />
    </section>
  );
};

export default ProductPage;
