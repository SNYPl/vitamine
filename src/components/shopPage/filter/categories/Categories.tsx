"use client";
import { useState } from "react";
import style from "./style.module.scss";
import { categories } from "@/data/categories.js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Category {
  name: string;
  value: string;
}

const Categories = () => {
  const categoriesData: Category[] = categories;
  const param = useSearchParams();
  const category = param?.get("category");
  const activeCategory = category ? category : "all";
  const searchParam = param?.get("search");

  const [activeProduct, setActiveProduct] = useState<string>(activeCategory);

  const handleCategoryClick = (categoryValue: string) => {
    setActiveProduct(categoryValue);
  };

  return (
    <article className={`${style.categories}`}>
      {/* <h2 className=ა{`${style.filterTitle}`}>კატეგორიები</h2> */}

      <ul>
        <li>
          <Link
            href={`/`}
            onClick={() => handleCategoryClick("all")}
            className={
              activeProduct === "all" && !searchParam ? style.active : ""
            }
            scroll={false}
          >
            ყველა
          </Link>
        </li>
        {categoriesData.slice(1).map((el, id) => (
          <li key={id}>
            <Link
              href={`/?category=${el.value}`}
              onClick={() => handleCategoryClick(el.value)}
              className={
                activeProduct === el.value && !searchParam ? style.active : ""
              }
              scroll={false}
            >
              {el.name}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Categories;
