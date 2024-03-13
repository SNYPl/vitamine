import React from "react";
import style from "./style.module.scss";
import { formatCurrencyWithSymbol } from "@/common/utils";

interface stepOneTotal {
  totalPrice: number;
  children?: any;
}

const StepOneTotal: React.FC<stepOneTotal> = ({ totalPrice = 0, children }) => {
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
          <span className={style.num}>
            {formatCurrencyWithSymbol(totalPrice)}
          </span>
        </div>
        <div className={style.infoItem}>
          <h3>მიწოდება</h3>
          <span>{shippingPrice}</span>
        </div>
        <div className={style.infoItem}>
          <h3>მთლიანი ჯამი</h3>
          <span className={style.num}>{totalPriceHandler}</span>
        </div>
      </article>

      {children}
    </section>
  );
};

export default StepOneTotal;
