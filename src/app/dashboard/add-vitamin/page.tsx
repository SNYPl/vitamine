"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./addVitamin.module.css";
import Link from "next/link";
import { categories } from "@/data/categories";

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
  daleOfWeek: boolean;
  isFeatured: boolean;
  mainImage: string;
  images: string[];
  about: string;
  description: string[];
  use: string;
  otherIngredients: string[];
  warning: string;
  supplementFacts: SupplementFact[];
  country: string;
  tags: string;
  review: any[];
  rating: any[];
}

export default function AddVitamin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [newImageUrl, setNewImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<VitaminForm>({
    defaultValues: {
      name: "",
      category: [],
      infoTitle: "",
      price: 0,
      discount: 0,
      productQuantity: 0,
      packageQuantity: "",
      tabletSize: 0,
      sold: 0,
      mainDaleOfWeek: false,
      daleOfWeek: false,
      isFeatured: false,
      about: "",
      description: [""],
      use: "",
      otherIngredients: [""],
      warning: "",
      mainImage: "",
      images: [],
      supplementFacts: [{ title: "", info: "" }],
      country: "",
      tags: "",
      review: [],
      rating: [],
    },
  });

  // Handle description points
  const addDescriptionPoint = () => {
    const currentDescription = getValues("description");
    setValue("description", [...currentDescription, ""]);
  };

  const removeDescriptionPoint = (index: number) => {
    const currentDescription = getValues("description");
    setValue(
      "description",
      currentDescription.filter((_, i) => i !== index)
    );
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const currentDescription = getValues("description");
    const updatedDescription = [...currentDescription];
    updatedDescription[index] = e.target.value;
    setValue("description", updatedDescription);
  };

  // Handle ingredients
  const addIngredient = () => {
    const currentIngredients = getValues("otherIngredients");
    setValue("otherIngredients", [...currentIngredients, ""]);
  };

  const removeIngredient = (index: number) => {
    const currentIngredients = getValues("otherIngredients");
    setValue(
      "otherIngredients",
      currentIngredients.filter((_, i) => i !== index)
    );
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const currentIngredients = getValues("otherIngredients");
    const updatedIngredients = [...currentIngredients];
    updatedIngredients[index] = e.target.value;
    setValue("otherIngredients", updatedIngredients);
  };

  // Handle supplement facts
  const addSupplementFact = () => {
    const currentFacts = getValues("supplementFacts");
    setValue("supplementFacts", [...currentFacts, { title: "", info: "" }]);
  };

  const removeSupplementFact = (index: number) => {
    const currentFacts = getValues("supplementFacts");
    setValue(
      "supplementFacts",
      currentFacts.filter((_, i) => i !== index)
    );
  };

  const handleSupplementFactChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: "title" | "info"
  ) => {
    const { value } = e.target;
    const newFacts = [...getValues("supplementFacts")];
    newFacts[index][key] = value;
    setValue("supplementFacts", newFacts);
  };

  // Handle images
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const currentImages = getValues("images");
      setValue("images", [...currentImages, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    const currentImages = getValues("images");
    setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: VitaminForm) => {
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/supplements/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Vitamin created successfully!" });
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to create vitamin",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "An error occurred while creating the vitamin",
      });
      setIsSubmitting(false);
    }
  };

  // Watch values for previews
  const mainImageValue = watch("mainImage");
  const imagesValue = watch("images");
  const descriptionFields = watch("description");
  const ingredientFields = watch("otherIngredients");
  const supplementFactsFields = watch("supplementFacts");

  return (
    <div className={styles.editForm}>
      <h1>Add New Vitamin</h1>

      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formSection}>
          <h2>Basic Information</h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Product name is required" })}
              required
            />
            {errors.name && (
              <p className={styles.errorText}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Categories (comma-separated):</label>
            <div className={styles.categoriesCheckboxGroup}>
              {categories
                .filter((cat) => cat.value !== "all")
                .map((category) => (
                  <label
                    key={category.value}
                    className={styles.categoryCheckboxLabel}
                  >
                    <input
                      type="checkbox"
                      value={category.value}
                      onChange={(e) => {
                        const selectedCategories = getValues("category") || [];
                        if (e.target.checked) {
                          // Add category if checked
                          setValue("category", [
                            ...selectedCategories,
                            category.value,
                          ]);
                        } else {
                          // Remove category if unchecked
                          setValue(
                            "category",
                            selectedCategories.filter(
                              (cat) => cat !== category.value
                            )
                          );
                        }
                      }}
                      checked={watch("category")?.includes(category.value)}
                      className={styles.categoryCheckbox}
                    />
                    {category.name}
                  </label>
                ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="infoTitle">Info Title:</label>
            <textarea
              id="infoTitle"
              {...register("infoTitle")}
              rows={3}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                required
              />
              {errors.price && (
                <p className={styles.errorText}>{errors.price.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="discount">Discount (optional):</label>
              <input
                type="number"
                id="discount"
                {...register("discount")}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="productQuantity">Product Quantity:</label>
              <input
                type="number"
                id="productQuantity"
                {...register("productQuantity", {
                  required: "Inventory quantity is required",
                  min: 0,
                })}
                required
              />
              {errors.productQuantity && (
                <p className={styles.errorText}>
                  {errors.productQuantity.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="packageQuantity">Package Quantity:</label>
              <input
                type="text"
                id="packageQuantity"
                {...register("packageQuantity")}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="tabletSize">Tablet Size:</label>
              <input
                type="number"
                id="tabletSize"
                {...register("tabletSize")}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sold">Sold:</label>
              <input
                type="number"
                id="sold"
                {...register("sold")}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mainImage">Main Image URL:</label>
            <input
              type="text"
              id="mainImage"
              {...register("mainImage")}
            />
            {mainImageValue && (
              <img 
                src={mainImageValue} 
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
                {...register("isFeatured")}
              />
              <label htmlFor="isFeatured">Featured Product</label>
            </div>

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="mainDaleOfWeek"
                {...register("mainDaleOfWeek")}
              />
              <label htmlFor="mainDaleOfWeek">Main Deal of Week</label>
            </div>

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="daleOfWeek"
                {...register("daleOfWeek")}
              />
              <label htmlFor="daleOfWeek">Deal of Week</label>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Images</h2>

          <div className={styles.formGroup}>
            <div className={styles.imageUrlInputGroup}>
              <input
                type="text"
                id="newImageUrl"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className={styles.input}
                placeholder="Enter image URL"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className={styles.addButton}
                disabled={!newImageUrl.trim()}
              >
                Add Image
              </button>
            </div>
          </div>

          {imagesValue.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <input
                type="text"
                value={image}
                onChange={(e) => {
                  const newImages = [...imagesValue];
                  newImages[index] = e.target.value;
                  setValue("images", newImages);
                }}
              />
              <button 
                type="button" 
                onClick={() => removeImage(index)}
                className={styles.removeButton}
              >
                Remove
              </button>
              <img src={image} alt={`Product ${index + 1}`} className={styles.previewImage} />
            </div>
          ))}
        </div>

        <div className={styles.formSection}>
          <h2>Description</h2>

          <div className={styles.formGroup}>
            <label htmlFor="about">About:</label>
            <textarea
              id="about"
              {...register("about")}
              rows={6}
            />
          </div>

          <h3>Description Points</h3>
          {descriptionFields.map((desc, index) => (
            <div key={index} className={styles.arrayItem}>
              <input
                type="text"
                value={desc}
                onChange={(e) => handleDescriptionChange(e, index)}
              />
              <button 
                type="button" 
                onClick={() => removeDescriptionPoint(index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}

          <button 
            type="button" 
            onClick={addDescriptionPoint}
            className={styles.addButton}
          >
            Add Description Point
          </button>

          <div className={styles.formGroup}>
            <label htmlFor="use">Usage Instructions:</label>
            <textarea
              id="use"
              {...register("use")}
              rows={3}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Ingredients & Warnings</h2>

          <h3>Other Ingredients</h3>
          {ingredientFields.map((ingredient, index) => (
            <div key={index} className={styles.arrayItem}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              <button 
                type="button" 
                onClick={() => removeIngredient(index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}

          <button 
            type="button" 
            onClick={addIngredient}
            className={styles.addButton}
          >
            Add Ingredient
          </button>

          <div className={styles.formGroup}>
            <label htmlFor="warning">Warning:</label>
            <textarea
              id="warning"
              {...register("warning")}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Supplement Facts</h2>

          {supplementFactsFields.map((fact, index) => (
            <div key={index} className={styles.factItem}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Title:</label>
                  <input
                    type="text"
                    value={fact.title}
                    onChange={(e) => handleSupplementFactChange(e, index, "title")}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Info:</label>
                  <input
                    type="text"
                    value={fact.info}
                    onChange={(e) => handleSupplementFactChange(e, index, "info")}
                  />
                </div>

                <button 
                  type="button" 
                  onClick={() => removeSupplementFact(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button 
            type="button" 
            onClick={addSupplementFact}
            className={styles.addButton}
          >
            Add Supplement Fact
          </button>
        </div>

        <div className={styles.formSection}>
          <h2>Additional Information</h2>

          <div className={styles.formGroup}>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              {...register("country")}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tags">Tags (for search):</label>
            <textarea
              id="tags"
              {...register("tags")}
              rows={3}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => router.push('/dashboard')}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
