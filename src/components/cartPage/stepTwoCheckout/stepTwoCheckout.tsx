import React, { useState } from "react";
import style from "./style.module.scss";
import Billing from "./billing/Billing";
import OrderDetails from "./orderDetails/OrderDetails";
import StepOneTotal from "../stepOneShop/stepOneTotal/StepOneTotal";

interface setpTwo {
  setStepCart: any;
  totalPrice: number;
  data: any;
}

const StepTwoCheckout: React.FC<setpTwo> = ({
  setStepCart,
  totalPrice,
  data,
}) => {
  return (
    <section className={style.stepTwoCheckout}>
      <Billing setStepCart={setStepCart} />

      <div className={style.details}>
        <OrderDetails data={data} />
        <StepOneTotal totalPrice={totalPrice} />
      </div>
    </section>
  );
};

export default StepTwoCheckout;
