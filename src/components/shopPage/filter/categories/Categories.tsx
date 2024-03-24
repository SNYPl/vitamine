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
  const category = param.get("category");
  const activeCategory = category ? category : "all";
  const searchParam = param.get("search");

  const [activeProduct, setActiveProduct] = useState<string>(activeCategory);

  return (
    <article className={`${style.categories}`}>
      <h2 className={`${style.filterTitle}`}>კატეგორიები</h2>

      <ul>
        <li>
          <Link
            href={`/`}
            onClick={() => setActiveProduct("all")}
            className={
              activeProduct === "all" && !searchParam ? style.active : ""
            }
          >
            ყველა
          </Link>
        </li>
        {categoriesData.slice(1).map((el, id) => (
          <li key={id}>
            <Link
              href={`/?category=${el.value}`}
              onClick={() => setActiveProduct(el.value)}
              className={
                activeProduct === el.value && !searchParam ? style.active : ""
              }
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
