"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import categories from "@/data/categories.json";
import Link from "next/link";

interface Category {
  name: string;
  value: string;
}

const Categories: React.FC = ({}) => {
  const categoriesData: Category[] = categories;
  const [activeProduct, setActiveProduct] = useState<string>("all");

  return (
    <article className={`${style.categories}`}>
      <h2 className={`${style.filterTitle}`}>Departments</h2>

      <ul>
        {categoriesData.map((el, id) => (
          <li key={id}>
            <Link
              href={`#`}
              onClick={() => setActiveProduct(el.value)}
              className={activeProduct === el.value ? style.active : ""}
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
