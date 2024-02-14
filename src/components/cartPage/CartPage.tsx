"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import ParamInfo from "@/components/shopPage/paramInfo/ParamInfo";
import CartOrderStep from "./cartOrderStepInfo/CartOrderStep";
import StepOneShop from "./stepOneShop/StepOneShop";
import StepTwoCheckout from "./stepTwoCheckout/stepTwoCheckout";
import Companies from "../companies/Companies";

const CartPage: React.FC = ({}) => {
  const [stepCart, setStepCart] = useState("step-1");

  return (
    <section className={`${style.cartPage}`}>
      <ParamInfo />
      <CartOrderStep step={stepCart} />
      {stepCart === "step-1" && <StepOneShop setStepCart={setStepCart} />}
      {stepCart === "step-1" && <StepTwoCheckout setStepCart={setStepCart} />}
      <Companies />
    </section>
  );
};

export default CartPage;
