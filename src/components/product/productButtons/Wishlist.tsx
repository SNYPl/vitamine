import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, ConfigProvider, Space, Tooltip } from "antd";
import { addItemToWishList } from "@/lib/wishlist";
import { useTransition } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useOptimistic } from "react";

const WishlistBtn = ({
  id,
  isWishlisted,
}: {
  id: number;
  isWishlisted: boolean | undefined;
}) => {
  const [errorHandler, setErrorHandler] = useState("");
  const [isPending, startTransition] = useTransition();
  const [optimisticState, addOptimistic] = useOptimistic(isWishlisted);

  const addItemToWishListHandler = async () => {
    try {
      const response = await addItemToWishList(id);
      if (response) {
        setErrorHandler("");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setErrorHandler(errorMessage);
    }
  };

  const ifError = !errorHandler ? "ფავორიტებში დამატება" : errorHandler;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#f79823",
            algorithm: true, // Enable algorithm
          },
        },
      }}
    >
      <Space>
        <Tooltip title={ifError}>
          <Button
            onClick={async () => {
              addOptimistic(!isWishlisted);
              await addItemToWishListHandler();
            }}
            className={`product-btn ${style.productBtn} ${
              errorHandler && style.btnError
            }`}
            type="primary"
            shape="round"
            icon={<i className="far fa-heart" />}
            style={{
              backgroundColor: optimisticState ? "#f79823" : "",
              color: optimisticState ? "#ffff" : "",
            }}
          />
        </Tooltip>
      </Space>
    </ConfigProvider>
  );
};

export default WishlistBtn;
