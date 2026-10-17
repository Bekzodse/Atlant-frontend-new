import Reels from "@/components/features/Reels";
import { getTranslations } from "next-intl/server";
import { photoGalleryMetadata } from "@/data/metadata";

export const metadata = photoGalleryMetadata;

export default async function PhotoGallery() {
  const t = await getTranslations("home.reels");

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 pt-24 sm:pt-36">
      <section className="mx-auto w-full max-w-4xl px-2 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <h1 className="mb-3 text-center text-2xl font-extrabold text-blue-600 sm:mb-4 sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mb-5 text-center text-sm text-gray-500 sm:mb-8 sm:text-base">
          {t("subtitle")}
        </p>
        <Reels />
      </section>
    </main>
  );
}
