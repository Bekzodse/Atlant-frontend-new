'use client'
import { useState, useEffect, useMemo } from "react";
import { Grid, List } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetchAllProducts, fetchProductsByCategory, ProductCategory } from "@/lib/api/products";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

export default function CatalogMain() {
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get('category');
    const query = searchParams.get('q')?.trim().toLowerCase() || "";

    const [view, setView] = useState<"grid" | "list">("list");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);

    const t = useTranslations("catalog");
    const params = useParams();
    const locale = params?.locale as string || 'ru';

    // Update selected category when URL changes
    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [categoryFromUrl]);

    // Fetch products with SWR based on selected category
    const cacheKey = selectedCategory
        ? `/api/products/public/category/${selectedCategory}?locale=${locale}`
        : `/api/products/public?locale=${locale}`;

    const { data: products, error, isLoading } = useSWR(
        cacheKey,
        () => selectedCategory
            ? fetchProductsByCategory(selectedCategory as ProductCategory, locale)
            : fetchAllProducts(locale),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        }
    );

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
    };

    const filteredProducts = useMemo(() => {
        if (!products) return products;
        if (!query) return products;
        return products.filter((product) =>
            [product.name, product.brand, product.articleNumber, product.description]
                .filter(Boolean)
                .some((field) => field.toLowerCase().includes(query))
        );
    }, [products, query]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
                <p className="text-gray-600">{t("subtitle")}</p>
            </div>

            <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                    {!isLoading && filteredProducts && (
                        <span>{t("productsCount", { count: filteredProducts.length })}</span>
                    )}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-full border ${view === "grid" ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-50"}`}
                        title={t("view.grid")}
                    >
                        <Grid size={20} />
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={`p-2 rounded-full border ${view === "list" ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-50"}`}
                        title={t("view.list")}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className={view === "grid" ? "grid md:grid-cols-2 gap-6" : "flex flex-col gap-6"}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-white p-4 border rounded-xl flex gap-4 shadow-sm animate-pulse">
                            <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
                            <div className="flex flex-col justify-between w-full">
                                <div className="space-y-3">
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-10 bg-gray-200 rounded-full w-24"></div>
                                    <div className="h-10 bg-gray-200 rounded-full w-32"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
                <div
                    className={
                        view === "grid"
                            ? "grid md:grid-cols-2 gap-6"
                            : "flex flex-col gap-6"
                    }
                >
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} view={view} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">{t("noProducts")}</p>
                </div>
            )}
        </div>
    );
}
