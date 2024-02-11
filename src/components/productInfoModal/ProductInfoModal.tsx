"use client";
import React from "react";
import { Modal } from "antd";
import ProductInfo from "@/components/productPage/productInfo/ProductInfo";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@/store/slices/productButtonsSlice";
import styles from "./style.module.scss";

const ProductInfoModal: React.FC = () => {
  const dispatch = useDispatch();
  const openModal = useSelector((state: any) => state.productButtons.modal);
  const productId = useSelector((state: any) => state.productButtons.id);

  const handleCancel = () => {
    dispatch(setModal(!openModal));
  };

  return (
    <>
      <Modal open={openModal} onCancel={handleCancel} footer={null} width={850}>
        <ProductInfo modal={true} key={productId} className={styles.modal} />
      </Modal>
    </>
  );
};

export default ProductInfoModal;
