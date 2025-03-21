"use client";
import Link from "next/link";
import styles from "./style.module.scss";
import { formatCurrency } from "../../../../common/utils";
import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setCartItemsGlobal } from "@/store/slices/cartSlice";

const Cart = ({ wishlistLength }: { wishlistLength: number }) => {
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

  const productsListLength = data?.products?.reduce(
    (accumulator: number, currentValue: any) => {
      return accumulator + currentValue.choosedQuantity;
    },
    0
  );

  const cartNumberValue = data?.totalPrice
    ? formatCurrency(data?.totalPrice)
    : (0).toFixed(2);

  return (
    <section className={styles.cart}>
      <Link href={"/wishlist"} className="function-items-item">
        <i className="fa-regular fa-heart"></i>
        {wishlistLength > 0 && (
          <span className={styles.productLegtn}>{wishlistLength}</span>
        )}
      </Link>

      <Link href={"/shop/cart"} className="function-items-item">
        <i className="fa-solid fa-cart-shopping"></i>
        {productsListLength !== 0 && (
          <span className={styles.productLegtn}>{productsListLength}</span>
        )}
        <span>{isLoading ? <Spin /> : cartNumberValue}</span>
      </Link>
    </section>
  );
};

export default Cart;
