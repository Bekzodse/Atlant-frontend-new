"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { ProductCategory } from "@/lib/api/products";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const t = useTranslations("catalog");

  const categories = [
    { key: null, label: t("filter.all") },
    { key: ProductCategory.WATER_PURIFICATION_FILTERS, label: t("categories.WATER_PURIFICATION_FILTERS") },
    { key: ProductCategory.CARBONATED_WATER_EQUIPMENT, label: t("categories.CARBONATED_WATER_EQUIPMENT") },
    { key: ProductCategory.HOUSEHOLD_WATER_FILTERS, label: t("categories.HOUSEHOLD_WATER_FILTERS") },
    { key: ProductCategory.WATER_DISPENSERS_COOLERS, label: t("categories.WATER_DISPENSERS_COOLERS") },
    { key: ProductCategory.WATER_FILTER_SPARE_PARTS, label: t("categories.WATER_FILTER_SPARE_PARTS") },
    { key: ProductCategory.OTHER_PRODUCTS_EQUIPMENT, label: t("categories.OTHER_PRODUCTS_EQUIPMENT") },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{t("filter.byCategory")}</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.key || "all"}
            onClick={() => onCategoryChange(category.key)}
            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === category.key
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
