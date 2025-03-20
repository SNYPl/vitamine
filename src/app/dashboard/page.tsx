"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { categories } from "@/data/categories";

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
  const [vitamins, setVitamins] = useState<Vitamin[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVitamins = async () => {
      try {
        const response = await fetch("/api/supplements/get");
        if (response.ok) {
          const data = await response.json();
          setVitamins(data);
        } else {
          console.error("Failed to fetch vitamins");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVitamins();
  }, []);

  // Filter vitamins based on selected category and search query
  const filteredVitamins = vitamins.filter((vitamin) => {
    // Category filter
    const categoryMatch = 
      selectedCategory === "all" || 
      vitamin.category?.includes(selectedCategory);
    
    // Search filter - case insensitive search in product name
    const searchMatch = 
      searchQuery === "" || 
      vitamin.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  if (status === "loading") {
    return <div className={styles.loadingContainer}>Loading session...</div>;
  }

  if (!session) {
    return <div className={styles.accessDenied}>Access denied. Please log in with admin credentials.</div>;
  }


  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>ვიტამინების მენეჯმენტი</h1>
        <div className={styles.actions}>
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
                  className={`${styles.categoryButton} ${selectedCategory === category.value ? styles.active : ''}`}
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
            <p>ნაჩვენებია {filteredVitamins.length} პროდუქტი {vitamins.length} პროდუქტიდან</p>
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
          {filteredVitamins.map((vitamin) => (
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
                    {vitamin.category?.map((cat, index) => (
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
    </div>
  );

  async function handleDelete(id: string) {
    if (confirm("დარწმუნებული ხარ რომ გინდა წაშალო?")) {
      setDeleteInProgress(true);

      try {
        const response = await fetch(`/api/supplements/delete?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove the deleted item from the state
          setVitamins(vitamins.filter((vitamin) => vitamin._id !== id));
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
