import React from "react";
import style from "./style.module.scss";
import ProductTitles from "./productTitle/ProductTitles";
import StepOneProductList from "./StepOneProductList/StepOneProductList";

interface steOneProps {
  setStepCart: any;
}

const StepOneShop: React.FC<steOneProps> = ({ setStepCart }) => {
  return (
    <section className={style.stepOneShop}>
      <ProductTitles />
      <StepOneProductList setStepCart={setStepCart} />
    </section>
  );
};

export default StepOneShop;
