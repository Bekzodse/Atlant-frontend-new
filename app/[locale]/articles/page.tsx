import { articlesMetadata } from "@/data/metadata";
import {
CheckCircle2,
Cpu,
GraduationCap,
Package,
Settings,
ShieldCheck,
Truck,
Wrench,
} from "lucide-react";
import { useLocale } from "next-intl";

export const metadata = articlesMetadata;

type Locale = "en" | "ru" | "uz";

type Service = {
title: string;
description: string;
badge: string;
icon: typeof Cpu;
features: string[];
};

const content: Record<Locale, { title: string; description: string; services: Service[] }> = {
en: {
title: "Services and Support",
description: "Professional solutions for selecting, designing, installing and servicing water treatment and bottling equipment.",
services: [
{ title: "Consultation and Equipment Selection", badge: "Consultation", icon: Settings, description: "We help select equipment based on your goals, required capacity, water quality, operating conditions and budget.", features: ["Domestic, commercial and industrial water treatment systems", "Water production and bottling equipment", "PET blowing, filling, capping, labeling and packaging equipment", "Components, spare parts and consumables", "Required capacity and configuration"] },
{ title: "Design and Manufacturing", badge: "Engineering", icon: Cpu, description: "We develop engineering solutions tailored to your technical requirements and operating conditions.", features: ["Technical requirements and initial data analysis", "Water treatment systems based on an individual design", "Frames, modules and separate structures", "Container and block-module systems"] },
{ title: "Delivery and Installation", badge: "Logistics & Installation", icon: Truck, description: "Safe delivery, unloading and professional installation of pipework and electrical connections.", features: ["Delivery and unloading at the customer’s site", "Installation of water treatment and bottling systems", "Connection of pipes, electrical systems, pumps and tanks", "Quality inspection of completed connections"] },
{ title: "Commissioning and Training", badge: "Start-up", icon: GraduationCap, description: "We start up the equipment, configure its parameters and train your employees to use it safely.", features: ["Comprehensive pre-start inspection", "Precise configuration of operating parameters and automation", "Capacity and performance testing", "Employee training and recommendations"] },
{ title: "Warranty and Service", badge: "Warranty", icon: ShieldCheck, description: "Regular maintenance and preventive service to keep domestic, commercial and industrial equipment operating efficiently.", features: ["Scheduled inspection of pressure and capacity", "Inspection of pumps, membranes and filters", "Adjustment of control valves and automation", "Maintenance of washing, filling and capping equipment"] },
{ title: "Diagnostics, Repair and Modernization", badge: "Repair", icon: Wrench, description: "We diagnose faults, restore equipment quickly and improve the capacity of existing systems.", features: ["Fault detection and prompt repair", "Post-warranty repair", "Modernization and capacity improvement", "Replacement of automation and outdated components"] },
{ title: "Consumables and Spare Parts", badge: "Supply", icon: Package, description: "Supply of reverse-osmosis membranes, replacement cartridges, filter media and original spare parts.", features: ["Reverse-osmosis membranes and PP/CTO cartridges", "Ion-exchange resin, activated carbon and quartz sand", "Valves, pumps and automation components", "Original spare parts for production equipment"] },
],
},
ru: {
title: "Услуги и сервис",
description: "Профессиональные решения по подбору, проектированию, монтажу и обслуживанию оборудования для очистки воды и розлива.",
services: [
{ title: "Консультация и подбор оборудования", badge: "Консультация", icon: Settings, description: "Поможем подобрать оборудование с учетом задач, производительности, качества воды, условий эксплуатации и бюджета.", features: ["Бытовые, коммерческие и промышленные системы очистки воды", "Оборудование для производства и розлива воды", "Оборудование для выдува, розлива, укупорки, этикетировки и упаковки", "Комплектующие, запчасти и расходные материалы", "Определение производительности и комплектации"] },
{ title: "Проектирование и производство", badge: "Инжиниринг", icon: Cpu, description: "Разрабатываем инженерные решения с учетом технического задания и условий эксплуатации.", features: ["Изучение технического задания и исходных данных", "Производство систем очистки воды по индивидуальному проекту", "Изготовление рам, модулей и отдельных конструкций", "Производство контейнерных и блок-модульных систем"] },
{ title: "Доставка и монтаж", badge: "Логистика и монтаж", icon: Truck, description: "Безопасная доставка, разгрузка и профессиональный монтаж трубных и электрических соединений.", features: ["Доставка и разгрузка оборудования у заказчика", "Монтаж систем очистки воды и розлива", "Подключение труб, электрики, насосов и емкостей", "Проверка качества выполненных соединений"] },
{ title: "Пусконаладка и обучение", badge: "Запуск", icon: GraduationCap, description: "Запускаем оборудование, настраиваем параметры и обучаем сотрудников безопасной эксплуатации.", features: ["Комплексная проверка перед запуском", "Настройка рабочих параметров и автоматики", "Тестирование производительности и качества работы", "Обучение сотрудников и рекомендации"] },
{ title: "Гарантия и сервис", badge: "Гарантия", icon: ShieldCheck, description: "Регулярное техническое обслуживание для стабильной и эффективной работы оборудования.", features: ["Плановый осмотр, проверка давления и производительности", "Контроль насосов, мембран и фильтров", "Настройка управляющих клапанов и автоматики", "Обслуживание оборудования для мойки, розлива и укупорки"] },
{ title: "Диагностика, ремонт и модернизация", badge: "Ремонт", icon: Wrench, description: "Диагностируем неисправности, быстро восстанавливаем работу и модернизируем действующие системы.", features: ["Поиск неисправностей и оперативный ремонт", "Послегарантийный ремонт", "Модернизация и повышение производительности", "Замена автоматики и устаревших элементов"] },
{ title: "Расходные материалы и запчасти", badge: "Комплектация", icon: Package, description: "Поставляем мембраны обратного осмоса, картриджи, фильтрующие загрузки и оригинальные запчасти.", features: ["Мембраны обратного осмоса и картриджи PP/CTO", "Ионообменная смола, активированный уголь и кварцевый песок", "Клапаны, насосы и элементы автоматики", "Оригинальные запчасти для производственного оборудования"] },
],
},
uz: {
title: "Xizmatlar va servis",
description: "Suv tozalash va quyish uskunalarini tanlash, loyihalash, o‘rnatish va xizmat ko‘rsatish bo‘yicha professional yechimlar.",
services: [
{ title: "Maslahat va uskuna tanlash", badge: "Maslahat", icon: Settings, description: "Vazifangiz, unumdorlik, suv sifati, foydalanish sharoiti va budjetingizga mos uskuna tanlashda yordam beramiz.", features: ["Maishiy, tijoriy va sanoat suv tozalash tizimlari", "Suv ishlab chiqarish va quyish uskunalari", "PET puflash, quyish, qopqoq yopish, etiketkalash va qadoqlash uskunalari", "Butlovchi qismlar, ehtiyot qismlar va sarf materiallari", "Unumdorlik va komplektatsiyani aniqlash"] },
{ title: "Loyihalash va ishlab chiqarish", badge: "Injiniring", icon: Cpu, description: "Texnik topshiriq va foydalanish sharoitlariga mos muhandislik yechimlarini ishlab chiqamiz.", features: ["Texnik topshiriq va boshlang‘ich ma’lumotlarni tahlil qilish", "Individual loyiha asosida suv tozalash tizimlarini ishlab chiqarish", "Rama, modul va alohida konstruksiyalarni tayyorlash", "Konteyner va blok-modul tizimlarini ishlab chiqarish"] },
{ title: "Yetkazib berish va montaj", badge: "Logistika va montaj", icon: Truck, description: "Uskunalarni xavfsiz yetkazib beramiz, tushiramiz va quvur hamda elektr ulanishlarini professional bajaramiz.", features: ["Uskunani buyurtmachiga yetkazish va tushirish", "Suv tozalash va quyish tizimlarini o‘rnatish", "Quvur, elektr, nasos va baklarni ulash", "Bajarilgan ulanishlar sifatini tekshirish"] },
{ title: "Ishga tushirish va o‘qitish", badge: "Ishga tushirish", icon: GraduationCap, description: "Uskunani ishga tushiramiz, sozlaymiz va xodimlaringizni xavfsiz foydalanishga o‘rgatamiz.", features: ["Ishga tushirishdan oldingi kompleks tekshiruv", "Ish parametrlari va avtomatikani sozlash", "Unumdorlik va ishlash sifatini sinash", "Xodimlarni o‘qitish va tavsiyalar berish"] },
{ title: "Kafolat va servis xizmati", badge: "Kafolat", icon: ShieldCheck, description: "Uskunalarning barqaror va samarali ishlashi uchun muntazam texnik ko‘rik va profilaktika.", features: ["Rejali ko‘rik, bosim va unumdorlikni tekshirish", "Nasoslar, membranalar va filtrlarni nazorat qilish", "Boshqaruv klapanlari va avtomatikani sozlash", "Yuvish, quyish va qopqoq yopish uskunalariga xizmat"] },
{ title: "Diagnostika, ta’mirlash va modernizatsiya", badge: "Ta’mirlash", icon: Wrench, description: "Nosozliklarni aniqlaymiz, uskunani tez tiklaymiz va mavjud tizimlarni modernizatsiya qilamiz.", features: ["Nosozliklarni aniqlash va tezkor ta’mirlash", "Kafolatdan keyingi ta’mirlash", "Modernizatsiya va unumdorlikni oshirish", "Avtomatika va eskirgan qismlarni almashtirish"] },
{ title: "Sarf materiallari va ehtiyot qismlar", badge: "Komplektatsiya", icon: Package, description: "Teskari osmos membranalari, kartridjlar, filtr yuklamalari va original ehtiyot qismlarni yetkazib beramiz.", features: ["Teskari osmos membranalari va PP/CTO kartridjlar", "Ion smola, faol ko‘mir va kvars qumi", "Klapanlar, nasoslar va avtomatika elementlari", "Ishlab chiqarish uskunalari uchun original ehtiyot qismlar"] },
],
},
};

