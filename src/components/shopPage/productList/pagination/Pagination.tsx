"use client";
import React, { useEffect } from "react";
import { Pagination, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setShopPage } from "@/store/slices/paginationSlice";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import style from "./style.module.scss";

const PaginationComponent: React.FC = () => {
  const searchParam = useSearchParams();
  const categoryValue = searchParam?.get("category");
  const pageValue = searchParam?.get("page");
  const searchValue = searchParam?.get("search");
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
  }, [pageValue, dispatch]);

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

    // Update Redux state first
    dispatch(setShopPage(page));

    // Use router.replace with shallow option to prevent scroll reset
    // The scroll option is key to preserving scroll position
    router.replace(`${path}${queryString ? "?" + queryString : ""}`, {
      scroll: false,
    });
  };

  // The main fix - make sure the URL and state stay consistent
  // This helps prevent errors with client-side navigation
  useEffect(() => {
    // Set page to 1 if going back to a URL without page param
    if (!pageValue && productPage !== 1) {
      dispatch(setShopPage(1));
    }
  }, [pageValue, productPage, dispatch]);

  return (
    <div className={style.paginationWrapper}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#88c74a",
            borderRadius: 8,
            colorBgContainer: "#ffffff",
          },
          components: {
            Pagination: {
              itemActiveBg: "#88c74a",
              itemActiveBgDisabled: "#f5f5f5",
              itemActiveColorDisabled: "#88c74a",
              itemBg: "#ffffff",
              itemInputBg: "#ffffff",
              itemLinkBg: "#ffffff",
              itemSize: 36,
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
          showSizeChanger={false}
          className={style.pagination}
        />
      </ConfigProvider>
    </div>
  );
};

export default PaginationComponent;
