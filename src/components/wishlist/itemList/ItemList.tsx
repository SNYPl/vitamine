"use client";
import React, { useState, useTransition } from "react";
import style from "./style.module.scss";
import { Button, Tooltip } from "antd";
import Image from "next/image";
import NoProduct from "@/components/emptyProduct/noProduct";
import ItemTitles from "../titles/ItemTitle";
import { deleteWishListItem } from "@/lib/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/components/api/addToCart";
import { setCartUpdated } from "@/store/slices/cartSlice";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";

const WishlistItemList = ({ wishlistData }: { wishlistData: any }) => {
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const dispatch = useDispatch();
  const cartUpdatedRender = useSelector(
    (state: any) => state.cartReducer.cartUpdated
  );

  const productDeleteHandler = async (productId: string) => {
    const data = await deleteWishListItem(productId);
  };

  const addToCartHandler = (
    id: number,
    num: number,
    productQuantity: number,
    setAddToCartLoading: any
  ) => {
    setAddToCartLoading(true);
    addToCart(id, num, productQuantity, setAddToCartLoading);
    dispatch(setCartUpdated(!cartUpdatedRender));

    setTimeout(() => {
      setAddToCartLoading(false);
    }, 400);
  };

  if (!wishlistData?.length) {
    return <NoProduct title="პროდუქტი არ არის არჩეული" />;
  }
  return (
    <>
      <ItemTitles />
      <section className={style.productList}>
        {wishlistData.map((product: any) => {
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
              <Link
                href={`product?id=${product._id}`}
                className={style.itemLink}
                target="_blank"
              >
                <p className={style.productName}>{product.name}</p>
              </Link>
              <p>{product.discount ? product.discount : product.price}</p>

              <div className={style.addCart}>
                <button
                  onClick={() => {
                    addToCartHandler(
                      product._id,
                      1,
                      product.productQuantity,
                      setAddToCartLoading
                    );
                  }}
                >
                  {!addToCartLoading ? (
                    "კალათაში დამატება"
                  ) : (
                    <LoadingOutlined spin />
                  )}
                </button>
              </div>

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
    </>
  );
};

export default WishlistItemList;
