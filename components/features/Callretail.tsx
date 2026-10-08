"use client";
import React from "react";
import { GiRotaryPhone } from "react-icons/gi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const ContactBanner = () => {
  const t = useTranslations("home.contactBanner");
  const params = useParams();
  const locale = (params?.locale as string) || "ru";
  return (
    <div className="relative w-full overflow-hidden">
    
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#eaf3ff"
            fillOpacity="1"
            d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,128C672,107,768,85,864,85.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

    
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-10 px-6 space-y-6 md:space-y-0 md:space-x-6">
        {/* Icon */}
        <GiRotaryPhone className="text-blue-600 text-8xl" />


        <p className="text-center md:text-left text-xl md:text-2xl lg:text-3xl font-semibold text-[#2b2b2b] leading-snug max-w-2xl">
          {t("text")}
        </p>


        <Link href={`/${locale}/contact`} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-200 inline-block">
            {t("button")}
        </Link>
      </div>
    </div>
  );
};

export default ContactBanner;
