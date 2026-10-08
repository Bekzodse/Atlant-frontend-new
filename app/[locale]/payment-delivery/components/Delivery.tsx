"use client";
import React from "react";
import { FaMoneyBillWave, FaCreditCard, FaTruck, FaStore, FaGlobe } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Package, Clock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type CardItem = {
    icon: React.ReactNode;
    title: string;
    desc: string;
    price?: string;
    locations?: string[];
    details?: string[];
    tags?: string[];
    steps?: string[];
    link?: string;
    calculateCost?: string;
};

type CardSectionProps = {
    title: string;
    items: CardItem[];
    isPayment: boolean;
};

const Delivery = () => {
    const t = useTranslations("payment");
    const scrollToContent = () => {
        const element = document.getElementById('payment-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const payments: CardItem[] = [
        {
            icon: <FaMoneyBillWave className="text-blue-500 text-4xl" />,
            title: t("paymentMethods.cash.title"),
            desc: t("paymentMethods.cash.desc"),
            locations: t.raw("paymentMethods.cash.locations")
        },
        {
            icon: <MdPayments className="text-blue-500 text-4xl" />,
            title: t("paymentMethods.transfer.title"),
            desc: t("paymentMethods.transfer.desc"),
            details: t.raw("paymentMethods.transfer.details")
        },
        {
            icon: <FaCreditCard className="text-blue-500 text-4xl" />,
            title: t("paymentMethods.terminal.title"),
            desc: t("paymentMethods.terminal.desc"),
            tags: t.raw("paymentMethods.terminal.tags")
        },
        {
            icon: <FaGlobe className="text-blue-500 text-4xl" />,
            title: t("paymentMethods.online.title"),
            desc: t("paymentMethods.online.desc"),
            steps: t.raw("paymentMethods.online.steps")
        },
    ];

    const deliveries: CardItem[] = [
        {
            icon: <FaTruck className="text-blue-500 text-4xl" />,
            title: t("deliveryMethods.courier.title"),
            price: t("deliveryMethods.courier.price"),
            desc: t("deliveryMethods.courier.desc"),
            link: "https://bts.uz/ru/calculate",
            calculateCost: t("deliveryMethods.courier.calculateCost"),
            tags: t.raw("deliveryMethods.courier.tags")
        },
        {
            icon: <FaStore className="text-blue-500 text-4xl" />,
            title: t("deliveryMethods.pickup.title"),
            price: t("deliveryMethods.pickup.price"),
            desc: t("deliveryMethods.pickup.desc"),
            locations: t.raw("deliveryMethods.pickup.locations")
        },
        {
            icon: <FaTruck className="text-blue-500 text-4xl" />,
            title: t("deliveryMethods.transport.title"),
            price: t("deliveryMethods.transport.price"),
            desc: t("deliveryMethods.transport.desc"),
            tags: t.raw("deliveryMethods.transport.tags")
        },
    ];

    const CardSection = ({ title, items, isPayment }: CardSectionProps) => (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">{title}</h2>

            </div>

            <div className={`grid grid-cols-1 ${isPayment ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-8 border border-blue-100"
                    >
                        <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl w-fit mb-6">
                            {item.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-black mb-3">{item.title}</h3>

                        {item.price && (
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-4">
                                {item.price}
                            </div>
                        )}

                        <p className="text-black mb-6">{item.desc}</p>

                        {item.locations && (
                            <div className="space-y-2 mb-4">
                                {item.locations.map((loc, j) => (
                                    <div key={j} className="flex items-start gap-2 text-sm text-black">
                                        <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <span>{loc}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {item.details && (
                            <div className="p-4 bg-blue-50 rounded-xl space-y-1 text-sm text-black mb-4">
                                {item.details.map((detail, j) => (
                                    <div key={j}>{detail}</div>
                                ))}
                            </div>
                        )}

                        {item.tags && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.map((tag, j) => (
                                    <span key={j} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {item.steps && (
                            <div className="space-y-2">
                                {item.steps.map((step, j) => (
                                    <div key={j} className="flex gap-3 text-sm text-black">
                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                                            {j + 1}
                                        </span>
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer"
                               className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mt-4">
                                {item.calculateCost}
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-black mb-6">
                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">{t("hero.title1")}</span>
                                <br />
                                <span className="text-blue-500">{t("hero.title2")}</span>
                            </h1>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                {t("hero.description")}
                            </p>
                            <motion.button
                                onClick={scrollToContent}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-full shadow-xl transition-all cursor-pointer"
                            >
                                {t("hero.button")}
                            </motion.button>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-50">
                                    <Package className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm font-semibold text-gray-700">{t("hero.safePackaging")}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-50">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm font-semibold text-gray-700">{t("hero.fastDelivery")}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-full h-[400px] bg-white">
                                <Image
                                    src="/atlant-fortuna2.jpg"
                                    alt="Delivery Service"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div id="payment-section" className="max-w-7xl mx-auto px-4 py-16">
                <CardSection title={t("paymentMethods.title")} items={payments} isPayment={true} />
                <CardSection title={t("deliveryMethods.title")} items={deliveries} isPayment={false} />
            </div>
        </div>
    );

};

export default Delivery;
