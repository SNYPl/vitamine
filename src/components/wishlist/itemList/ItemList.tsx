"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, Tooltip, message, Modal, Image } from "antd";
import NoProduct from "@/components/emptyProduct/noProduct";
import ItemTitles from "../titles/ItemTitle";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { formatCurrencyWithSymbol } from "@/common/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/components/api/addToCart";
import { setCartUpdated } from "@/store/slices/cartSlice";
import { deleteWishListItem, deleteAllWishlistProducts } from "@/lib/wishlist";

interface WishlistItemListProps {
  wishlistData: any;
  onDelete?: () => void;
}

const WishlistItemList = ({
  wishlistData,
  onDelete,
}: WishlistItemListProps) => {
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const cartUpdatedRender = useSelector(
    (state: any) => state.cartReducer.cartUpdated
  );

  const productDeleteHandler = async (productId: string) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      await deleteWishListItem(productId);
      message.success("პროდუქტი წაიშალა სურვილების სიიდან");
      if (onDelete) onDelete();
    } catch (error) {
      message.error("შეცდომა, პროდუქტი ვერ წაიშალა სურვილების სიიდან");
      console.error(error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const deleteAllHandler = async () => {
    setIsDeleting(true);
    try {
      await deleteAllWishlistProducts();
      setModalVisible(false);
      message.success("ყველა პროდუქტი წაიშალა სურვილების სიიდან");
      if (onDelete) onDelete();
    } catch (error) {
      message.error("შეცდომა, პროდუქტები ვერ წაიშალა სურვილების სიიდან");
    } finally {
      setIsDeleting(false);
    }
  };

  const addCartHandle = async (
    id: string,
    quantity = 1,
    productQuantity = 10
  ) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [id]: true }));
      await addToCart(id, quantity, productQuantity);
      dispatch(setCartUpdated(!cartUpdatedRender));
      message.success("პროდუქტი დაემატა კალათაში");
    } catch (error) {
      message.error("შეცდომა, პროდუქტი ვერ დაემატა კალათაში");
      console.error(error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (!wishlistData || wishlistData.length === 0) {
    return <NoProduct title="პროდუქტი არ არის არჩეული" />;
  }

  return (
    <>
      <ItemTitles />
      <div className={style.productList}>
        {wishlistData.map((product: any) => {
          const productId = product._id;
          const isLoading = loadingItems[productId];

          return (
            <div className={style.product} key={productId}>
              <div className={style.productImg}>
                <Image
                  className={style.productImage}
                  src={
                    product.image ||
                    product.images?.[0] ||
                    product.mainImage ||
                    "/placeholder-image.jpg"
                  }
                  alt={product.name}
                  preview={false}
                  fallback="https://via.placeholder.com/100x100?text=Image+Not+Found"
                />
              </div>

              <Link href={`/product/${productId}`} className={style.itemLink}>
                <div className={style.productDetails}>
                  <h3 className={style.productName}>{product.name}</h3>
                </div>
              </Link>

              <div className={style.productPrice}>
                {product.discountedPrice ? (
                  <>
                    <span className={style.discountedPrice}>
                      {formatCurrencyWithSymbol(product.discountedPrice)}
                    </span>
                    <span className={style.oldPrice}>
                      {formatCurrencyWithSymbol(product.price)}
                    </span>
                  </>
                ) : (
                  <span>{formatCurrencyWithSymbol(product.price)}</span>
                )}
              </div>

              <div className={style.productActions}>
                <Button
                  onClick={() =>
                    addCartHandle(productId, 1, product.quantity || 10)
                  }
                  loading={isLoading}
                  icon={!isLoading && <ShoppingCartOutlined />}
                  className={style.addCart}
                  type="primary"
                >
                  {!isLoading && "კალათაში დამატება"}
                </Button>
                <Button
                  onClick={() => productDeleteHandler(productId)}
                  loading={isLoading}
                  icon={
                    !isLoading && <DeleteOutlined style={{ color: "red" }} />
                  }
                  danger
                  className={style.productRemove}
                />
              </div>
            </div>
          );
        })}
      </div>

      {wishlistData.length > 0 && (
        <div className={style.clearAllContainer}>
          <Button
            onClick={() => setModalVisible(true)}
            danger
            className={style.clearAllBtn}
            type="primary"
            loading={isDeleting}
          >
            ყველას წაშლა
          </Button>
        </div>
      )}

      <Modal
        title={
          <div className={style.modalTitle}>სურვილების სიის გასუფთავება</div>
        }
        open={modalVisible}
        onOk={deleteAllHandler}
        onCancel={() => setModalVisible(false)}
        okText="წაშლა"
        cancelText="გაუქმება"
        confirmLoading={isDeleting}
        okButtonProps={{ danger: true }}
        centered
      >
        <p className={style.modalContent}>
          დარწმუნებული ხართ, რომ გსურთ ყველა პროდუქტის წაშლა სურვილების სიიდან?
        </p>
      </Modal>
    </>
  );
};

export default WishlistItemList;
