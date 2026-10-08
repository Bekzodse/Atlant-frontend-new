"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/products";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import { fetchGalleryImages } from "@/lib/api/gallery";
import Link from "next/link";
import { useParams } from "next/navigation";

interface GalleryProps {
  limit?: number; // Optional limit for number of images to display
  showButton?: boolean; // Whether to show the "Show All" button
}

const Gallery = ({ limit, showButton = true }: GalleryProps) => {
  const params = useParams();
  const locale = params?.locale as string || 'ru';
  const t = useTranslations("home.gallery");
  const [selected, setSelected] = useState<string | null>(null);

  // Fetch gallery images from API with SWR
  const cacheKey = limit ? `/api/gallery/public?limit=${limit}` : '/api/gallery/public';
  const { data: apiImages, error, isLoading } = useSWR(
    cacheKey,
    () => fetchGalleryImages(limit),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  // Prefetch full gallery data when showing limited view (for better UX when clicking "Show All")
  // This runs in the background and caches the full dataset
  useSWR(
    limit ? '/api/gallery/public' : null, // Only prefetch when we're showing a limited view
    () => fetchGalleryImages(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  // Transform API images to match component format, fallback to static images
  const images = apiImages && apiImages.length > 0
    ? apiImages.map(img => ({
        id: img.id,
        src: img.attach.url,
        alt: img.attach.originName || `Gallery image ${img.id}`
      }))
    : galleryImages;

  return (
    <section className="relative bg-gradient-to-b bg-white py-10 overflow-hidden">
      {/* Orqa fon bezaklari */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl translate-x-16 translate-y-16"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Sarlavha */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold text-center mb-12 text-gray-800"
        >
          <span className="text-black-100 text-4xl">{t("title")}</span>
        </motion.h2>

        {/* Loading state */}
        {isLoading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {Array.from({ length: limit || 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-3xl h-64" />
            ))}
          </div>
        )}

        {/* Rasmlar */}
        {!isLoading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {images.map((image, i) => (
            <motion.div
              key={i}
              className="relative group overflow-hidden rounded-3xl cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelected(image.src)}
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-3xl object-cover transition-transform duration-700 group-hover:scale-110"
                whileHover={{ rotateX: 8, rotateY: -8 }}
              />
            </motion.div>
          ))}
          </div>
        )}

        {/* Tugma */}
        {!isLoading && showButton && (
          <div className="flex justify-center mt-12">
            <Link href={`/${locale}/photo-galery`}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg text-lg"
              >
                {t("showAll")}
              </motion.button>
            </Link>
          </div>
        )}
      </div>

      {/* To‘liq rasm ochilishi */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <motion.img
            src={selected}
            alt="Selected"
            className="max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
