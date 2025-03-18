'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import styles from './addVitamin.module.css';
import Link from 'next/link';

interface SupplementFact {
  title: string;
  info: string;
}

interface VitaminForm {
  name: string;
  category: string[];
  infoTitle: string;
  price: number;
  discount: number;
  productQuantity: number;
  packageQuantity: string;
  tabletSize: number;
  sold: number;
  mainDaleOfWeek: boolean;
  description: string;
  descriptionPoints: string[];
  ingredientInfo: string;
  nutritionalInfo: string;
  usageInfo: string;
  warningInfo: string;
  allergenInfo: string;
  supplementInfo: string;
  mainImage: string;
  secondaryImages: string[];
  supplementFacts: SupplementFact[];
  rating: any[];
}

export default function AddVitamin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('basic');
  const [newImageUrl, setNewImageUrl] = useState('');
  
  const { register, control, handleSubmit, formState: { errors }, setValue, getValues, watch } = useForm<VitaminForm>({
    defaultValues: {
      name: '',
      category: [],
      infoTitle: '',
      price: 0,
      discount: 0,
      productQuantity: 0,
      packageQuantity: '',
      tabletSize: 0,
      sold: 0,
      mainDaleOfWeek: false,
      description: '',
      descriptionPoints: [''],
      ingredientInfo: '',
      nutritionalInfo: '',
      usageInfo: '',
      warningInfo: '',
      allergenInfo: '',
      supplementInfo: '',
      mainImage: '',
      secondaryImages: [],
      supplementFacts: [],
      rating: []
    }
  });
  
  const { fields: descriptionPointsFields, append: appendDescriptionPoint, remove: removeDescriptionPoint } = 
    useFieldArray({
      control, 
      name: 'descriptionPoints' as any
    });
    
  const { fields: supplementFactsFields, append: appendSupplementFact, remove: removeSupplementFact } = 
    useFieldArray({
      control, 
      name: 'supplementFacts' as any
    });
  
  // Add secondary image URL
  const handleAddSecondaryImage = () => {
    if (newImageUrl.trim()) {
      const currentImages = getValues('secondaryImages');
      setValue('secondaryImages', [...currentImages, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };
  
  // Remove image from secondaryImages
  const removeSecondaryImage = (index: number) => {
    const currentImages = getValues('secondaryImages');
    setValue('secondaryImages', currentImages.filter((_, i) => i !== index));
  };
  
  // Handle category input (comma-separated)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(',').map(cat => cat.trim()).filter(cat => cat);
    setValue('category', categories);
  };

  const onSubmit = async (data: VitaminForm) => {
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const response = await fetch('/api/supplements/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Vitamin created successfully!' });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to create vitamin' });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'An error occurred while creating the vitamin' });
      setIsSubmitting(false);
    }
  };

  // Watch the mainImage value for preview
  const mainImageValue = watch('mainImage');
  const secondaryImagesValue = watch('secondaryImages');
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Add New Vitamin</h1>
        <Link href="/dashboard" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>
      
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'basic' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('basic')}
          type="button"
        >
          Basic Info
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'description' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('description')}
          type="button"
        >
          Description
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'details' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('details')}
          type="button"
        >
          Product Details
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'images' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('images')}
          type="button"
        >
          Images
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Basic Information Section */}
        <div className={`${styles.formSection} ${activeTab === 'basic' ? styles.activeSection : styles.hiddenSection}`}>
          <h2>Basic Information</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Product Name*</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Product name is required' })}
                className={styles.input}
              />
              {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="infoTitle">Info Title</label>
              <input
                type="text"
                id="infoTitle"
                {...register('infoTitle')}
                className={styles.input}
                placeholder="Short catchy title"
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Categories</label>
              <input
                type="text"
                id="category"
                value={getValues('category').join(', ')}
                onChange={handleCategoryChange}
                className={styles.input}
                placeholder="Separate with commas (e.g., Vitamin D, Immune Support)"
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price ($)*</label>
              <input
                type="number"
                id="price"
                {...register('price', { required: 'Price is required', min: 0 })}
                step="0.01"
                min="0"
                className={styles.input}
              />
              {errors.price && <p className={styles.errorText}>{errors.price.message}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="discount">Discount (%)</label>
              <input
                type="number"
                id="discount"
                {...register('discount')}
                min="0"
                max="100"
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="productQuantity">Inventory Quantity*</label>
              <input
                type="number"
                id="productQuantity"
                {...register('productQuantity', { required: 'Inventory quantity is required', min: 0 })}
                min="0"
                className={styles.input}
              />
              {errors.productQuantity && <p className={styles.errorText}>{errors.productQuantity.message}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="packageQuantity">Package Size</label>
              <input
                type="text"
                id="packageQuantity"
                {...register('packageQuantity')}
                className={styles.input}
                placeholder="e.g., 60 tablets, 120 capsules"
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="tabletSize">Tablet Size (mg)</label>
              <input
                type="number"
                id="tabletSize"
                {...register('tabletSize', { min: 0 })}
                min="0"
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="sold">Units Sold</label>
              <input
                type="number"
                id="sold"
                {...register('sold', { min: 0 })}
                min="0"
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                {...register('mainDaleOfWeek')}
              />
              Feature as Deal of the Week
            </label>
          </div>
        </div>
        
        {/* Description Section */}
        <div className={`${styles.formSection} ${activeTab === 'description' ? styles.activeSection : styles.hiddenSection}`}>
          <h2>Product Description</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">General Description</label>
            <div className={styles.editorContainer}>
              <textarea
                id="description"
                {...register('description')}
                className={styles.textarea}
                placeholder="Enter a detailed description of the product"
              ></textarea>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Key Benefits & Features</label>
            <div className={styles.descriptionPointsContainer}>
              {descriptionPointsFields.map((field, index) => (
                <div key={field.id} className={styles.descriptionPointItem}>
                  <div className={styles.pointNumbering}>{index + 1}</div>
                  <div className={styles.pointInputContainer}>
                    <input
                      type="text"
                      {...register(`descriptionPoints.${index}` as const)}
                      className={styles.input}
                      placeholder="Add a key feature or benefit"
                    />
                    {descriptionPointsFields.length > 1 && (
                      <button
                        type="button"
                        className={styles.removePointButton}
                        onClick={() => removeDescriptionPoint(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className={styles.addPointButton}
                onClick={() => appendDescriptionPoint('')}
              >
                + Add Another Point
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Details Section */}
        <div className={`${styles.formSection} ${activeTab === 'details' ? styles.activeSection : styles.hiddenSection}`}>
          <h2>Product Details</h2>
          
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h3>Ingredients</h3>
              <textarea
                id="ingredientInfo"
                {...register('ingredientInfo')}
                className={styles.textarea}
                placeholder="List all ingredients"
              ></textarea>
            </div>
            
            <div className={styles.detailCard}>
              <h3>Nutritional Information</h3>
              <textarea
                id="nutritionalInfo"
                {...register('nutritionalInfo')}
                className={styles.textarea}
                placeholder="Nutritional information"
              ></textarea>
            </div>
            
            <div className={styles.detailCard}>
              <h3>Usage Instructions</h3>
              <textarea
                id="usageInfo"
                {...register('usageInfo')}
                className={styles.textarea}
                placeholder="How to use the product"
              ></textarea>
            </div>
            
            <div className={styles.detailCard}>
              <h3>Warnings</h3>
              <textarea
                id="warningInfo"
                {...register('warningInfo')}
                className={styles.textarea}
                placeholder="Any warnings or precautions"
              ></textarea>
            </div>
            
            <div className={styles.detailCard}>
              <h3>Allergen Information</h3>
              <textarea
                id="allergenInfo"
                {...register('allergenInfo')}
                className={styles.textarea}
                placeholder="Any allergens in the product"
              ></textarea>
            </div>
            
            <div className={styles.detailCard}>
              <h3>Supplement Information</h3>
              <textarea
                id="supplementInfo"
                {...register('supplementInfo')}
                className={styles.textarea}
                placeholder="Additional supplement information"
              ></textarea>
            </div>
          </div>
          
          <div className={styles.supplementFactsSection}>
            <h3>Supplement Facts</h3>
            <p className={styles.infoText}>Add specific supplement facts (e.g., Vitamin D: 1000 IU)</p>
            
            {supplementFactsFields.map((fact, index) => (
              <div key={fact.id} className={styles.supplementFactRow}>
                <div className={styles.factProperty}>
                  <input
                    type="text"
                    {...register(`supplementFacts.${index}.title` as const)}
                    className={styles.input}
                    placeholder="Nutrient"
                  />
                </div>
                
                <div className={styles.factValue}>
                  <input
                    type="text"
                    {...register(`supplementFacts.${index}.info` as const)}
                    className={styles.input}
                    placeholder="Amount"
                  />
                </div>
                
                <button
                  type="button"
                  className={styles.removeFactButton}
                  onClick={() => removeSupplementFact(index)}
                >
                  ×
                </button>
              </div>
            ))}
            
            <button
              type="button"
              className={styles.addFactButton}
              onClick={() => appendSupplementFact({ title: '', info: '' })}
            >
              + Add Supplement Fact
            </button>
          </div>
        </div>
        
        {/* Images Section */}
        <div className={`${styles.formSection} ${activeTab === 'images' ? styles.activeSection : styles.hiddenSection}`}>
          <h2>Product Images</h2>
          
          <div className={styles.imageSection}>
            <div className={styles.mainImageContainer}>
              <h3>Main Product Image</h3>
              <div className={styles.formGroup}>
                <label htmlFor="mainImage">Main Image URL</label>
                <input
                  type="url"
                  id="mainImage"
                  {...register('mainImage')}
                  className={styles.input}
                  placeholder="Enter the URL of the main product image"
                />
                
                {mainImageValue && (
                  <div className={styles.mainImagePreview}>
                    <img src={mainImageValue} alt="Main product preview" />
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.additionalImagesContainer}>
              <h3>Additional Images</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="newImageUrl">Add Image URL</label>
                <div className={styles.imageUrlInputGroup}>
                  <input
                    type="url"
                    id="newImageUrl"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className={styles.input}
                    placeholder="Enter image URL"
                  />
                  <button
                    type="button"
                    onClick={handleAddSecondaryImage}
                    className={styles.addUrlButton}
                    disabled={!newImageUrl.trim()}
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {secondaryImagesValue.length > 0 && (
                <div className={styles.secondaryImagesGrid}>
                  {secondaryImagesValue.map((url, index) => (
                    <div key={index} className={styles.secondaryImageItem}>
                      <div className={styles.imagePreview}>
                        <img src={url} alt={`Product view ${index + 1}`} />
                        <button
                          type="button"
                          className={styles.removeImageButton}
                          onClick={() => removeSecondaryImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}