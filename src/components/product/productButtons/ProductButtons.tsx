import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, ConfigProvider, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setProductId } from "@/store/slices/productButtonsSlice";
import { addToCart } from "@/components/api/addToCart";
import { setCartUpdated } from "@/store/slices/cartSlice";
import { LoadingOutlined } from "@ant-design/icons";
import WishlistBtn from "./Wishlist";

interface buttonProps {
  id: number;
  productQuantity: number;
  isWishlisted?: boolean | undefined;
}

const ProductButtons: React.FC<buttonProps> = ({
  id,
  productQuantity,
  isWishlisted,
}) => {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const dispatch = useDispatch();
  const openModal = useSelector((state: any) => state.productButtons.modal);
  const cartUpdatedRender = useSelector(
    (state: any) => state.cartReducer.cartUpdated
  );

  const showModalHandler = () => {
    dispatch(setModal(!openModal));
    dispatch(setProductId(id));
  };

  const handleAddToCart = () => {
    setAddToCartLoading(true);
    addToCart(id, 1, productQuantity, setAddToCartLoading);
    dispatch(setCartUpdated(!cartUpdatedRender));

    setTimeout(() => {
      setAddToCartLoading(false);
    }, 400);
  };

  return (
    <>
      <WishlistBtn id={id} isWishlisted={isWishlisted} />

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f79823",
          },
        }}
      >
        <Space>
          <Tooltip title="კალათაში დამატება">
            <Button
              onClick={() => {
                handleAddToCart();
              }}
              className={`product-btn ${style.productBtn} `}
              type="primary"
              shape="round"
              loading={addToCartLoading}
              disabled={!productQuantity}
              icon={
                addToCartLoading ? (
                  <LoadingOutlined spin />
                ) : (
                  <i className="fa-solid fa-bag-shopping" />
                )
              }
            />
          </Tooltip>
        </Space>
        <Space>
          <Tooltip title="სწრაფი ნახვა">
            <Button
              onClick={showModalHandler}
              className={`product-btn ${style.productBtn} `}
              type="primary"
              shape="round"
              icon={<i className="far fa-eye" />}
            />
          </Tooltip>
        </Space>
      </ConfigProvider>
    </>
  );
};

export default ProductButtons;