export default function ServicesPage() {
const locale = useLocale() as Locale;
const page = content[locale] ?? content.ru;

return (
<div
className="relative mt-18 min-h-screen bg-cover bg-center bg-fixed py-12 lg:mt-24"
style={{ backgroundImage: "url('/services.jpg')" }}
>
<div className="absolute inset-0 bg-white/75" />
<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<header className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
<h1 className="text-4xl font-extrabold tracking-tight text-blue-600 sm:text-5xl">{page.title}</h1>
<p className="text-lg leading-relaxed text-slate-600">{page.description}</p>
</header>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
{page.services.map((service, index) => {
const Icon = service.icon;
return (
<article
key={service.title}
className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-400 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-500 hover:bg-white hover:shadow-xl"
>
<div className="p-6">
<div className="mb-5 flex items-center justify-between">
<div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white"><Icon className="h-5 w-5" /></div>
<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{service.badge}</span>
</div>
<h2 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">{service.title}</h2>
<p className="mb-5 text-sm leading-relaxed text-slate-600">{service.description}</p>
<ul className="mb-5 space-y-2">
{service.features.map((feature) => <li key={feature} className="flex items-start text-sm text-slate-700"><CheckCircle2 className="mr-2.5 mt-0.5 h-4 w-4 shrink-0 text-blue-500" /><span>{feature}</span></li>)}
</ul>
</div>
<div className="relative z-10 flex items-center justify-between border-t border-slate-300 px-6 pb-3 pt-3">
<span className="font-mono text-xs font-bold text-slate-300">{String(index + 1).padStart(2, "0")}</span>
</div>
</article>
);
})}
</div>

</div>
</div>
);
}