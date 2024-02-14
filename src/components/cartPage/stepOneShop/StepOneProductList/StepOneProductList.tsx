"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, Tooltip } from "antd";
import Image from "next/image";
import { InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemsGlobal } from "@/store/slices/cartSlice";
import axios from "axios";
import { useQuery } from "react-query";
import StepOneTotal from "../stepOneTotal/StepOneTotal";
import NoProduct from "@/components/emptyProduct/noProduct";

interface ProductListProps {
  setStepCart: any;
}

const StepOneProductList: React.FC<ProductListProps> = ({ setStepCart }) => {
  const dispatch = useDispatch();
  const cartUpdatedList = useSelector(
    (state: any) => state.cartReducer.cartItems
  );

  const [updatedQuantity, setUpdatedQuantity] = useState(cartUpdatedList);

  const { data, isLoading, isError, isFetched } = useQuery(
    ["cartItems", cartUpdatedList],
    async () => {
      try {
        const response = await axios.get("/api/cart/get", {
          params: { cartItems: JSON.stringify(cartUpdatedList) },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );
  const onChange = (productId: string, value: any) => {
    setUpdatedQuantity((state: any) => {
      const updatedState = state.map((item: any) =>
        item.id === productId ? { ...item, quantity: value } : item
      );
      return updatedState;
    });
  };

  const productDeleteHandler = (productId: string) => {
    setUpdatedQuantity((state: any) => {
      const updatedState = state.filter((item: any) => item.id !== productId);

      localStorage.setItem("cartItems", JSON.stringify(updatedState));
      dispatch(setCartItemsGlobal(updatedState));

      return updatedState;
    });
  };

  const updateCartHandler = () => {
    localStorage.setItem("cartItems", JSON.stringify(updatedQuantity));
    dispatch(setCartItemsGlobal(updatedQuantity));
  };

  if (!cartUpdatedList.length) {
    return <NoProduct title="პროდუქტი არ არის არჩეული" />;
  }

  return (
    <>
      <section className={style.productList}>
        {data?.products.map((product: any) => {
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
              <p>{product.name}</p>
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
        <Button onClick={() => setStepCart("step-1")}>უკან დაბრუნება</Button>{" "}
        <Button onClick={updateCartHandler}>კალათის განახლება</Button>{" "}
      </div>

      <StepOneTotal setStepCart={setStepCart} totalPrice={data?.totalPrice} />
    </>
  );
};

export default StepOneProductList;
