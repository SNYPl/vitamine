import React from "react";
import style from "./style.module.scss";
import Button from "@/components/button/Button";
import { formatCurrencyWithSymbol } from "@/common/utils";

interface stepOneTotal {
  setStepCart: any;
  totalPrice: number;
}

const StepOneTotal: React.FC<stepOneTotal> = ({ setStepCart, totalPrice }) => {
  const shipping = 5;
  const shippingPrice =
    totalPrice >= 100 ? "უფასო" : formatCurrencyWithSymbol(shipping);

  const totalPriceHandler =
    totalPrice >= 100
      ? formatCurrencyWithSymbol(totalPrice)
      : formatCurrencyWithSymbol(totalPrice + shipping);
  return (
    <section className={style.stepOneTotal}>
      <h2 className={style.title}>მთლიანი ღირებულება</h2>
      <article className={style.info}>
        <div className={style.infoItem}>
          <h3>ჯამი</h3>
          <span>{formatCurrencyWithSymbol(totalPrice)}</span>
        </div>
        <div className={style.infoItem}>
          <h3>მიწოდება</h3>
          <span>{shippingPrice}</span>
        </div>
        <div className={style.infoItem}>
          <h3>მთლიანი ჯამი</h3>
          <span>{totalPriceHandler}</span>
        </div>
      </article>
      <Button
        className={style.btnInf}
        onSubmitButton={() => setStepCart("step-2")}
      >
        შეკვეთის გაფორმება
      </Button>
    </section>
  );
};

export default StepOneTotal;
