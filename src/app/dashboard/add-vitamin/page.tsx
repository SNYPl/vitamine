"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./addVitamin.module.scss";
import Link from "next/link";
import { categories } from "@/data/categories";
import Image from "next/image";
import { useQueryClient } from "react-query";

export const dynamic = "force-dynamic";

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
  country: string;
  mainDaleOfWeek: boolean;
  daleOfWeek: boolean;
  isFeatured: boolean;
  mainImage: string;
  images: string[];
  rating: number[];
  about: string;
  description: string[];
  use: string;
  otherIngredients: string[];
  warning: string;
  supplementFacts: SupplementFact[];
  tags: string[];
  review: any[];
}

export default function AddVitamin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [newImageUrl, setNewImageUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [newTag, setNewTag] = useState("");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      tags: [],
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
  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);

      // Create a preview URL for the selected file
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setValue("mainImage", event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAdditionalImagesSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAdditionalImageFiles((prev) => [...prev, ...newFiles]);

      // Create preview URLs for all selected files
      const currentImages = getValues("images") || [];
      const newPreviews: string[] = [];

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string);
            if (newPreviews.length === newFiles.length) {
              setValue("images", [...currentImages, ...newPreviews]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImageFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    const currentImages = getValues("images");
    setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  // Handle tags
  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = getValues("tags");
      setValue("tags", [...currentTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    const currentTags = getValues("tags");
    setValue(
      "tags",
      currentTags.filter((_, i) => i !== index)
    );
  };

  // Add this function back to handle adding images via URL
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const currentImages = getValues("images");
      setValue("images", [...currentImages, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const onSubmit = async (data: VitaminForm) => {
    setIsSubmitting(true);
    setIsUploading(true);
    setMessage({ type: "", text: "" });

    try {
      // Upload main image if selected
      let mainImageUrl = data.mainImage;
      if (mainImageFile) {
        setUploadProgress(10);
        const formData = new FormData();
        formData.append("file", mainImageFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload main image");
        }

        const uploadResult = await uploadResponse.json();
        mainImageUrl = uploadResult.url;
        setUploadProgress(40);
      }

      // Upload additional images if selected
      let additionalImageUrls = data.images.filter((url) =>
        url.startsWith("http")
      );
      if (additionalImageFiles.length > 0) {
        setUploadProgress(50);

        const uploadPromises = additionalImageFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload additional image");
          }

          const uploadResult = await uploadResponse.json();
          return uploadResult.url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        additionalImageUrls = [...additionalImageUrls, ...uploadedUrls];
        setUploadProgress(80);
      }

      // Update the form data with the S3 URLs
      const formData = {
        ...data,
        mainImage: mainImageUrl,
        images: additionalImageUrls,
      };

      setUploadProgress(90);

      // Send the data to your API
      const response = await fetch("/api/supplements/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      const result = await response.json();
      setUploadProgress(100);
      setIsUploading(false);

      if (response.ok) {
        setMessage({ type: "success", text: "Vitamin created successfully!" });

        // More effective cache invalidation for production
        queryClient.clear(); // Clear the entire cache

        // Specific invalidation for dashboard
        await queryClient.invalidateQueries("dashboardVitamins");
        await queryClient.refetchQueries("dashboardVitamins");

        // Force refresh on redirect with timestamp to bust browser cache
        setTimeout(() => {
          router.replace(`/dashboard?t=${Date.now()}`);
        }, 1500);
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
      setIsUploading(false);
    }
  };

  // Watch values for previews
  const mainImageValue = watch("mainImage");
  const imagesValue = watch("images");
  const descriptionFields = watch("description");
  const ingredientFields = watch("otherIngredients");
  const supplementFactsFields = watch("supplementFacts");
  const tagsValues = watch("tags");

  return (
    <div className={styles.editForm}>
      <h1 className={styles.formTitle}>დაამატე ვიტამინი</h1>

      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>ინფორმაცია</h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">სახელი:</label>
            <input
              type="text"
              id="name"
              className={styles.formInput}
              {...register("name", { required: "Product name is required" })}
              required
            />
            {errors.name && (
              <p className={styles.errorText}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">კატეგორიები (comma-separated):</label>
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
            <label htmlFor="infoTitle">მოკლე აღწერა:</label>
            <textarea
              id="infoTitle"
              className={styles.formTextarea}
              {...register("infoTitle")}
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">ფასი:</label>
            <input
              type="number"
              id="price"
              className={styles.formInput}
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
            <label htmlFor="discount">ფასდაკლება (optional):</label>
            <input
              type="number"
              id="discount"
              className={styles.formInput}
              {...register("discount")}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="productQuantity">პროდუქტის რაოდენობა:</label>
              <input
                type="number"
                id="productQuantity"
                className={styles.formInput}
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
              <label htmlFor="packageQuantity">ტაბლეტების რაოდენობა:</label>
              <input
                type="text"
                id="packageQuantity"
                className={styles.formInput}
                {...register("packageQuantity")}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="tabletSize">ტაბლეტის ზომა:</label>
              <input
                type="number"
                id="tabletSize"
                className={styles.formInput}
                {...register("tabletSize")}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sold">რამდენი გაიყიდა:</label>
              <input
                type="number"
                id="sold"
                className={styles.formInput}
                {...register("sold")}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mainImage">მთავარი ფოტო:</label>
            <div className={styles.imageUploadContainer}>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  id="mainImageUpload"
                  accept="image/*"
                  onChange={handleMainImageSelect}
                  className={styles.fileInput}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("mainImageUpload")?.click()
                  }
                  className={styles.uploadButton}
                >
                  Select Image
                </button>
                <span className={styles.fileName}>
                  {mainImageFile ? mainImageFile.name : "No file selected"}
                </span>
              </div>

              {/* Show direct URL input as alternative */}
              <div className={styles.formGroup}>
                <label htmlFor="mainImageUrl">ან შეიყვანე ლინკი:</label>
                <input
                  type="text"
                  id="mainImageUrl"
                  className={styles.formInput}
                  {...register("mainImage")}
                />
              </div>

              {/* Image preview */}
              {mainImageValue && (
                <div className={styles.mainImagePreview}>
                  <img
                    src={mainImageValue}
                    alt="Main product preview"
                    className={styles.previewImage}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="isFeatured"
                {...register("isFeatured")}
              />
              <label htmlFor="isFeatured">გამორჩეული დამატება</label>
            </div>

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="mainDaleOfWeek"
                {...register("mainDaleOfWeek")}
              />
              <label htmlFor="mainDaleOfWeek">მთავარი კვირის შეთავაზება</label>
            </div>

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="daleOfWeek"
                {...register("daleOfWeek")}
              />
              <label htmlFor="daleOfWeek">კვირის შეთავაზება</label>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>სხვა ფოტოები</h2>

          <div className={styles.formGroup}>
            <label htmlFor="additionalImages">ატვირთე სხვა ფოტოები:</label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                id="additionalImagesUpload"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesSelect}
                className={styles.fileInput}
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("additionalImagesUpload")?.click()
                }
                className={styles.uploadButton}
              >
                Select Images
              </button>
              <span className={styles.fileName}>
                {additionalImageFiles.length > 0
                  ? `${additionalImageFiles.length} files selected`
                  : "No files selected"}
              </span>
            </div>

            {/* Direct URL input */}
            <div className={styles.imageUrlInputGroup}>
              <input
                type="text"
                id="newImageUrl"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className={styles.formInput}
                placeholder="Enter image URL"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className={styles.addButton}
                disabled={!newImageUrl.trim()}
              >
                Add Image URL
              </button>
            </div>
          </div>

          {/* Image previews */}
          {imagesValue.length > 0 && (
            <div className={styles.additionalImagesGrid}>
              {imagesValue.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <div className={styles.imagePreview}>
                    <img src={image} alt={`Product ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className={styles.removeImageButton}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>აღწერა</h2>

          <div className={styles.formGroup}>
            <label htmlFor="about">აღწერის ტექსტი:</label>
            <textarea
              id="about"
              className={styles.formTextarea}
              {...register("about")}
              rows={6}
            />
          </div>

          <h3 className={styles.subtitle}>აღწერის სია</h3>
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
                წაშალე
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addDescriptionPoint}
            className={styles.addButton}
          >
            დაამატე აღწერა
          </button>

          <div className={styles.formGroup}>
            <label htmlFor="use">გამოყენების ინსტრუქცია:</label>
            <textarea
              id="use"
              className={styles.formTextarea}
              {...register("use")}
              rows={3}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>ინგრედიენტები და გაფრთხილება</h2>

          <h3 className={styles.subtitle}>სხვა ინგრედიენტების სია</h3>
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
                წაშალე
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredient}
            className={styles.addButton}
          >
            დაამატე ინგრედიენტი
          </button>

          <div className={styles.formGroup}>
            <label htmlFor="warning">გაფრთხილება:</label>
            <textarea
              id="warning"
              className={styles.formTextarea}
              {...register("warning")}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>პროდუქტის ფაქტები</h2>

          {supplementFactsFields.map((fact, index) => (
            <div key={index} className={styles.factItem}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>სახელი:</label>
                  <input
                    type="text"
                    value={fact.title}
                    onChange={(e) =>
                      handleSupplementFactChange(e, index, "title")
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>ინფო:</label>
                  <input
                    type="text"
                    value={fact.info}
                    onChange={(e) =>
                      handleSupplementFactChange(e, index, "info")
                    }
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
          <h2 className={styles.sectionTitle}>სხვა ინფორმაცია</h2>

          <div className={styles.formGroup}>
            <label htmlFor="country">ქვეყანა:</label>
            <select
              id="country"
              className={`${styles.formSelect} ${styles.select}`}
              {...register("country")}
            >
              <option value="">აირჩიე ქვეყანა</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="Germany">Germany</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>თაგები (სერჩისთვის):</label>
            <div className={styles.tagInputContainer}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter a tag and press Add"
                className={styles.formInput}
              />
              <button
                type="button"
                onClick={addTag}
                className={styles.addButton}
                disabled={!newTag.trim()}
              >
                დაამატე თეგი
              </button>
            </div>

            <div className={styles.tagsContainer}>
              {tagsValues.map((tag, index) => (
                <div key={index} className={styles.tagItem}>
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className={styles.removeTagButton}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
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
            {isSubmitting ? "ემატება..." : "დაამატე პროდუქტი"}
          </button>
        </div>
      </form>

      {/* Upload progress indicator */}
      {isUploading && (
        <div className={styles.uploadProgressContainer}>
          <div
            className={styles.uploadProgressBar}
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <span className={styles.uploadProgressText}>
            იტვირთება... {uploadProgress}%
          </span>
        </div>
      )}
    </div>
  );
}
