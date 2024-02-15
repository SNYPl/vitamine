import React from "react";
import style from "./style.module.scss";
import { formatCurrencyWithSymbol } from "@/common/utils";

interface DetailsProps {
  data: any;
}

const OrderDetails: React.FC<DetailsProps> = ({ data }) => {
  return (
    <section className={style.details}>
      <h2>თქვენი შეკვეთა</h2>
      {data.map((el: any) => (
        <div className={style.productDetail} key={el._id}>
          <p>
            {el.name} x {el.choosedQuantity}
          </p>
          <h4>{formatCurrencyWithSymbol(el.totalPrice)}</h4>
        </div>
      ))}
    </section>
  );
};

export default OrderDetails;
