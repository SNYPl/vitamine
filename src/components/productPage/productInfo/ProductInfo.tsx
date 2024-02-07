"use client";
import React from "react";
import style from "./style.module.scss";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductDetails from "./productDetails/ProductDetails";
import ProductDescription from "./productDescription/ProductDescription";
import ImageGallery from "./produtImagegallery/ProductImageGallery";

const ProductInfo: React.FC = ({}) => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const { data, isLoading, isError } = useQuery(
    ["getSupplementByCategory"],
    async () => {
      try {
        const response = await axios.get("/api/product/get", {
          params: { productId },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading product information</div>;
  }

  const dataObj = Object.assign({}, data[0]);

  const {
    images,
    category,
    name,
    price,
    discount,
    rating,
    productQuantity,
    infoTitle,
  } = dataObj;

  console.log(dataObj);

  return (
    <div className={`${style.productInfoContainer}`}>
      <section className={`${style.productInfo}`}>
        <ImageGallery images={images} />
        <ProductDetails
          category={category}
          name={name}
          price={price}
          discount={discount}
          rating={rating}
          productQuantity={productQuantity}
          infoTitle={infoTitle}
        />
      </section>
      <ProductDescription />
    </div>
  );
};

export default ProductInfo;
