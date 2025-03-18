'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './dashboard.module.css';

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
  
  useEffect(() => {
    const fetchVitamins = async () => {
      try {
        const response = await fetch('/api/supplements/get');
        if (response.ok) {
          const data = await response.json();
          setVitamins(data);
        } else {
          console.error('Failed to fetch vitamins');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVitamins();
  }, []);
  
  if (status === 'loading') {
    return <div>Loading session...</div>;
  }
  
  if (!session) {
    return <div>Access denied. Please log in with admin credentials.</div>;
  }
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Vitamin Products Management</h1>
        <div className={styles.actions}>
          <Link href="/dashboard/add-vitamin" className={styles.button}>
            Add New Product
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className={styles.vitaminGrid}>
          {vitamins.map((vitamin) => (
            <div key={vitamin._id} className={styles.vitaminCard}>
              <div className={styles.vitaminImage}>
                {vitamin.mainImage ? (
                  <img src={vitamin.mainImage} alt={vitamin.name} />
                ) : (
                  <div>No Image</div>
                )}
              </div>
              <div className={styles.vitaminDetails}>
                <div className={styles.vitaminHeader}>
                  <h3>{vitamin.name}</h3>
                  <div className={getStockStatusClass(vitamin.productQuantity)}>
                    {getStockStatus(vitamin.productQuantity)}
                  </div>
                </div>
                
                <div className={styles.vitaminMeta}>
                  <div className={styles.metaItem}>
                    <strong>Price:</strong> ${vitamin.price}
                    {(vitamin.discount ?? 0) > 0 && ` (${vitamin.discount}% off)`}
                  </div>
                  <div className={styles.metaItem}>
                    <strong>Quantity:</strong> {vitamin.productQuantity} units
                  </div>
                  <div className={styles.metaItem}>
                    <strong>Package:</strong> {vitamin.packageQuantity}
                  </div>
                  {(vitamin.sold ?? 0) > 0 && (
                    <div className={styles.metaItem}>
                      <strong>Sold:</strong> {vitamin.sold} units
                    </div>
                  )}
                </div>
                
                <div>
                  {vitamin.category?.map((cat, index) => (
                    <span key={index} className={styles.vitaminCategory}>
                      {cat}
                    </span>
                  ))}
                </div>
                
                <div className={styles.cardActions}>
                  <Link href={`/dashboard/edit-vitamin/${vitamin._id}`} className={styles.button}>
                    Edit
                  </Link>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDelete(vitamin._id)}
                  >
                    Delete
                  </button>
                  <div className={styles.flexGrow}></div>
                  <Link 
                    href={`/product/${vitamin._id}`} 
                    className={styles.button}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this vitamin?')) {
      // Implement delete API call
      console.log('Delete vitamin with ID:', id);
    }
  }
  
  function getStockStatus(quantity: number): string {
    if (quantity <= 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  }
  
  function getStockStatusClass(quantity: number): string {
    const baseClass = `${styles.status}`;
    if (quantity <= 0) return `${baseClass} ${styles.outOfStock}`;
    if (quantity < 10) return `${baseClass} ${styles.lowStock}`;
    return `${baseClass} ${styles.inStock}`;
  }
}