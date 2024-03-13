"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, Modal, Space, Tooltip } from "antd";
import { deleteAllWishlistProducts } from "@/lib/wishlist";

const ProductTitles: React.FC = () => {
  const [open, setOpen] = useState(false);

  const titles = ["სურათი", "პროდუქტის სახელი", "ფასი", "კალათაში დამატება"];

  const deleteAllProducts = async () => {
    await deleteAllWishlistProducts();
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
        <Tooltip title="ფავორიტების გასუფთავება">
          <Button type="primary" onClick={showModal} className={style.btnInf}>
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
