"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductDetails from "./productDetails/ProductDetails";
import ProductDescription from "./productDescription/ProductDescription";
import ImageGallery from "./produtImagegallery/ProductImageGallery";
import { Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setProductId } from "@/store/slices/productButtonsSlice";

interface InfoProps {
  modal: boolean;
  className?: any;
  user?: any;
}

const ProductInfo: React.FC<InfoProps> = ({ modal, className, user }) => {
  const dispatch = useDispatch();
  const productGlobalId = useSelector((state: any) => state.productButtons.id);
  const searchParams = useSearchParams();
  const urlId = searchParams.get("id");
  const [productIdState, setProductIdState] = useState(
    productGlobalId || urlId
  );

  useEffect(() => {
    if (urlId) {
      dispatch(setProductId(null));
      setProductIdState(urlId);
    } else {
      const id = productGlobalId;

      setProductIdState(() => id);
    }
  }, [productGlobalId, urlId]);

  const { data, isLoading, isError, isFetched } = useQuery(
    ["getSupplementByCategory", productIdState],
    async () => {
      try {
        const response = await axios.get("/api/product/get", {
          params: { productId: productIdState },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  if (isLoading) {
    return (
      <article className={`${style.skeletion} container`}>
        <Skeleton active />
      </article>
    );
  }

  if (isError || !data) {
    return <div>შეცდომაა</div>;
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
    about,
    description,
    otherIngredients,
    review,
    supplementFacts,
    use,
    warning,
    packageQuantity,
    country,
    _id,
    sold,
  } = dataObj;

  return (
    <div className={`${style.productInfoContainer} ${className}`}>
      <section className={`${style.productInfo}`}>
        <ImageGallery
          images={images}
          country={country}
          sold={sold}
          productQuantity={productQuantity}
        />
        <ProductDetails
          category={category}
          name={name}
          price={price}
          discount={discount}
          rating={rating}
          productQuantity={productQuantity}
          infoTitle={infoTitle}
          packageQuantity={packageQuantity}
          id={_id}
          sold={sold}
        />
      </section>
      {!modal && (
        <ProductDescription
          about={about}
          description={description}
          otherIngredients={otherIngredients}
          review={review}
          supplementFacts={supplementFacts}
          use={use}
          warning={warning}
          name={name}
          id={_id}
          user={user}
        />
      )}
    </div>
  );
};

export default ProductInfo;
