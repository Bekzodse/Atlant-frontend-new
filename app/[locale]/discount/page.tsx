import { discountMetadata } from "@/data/metadata";
import { getTranslations } from "next-intl/server";

export const metadata = discountMetadata;

export default async function Home() {
    const t = await getTranslations("discounts");

    return (
        <main className="mt-18 flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden bg-slate-50 lg:mt-34">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 pb-8">
                <h1 className="text-center text-4xl font-bold text-slate-900">{t("title")}</h1>
            </div>
            <div className="relative top-8 flex min-h-[calc(100vh-18rem)] flex-1 items-center overflow-hidden border-y border-blue-100 bg-white py-5">
                <div className="discount-marquee flex w-max whitespace-nowrap text-5xl font-extrabold text-black sm:text-6xl lg:text-7xl">
                    <div className="flex shrink-0 gap-8">
                        <span>{t("comingSoon")}</span>
                        <span>{t("comingSoon")}</span>
                        <span>{t("comingSoon")}</span>
                    </div>
                    <div className="flex shrink-0 gap-8" aria-hidden="true">
                        <span>{t("comingSoon")}</span>
                        <span>{t("comingSoon")}</span>
                        <span>{t("comingSoon")}</span>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes discount-marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .discount-marquee {
                    animation: discount-marquee 24s linear infinite;
                    will-change: transform;
                }
            `}</style>
        </main>
    );
}
