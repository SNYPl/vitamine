'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './edit.module.css';

// Add this interface
interface Params {
  id: string;
}

// Define a Vitamin interface
interface Vitamin {
  _id: string;
  name: string;
  category: string[];
  price: number;
  discount?: number;
  productQuantity: number;
  packageQuantity: string | number;
  tabletSize: number;
  sold: number;
  mainImage: string;
  images: string[];
  isFeatured: boolean;
  mainDaleOfWeek: boolean;
  daleOfWeek: boolean;
  about: string;
  description: string[];
  use: string;
  otherIngredients: string[];
  warning: string;
  supplementFacts: { title: string; info: string }[];
  country: string;
  tags: string;
  infoTitle: string;
  [key: string]: any; // For any other properties
}

export default function EditVitamin({ params }: { params: Params }) {
  const router = useRouter();
  const { id } = params;
  const [vitamin, setVitamin] = useState<Vitamin | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const fetchVitamin = async () => {
      try {
        const response = await fetch(`/api/product/get?productId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setVitamin(data[0]);
        } else {
          console.error('Failed to fetch vitamin');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchVitamin();
    }
  }, [id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!vitamin) return;
    
    const { name, value } = e.target;
    
    // For nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setVitamin({
        ...vitamin,
        [parent]: {
          ...vitamin[parent as keyof Vitamin],
          [child]: value
        }
      } as Vitamin);
    } else {
      setVitamin({ ...vitamin, [name]: value } as Vitamin);
    }
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Vitamin) => {
    if (!vitamin) return;
    
    const { value } = e.target;
    const newArray = [...(vitamin[field] as any[])];
    newArray[index] = value;
    
    setVitamin({ ...vitamin, [field]: newArray } as Vitamin);
  };
  
  const addArrayItem = (field: keyof Vitamin) => {
    if (!vitamin) return;
    
    setVitamin({ ...vitamin, [field]: [...(vitamin[field] as any[]), ''] } as Vitamin);
  };
  
  const removeArrayItem = (index: number, field: keyof Vitamin) => {
    if (!vitamin) return;
    
    const newArray = [...(vitamin[field] as any[])];
    newArray.splice(index, 1);
    
    setVitamin({ ...vitamin, [field]: newArray } as Vitamin);
  };
  
  const handleSupplementFactChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, key: 'title' | 'info') => {
    if (!vitamin) return;
    
    const { value } = e.target;
    const newFacts = [...vitamin.supplementFacts];
    newFacts[index][key] = value;
    
    setVitamin({ ...vitamin, supplementFacts: newFacts } as Vitamin);
  };
  
  const addSupplementFact = () => {
    if (!vitamin) return;
    
    setVitamin({
      ...vitamin,
      supplementFacts: [
        ...vitamin.supplementFacts,
        { title: '', info: '' }
      ]
    } as Vitamin);
  };
  
  const removeSupplementFact = (index: number) => {
    if (!vitamin) return;
    
    const newFacts = [...vitamin.supplementFacts];
    newFacts.splice(index, 1);
    
    setVitamin({ ...vitamin, supplementFacts: newFacts } as Vitamin);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!vitamin) return;
    
    const { value } = e.target;
    setVitamin({ ...vitamin, category: value.split(',').map(cat => cat.trim()) } as Vitamin);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vitamin) return;
    
    setSaving(true);
    
    try {
      const response = await fetch(`/api/product/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vitamin),
      });
      
      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to update vitamin');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <div>Loading vitamin data...</div>;
  }
  
  if (!vitamin) {
    return <div>Vitamin not found</div>;
  }
  
  return (
    <div className={styles.editForm}>
      <h1>დააედითე: {vitamin.name}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h2>ინფორმაცია</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">სახელი:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={vitamin.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="category">კატეგორიები (comma-separated):</label>
            <input
              type="text"
              id="category"
              name="category"
              value={vitamin.category.join(', ')}
              onChange={handleCategoryChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="infoTitle">მოკლე აღწერა:</label>
            <textarea
              id="infoTitle"
              name="infoTitle"
              value={vitamin.infoTitle}
              onChange={handleChange}
              rows={3}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">ფასი:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={vitamin.price}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="discount">ფასდაკლება (optional):</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={vitamin.discount || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="productQuantity">პროდუქტის რაოდენობა:</label>
              <input
                type="number"
                id="productQuantity"
                name="productQuantity"
                value={vitamin.productQuantity}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="packageQuantity">შეკვრის რაოდენობა:</label>
              <input
                type="text"
                id="packageQuantity"
                name="packageQuantity"
                value={vitamin.packageQuantity}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="tabletSize">ტაბლეტის ზომა:</label>
              <input
                type="number"
                id="tabletSize"
                name="tabletSize"
                value={vitamin.tabletSize}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="sold">გაიყიდა:</label>
              <input
                type="number"
                id="sold"
                name="sold"
                value={vitamin.sold}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="mainImage">მთავარი ფოტო:</label>
            <input
              type="text"
              id="mainImage"
              name="mainImage"
              value={vitamin.mainImage}
              onChange={handleChange}
            />
            {vitamin.mainImage && (
              <img 
                src={vitamin.mainImage} 
                alt="Main product image" 
                className={styles.previewImage}
              />
            )}
          </div>
          
          <div className={styles.checkboxGroup}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={vitamin.isFeatured}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  vitamin && setVitamin({ ...vitamin, isFeatured: e.target.checked } as Vitamin)
                }
              />
              <label htmlFor="isFeatured">განსაკუთრებული პროდუქტი</label>
            </div>
            
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="mainDaleOfWeek"
                name="mainDaleOfWeek"
                checked={vitamin.mainDaleOfWeek}
                onChange={(e) => setVitamin({ ...vitamin, mainDaleOfWeek: e.target.checked })}
              />
              <label htmlFor="mainDaleOfWeek">მთავარი კვირის შემთავაზება</label>
            </div>
            
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="daleOfWeek"
                name="daleOfWeek"
                checked={vitamin.daleOfWeek}
                onChange={(e) => setVitamin({ ...vitamin, daleOfWeek: e.target.checked })}
              />
              <label htmlFor="daleOfWeek">კვირის შემოთავაზება</label>
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h2>Images</h2>
          
          {vitamin.images.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <input
                type="text"
                value={image}
                onChange={(e) => handleArrayChange(e, index, 'images')}
              />
              <button 
                type="button" 
                onClick={() => removeArrayItem(index, 'images')}
                className={styles.removeButton}
              >
                Remove
              </button>
              <img src={image} alt={`Product ${index + 1}`} className={styles.previewImage} />
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={() => addArrayItem('images')}
            className={styles.addButton}
          >
            Add Image
          </button>
        </div>
        
        <div className={styles.formSection}>
          <h2>Description</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="about">აღწერა:</label>
            <textarea
              id="about"
              name="about"
              value={vitamin.about}
              onChange={handleChange}
              rows={6}
            />
          </div>
          
          <h3>აღწერის სია</h3>
          {vitamin.description.map((desc, index) => (
            <div key={index} className={styles.arrayItem}>
              <input
                type="text"
                value={desc}
                onChange={(e) => handleArrayChange(e, index, 'description')}
              />
              <button 
                type="button" 
                onClick={() => removeArrayItem(index, 'description')}
                className={styles.removeButton}
              >
                წაშალე
              </button>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={() => addArrayItem('description')}
            className={styles.addButton}
          >
            დაამატე აღწერა
          </button>
          
          <div className={styles.formGroup}>
            <label htmlFor="use">გამოყენების ინსტრუქცია:</label>
            <textarea
              id="use"
              name="use"
              value={vitamin.use}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h2>ინგრედიენტები და გაფრთხილება</h2>
          
          <h3>სხვა ინგრედიენტები</h3>
          {vitamin.otherIngredients.map((ingredient, index) => (
            <div key={index} className={styles.arrayItem}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayChange(e, index, 'otherIngredients')}
              />
              <button 
                type="button" 
                onClick={() => removeArrayItem(index, 'otherIngredients')}
                className={styles.removeButton}
              >
                წაშალე
              </button>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={() => addArrayItem('otherIngredients')}
            className={styles.addButton}
          >
           დაამატე ინგრედიენტი
          </button>
          
          <div className={styles.formGroup}>
            <label htmlFor="warning">გაფრთხილება:</label>
            <textarea
              id="warning"
              name="warning"
              value={vitamin.warning}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h2>პროდუქტის ფაქტები</h2>
          
          {vitamin.supplementFacts.map((fact, index) => (
            <div key={index} className={styles.factItem}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>სახელი:</label>
                  <input
                    type="text"
                    value={fact.title}
                    onChange={(e) => handleSupplementFactChange(e, index, 'title')}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>ინფო:</label>
                  <input
                    type="text"
                    value={fact.info}
                    onChange={(e) => handleSupplementFactChange(e, index, 'info')}
                  />
                </div>
                
                <button 
                  type="button" 
                  onClick={() => removeSupplementFact(index)}
                  className={styles.removeButton}
                >
                  წაშალე
                </button>
              </div>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={addSupplementFact}
            className={styles.addButton}
          >
            დაამატე ფაქტი
          </button>
        </div>
        
        <div className={styles.formSection}>
          <h2>სხვა ინფორმაცია</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="country">ქვეყანა:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={vitamin.country}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="tags">თეგები (ძებნისთვის):</label>
            <textarea
              id="tags"
              name="tags"
              value={vitamin.tags}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => router.push('/dashboard')}
            className={styles.cancelButton}
            disabled={saving}
          >
            გაუქმება
          </button>
          
          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={saving}
          >
            {saving ? 'ინახება...' : 'შეინახე'}
          </button>
        </div>
      </form>
    </div>
  );
} 