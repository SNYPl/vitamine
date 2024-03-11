"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, Tooltip } from "antd";
import Image from "next/image";
import { InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import NoProduct from "@/components/emptyProduct/noProduct";
import { getSession } from "next-auth/react";

const WishlistItemList: React.FC = ({}) => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state: any) => state.cartReducer.wishList);

  const { data, isLoading, isError, isFetched } = useQuery(
    ["wishlist"],
    async () => {
      try {
        const user = await getSession();
        console.log(user);
        if (!user) return;
        const response = await axios.get("/api/wishlistList", {
          params: { wishlistItems: JSON.stringify(user?.user.wishlist) || [] },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching wishlist products", error);
        throw new Error("Error fetching wishlist products");
      }
    }
  );
  console.log(data);
  const onChange = (productId: string, value: any) => {};

  const productDeleteHandler = (productId: string) => {};

  const updateCartHandler = () => {};

  if (!data?.length) {
    return <NoProduct title="პროდუქტი არ არის არჩეული" />;
  }

  return (
    <>
      <section className={style.productList}>
        {data?.map((product: any) => {
          return (
            <div className={style.product} key={product._id}>
              <div className={style.productImg}>
                <Image
                  src={product.mainImage}
                  alt="product"
                  width={110}
                  height={110}
                />
              </div>
              <p className={style.productName}>{product.name}</p>
              <p>{product.discount ? product.discount : product.price}</p>
              <div className={style.productQuantity}>
                <InputNumber
                  min={1}
                  max={product.productQuantity}
                  defaultValue={product.choosedQuantity}
                  onChange={(value) => onChange(product._id, value)}
                />
                <span className={style.quantityInfo}>
                  მაქს. {product.productQuantity}
                </span>
              </div>
              <p>{product.totalPrice}</p>
              <div className={style.productRemove}>
                <Tooltip title="პროდუქტის წაშლა">
                  <Button
                    onClick={() => productDeleteHandler(product._id)}
                    icon={<i className="fa-solid fa-xmark"></i>}
                  ></Button>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </section>
      <div className={style.updateBtn}>
        <Button onClick={updateCartHandler}>კალათის განახლება</Button>
      </div>
    </>
  );
};

export default WishlistItemList;
