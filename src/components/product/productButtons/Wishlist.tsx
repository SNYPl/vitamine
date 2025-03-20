import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { Button, ConfigProvider, Space, Tooltip, message } from "antd";
import { addItemToWishList } from "@/lib/wishlist";
import { useTransition } from "react";
import { HeartOutlined, HeartFilled, LoadingOutlined } from "@ant-design/icons";
import { useOptimistic } from "react";
import { useSession } from "next-auth/react";
import LoginModal from "@/components/login/LoginModal";

const WishlistBtn = ({
  id,
  isWishlisted,
}: {
  id: number;
  isWishlisted: boolean | undefined;
}) => {
  const [errorHandler, setErrorHandler] = useState("");
  const [isPending, startTransition] = useTransition();
  const [optimisticState, addOptimistic] = useOptimistic(isWishlisted);
  const { data: session, status } = useSession();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [session, status]);

  const addItemToWishListHandler = async () => {
    try {
      if (!session) {
        // Show login modal instead of error message
        setLoginModalOpen(true);
        return;
      }

      const response = await addItemToWishList(id);
      if (response) {
        setErrorHandler("");
        message.success(
          optimisticState ? "Removed from wishlist" : "Added to wishlist"
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setErrorHandler(errorMessage);
      message.error(errorMessage);
    }
  };

  const tooltipTitle = !session
    ? "Login to add to favorites"
    : optimisticState
    ? "Remove from favorites"
    : "Add to favorites";

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#f79823",
              algorithm: true,
            },
          },
        }}
      >
        <Space>
          <Tooltip title={tooltipTitle}>
            <Button
              onClick={() => {
                startTransition(async () => {
                  // Here's where we handle the button click
                  if (session) {
                    // User is logged in, just toggle wishlist state
                    addOptimistic(!optimisticState);
                    await addItemToWishListHandler();
                  } else {
                    // User is not logged in, show the login modal
                    setLoginModalOpen(true);
                  }
                });
              }}
              className={`product-btn ${style.productBtn} ${
                errorHandler && style.btnError
              } ${!session && style.disableBtn}`}
              type="primary"
              shape="round"
              icon={
                isPending ? (
                  <LoadingOutlined />
                ) : optimisticState ? (
                  <HeartFilled />
                ) : (
                  <HeartOutlined />
                )
              }
              style={{
                backgroundColor: optimisticState ? "#f79823" : "",
                color: optimisticState ? "#ffff" : "",
                transition: "all 0.3s ease",
              }}
              disabled={isPending}
            />
          </Tooltip>
        </Space>
      </ConfigProvider>

      {/* Add the login modal component */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default WishlistBtn;
