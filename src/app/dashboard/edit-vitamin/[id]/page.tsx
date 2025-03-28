"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./edit.module.css";
import Image from "next/image";
import { useQueryClient } from "react-query";
// Remove the direct S3 upload imports as they won't work client-side
// import { uploadImageToS3, uploadMultipleImagesToS3 } from "@/lib/s3-upload";

export const dynamic = "force-dynamic";

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
  const queryClient = useQueryClient();
  const { id } = params;
  const [vitamin, setVitamin] = useState<Vitamin | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeSection, setActiveSection] = useState("info");

  // Refs for each section for scroll navigation
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const imagesSectionRef = useRef<HTMLDivElement>(null);
  const descriptionSectionRef = useRef<HTMLDivElement>(null);
  const ingredientsSectionRef = useRef<HTMLDivElement>(null);
  const factsSectionRef = useRef<HTMLDivElement>(null);
  const otherInfoSectionRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    let ref;
    switch (sectionId) {
      case "info":
        ref = infoSectionRef;
        break;
      case "images":
        ref = imagesSectionRef;
        break;
      case "description":
        ref = descriptionSectionRef;
        break;
      case "ingredients":
        ref = ingredientsSectionRef;
        break;
      case "facts":
        ref = factsSectionRef;
        break;
      case "otherInfo":
        ref = otherInfoSectionRef;
        break;
    }

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const fetchVitamin = async () => {
      try {
        const response = await fetch(`/api/product/get?productId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setVitamin(data[0]);
        } else {
          console.error("Failed to fetch vitamin");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVitamin();
    }
  }, [id]);

  // Use an effect to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for sticky header

      const sections = [
        { id: "info", ref: infoSectionRef },
        { id: "images", ref: imagesSectionRef },
        { id: "description", ref: descriptionSectionRef },
        { id: "ingredients", ref: ingredientsSectionRef },
        { id: "facts", ref: factsSectionRef },
        { id: "otherInfo", ref: otherInfoSectionRef },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (
          section.ref.current &&
          section.ref.current.offsetTop <= scrollPosition
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!vitamin) return;

    const { name, value } = e.target;

    // For nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setVitamin({
        ...vitamin,
        [parent]: {
          ...vitamin[parent as keyof Vitamin],
          [child]: value,
        },
      } as Vitamin);
    } else {
      setVitamin({ ...vitamin, [name]: value } as Vitamin);
    }
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Vitamin
  ) => {
    if (!vitamin) return;

    const { value } = e.target;
    const newArray = [...(vitamin[field] as any[])];
    newArray[index] = value;

    setVitamin({ ...vitamin, [field]: newArray } as Vitamin);
  };

  const addArrayItem = (field: keyof Vitamin) => {
    if (!vitamin) return;

    setVitamin({
      ...vitamin,
      [field]: [...(vitamin[field] as any[]), ""],
    } as Vitamin);
  };

  const removeArrayItem = (index: number, field: keyof Vitamin) => {
    if (!vitamin) return;

    const newArray = [...(vitamin[field] as any[])];
    newArray.splice(index, 1);

    setVitamin({ ...vitamin, [field]: newArray } as Vitamin);
  };

  const handleSupplementFactChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: "title" | "info"
  ) => {
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
      supplementFacts: [...vitamin.supplementFacts, { title: "", info: "" }],
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
    setVitamin({
      ...vitamin,
      category: value.split(",").map((cat) => cat.trim()),
    } as Vitamin);
  };

  // New image handling functions using API endpoints
  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);

      // Create a preview URL for the selected file
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && vitamin) {
          setVitamin({
            ...vitamin,
            mainImage: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAdditionalImagesSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!vitamin || !e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);
    setAdditionalImageFiles((prev) => [...prev, ...newFiles]);

    // Create preview URLs for all selected files
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && vitamin) {
          setVitamin({
            ...vitamin,
            images: [...vitamin.images, event.target.result as string],
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImage = (index: number) => {
    if (!vitamin) return;

    // If the image is from the new uploads, also remove it from the files array
    if (index >= vitamin.images.length - additionalImageFiles.length) {
      const fileIndex =
        index - (vitamin.images.length - additionalImageFiles.length);
      setAdditionalImageFiles((prev) => {
        const newFiles = [...prev];
        newFiles.splice(fileIndex, 1);
        return newFiles;
      });
    }

    // Remove from the vitamin state
    const newImages = [...vitamin.images];
    newImages.splice(index, 1);
    setVitamin({
      ...vitamin,
      images: newImages,
    });
  };

  const handleAddImageByUrl = () => {
    if (!vitamin || !newImageUrl.trim()) return;

    setVitamin({
      ...vitamin,
      images: [...vitamin.images, newImageUrl.trim()],
    });
    setNewImageUrl("");
  };

  // Upload a file to S3 via the API endpoint
  const uploadFileToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  // Upload multiple files to S3 via the API endpoint
  const uploadMultipleFilesToS3 = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    const formData = new FormData();

    // The server endpoint expects files as direct entries in formData
    // Not as file0, file1, etc.
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch("/api/upload-multiple", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const data = await response.json();
      return data.urls;
    } catch (error) {
      console.error("Error uploading multiple files:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vitamin) return;

    setSaving(true);
    setIsUploading(true);
    setMessage({ type: "", text: "" });

    try {
      setUploadProgress(10);

      // Upload main image if a new one was selected
      let mainImageUrl = vitamin.mainImage;
      if (mainImageFile) {
        // Only upload if it's a data URL from the preview
        if (mainImageUrl.startsWith("data:")) {
          try {
            mainImageUrl = await uploadFileToS3(mainImageFile);
            setUploadProgress(40);
          } catch (error) {
            console.error("Error uploading main image:", error);
            setMessage({ type: "error", text: "Failed to upload main image" });
            setSaving(false);
            setIsUploading(false);
            return;
          }
        }
      }

      // Upload additional images if any new ones were selected
      setUploadProgress(50);
      let allImages = [...vitamin.images];

      // Find any data URLs from previews that need to be uploaded
      const dataUrlIndices: number[] = [];
      const dataUrlsToUpload: { url: string; index: number }[] = [];
      const filesToUpload: File[] = [];

      // First collect all the data URLs that need to be replaced
      vitamin.images.forEach((url, index) => {
        if (url.startsWith("data:")) {
          dataUrlIndices.push(index);
          dataUrlsToUpload.push({ url, index });
        }
      });

      // Match files to data URLs where possible
      const remainingFiles: File[] = [...additionalImageFiles];
      const unmatchedDataUrls: number[] = [];

      // Only attempt to match if we have both files and data URLs
      if (dataUrlsToUpload.length > 0 && remainingFiles.length > 0) {
        // We don't have a reliable way to match data URLs to files
        // Just use them in order and ensure we don't exceed either array's bounds
        for (
          let i = 0;
          i < Math.min(dataUrlsToUpload.length, remainingFiles.length);
          i++
        ) {
          filesToUpload.push(remainingFiles[i]);
        }

        // Add any remaining files that didn't get matched
        if (remainingFiles.length > dataUrlsToUpload.length) {
          for (
            let i = dataUrlsToUpload.length;
            i < remainingFiles.length;
            i++
          ) {
            filesToUpload.push(remainingFiles[i]);
          }
        }

        // Track data URLs that didn't get matched to files
        if (dataUrlsToUpload.length > remainingFiles.length) {
          for (
            let i = remainingFiles.length;
            i < dataUrlsToUpload.length;
            i++
          ) {
            unmatchedDataUrls.push(dataUrlsToUpload[i].index);
          }
        }
      } else {
        // If we don't have both, just add all files
        filesToUpload.push(...remainingFiles);

        // And track all data URLs as unmatched
        unmatchedDataUrls.push(...dataUrlIndices);
      }

      if (filesToUpload.length > 0) {
        try {
          const uploadedUrls = await uploadMultipleFilesToS3(filesToUpload);

          // Replace data URLs with actual S3 URLs
          if (uploadedUrls.length > 0) {
            const newImages = [...allImages];
            let uploadedIndex = 0;

            // First replace the data URLs that match with files we uploaded
            for (let i = 0; i < dataUrlIndices.length; i++) {
              if (
                !unmatchedDataUrls.includes(dataUrlIndices[i]) &&
                uploadedIndex < uploadedUrls.length
              ) {
                newImages[dataUrlIndices[i]] = uploadedUrls[uploadedIndex];
                uploadedIndex++;
              }
            }

            // Add any remaining uploaded URLs as new images
            while (uploadedIndex < uploadedUrls.length) {
              newImages.push(uploadedUrls[uploadedIndex]);
              uploadedIndex++;
            }

            allImages = newImages;
          }

          setUploadProgress(80);
        } catch (error) {
          console.error("Error uploading additional images:", error);
          setMessage({
            type: "error",
            text: "Failed to upload additional images",
          });
          setSaving(false);
          setIsUploading(false);
          return;
        }
      }

      // Update the vitamin data with S3 URLs
      const updatedVitamin = {
        ...vitamin,
        mainImage: mainImageUrl,
        images: allImages.filter((url) => !url.startsWith("data:")),
      };

      setUploadProgress(90);

      // Send the updated data to the API
      const response = await fetch(`/api/product/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVitamin),
      });

      setUploadProgress(100);

      if (response.ok) {
        setMessage({ type: "success", text: "Vitamin updated successfully!" });

        // More effective cache invalidation for production
        queryClient.clear(); // Clear the entire cache

        // Specific invalidation for dashboard
        await queryClient.invalidateQueries("dashboardVitamins");
        await queryClient.refetchQueries("dashboardVitamins");

        // Force refresh on redirect with timestamp to bust browser cache
        setTimeout(() => {
          router.push(`/dashboard?t=${Date.now()}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text: errorData.message || "Failed to update vitamin",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "An error occurred while updating the vitamin",
      });
    } finally {
      setSaving(false);
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading vitamin data...</p>
      </div>
    );
  }

  if (!vitamin) {
    return <div className={styles.notFound}>Vitamin not found</div>;
  }

  return (
    <div className={styles.editContainer}>
      {/* Sticky header with save controls */}
      <div className={styles.stickyHeader}>
        <h1 className={styles.productTitle}>{vitamin.name}</h1>
        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className={styles.cancelButton}
            disabled={saving}
          >
            უკან
          </button>
          <button
            type="button"
            onClick={() =>
              document.getElementById("submit-form-button")?.click()
            }
            className={styles.saveButton}
            disabled={saving}
          >
            {saving ? "ინახება..." : "შეინახე"}
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <div className={styles.editLayout}>
        {/* Sidebar navigation */}
        <div className={styles.sidebar}>
          <nav className={styles.sectionNav}>
            <button
              className={`${styles.navButton} ${
                activeSection === "info" ? styles.active : ""
              }`}
              onClick={() => scrollToSection("info")}
            >
              <span className={styles.navIcon}>ℹ️</span>
              ძირითადი ინფორმაცია
            </button>
            <button
              className={`${styles.navButton} ${
                activeSection === "images" ? styles.active : ""
              }`}
              onClick={() => scrollToSection("images")}
            >
              <span className={styles.navIcon}>🖼️</span>
              ფოტოები
            </button>
            <button
              className={`${styles.navButton} ${
                activeSection === "description" ? styles.active : ""
              }`}
              onClick={() => scrollToSection("description")}
            >
              <span className={styles.navIcon}>📝</span>
              აღწერა
            </button>
            <button
              className={`${styles.navButton} ${
                activeSection === "ingredients" ? styles.active : ""
              }`}
              onClick={() => scrollToSection("ingredients")}
            >
              <span className={styles.navIcon}>🧪</span>
              ინგრედიენტები
            </button>
            <button
              className={`${styles.navButton} ${
                activeSection === "facts" ? styles.active : ""
              }`}
              onClick={() => scrollToSection("facts")}
            >
              <span className={styles.navIcon}>📊</span>
              პროდუქტის ფაქტები
            </button>
            <button
              className={`${styles.navButton} ${
                activeSection === "otherInfo" ? styles.active : ""
              }`}
              onClick={() => scrollToSection("otherInfo")}
            >
              <span className={styles.navIcon}>🏷️</span>
              სხვა ინფორმაცია
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className={styles.mainContent}>
          <form id="edit-vitamin-form" onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <div
              className={styles.formSection}
              ref={infoSectionRef}
              id="info-section"
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>ℹ️</span>
                ძირითადი ინფორმაცია
              </h2>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">სახელი:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={vitamin.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="category">კატეგორიები:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={vitamin.category.join(", ")}
                    onChange={handleCategoryChange}
                    className={styles.formInput}
                    placeholder="კატეგორიები, გამოყოფილი მძიმით"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="infoTitle">მოკლე აღწერა:</label>
                  <textarea
                    id="infoTitle"
                    name="infoTitle"
                    value={vitamin.infoTitle}
                    onChange={handleChange}
                    rows={2}
                    className={styles.formTextarea}
                    placeholder="მოკლე ინფორმაცია პროდუქტის შესახებ"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="price">ფასი:</label>
                  <div className={styles.inputWithIcon}>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={vitamin.price}
                      onChange={handleChange}
                      className={styles.formInput}
                      required
                    />
                    <span className={styles.inputIcon}>₾</span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="discount">ფასდაკლება (%):</label>
                  <div className={styles.inputWithIcon}>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      value={vitamin.discount || ""}
                      onChange={handleChange}
                      className={styles.formInput}
                      placeholder="0"
                    />
                    <span className={styles.inputIcon}>%</span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="productQuantity">საწყობის რაოდენობა:</label>
                  <input
                    type="number"
                    id="productQuantity"
                    name="productQuantity"
                    value={vitamin.productQuantity}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="packageQuantity">შეფუთვის რაოდენობა:</label>
                  <input
                    type="text"
                    id="packageQuantity"
                    name="packageQuantity"
                    value={vitamin.packageQuantity}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="მაგ. 60 ტაბლეტი"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="tabletSize">ტაბლეტის ზომა (მგ):</label>
                  <input
                    type="number"
                    id="tabletSize"
                    name="tabletSize"
                    value={vitamin.tabletSize}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="მილიგრამებში"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="sold">გაყიდულია:</label>
                  <input
                    type="number"
                    id="sold"
                    name="sold"
                    value={vitamin.sold}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.checkboxGrid}>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={vitamin.isFeatured}
                    onChange={(e) =>
                      setVitamin({ ...vitamin, isFeatured: e.target.checked })
                    }
                  />
                  <label htmlFor="isFeatured">გამორჩეული დამატება</label>
                </div>

                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="mainDaleOfWeek"
                    name="mainDaleOfWeek"
                    checked={vitamin.mainDaleOfWeek}
                    onChange={(e) =>
                      setVitamin({
                        ...vitamin,
                        mainDaleOfWeek: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="mainDaleOfWeek">
                    მთავარი კვირის შეთავაზება
                  </label>
                </div>

                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="daleOfWeek"
                    name="daleOfWeek"
                    checked={vitamin.daleOfWeek}
                    onChange={(e) =>
                      setVitamin({ ...vitamin, daleOfWeek: e.target.checked })
                    }
                  />
                  <label htmlFor="daleOfWeek">კვირის შეთავაზება</label>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div
              className={styles.formSection}
              ref={imagesSectionRef}
              id="images-section"
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🖼️</span>
                პროდუქტის ფოტოები
              </h2>

              {/* Main Image */}
              <div className={styles.mainImageContainer}>
                <h3 className={styles.subsectionTitle}>მთავარი ფოტო</h3>
                <div className={styles.imageUploadLayout}>
                  <div className={styles.imagePreviewArea}>
                    {vitamin.mainImage ? (
                      <img
                        src={vitamin.mainImage}
                        alt="Main product preview"
                        className={styles.mainImagePreview}
                      />
                    ) : (
                      <div className={styles.noImagePlaceholder}>
                        <span>No Image</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.imageUploadControls}>
                    <div className={styles.uploadButtonGroup}>
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("mainImageUpload")?.click()
                        }
                        className={styles.uploadButton}
                      >
                        ფოტოს ატვირთვა
                      </button>
                      <input
                        type="file"
                        id="mainImageUpload"
                        accept="image/*"
                        onChange={handleMainImageSelect}
                        className={styles.fileInput}
                      />
                      {mainImageFile && (
                        <span className={styles.fileName}>
                          {mainImageFile.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.divider}>ან</div>

                    <div className={styles.urlInputGroup}>
                      <label htmlFor="mainImageUrl">ფოტოს ლინკი:</label>
                      <input
                        type="text"
                        id="mainImageUrl"
                        name="mainImage"
                        value={vitamin.mainImage}
                        onChange={handleChange}
                        className={styles.formInput}
                        placeholder="URL-ის შეყვანა"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Images */}
              <div className={styles.additionalImagesContainer}>
                <h3 className={styles.subsectionTitle}>დამატებითი ფოტოები</h3>

                <div className={styles.uploadControls}>
                  <div className={styles.uploadButtonGroup}>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById("additionalImagesUpload")
                          ?.click()
                      }
                      className={styles.uploadButton}
                    >
                      ფოტოების ატვირთვა
                    </button>
                    <input
                      type="file"
                      id="additionalImagesUpload"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesSelect}
                      className={styles.fileInput}
                    />
                    {additionalImageFiles.length > 0 && (
                      <span className={styles.fileName}>
                        {additionalImageFiles.length} ფაილი არჩეულია
                      </span>
                    )}
                  </div>

                  <div className={styles.divider}>ან</div>

                  <div className={styles.urlInputGroup}>
                    <div className={styles.imageUrlInputGroup}>
                      <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className={styles.formInput}
                        placeholder="ფოტოს ლინკი"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageByUrl}
                        className={styles.addButton}
                        disabled={!newImageUrl.trim()}
                      >
                        დამატება
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Gallery */}
                {vitamin.images.length > 0 ? (
                  <div className={styles.imageGallery}>
                    {vitamin.images.map((image, index) => (
                      <div key={index} className={styles.galleryItem}>
                        <div className={styles.imageWrapper}>
                          <img src={image} alt={`Product ${index + 1}`} />
                          <div className={styles.imageControls}>
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(index)}
                              className={styles.removeImageButton}
                              aria-label="Remove image"
                              title="წაშლა"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noImagesMessage}>
                    <p>დამატებითი ფოტოები არ არის დამატებული</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div
              className={styles.formSection}
              ref={descriptionSectionRef}
              id="description-section"
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>📝</span>
                აღწერა
              </h2>

              <div className={styles.formGroup}>
                <label htmlFor="about">მოკლე აღწერა:</label>
                <textarea
                  id="about"
                  name="about"
                  value={vitamin.about}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  rows={5}
                  placeholder="დაწერეთ პროდუქტის სრული აღწერა..."
                />
              </div>

              <div className={styles.listSection}>
                <h3 className={styles.subsectionTitle}>
                  პროდუქტის მახასიათებლები
                </h3>
                <div className={styles.listItems}>
                  {vitamin.description.map((desc, index) => (
                    <div key={index} className={styles.listItem}>
                      <div className={styles.listNumber}>{index + 1}</div>
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) =>
                          handleArrayChange(e, index, "description")
                        }
                        className={styles.formInput}
                        placeholder="აღწერის პუნქტი"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, "description")}
                        className={styles.removeButton}
                        title="წაშლა"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addArrayItem("description")}
                  className={styles.addItemButton}
                >
                  + პუნქტის დამატება
                </button>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="use">გამოყენების ინსტრუქცია:</label>
                <textarea
                  id="use"
                  name="use"
                  value={vitamin.use}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  rows={3}
                  placeholder="როგორ უნდა გამოიყენოს მომხმარებელმა ეს პროდუქტი..."
                />
              </div>
            </div>

            {/* Ingredients Section */}
            <div
              className={styles.formSection}
              ref={ingredientsSectionRef}
              id="ingredients-section"
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🧪</span>
                ინგრედიენტები და გაფრთხილება
              </h2>

              <div className={styles.listSection}>
                <h3 className={styles.subsectionTitle}>ინგრედიენტების სია</h3>
                <div className={styles.listItems}>
                  {vitamin.otherIngredients.map((ingredient, index) => (
                    <div key={index} className={styles.listItem}>
                      <div className={styles.listNumber}>{index + 1}</div>
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          handleArrayChange(e, index, "otherIngredients")
                        }
                        className={styles.formInput}
                        placeholder="ინგრედიენტი"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem(index, "otherIngredients")
                        }
                        className={styles.removeButton}
                        title="წაშლა"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addArrayItem("otherIngredients")}
                  className={styles.addItemButton}
                >
                  + ინგრედიენტის დამატება
                </button>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="warning">გაფრთხილება:</label>
                <textarea
                  id="warning"
                  name="warning"
                  value={vitamin.warning}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  rows={3}
                  placeholder="გამოყენების გაფრთხილება ან უკუჩვენებები..."
                />
              </div>
            </div>

            {/* Supplement Facts Section */}
            <div
              className={styles.formSection}
              ref={factsSectionRef}
              id="facts-section"
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>📊</span>
                პროდუქტის ფაქტები
              </h2>

              <div className={styles.factsContainer}>
                {vitamin.supplementFacts.map((fact, index) => (
                  <div key={index} className={styles.factItem}>
                    <div className={styles.factNumber}>{index + 1}</div>
                    <div className={styles.factFields}>
                      <div className={styles.factField}>
                        <label>დასახელება:</label>
                        <input
                          type="text"
                          value={fact.title}
                          onChange={(e) =>
                            handleSupplementFactChange(e, index, "title")
                          }
                          className={styles.formInput}
                          placeholder="მაგ. ვიტამინი C"
                        />
                      </div>

                      <div className={styles.factField}>
                        <label>მნიშვნელობა:</label>
                        <input
                          type="text"
                          value={fact.info}
                          onChange={(e) =>
                            handleSupplementFactChange(e, index, "info")
                          }
                          className={styles.formInput}
                          placeholder="მაგ. 500mg"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeSupplementFact(index)}
                      className={styles.removeButton}
                      title="წაშლა"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addSupplementFact}
                className={styles.addItemButton}
              >
                + ფაქტის დამატება
              </button>
            </div>

            {/* Other Info Section */}
            <div
              className={styles.formSection}
              ref={otherInfoSectionRef}
              id="other-info-section"
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🏷️</span>
                სხვა ინფორმაცია
              </h2>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="country">წარმოების ქვეყანა:</label>
                  <select
                    id="country"
                    name="country"
                    value={vitamin.country}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="">აირჩიე ქვეყანა</option>
                    <option value="USA">შეერთებული შტატები</option>
                    <option value="Canada">კანადა</option>
                    <option value="UK">დიდი ბრიტანეთი</option>
                    <option value="Germany">გერმანია</option>
                    <option value="other">სხვა</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="tags">თაგები:</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={vitamin.tags}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="თაგები, გამოყოფილი მძიმით"
                  />
                  <small className={styles.helpText}>
                    შეიყვანეთ თაგები, გამოყოფილი მძიმით (მაგ: ვიტამინი,
                    ჯანმრთელობა)
                  </small>
                </div>
              </div>
            </div>

            {/* Form submission button (hidden, triggered by the sticky header) */}
            <button
              id="submit-form-button"
              type="submit"
              style={{ display: "none" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Upload progress indicator */}
      {isUploading && (
        <div className={styles.uploadProgressOverlay}>
          <div className={styles.uploadProgressCard}>
            <div className={styles.uploadProgressContainer}>
              <div
                className={styles.uploadProgressBar}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className={styles.uploadProgressText}>
              იტვირთება... {uploadProgress}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
