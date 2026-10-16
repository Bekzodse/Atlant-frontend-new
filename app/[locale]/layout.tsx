import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {routing} from "@/i18n/routing";
import {notFound} from 'next/navigation';
import {getMessages} from "next-intl/server";
import type { Metadata } from 'next';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/context/CartContext";

type Props = {
    children: React.ReactNode;
    params: Promise<{locale: string}>
};

export const metadata: Metadata = {
  title: {
    default: "Atlant - Фильтры очистки воды и промышленное оборудование",
    template: "%s | Atlant",
  },
  description: "Поставка фильтров очистки воды, промышленного оборудования и систем водоподготовки. Качественные решения для вашего бизнеса.",
  keywords: ["фильтры воды", "очистка воды", "промышленное оборудование", "atlant"],
  authors: [{ name: "Atlant" }],
  creator: "Atlant",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://atlant.uz",
    title: "Atlant - Фильтры очистки воды и промышленное оборудование",
    description: "Поставка фильтров очистки воды, промышленного оборудования и систем водоподготовки",
    siteName: "Atlant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlant - Фильтры очистки воды",
    description: "Поставка фильтров очистки воды и промышленного оборудования",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({children, params}: Props) {
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <CartProvider>
                <Navbar/>
                {children}
                <Footer/>
            </CartProvider>
        </NextIntlClientProvider>
    );
}
