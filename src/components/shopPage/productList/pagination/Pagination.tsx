"use client";
import React, { useEffect } from "react";
import { Pagination, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setShopPage } from "@/store/slices/paginationSlice";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const PaginationComponent: React.FC = ({}) => {
  const searchParam = useSearchParams();
  const categoryValue = searchParam.get("category");
  const pageValue = searchParam.get("page");
  const searchValue = searchParam.get("search");
  const firstPage = 1;
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();

  const productListLength = useSelector(
    (state: any) => state.products.productListLength
  );

  const productPage = useSelector((state: any) => state.products.shopPageValue);
  const showProductNumber = useSelector(
    (state: any) => state.products.showProductNumber
  );

  useEffect(() => {
    if (pageValue) {
      dispatch(setShopPage(Number(pageValue)));
    } else {
      dispatch(setShopPage(firstPage));
    }
  }, [pageValue]);

  const onPaginationChange = (page: number) => {
    let queryParams: { [key: string]: string } = {};

    // Preserve existing search and category parameters if they exist
    if (searchValue) {
      queryParams["search"] = searchValue;
    }

    if (categoryValue) {
      queryParams["category"] = categoryValue;
    }

    // Add the page parameter
    if (page !== 1) {
      queryParams["page"] = page.toString();
    }

    // Construct the new URL with the updated parameters
    const queryString = new URLSearchParams(queryParams).toString();

    // Update the URL using router.push
    router.push(`${path}${queryString ? "?" + queryString : ""}`);
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
        current={productPage}
        defaultCurrent={1}
        pageSize={showProductNumber}
        total={productListLength}
        hideOnSinglePage
      />
    </ConfigProvider>
  );
};

export default PaginationComponent;
