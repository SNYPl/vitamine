import React from "react";
import style from "./style.module.scss";
import Categories from "../shopPage/filter/categories/Categories";
import ProductInfo from "./productInfo/ProductInfo";
import { getUser } from "../helper/getUser";

const ProductPage: React.FC = async ({}) => {
  const user = await getUser();
  return (
    <section className={`${style.productpage}`}>
      <div className={`${style.categoriesContainer}`}>
        <Categories />
      </div>
      <ProductInfo modal={false} user={user} />
    </section>
  );
};

export default ProductPage;
