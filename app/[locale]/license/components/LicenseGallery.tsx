"use client";
import React, { useState } from "react";
import { X, Download, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetchLicenses, getDownloadUrl } from "@/lib/api/licenses";

type LicenseType = {
    id: string;
    src: string;
    fileId: string;
    title: string;
};

const localLicenses: LicenseType[] = [
    { id: "local-license-1", src: "/images/license1.jpg", fileId: "/images/license1.jpg", title: "License 1" },
    { id: "local-license-2", src: "/images/license2.jpg", fileId: "/images/license2.jpg", title: "License 2" },
    { id: "local-license-3", src: "/images/license3.jpg", fileId: "/images/license3.jpg", title: "License 3" },
    { id: "local-license-4", src: "/images/license4.jpg", fileId: "/images/license4.jpg", title: "License 4" },
];

const LicenseGallery = () => {
    const t = useTranslations("licenses");
    const params = useParams();
    const locale = params?.locale as string || 'ru';

    const [selectedImage, setSelectedImage] = useState<LicenseType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch licenses with SWR
    const { data: apiLicenses, error, isLoading } = useSWR(
        `/api/licenses/public?locale=${locale}`,
        () => fetchLicenses(locale),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        }
    );

    // Map API response to component format
    const images: LicenseType[] = apiLicenses && apiLicenses.length > 0
        ? apiLicenses.map(license => ({
            id: license.id,
            src: license.image.url,
            fileId: license.image.id,
            title: license.title
        }))
        : localLicenses;

    const openModal = (img: LicenseType) => {
        setSelectedImage(img);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "unset";
        setTimeout(() => setSelectedImage(null), 300);
    };

    const navigateImage = (direction: string) => {
        if (!selectedImage) return;

        const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
        const newIndex =
            direction === "next"
                ? (currentIndex + 1) % images.length
                : (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex]);
    };

    const handleDownload = (fileId: string, title: string) => {
        const downloadUrl = fileId.startsWith("/")
            ? fileId
            : getDownloadUrl(fileId);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${title}.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <h1 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                            {t("title")}
                        </h1>
                        <p className="mx-auto max-w-xl text-base leading-6 text-slate-500">
                            {t("subtitle")}
                        </p>
                        <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-blue-600" />
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm animate-pulse">
                                    <div className="h-80 bg-slate-200"></div>
                                    <div className="p-5">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {images.map((img, index) => (
                            <div
                                key={img.id}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative z-10 h-80 overflow-hidden bg-white">
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                                        loading="lazy"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                            <button
                                                onClick={() => openModal(img)}
                                                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-indigo-50 hover:scale-105"
                                            >
                                                <ZoomIn className="w-5 h-5" />
                                                {t("buttons.open")}
                                            </button>
                                            <button
                                                onClick={() => handleDownload(img.fileId, img.title)}
                                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-indigo-700 hover:scale-105"
                                            >
                                                <Download className="w-5 h-5" />
                                                {t("buttons.download")}
                                            </button>
                                        </div>
                                    </div>


                                </div>

                                <div className="p-4">
                                    <h3 className="line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {img.title}
                                    </h3>
                                </div>

                                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-full"></div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && selectedImage && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm transition-opacity duration-300 ${
                        isModalOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-600 text-white">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="relative bg-gray-100">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-auto max-h-[70vh] object-contain"
                            />

                            <button
                                onClick={() => navigateImage("prev")}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-900" />
                            </button>
                            <button
                                onClick={() => navigateImage("next")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-900" />
                            </button>
                        </div>

                        <div className="flex items-center justify-end p-6 bg-gray-50">
                            <div className="flex gap-3">
                                <a
                                    href={selectedImage.src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    <ZoomIn className="w-5 h-5" />
                                    {t("buttons.openNewTab")}
                                </a>
                                <button
                                    onClick={() => handleDownload(selectedImage.fileId, selectedImage.title)}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all hover:scale-105 shadow-lg"
                                >
                                    <Download className="w-5 h-5" />
                                    {t("buttons.download")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.6s ease-out both;
                }
            `}</style>
        </>
    );
};

export default LicenseGallery;
