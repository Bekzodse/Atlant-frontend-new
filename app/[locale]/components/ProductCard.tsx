"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProductResponseDTO, getPrimaryImage, formatPrice } from "@/lib/api/products";
import { useParams } from "next/navigation";

interface ProductCardProps {
  product: ProductResponseDTO;
  view?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, view = "list" }) => {
  const t = useTranslations("catalog.product");
  const params = useParams();
  const locale = params?.locale as string || 'ru';

  const primaryImage = getPrimaryImage(product);
  const formattedPrice = formatPrice(product.price, locale);
  const isInStock = true; // You can add stock logic later
  const productUrl = `/${locale}/product/${product.id}`;

  return (
    <Link href={productUrl}>
      <div className="bg-white p-4 border rounded-xl flex gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="128px"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between w-full">
          <div>
            <h2 className="text-lg font-semibold line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h2>
            <p className={`font-medium mt-1 ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
              {isInStock ? t("inStock") : t("outOfStock")}
            </p>
            <p className="text-xl font-bold mt-2">{formattedPrice}</p>
            {product.brand && (
              <p className="text-sm text-gray-600 mt-1">Brand: {product.brand}</p>
            )}
          </div>

          <div className="flex gap-3 mt-3">
            <button
              onClick={(e) => e.preventDefault()}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              {t("buyButton")}
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              {t("addToCart")}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
