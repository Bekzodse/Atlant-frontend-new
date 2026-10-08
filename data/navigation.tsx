import { ReactNode } from "react";
import { IoHome } from "react-icons/io5";

export type NavigationLink = {
  name: string | ReactNode;
  link: string;
};

export const navigationLinks: NavigationLink[] = [
  { name: <IoHome className="w-6 h-6" />, link: "" },
  { name: "О наc", link: "about" },
  { name: "Каталог", link: "category" },
  { name: "Оплата и доставка", link: "payment-delivery" },
  { name: "Услуги", link: "articles" },
  { name: "Контакты", link: "contact" },
  { name: "Наши работы", link: "photo-galery" },
  { name: "Акции", link: "discount" },
  { name: "Лицензии и сертификаты", link: "license" },
];
