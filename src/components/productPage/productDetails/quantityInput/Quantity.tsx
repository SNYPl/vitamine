"use client";
import React from "react";
import style from "./style.module.scss";
import { InputNumber } from "antd";

const Quantity: React.FC = ({}) => {
  const onChange = (value: number | null) => {
    console.log("changed", value);
  };

  return (
    <div className={`${style.quantity}`}>
      <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
    </div>
  );
};

export default Quantity;
