"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import Image from "next/image";
import { fetchProductById, formatPrice, ProductResponseDTO } from "@/lib/api/products";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ProductDetail = () => {
    const params = useParams();
    const locale = params?.locale as string || 'ru';
    const productId = params?.id as string;
    const t = useTranslations("product");

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Fetch product data with SWR
    const { data: product, error, isLoading } = useSWR(
        productId ? `/api/products/public/${productId}?locale=${locale}` : null,
        () => fetchProductById(productId, locale),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        }
    );

    if (isLoading) {
        return (
            <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">{t("loading")}</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-xl">{t("notFound")}</p>
                </div>
            </div>
        );
    }

    const formattedPrice = formatPrice(product.price, locale);
    const images = product.images && product.images.length > 0
        ? product.images.sort((a, b) => a.displayOrder - b.displayOrder)
        : [];
    const currentImage = images[selectedImageIndex]?.path || '/placeholder-product.png';

    // Payment methods mapping
    const paymentMethodsMap: { [key: string]: string } = {
        'CASH': t("paymentMethods.cash"),
        'HOMO': t("paymentMethods.homo"),
        'UZCARD': t("paymentMethods.uzcard"),
        'ONLINE': t("paymentMethods.online"),
        'BANK_TRANSFER': t("paymentMethods.bankTransfer"),
    };

    const paymentMethodsText = product.paymentMethods && product.paymentMethods.length > 0
        ? product.paymentMethods.map(method => paymentMethodsMap[method] || method).join(', ')
        : product.paymentMethod || t("paymentMethods.notSpecified");

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col gap-10 items-center py-10">
            <div className="max-w-5xl w-full bg-white mx-auto rounded-xl shadow-lg flex flex-col lg:flex-row gap-10 p-6 lg:p-10">
                {/* Image Section */}
                <div className="w-full lg:w-[420px] flex flex-col gap-4">
                    <div className="relative w-full aspect-square flex items-center justify-center bg-gray-50 rounded-lg">
                        <Image
                            src={currentImage}
                            alt={product.name}
                            fill
                            className="rounded-lg object-contain p-4"
                            sizes="420px"
                        />
                        {product.discount && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                                SALE
                            </div>
                        )}
                    </div>

                    {/* Thumbnail images */}
                    {images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImageIndex === index
                                            ? 'border-blue-600'
                                            : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    <Image
                                        src={image.path}
                                        alt={`${product.name} - ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info Section */}
                <div className="flex-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                        {product.name}
                    </h1>

                    {product.brand && (
                        <div className="text-md text-gray-700 mb-2">
                            <span className="font-bold text-zinc-700">{t("brand")}:</span> {product.brand}
                        </div>
                    )}

                    {product.articleNumber && (
                        <div className="mb-2">
                            <span className="text-black-100">{t("articleNumber")}:</span>{" "}
                            <span className="text-zinc-700 font-bold">{product.articleNumber}</span>
                        </div>
                    )}

                    <div className="mb-2 text-green-400 font-semibold">{t("inStock")}</div>

                    <div className="mb-4 text-2xl font-bold text-zinc-700">
                        {formattedPrice} <span className="font-medium text-lg">/ {t("perUnit")}</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-semibold">{t("payment")}:</span> {paymentMethodsText}
                    </div>

                    <div className="mb-4">
                        <span className="font-semibold">{t("delivery")}:</span> {product.delivery}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
                            {t("buyButton")}
                        </button>
                        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
                            {t("addToCart")}
                        </button>
                        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
                            {t("contact")}
                        </button>
                        <button className="text-3xl text-gray-400 hover:text-red-500 transition">
                            ♡
                        </button>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="max-w-5xl w-full bg-white mx-auto rounded-xl shadow-lg p-6 lg:p-10">
                <Accordion type="single" collapsible defaultValue="description" className="w-full">
                    <AccordionItem value="description">
                        <AccordionTrigger className="text-lg font-semibold">
                            {t("descriptionTitle")}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="prose max-w-none">
                                {product.description ? (
                                    <p className="whitespace-pre-line">{product.description}</p>
                                ) : (
                                    <p className="text-gray-500">{t("noDescription")}</p>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default ProductDetail;
