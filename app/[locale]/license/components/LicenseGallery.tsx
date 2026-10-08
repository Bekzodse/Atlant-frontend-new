"use client";
import React, { useState } from "react";
import { X, Download, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetchLicenses, getDownloadUrl, LicenseResponseDTO } from "@/lib/api/licenses";

type LicenseType = {
    id: string;
    src: string;
    fileId: string;
    title: string;
};

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
        : [];

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
        const downloadUrl = getDownloadUrl(fileId);
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-4  from-blue-600 to-blue-600">
                            {t("title")}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t("subtitle")}
                        </p>
                        <div className="mt-6 h-1 w-24 bg-gradient-to-r"></div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                                    <div className="h-72 bg-gray-200"></div>
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {images.map((img, index) => (
                            <div
                                key={img.id}
                                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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

                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">
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
