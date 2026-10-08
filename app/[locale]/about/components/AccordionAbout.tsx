"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import React from "react";

const AccordionAbout = () => {
    const t = useTranslations("about.accordion");

    return (
        <>
            <div className="container mx-auto max-w-7xl p-10 md:p-20">
                <Accordion type="single" collapsible className="md:w-[80%] mx-auto" defaultValue="1">
                    {/* 🟦 Atlant Fortuna */}
                    <AccordionItem value="1">
                        <AccordionTrigger className="text-xl">{t("company.title")}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-6 text-lg text-justify">
                            <p>{t("company.paragraph1")}</p>
                            <p>{t("company.paragraph2")}</p>
                            <p>{t("company.paragraph3")}</p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 🟩 Partners */}
                    <AccordionItem value="2">
                        <AccordionTrigger className="text-xl">{t("partners.title")}</AccordionTrigger>
                        <AccordionContent className="text-lg">
                            <ul className="list-disc list-inside leading-8">
                                {t.raw("partners.list").map((partner: string, index: number) => (
                                    <li key={index}>{partner}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 🟨 Addresses */}
                    <AccordionItem value="3">
                        <AccordionTrigger className="text-xl">{t("offices.title")}</AccordionTrigger>
                        <AccordionContent className="text-lg">
                            <Table className="text-sm md:text-base">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t("offices.table.office")}</TableHead>
                                        <TableHead>{t("offices.table.location")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{t("offices.table.main")}</TableCell>
                                        <TableCell>{t("offices.table.mainAddress")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("offices.table.tashkent")}</TableCell>
                                        <TableCell>{t("offices.table.tashkentAddress")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("offices.table.karshi")}</TableCell>
                                        <TableCell>{t("offices.table.karshiAddress")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("offices.table.urgench")}</TableCell>
                                        <TableCell>{t("offices.table.urgenchAddress")}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 🟧 Work schedule */}
                    <AccordionItem value="4">
                        <AccordionTrigger className="text-xl">{t("schedule.title")}</AccordionTrigger>
                        <AccordionContent>
                            <div className="bg-white rounded-2xl p-6 md:text-justify">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { key: "monday", hours: "09:00 - 18:00", break: "13:00 - 14:00" },
                                        { key: "tuesday", hours: "09:00 - 18:00", break: "13:00 - 14:00" },
                                        { key: "wednesday", hours: "09:00 - 18:00", break: "13:00 - 14:00" },
                                        { key: "thursday", hours: "09:00 - 18:00", break: "13:00 - 14:00" },
                                        { key: "friday", hours: "09:00 - 18:00", break: "13:00 - 14:00" },
                                        { key: "saturday", hours: "09:00 - 18:00", break: "13:00 - 14:00" },
                                        { key: "sunday", hours: null, break: null },
                                    ].map((item, index) => (
                                        <div key={index} className="flex justify-between p-4 rounded-xl">
                                            <span className="font-medium text-gray-700">{t(`schedule.days.${item.key}`)}</span>
                                            <div className="text-right">
                                                {!item.hours ? (
                                                    <span className="text-red-500 font-semibold">{t("schedule.dayOff")}</span>
                                                ) : (
                                                    <>
                                                        <p className="text-gray-800 font-medium">{t("schedule.hours")} {item.hours}</p>
                                                        <p className="text-sm text-gray-500">{t("schedule.break")} {item.break}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <iframe
                    className="mx-auto mt-10 rounded-md w-72 h-50 md:w-[780px] md:h-[410px]"
                    src="https://www.youtube.com/embed/0rhml4OCWdo"
                    title="25 ноября 2024 г."
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>



        </>
    );
};

export default AccordionAbout;
