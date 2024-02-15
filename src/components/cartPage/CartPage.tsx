"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import ParamInfo from "@/components/shopPage/paramInfo/ParamInfo";
import CartOrderStep from "./cartOrderStepInfo/CartOrderStep";
import StepOneShop from "./stepOneShop/StepOneShop";
import StepTwoCheckout from "./stepTwoCheckout/stepTwoCheckout";
import StepThreeComplete from "./steThreeComplete/StepThreeComplete";
import Companies from "../companies/Companies";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";

const CartPage: React.FC = ({}) => {
  const [stepCart, setStepCart] = useState("step-1");

  const cartUpdatedList = useSelector(
    (state: any) => state.cartReducer.cartItems
  );

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

  return (
    <section className={`${style.cartPage}`}>
      <ParamInfo />
      <CartOrderStep step={stepCart} />
      {stepCart === "step-1" && <StepOneShop setStepCart={setStepCart} />}
      {stepCart === "step-2" && (
        <StepTwoCheckout
          setStepCart={setStepCart}
          totalPrice={data?.totalPrice}
          data={data?.products}
        />
      )}
      {stepCart === "step-3" && <StepThreeComplete />}
      <Companies />
    </section>
  );
};

export default CartPage;
