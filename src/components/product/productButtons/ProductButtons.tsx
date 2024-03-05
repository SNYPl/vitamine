import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setProductId } from "@/store/slices/productButtonsSlice";
import { addToCart } from "@/components/api/addToCart";
import { setCartUpdated } from "@/store/slices/cartSlice";
import { LoadingOutlined } from "@ant-design/icons";

interface buttonProps {
  id: number;
  productQuantity: number;
}

const ProductButtons: React.FC<buttonProps> = ({ id, productQuantity }) => {
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
      <Tooltip title="ფავორიტებში დამატება">
        <Button
          // onClick={() => onAddWishlist(data)}
          className={`product-btn ${style.productBtn} `}
          type="primary"
          shape="round"
          icon={<i className="far fa-heart" />}
        />
      </Tooltip>

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

      <Tooltip title="სწრაფი ნახვა">
        <Button
          onClick={showModalHandler}
          className={`product-btn ${style.productBtn} `}
          type="primary"
          shape="round"
          icon={<i className="far fa-eye" />}
        />
      </Tooltip>
    </>
  );
};

export default ProductButtons;
