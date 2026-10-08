// Discount.jsx
"use client";
import React from "react";

const Discount = () => {
    // 8 ta mahsulot misoli
    const products = [
        {
            id: 1,
            name: "Mahsulot 1",
            image: "/images/product1.jpg",
            originalPrice: 100,
            discountedPrice: 70,
        },
        {
            id: 2,
            name: "Mahsulot 2",
            image: "/images/product2.jpg",
            originalPrice: 150,
            discountedPrice: 120,
        },
        {
            id: 3,
            name: "Mahsulot 3",
            image: "/images/product3.jpg",
            originalPrice: 200,
            discountedPrice: 150,
        },
        {
            id: 4,
            name: "Mahsulot 4",
            image: "/images/product4.jpg",
            originalPrice: 90,
            discountedPrice: 60,
        },
        {
            id: 5,
            name: "Mahsulot 5",
            image: "/images/product5.jpg",
            originalPrice: 130,
            discountedPrice: 100,
        },
        {
            id: 6,
            name: "Mahsulot 6",
            image: "/images/product6.jpg",
            originalPrice: 220,
            discountedPrice: 180,
        },
        {
            id: 7,
            name: "Mahsulot 7",
            image: "/images/product7.jpg",
            originalPrice: 170,
            discountedPrice: 140,
        },
        {
            id: 8,
            name: "Mahsulot 8",
            image: "/images/product8.jpg",
            originalPrice: 80,
            discountedPrice: 50,
        },
    ];

    return (
        <div className="w-full min-h-screen bg-gray-100 py-12">
            {/* Tezasi: DISCOUNT */}
            <h1 className="text-5xl font-bold text-center text-red-600 mb-12">
                DISCOUNT
            </h1>

            {/* Mahsulotlar grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4 text-center">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-500 line-through mb-1">
                                ${product.originalPrice}
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                                ${product.discountedPrice}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Discount;
