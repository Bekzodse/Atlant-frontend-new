"use client";
import React from "react";
import { motion } from "framer-motion";
import { catalogProducts } from "@/data/products";
import { useTranslations } from "next-intl";

interface TranslatedProduct {
    id: number;
    title: string;
    image: string;
}

const Catalogproduct: React.FC = () => {
    const t = useTranslations("products");

    // Get translated titles and combine with images from static data
    const translatedProducts: TranslatedProduct[] = t.raw("catalogProducts").map((title: string, index: number) => ({
        id: catalogProducts[index].id,
        title: title,
        image: catalogProducts[index].image
    }));
    return (
        <section className="relative min-h-screen bg-gradient-to-br bg-white via-white bg-white-100 py-10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white blur-3xl opacity-20 rounded-full" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-4">
                        {t("catalogTitle")}
                    </h2>
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {translatedProducts.map((item, index) => (
                        <motion.div
                            key={item.id}
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
                                    src={item.image}
                                    alt={item.title}
                                    className="max-h-[180px] w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="mt-5 text-lg font-semibold text-gray-800 text-center group-hover:text-blue-700 transition-colors">
                                {item.title}
                            </h3>

                            {/* Line */}
                            <div className="mt-3 h-[3px] w-14 bg-blue-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Catalogproduct;
