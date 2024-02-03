import React from "react";
import style from "./style.module.scss";
import Sort from "./sort/Sort";
import ShopList from "./shopList/ShopList";
import { Col, Row, Pagination, Breadcrumb } from "antd";

const ProductList: React.FC = ({}) => {
  return (
    <section className={`${style.productList}`}>
      <Sort />
      <ShopList />
      <Pagination
        // onChange={onPaginationChange}
        defaultCurrent={1}
        pageSize={3}
        total={8}
      />
    </section>
  );
};

export default ProductList;
