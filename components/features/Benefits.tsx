"use client";
import {ReactNode} from "react";
import {ImCheckmark} from "react-icons/im";
import {FaMoneyBillWave, FaShippingFast} from "react-icons/fa";
import {AiOutlineFileProtect} from "react-icons/ai";
import {useTranslations} from "next-intl";

const Benefits = () => {
    const t = useTranslations("home.benefits");

    type BenefitCard = {
        logo: ReactNode;
        title: string;
        description: string;
    }

    const icons = [
        <ImCheckmark className={"w-10 h-10 md:w-18 md:h-18"} key="experience"/>,
        <FaMoneyBillWave className={"w-10 h-10 md:w-18 md:h-18"} key="price"/>,
        <AiOutlineFileProtect className={"w-10 h-10 md:w-18 md:h-18"} key="quality"/>,
        <FaShippingFast className={"w-10 h-10 md:w-18 md:h-18"} key="delivery"/>,
    ];

    const benefitCards: BenefitCard[] = t.raw("cards").map((card: {title: string, description: string}, index: number) => ({
        logo: icons[index],
        title: card.title,
        description: card.description
    }))



    return (
        <div className={"text-center text-primary font-bold md:text-4xl p-12 bg-gray-50"}>
            <h1 className={"pb-14 text-xl md:text-3xl"}>{t("title")}</h1>
            <div className={"grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mx-auto w-full max-w-screen"}>
                {
                    benefitCards.map((benefit) => (
                        <div className={"bg-white shadow-md flex flex-col items-center p-10 rounded-lg hover:shadow-xl justify-items-center"} key={benefit.title}>
                            <span className={"mb-5"}>{benefit.logo}</span>
                            <h1 className={"text-sm md:text-lg mb-5  text-primary"}>{benefit.title}</h1>
                            <p className={"text-xs md:text-sm w-4/5 text-[#66a3e5]"}>{benefit.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default Benefits