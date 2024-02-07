"use client";
import React from "react";
import style from "./style.module.scss";
import { ConfigProvider, InputNumber, Space } from "antd";

interface quantity {
  productQuantity: number;
}

const Quantity: React.FC<quantity> = ({ productQuantity }) => {
  const onChange = (value: number | null) => {
    console.log("changed", value);
  };

  return (
    <div className={`${style.quantity}`}>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              hoverBorderColor: "#f79823",
              activeBorderColor: "#f79823",
            },
          },
        }}
      >
        <Space>
          <InputNumber
            min={1}
            max={productQuantity}
            defaultValue={1}
            onChange={onChange}
          />
        </Space>
      </ConfigProvider>
    </div>
  );
};

export default Quantity;
