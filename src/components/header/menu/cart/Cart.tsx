"use client";
import Link from "next/link";
import styles from "./style.module.scss";
import { formatCurrency } from "../../../../common/utils";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setCartItemsGlobal } from "@/store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartUpdatedRender = useSelector(
    (state: any) => state.cartReducer.cartUpdated
  );
  const cartList = useSelector((state: any) => state.cartReducer.cartItems);

  useEffect(() => {
    const existingCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    dispatch(setCartItemsGlobal(existingCartItems));
  }, [cartUpdatedRender]);

  const { data, isLoading, isError, isFetched } = useQuery(
    ["cartItems", cartList, cartUpdatedRender],
    async () => {
      try {
        const response = await axios.get("/api/cart/get", {
          params: { cartItems: JSON.stringify(cartList) },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  const cartProductLength = data?.products?.length || (0).toFixed();

  const cartNumberValue = data?.totalPrice
    ? formatCurrency(data?.totalPrice)
    : (0).toFixed(2);

  return (
    <section className={styles.cart}>
      <Link href={"#"} className="function-items-item">
        <i className="fa-regular fa-heart"></i>
      </Link>

      <Link href={"/shop/cart"} className="function-items-item">
        <i className="fa-solid fa-cart-shopping"></i>
        {cartProductLength && (
          <span className={styles.productLegtn}>{cartProductLength}</span>
        )}
        <span>{isLoading ? <Spin /> : cartNumberValue}</span>
      </Link>
    </section>
  );
};

export default Cart;
