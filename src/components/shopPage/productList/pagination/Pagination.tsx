"use client";
import React, { useEffect, useState } from "react";
import { Pagination, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setShopPage } from "@/store/slices/paginationSlice";

const PaginationComponent: React.FC = ({}) => {
  const productListLength = useSelector(
    (state: any) => state.products.productListLength
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const pageSize = 12;

  useEffect(() => {
    setCurrentPage(1);
    dispatch(setShopPage(1));
  }, [productListLength, dispatch]);

  const onPaginationChange = (page: number) => {
    dispatch(setShopPage(page));
    setCurrentPage(page);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fff",
          borderRadius: 2,
          colorBgContainer: "#f79823",
        },
        components: {
          Pagination: {
            itemBg: "#eaeff4",
            itemActiveBgDisabled: "#eaeff4",
            itemInputBg: "#eaeff4",
          },
        },
      }}
    >
      <Pagination
        onChange={onPaginationChange}
        current={currentPage}
        defaultCurrent={productListLength}
        pageSize={pageSize}
        total={productListLength}
        hideOnSinglePage
      />
    </ConfigProvider>
  );
};

export default PaginationComponent;
