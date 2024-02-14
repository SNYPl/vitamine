"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, Modal, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemsGlobal } from "@/store/slices/cartSlice";

const ProductTitles: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cartUpdatedList = useSelector(
    (state: any) => state.cartReducer.cartItems
  );
  const titles = [
    "სურათი",
    "პროდუქტის სახელი",
    "ფასი",
    "რადენობა",
    "მთლიანი ფასი",
  ];

  const deleteAllProducts = () => {
    localStorage.removeItem("cartItems");
    dispatch(setCartItemsGlobal([]));
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const cancel = () => {
    setOpen(false);
  };

  return (
    <div className={style.titlesForm}>
      {titles.map((title: string) => {
        return <p key={title}>{title}</p>;
      })}
      <div className={style.clearBtn}>
        <Tooltip title="კალათის გასუფთავება">
          <Button
            type="primary"
            onClick={showModal}
            className={style.btnInf}
            disabled={!cartUpdatedList?.length}
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </Tooltip>

        <Modal
          title="წავშალოთ ყველა პროდუქტი?"
          open={open}
          onOk={deleteAllProducts}
          onCancel={cancel}
          okText="დიახ"
          cancelText="არა"
        ></Modal>
      </div>
    </div>
  );
};

export default ProductTitles;
