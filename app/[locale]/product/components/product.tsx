"use client";
import React from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const Product = () => (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col gap-10 items-center py-10">
        <div className="max-w-5xl w-full bg-white mx-auto rounded-xl shadow-lg flex flex-row gap-10 p-10">
            <div className="w-[420px] flex items-center justify-center">
                <img
                    src="/images/shimge_bw_2-3.webp"
                    alt="Водяной насос Shimge BW 2-3"
                    className="rounded-lg shadow object-contain w-full"
                />
            </div>


            <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Водяной насос Shimge BW 2-3
                </h1>
                <div className="text-md text-gray-700 mb-2">
                    <span className="font-bold text-zinc-700">Бренд:</span> Shimge </div>
                <div className="mb-2">
                    <span className="text-black-100">Артикул:</span> <span className="text-zinc-700 font-bold">P-1123982</span>
                </div>
                <div className="mb-2 text-green-400 font-semibold">В наличии</div>
                <div className="mb-4 text-2xl font-bold text-zinc-700">2 787 600 <span className="font-medium text-lg">сум / шт</span></div>
                <div className="mb-2">
                    <span className="font-semibold">Оплата:</span> Наличными, Перечислением, Терминал UzCard, Терминал HUMO, Онлайн оплата</div>
                <div className="mb-4">
                    <span className="font-semibold">Доставка:</span> Курьерская доставка, Самовывоз, Транспортная компания</div>

                <div className="flex gap-4 mb-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
                        Купить
                    </button>
                    <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
                        В корзину
                    </button>
                    <button className="border border-blue-600 text-blue-600 px-6 py-2  rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
                        Написать
                    </button>
                    <button>
                        <span className="text-4xl text-gray-400">♡</span>
                    </button>
                </div>

            </div>
        </div>

        <div className={"max-w-5xl w-full bg-white mx-auto rounded-xl shadow-lg flex flex-row gap-10 p-10"}>
            <Accordion type={"single"} collapsible defaultValue={"1"} className={"w-full"}>
                <AccordionItem value={"1"}>
                    <AccordionTrigger>
                        Описание
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Shimge BW2-3 — это многоступенчатый горизонтальный центробежный насос, который широко используется в системах водоснабжения, повышения давления, отопления, охлаждения и в промышленных технологических процессах.

                            Модель:	Shimge BW2-3
                            Производитель	SHIMGE
                            Страна	Китай
                            Тип:	Горизонтальный многоступенчатый центробежный насос
                            Мощность:	0,37 кВт (0,5 л.с.)
                            Питание:	220 В / 50 Гц (однофазный)
                            Максимальная производительность:	2 м³/ч
                            Максимальный напор:	22 метра (2,2 бар)
                            Температура перекачиваемой жидкости:	от 0°C до +120°C
                            Материал корпуса:	Нержавеющая сталь AISI 304
                            Диаметр входа/выхода:	1&#34; (дюйм)
                            Вес:	около 9,3–14,3 кг (в зависимости от комплектации)


                            Области применения:

                            - Повышение давления в системах водоснабжения частных домов и многоэтажек;

                            - Полив садов, теплиц, огородов;

                            - В системах отопления и охлаждения;

                            - Промышленные технологические процессы, требующие постоянного давления;

                            - Поддержка давления в системах подачи питьевой или горячей воды.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={"2"}>
                    <AccordionTrigger>
                        Описание
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Shimge BW2-3 — это многоступенчатый горизонтальный центробежный насос, который широко используется в системах водоснабжения, повышения давления, отопления, охлаждения и в промышленных технологических процессах.

                            Модель:	Shimge BW2-3
                            Производитель	SHIMGE
                            Страна	Китай
                            Тип:	Горизонтальный многоступенчатый центробежный насос
                            Мощность:	0,37 кВт (0,5 л.с.)
                            Питание:	220 В / 50 Гц (однофазный)
                            Максимальная производительность:	2 м³/ч
                            Максимальный напор:	22 метра (2,2 бар)
                            Температура перекачиваемой жидкости:	от 0°C до +120°C
                            Материал корпуса:	Нержавеющая сталь AISI 304
                            Диаметр входа/выхода:	1&#34; (дюйм)
                            Вес:	около 9,3–14,3 кг (в зависимости от комплектации)


                            Области применения:

                            - Повышение давления в системах водоснабжения частных домов и многоэтажек;

                            - Полив садов, теплиц, огородов;

                            - В системах отопления и охлаждения;

                            - Промышленные технологические процессы, требующие постоянного давления;

                            - Поддержка давления в системах подачи питьевой или горячей воды.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>



    </div>
);

export default Product;