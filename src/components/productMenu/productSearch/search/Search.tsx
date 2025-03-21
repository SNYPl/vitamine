"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isPageLoad, setIsPageLoad] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Clear search parameter on page load/refresh
  useEffect(() => {
    // Check if we have a search parameter
    const currentSearch = searchParams?.get("search");
    if (currentSearch && isPageLoad) {
      // On page load or refresh, clear the URL parameter without setting the search value
      router.replace("/");
      // Do NOT set the search value - this makes it clear on refresh
    }

    // Mark the initial page load as completed
    setIsPageLoad(false);

    // We intentionally don't include searchParams in the dependency array
    // so this only runs on initial mount
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Create a URL with the search parameter
      router.push(`/?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      // If search is empty, clear the search parameter
      router.push("/");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    // If user clears the input completely, redirect to home without search parameter
    if (e.target.value === "" && searchParams?.get("search")) {
      router.push("/");
    }
  };

  return (
    <div className={style.searchContainer}>
      <form onSubmit={handleSubmit} className={style.searchForm}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchValue}
          onChange={handleInputChange}
          className={style.searchInput}
        />
        <button type="submit" className={style.searchButton}>
          <SearchOutlined />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Search;
