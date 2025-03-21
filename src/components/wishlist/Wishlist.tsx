"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";
import ItemList from "./itemList/ItemList";
import ParamInfo from "../shopPage/paramInfo/ParamInfo";
import { useSession } from "next-auth/react";
// import { FaHeart } from "react-icons/fa";
import { Spin, Pagination, Alert } from "antd";

// Change this to a client component with session handling
const WishlistPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 20;

  const fetchWishlistData = useCallback(
    async (currentPage = 1) => {
      setLoading(true);
      setError("");

      try {
        // First get the count of all items
        const countResponse = await fetch(
          "/api/wishlistList?user=" + session?.user?.email,
          {
            method: "POST",
            body: JSON.stringify({ action: "count" }),
          }
        );

        if (!countResponse.ok) {
          throw new Error("Failed to get wishlist count");
        }

        const countData = await countResponse.json();
        setTotal(countData.count || 0);

        // Then fetch the paginated items
        const response = await fetch(
          `/api/wishlistData?page=${currentPage}&limit=${PAGE_SIZE}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch wishlist: ${response.status}`);
        }

        const data = await response.json();
        setWishlistData(data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setError("Failed to load your wishlist. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [session?.user?.email]
  );

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // Fetch data when authenticated
    if (status === "authenticated") {
      fetchWishlistData(page);
    }
  }, [status, router, page, fetchWishlistData]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemDeleted = () => {
    // Refetch wishlist data when an item is deleted
    fetchWishlistData(page);
  };

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className={style.loadingContainer}>
        <Spin size="large" />
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  const isEmpty = !wishlistData || wishlistData.length === 0;

  return (
    <section className={`${style.wishlist}`}>
      <ParamInfo />

      <div className={style.wishlistHeader}>
        <p>დამახსოვრებული ნივთები</p>
      </div>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className={style.errorAlert}
        />
      )}

      {isEmpty ? (
        <div className={style.emptyWishlist}>
          {/* <FaHeart className={style.emptyIcon} /> */}
          <h2>თქვენ არ გაქვთ დამახსოვრებული ნივთები</h2>
          <p>გადამოწმეთ ჩვენი ნივთები და დაამატეთ თქვენი სასურვილი ნივთები</p>
          <a href="/shop" className={style.shopButton}>
            მაღაზია
          </a>
        </div>
      ) : (
        <>
          <ItemList wishlistData={wishlistData} onDelete={handleItemDeleted} />
          {total > PAGE_SIZE && (
            <div className={style.paginationContainer}>
              <Pagination
                current={page}
                pageSize={PAGE_SIZE}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default WishlistPage;
