'use client'

import { useLocale } from "use-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: 'en', name: 'English', flag: '/flags/gb.svg' },
  { code: 'ru', name: 'Русский', flag: '/flags/ru.svg' },
  { code: 'uz', name: 'O\'zbekcha', flag: '/flags/uz.svg' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[1]; // Default to Russian

  const switchLanguage = (newLocale: string) => {
    // Replace the locale in the pathname
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary bg-white hover:bg-gray-50 rounded-md border border-gray-300 transition-colors">
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            width={20}
            height={20}
          />
          <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`cursor-pointer ${
              locale === lang.code ? 'bg-primary/10 font-semibold' : ''
            }`}
          >
            <Image
              src={lang.flag}
              alt={lang.name}
              width={20}
              height={20}
              className="mr-2"
            />
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
