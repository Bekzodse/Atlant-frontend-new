"use client";
import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden flex flex-col items-center p-6"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br bg-white to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl"></div>

      {/* Image container */}
      <div className="relative w-full h-[200px] flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-[180px] w-auto object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Title */}
      <h3 className="mt-5 text-lg font-semibold text-gray-800 text-center group-hover:text-blue-700 transition-colors">
        {product.title}
      </h3>

      {/* Category badge if available */}
      {product.category && (
        <span className="mt-2 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
          {product.category}
        </span>
      )}
    </motion.div>
  );
};
