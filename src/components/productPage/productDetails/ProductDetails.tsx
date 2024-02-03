import React from "react";
import style from "./style.module.scss";
import { Rate } from "antd";
import Button from "@/components/button/Button";
import Quantity from "./quantityInput/Quantity";

const ProductDetails: React.FC = ({}) => {
  return (
    <article className={`${style.details}`}>
      <h4 className={style.category}>Bread</h4>
      <h3 className={style.title}>Fresh Orange</h3>
      <p className={style.info}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor
      </p>
      <div className={style.deliveryInfo}>Free Delivery</div>
      <div className={style.priceInfo}>
        <del>$9.99</del>
        <div className={style.Star}>
          <h3>$6.99</h3>
          <Rate allowHalf defaultValue={2.5} />
        </div>
      </div>
      <div className={style.quanty}>
        <Quantity />
      </div>
      <Button className={style.button}>ADD tO cART</Button>
    </article>
  );
};

export default ProductDetails;
