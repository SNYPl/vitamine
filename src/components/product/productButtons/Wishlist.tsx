import React from "react";
import style from "./style.module.scss";
import { Button, ConfigProvider, Space, Tooltip } from "antd";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { getUser } from "@/components/helper/getUser";
import { useSession } from "next-auth/react";

const WishlistBtn = ({
  id,
  isWishlisted,
}: {
  id: number;
  isWishlisted: boolean | undefined;
}) => {
  const queryClient = useQueryClient();
  const { data: session, update } = useSession();

  const addToWishlist = useMutation(
    () => axios.patch(`/api/favouriteProduct`, { id: id }),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries("featuredProducts");
        queryClient.invalidateQueries("session");
        return data;
      },
      onError: (error: any) => {
        console.error("Registration error:", error);
        return error;
      },
    }
  );

  const { error, data, isLoading, isError, isSuccess } = addToWishlist;

  const onAddWishlist = () => {
    addToWishlist.mutate();
    update();
  };

  const ifError = !error?.response.data.error
    ? "ფავორიტებში დამატება"
    : error?.response.data.error;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#f79823",
            algorithm: true, // Enable algorithm
          },
        },
      }}
    >
      <Space>
        <Tooltip title={ifError}>
          <Button
            onClick={() => onAddWishlist()}
            className={`product-btn ${style.productBtn} ${
              isError && style.btnError
            }`}
            type="primary"
            shape="round"
            icon={<i className="far fa-heart" />}
            style={{
              backgroundColor: isWishlisted ? "#f79823" : "",
              color: isWishlisted ? "#ffff" : "",
            }}
          />
        </Tooltip>
      </Space>
    </ConfigProvider>
  );
};

export default WishlistBtn;
