"use client";
import {HiOutlineMail} from "react-icons/hi";
import {MdLocationOn} from "react-icons/md";
import {FaInstagram, FaPhoneAlt, FaTelegramPlane} from "react-icons/fa";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {useParams} from "next/navigation";

const Footer = () => {
    const t = useTranslations("footer");
    const params = useParams();
    const locale = (params?.locale as string) || "ru";
    return (
        <footer className="bg-gray-700 text-white">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-3">{t("callToAction.title")}</h3>
                    <p className="text-sm text-gray-200 mb-4">
                        {t("callToAction.description")}
                    </p>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all"
                    >
                        {t("callToAction.button")}
                    </Link>
                </div>

                <div className="flex flex-col items-start md:items-center">
                    <h3 className="text-lg font-semibold mb-3">{t("social.title")}</h3>
                    <div className="flex gap-4 text-2xl">
                        <a
                            href="https://www.instagram.com/atlant_fortuna"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://t.me/suv_filtrlari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            <FaTelegramPlane />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">{t("contacts.title")}</h3>
                    <ul className="space-y-2 text-sm text-gray-200">
                        <li className="flex items-start gap-2">
                            <MdLocationOn className="mt-1" />
                            <span>{t("contacts.address")}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt /> {t("contacts.phone")}
                        </li>
                        <li className="flex items-center gap-2">
                            <HiOutlineMail /> {t("contacts.email")}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gray-800 py-3 text-center text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center px-6">
                <p>{t("copyright")}</p>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm mt-2 md:mt-0">
                    {t("createWebsite")}
                </a>
            </div>
        </footer>
    )
}
export default Footer