"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { categories } from "@/data/categories";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";

export const dynamic = "force-dynamic";

interface Vitamin {
  _id: string;
  name: string;
  mainImage: string;
  price: number;
  discount?: number;
  productQuantity: number;
  packageQuantity: string | number;
  sold?: number;
  category?: string[];
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const router = useRouter();

  const {
    data: vitamins = [],
    isLoading: loading,
    refetch,
  } = useQuery(
    "dashboardVitamins",
    async () => {
      const response = await axios.get("/api/supplements/get", {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 5000, // Refetch every 5 seconds
    }
  );

  const filteredVitamins = vitamins.filter((vitamin: Vitamin) => {
    const categoryMatch =
      selectedCategory === "all" ||
      vitamin.category?.includes(selectedCategory);

    const searchMatch =
      searchQuery === "" ||
      vitamin.name.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Get current vitamins for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVitamins = filteredVitamins.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredVitamins.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Function to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let pages = [];

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than max, show all
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (status === "loading") {
    return <div className={styles.loadingContainer}>Loading session...</div>;
  }

  if (!session) {
    return (
      <div className={styles.accessDenied}>
        Access denied. Please log in with admin credentials.
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>ვიტამინების მენეჯმენტი</h1>
        <div className={styles.actions}>
          <button
            onClick={() => {
              refetch();
            }}
            className={styles.refreshButton}
            disabled={loading}
          >
            {loading ? "განახლება..." : "განაახლე"}
          </button>
          <Link href="/dashboard/add-vitamin" className={styles.addButton}>
            დაამატე პროდუქტი
          </Link>
        </div>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.filterSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="ძებნა სახელით..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                className={styles.clearButton}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className={styles.categoryFilter}>
            <span className={styles.filterLabel}>ფილტრი კატეგორიით:</span>
            <div className={styles.categoryButtons}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`${styles.categoryButton} ${
                    selectedCategory === category.value ? styles.active : ""
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.resultsInfo}>
          {!loading && (
            <p>
              ნაჩვენებია {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredVitamins.length)} პროდუქტი{" "}
              {vitamins.length} პროდუქტიდან
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>იტვირთება პროდუქტი...</div>
      ) : filteredVitamins.length === 0 ? (
        <div className={styles.noResults}>
          <p>პროდუქტი ვერ მოიძებნა შერჩეული ფილტრებით.</p>
          <button
            className={styles.resetFilters}
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            გაასუფთავე ფილტრები
          </button>
        </div>
      ) : (
        <div className={styles.vitaminGrid}>
          {currentVitamins.map((vitamin: Vitamin) => (
            <div key={vitamin._id} className={styles.vitaminCard}>
              <div className={styles.vitaminImage}>
                {vitamin.mainImage ? (
                  <img src={vitamin.mainImage} alt={vitamin.name} />
                ) : (
                  <div className={styles.noImage}>ფოტო არ არის</div>
                )}
              </div>
              <div className={styles.vitaminDetails}>
                <div className={styles.vitaminHeader}>
                  <h3>{vitamin.name}</h3>
                  <div className={getStockStatusClass(vitamin.productQuantity)}>
                    {getStockStatus(vitamin.productQuantity)}
                  </div>
                </div>

                <div className={styles.infoWrapper}>
                  <div className={styles.vitaminMeta}>
                    <div className={styles.metaItem}>
                      <strong>ფასი:</strong> ${vitamin.price}
                      {(vitamin.discount ?? 0) > 0 && (
                        <span className={styles.discount}>
                          {vitamin.discount}% ფასდაკლება
                        </span>
                      )}
                    </div>
                    <div className={styles.metaItem}>
                      <strong>ცალი:</strong> {vitamin.productQuantity}
                    </div>
                    <div className={styles.metaItem}>
                      <strong>შეკვრაში:</strong> {vitamin.packageQuantity}
                    </div>
                    {(vitamin.sold ?? 0) > 0 && (
                      <div className={styles.metaItem}>
                        <strong>გაიყიდა:</strong> {vitamin.sold}
                      </div>
                    )}
                  </div>

                  <div className={styles.categoryTags}>
                    {vitamin.category?.map((cat: string, index: number) => (
                      <span key={index} className={styles.vitaminCategory}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <Link
                    href={`/dashboard/edit-vitamin/${vitamin._id}`}
                    className={styles.editButton}
                  >
                    დააედითე
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(vitamin._id)}
                    disabled={deleteInProgress}
                  >
                    წაშალე
                  </button>
                  <div className={styles.flexGrow}></div>
                  <Link
                    href={`/product?id=${vitamin._id}`}
                    className={styles.viewButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ნახე
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredVitamins.length > itemsPerPage && (
        <div className={styles.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            წინა გვერდი
          </button>
          <div className={styles.pageNumbers}>
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}`}
                  onClick={() => paginate(page as number)}
                  className={`${styles.pageButton} ${
                    currentPage === page ? styles.activePage : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            შემდეგი გვერდი
          </button>
        </div>
      )}
    </div>
  );

  async function handleDelete(id: string) {
    if (confirm("დარწმუნებული ხარ რომ გინდა წაშალო?")) {
      setDeleteInProgress(true);

      try {
        const response = await fetch(`/api/supplements/delete?id=${id}`, {
          method: "DELETE",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        if (response.ok) {
          // Force a refresh of the data after deletion
          await refetch();
          alert("Product deleted successfully");
        } else {
          const data = await response.json();
          alert(data.message || "Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product");
      } finally {
        setDeleteInProgress(false);
      }
    }
  }

  function getStockStatus(quantity: number): string {
    if (quantity <= 0) return "გათავდა";
    if (quantity < 10) return "ცოტა დარჩა";
    return "მარაგშია";
  }

  function getStockStatusClass(quantity: number): string {
    const baseClass = `${styles.status}`;
    if (quantity <= 0) return `${baseClass} ${styles.outOfStock}`;
    if (quantity < 10) return `${baseClass} ${styles.lowStock}`;
    return `${baseClass} ${styles.inStock}`;
  }
}
