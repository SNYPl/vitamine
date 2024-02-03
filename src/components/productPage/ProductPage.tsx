import React from "react";
import style from "./style.module.scss";
import ImageGallery from "./produtImagegallery/ProductImageGallery";
import Categories from "../shopPage/filter/categories/Categories";
import ProductDetails from "./productDetails/ProductDetails";
import ProductDescription from "./productDescription/ProductDescription";

const ProductPage: React.FC = ({}) => {
  return (
    <section className={`${style.productpage}`}>
      <div className={`${style.categoriesContainer}`}>
        <Categories />
      </div>
      <div className={`${style.productInfoContainer}`}>
        <section className={`${style.productInfo}`}>
          <ImageGallery />
          <ProductDetails />
        </section>
        <ProductDescription />
      </div>
    </section>
  );
};

export default ProductPage;
