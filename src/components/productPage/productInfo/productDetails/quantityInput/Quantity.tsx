"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { ConfigProvider, InputNumber, Space } from "antd";
import Button from "@/components/button/Button";
import { addToCart } from "@/components/api/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { setCartUpdated } from "@/store/slices/cartSlice";

interface quantity {
  productQuantity: number;
  id: string;
  sold: number;
}

const Quantity: React.FC<quantity> = ({ productQuantity, id, sold }) => {
  const defaultValue = 1;
  const [quantityHandler, setQuantityHandler] = useState(defaultValue);
  const cartUpdatedRender = useSelector(
    (state: any) => state.cartReducer.cartUpdated
  );
  const dispatch = useDispatch();

  const onChange = (value: any) => {
    setQuantityHandler(value);
  };

  const solded = sold < productQuantity && sold !== productQuantity;

  return (
    <>
      <div className={style.quanty}>
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
                min={defaultValue}
                max={productQuantity}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={!productQuantity || !solded}
              />
            </Space>
          </ConfigProvider>
        </div>
        <p
          style={{
            color: productQuantity && solded ? "#4eb016" : "#B50808",
            fontWeight: "bold",
          }}
          className={style.stockParagraph}
        >
          {productQuantity && solded ? (
            <span>
              <i className="fa-solid fa-check"></i> მარაგში
            </span>
          ) : (
            "მარაგი ამოიწურა"
          )}
        </p>
      </div>
      <Button
        className={style.button}
        onSubmitButton={() => {
          addToCart(id, quantityHandler, productQuantity);
          dispatch(setCartUpdated(!cartUpdatedRender));
        }}
        disabled={!productQuantity || !solded}
      >
        კალათაში დამატება
      </Button>
    </>
  );
};

export default Quantity;
