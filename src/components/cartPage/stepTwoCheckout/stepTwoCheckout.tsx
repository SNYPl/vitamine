import React from "react";
import style from "./style.module.scss";

interface setpTwo {
  setStepCart: any;
}

const StepTwoCheckout: React.FC<setpTwo> = ({ setStepCart }) => {
  return <section className={style.stepTwoCheckout}></section>;
};

export default StepTwoCheckout;
