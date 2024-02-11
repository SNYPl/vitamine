import React from "react";
import style from "./style.module.scss";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setProductId } from "@/store/slices/productButtonsSlice";

interface buttonProps {
  id: number;
}

const ProductButtons: React.FC<buttonProps> = ({ id }) => {
  const dispatch = useDispatch();
  const openModal = useSelector((state: any) => state.productButtons.modal);

  const showModalHandler = () => {
    dispatch(setModal(!openModal));
    dispatch(setProductId(id));
  };
  return (
    <>
      <Button
        // onClick={() => onAddWishlist(data)}
        className={`product-btn ${style.productBtn} `}
        type="primary"
        shape="round"
        icon={<i className="far fa-heart" />}
      />

      <Button
        // onClick={() => onAddToCart(data)}
        className={`product-btn ${style.productBtn} `}
        type="primary"
        shape="round"
        icon={
          // addToCartLoading ? (
          //   <LoadingOutlined spin />
          // ) : (
          <i className="fa-solid fa-bag-shopping" />
          // )
        }
      />

      <Button
        onClick={showModalHandler}
        className={`product-btn ${style.productBtn} `}
        type="primary"
        shape="round"
        icon={<i className="far fa-eye" />}
      />
    </>
  );
};

export default ProductButtons;
