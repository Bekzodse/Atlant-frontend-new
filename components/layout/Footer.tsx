"use client";
import {HiOutlineMail} from "react-icons/hi";
import {MdLocationOn} from "react-icons/md";
import {FaInstagram, FaPhoneAlt, FaTelegramPlane} from "react-icons/fa";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {useParams} from "next/navigation";

const Footer = () => {
    const t = useTranslations("footer");
    const tContacts = useTranslations("footer.contacts");
    const phones = tContacts.raw("phones") as string[];
    const params = useParams();
    const locale = (params?.locale as string) || "ru";
    return (
        <footer className="bg-gray-800 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3">
                <div>
                    <h3 className="text-lg font-semibold mb-3">{t("callToAction.title")}</h3>
                    <p className="mb-5 max-w-sm text-sm leading-6 text-gray-300">
                        {t("callToAction.description")}
                    </p>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-block rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        {t("callToAction.button")}
                    </Link>
                </div>

                <div className="md:justify-self-center">
                    <h3 className="mb-4 text-lg font-semibold">{t("social.title")}</h3>
                    <div className="flex gap-3 text-2xl">
                        <a
                            href="https://www.instagram.com/suv_filtr_atlant"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="rounded-full bg-gray-700 p-3 transition-colors hover:bg-pink-600"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://t.me/suv_filtrlari"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Telegram"
                            className="rounded-full bg-gray-700 p-3 transition-colors hover:bg-sky-600"
                        >
                            <FaTelegramPlane />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">{t("contacts.title")}</h3>
                    <ul className="space-y-3 text-sm leading-5 text-gray-300">
                        <li className="flex items-start gap-2">
                            <MdLocationOn className="mt-1" />
                            <span>{t("contacts.address")}</span>
                        </li>
                        <li className="flex flex-col gap-2">
                            {phones.map((phone, index) => (
                                <a
                                    key={index}
                                    href={`tel:${phone}`}
                                    className="flex items-center gap-2"
                                >
                                    <FaPhoneAlt />
                                    <span>{phone}</span>
                                </a>
                            ))}
                        </li>

                        <li className="flex items-center gap-2">
                            <HiOutlineMail /> {t("contacts.email")}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-2 border-t border-gray-700 bg-gray-900 px-6 py-4 text-center text-sm text-gray-400 md:flex-row">
                <p>{t("copyright")}</p>
                <span className="text-xs">
                    {t("createWebsite")}
                </span>
            </div>
        </footer>
    )
}
export default Footer