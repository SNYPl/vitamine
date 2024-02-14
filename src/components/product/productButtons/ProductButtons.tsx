import React from "react";
import style from "./style.module.scss";
import { Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setProductId } from "@/store/slices/productButtonsSlice";
import { addToCart } from "@/components/api/addToCart";
import { setCartUpdated } from "@/store/slices/cartSlice";

interface buttonProps {
  id: number;
  productQuantity: number;
}

const ProductButtons: React.FC<buttonProps> = ({ id, productQuantity }) => {
  const dispatch = useDispatch();
  const openModal = useSelector((state: any) => state.productButtons.modal);
  const cartUpdatedRender = useSelector(
    (state: any) => state.cartReducer.cartUpdated
  );

  const showModalHandler = () => {
    dispatch(setModal(!openModal));
    dispatch(setProductId(id));
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
            addToCart(id, 1, productQuantity);
            dispatch(setCartUpdated(!cartUpdatedRender));
          }}
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
