// typescript
"use client";
import React from "react";

type Product = {
    id: number;
    title: string;
    price: string;
    available: boolean;
    image: string;
};

const defaultProducts: Product[] = [
    { id: 1, title: "Генератор озона DNA-10G-A", price: "5 575 200 сум", available: true, image: "/images/Recomend1.webp" },
    { id: 2, title: "Фильтр Atlant Fortuna, 8 ступеней", price: "1 951 320 сум", available: true, image: "/images/Recomend2.webp" },
    { id: 3, title: "Насосная станция SHIMGE JET 1100G2", price: "1 602 870 сум", available: true, image: "/images/Recomend3.webp" },
    { id: 4, title: "Система обратного осмоса HLDRO-500LPH", price: "28 572 900 сум", available: true, image: "/images/Recomend4.webp" },
    { id: 5, title: "Насосная станция SHIMGE JET 750G2", price: "1 393 800 сум", available: true, image: "/images/Recomend5.webp" },
];

export default function RecommendSection({ products }: { products?: Product[] }) {
    const list = products ?? defaultProducts;

    return (
        <section className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Рекомендуем</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {list.map((p) => (
                        <div key={p.id} className="bg-white border rounded-lg shadow-sm flex flex-col overflow-hidden">
                            <div className="h-36 flex items-center justify-center bg-gray-50">
                                <img src={p.image} alt={p.title} className="object-contain h-full w-full" />
                            </div>

                            <div className="p-4 flex flex-col justify-between flex-grow">
                                <div>
                                    <h3 className="text-gray-800 font-medium text-sm mb-1">{p.title}</h3>
                                    <p className={p.available ? "text-green-600 text-sm" : "text-red-500 text-sm"}>
                                        {p.available ? "В наличии" : "Нет в наличии"}
                                    </p>
                                    <p className="text-blue-700 font-semibold mt-2">{p.price}</p>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-full text-sm hover:bg-blue-600 hover:text-white transition">
                                        Купить
                                    </button>

                                    <a href="/contact">Заказать звонок</a>
                                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-full text-sm hover:bg-gray-200 transition">
                                        В корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
