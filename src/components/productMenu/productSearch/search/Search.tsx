"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <div className={style.searchContainer}>
      <form onSubmit={handleSubmit} className={style.searchForm}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
