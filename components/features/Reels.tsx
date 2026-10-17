"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Play } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReelsProps {
  limit?: number;
}

const localReels = [
  {
    id: "local-reel-1",
    attach: {
      id: "local-reel-1",
      url: "/videos/reel-1.mp4",
    },
    caption: "Filiallar: Toshkent | Buxoro | Qarshi | Urganch 💸 Barcha filiallarda narx bir xil! 🚚 Butun O‘zbekiston bo‘ylab yetkazib berish! 🏢 Filiallar: • Toshkent: +998 99 707 66 65 • Xorazm: +998 99 707 43 34 • Qarshi: +998 99 707 54 00 • Buxoro: +998 99 118 22 00",
    createdAt: "",
  },
  {
    id: "local-reel-2",
    attach: { id: "local-reel-2", url: "/videos/reel-2.mp4" },
    caption: "Yangi partiyada Shangair kompressorlar va 5gr / 10gr ozonatorlar yetib keldi! Sifatli va ishonchli uskunalarni hoziroq zakas qiling! ✅ 📍 Buxoro: +998 99 118 22 00 • Xorazm: +998 99 707 43 34 • Qarshi: +998 99 707 54 00 • Toshkent: +998 99 707 66 65",
    createdAt: "",
  },
  {
    id: "local-reel-3",
    attach: { id: "local-reel-3", url: "/videos/reel-3.mp4" },
    caption: "🔹 1–5 LITR SUYUQLIK QUYISH USKUNASI 🩸 Yog‘, moy, sut, sok, antifriz va boshqa suyuqliklar uchun ideal yechim! ⚙️ 1–5 litr idishlarga to‘ldirish, 6 ta yuqori aniqlikdagi dozator, yarim-avtomat boshqaruv. Unumdorligi: 1L — 2000 dona/soat, 5L — 1000 dona/soat. Aniqlik: ±1%",
    createdAt: "",
  },
  {
    id: "local-reel-4",
    attach: { id: "local-reel-4", url: "/videos/reel-4.mp4" },
    caption: "Samarqandlik mijozimizga 1 000 litr/soat suv filtri o‘rnatilib, ishga tushirib berildi. 📍 Filiallar: Toshkent | Buxoro | Qarshi | Urganch 💸 Barcha filiallarda narx bir xil! 🚚 Butun O‘zbekiston bo‘ylab yetkazib berish!",
    createdAt: "",
  },
  {
    id: "local-reel-5",
    attach: { id: "local-reel-5", url: "/videos/reel-5.mp4" },
    caption: "Shahrisabz shahridagi mijozimizga 250 litr/soat suv filtri o‘rnatilib, muvaffaqiyatli ishga tushirildi. 📍 Filiallar: Toshkent | Buxoro | Qarshi | Urganch 💸 Barcha filiallarda narx bir xil! 🚚 Butun O‘zbekiston bo‘ylab yetkazib berish!",
    createdAt: "",
  },
  {
    id: "local-reel-6",
    attach: { id: "local-reel-6", url: "/videos/reel-6.mp4" },
    caption: "1 tonna suv sotish orqali 160 ming so‘m daromadingizni 400 ming so‘mgacha ko‘tarishni xohlaysizmi? SUV BIZNESINI BOSHLANG! Biz sizga biznes reja bilan tanishtiramiz. Tayyor uskuna, tez daromad. 🏢 Bosh ofis: +998 99 707 29 99 • +998 99 709 05 10 • +998 99 707 00 59 • +998 77 800 29 99 • +998 99 707 56 55 • +998 77 155 29 99",
    createdAt: "",
  },
];

export default function Reels({ limit }: ReelsProps) {
  const t = useTranslations("home.reels");
  const reels = localReels.slice(0, limit);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());

  useEffect(() => {
    const videos = videoRefs.current.filter(
      (video): video is HTMLVideoElement => video !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (!entry.isIntersecting) {
            video.pause();
          }
        });
      },
      { threshold: 0.75 },
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [reels.length]);

  const pauseOtherVideos = (currentVideo: HTMLVideoElement) => {
    videoRefs.current.forEach((video) => {
      if (video && video !== currentVideo) {
        video.pause();
      }
    });
  };

  return (
    <div className="relative mx-auto flex aspect-[9/16] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[2.25rem] border border-white/70 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.95),transparent_28%),linear-gradient(145deg,#dff5ff_0%,#c8e7ff_46%,#dcd5ff_100%)] p-3 shadow-[0_24px_60px_-24px_rgba(37,99,235,0.45)]">
      <div className="pointer-events-none absolute -left-12 -top-10 h-44 w-44 rounded-full bg-cyan-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-10 h-48 w-48 rounded-full bg-violet-300/35 blur-3xl" />
      <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] border border-white/50 bg-white/15 shadow-inner backdrop-blur-[2px]" />
      <div className="relative z-10 h-full w-full overflow-hidden rounded-[2rem] border-[7px] border-black bg-black shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        <div className="relative h-full overflow-hidden rounded-[1.55rem] bg-black">
          <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-5 w-16 -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-0 snap-y snap-mandatory overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {reels.map((reel) => (
              <article
                key={reel.id}
                className="group relative h-full min-h-full w-full shrink-0 snap-start overflow-hidden bg-black"
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={reel.attach.url}
                  loop
                  playsInline
                  controls
                  ref={(video) => {
                    videoRefs.current[reels.indexOf(reel)] = video;
                  }}
                  onPlay={(event) => pauseOtherVideos(event.currentTarget)}
                  preload="metadata"
                />

                <div className="absolute inset-x-2 bottom-3 z-20 rounded-xl bg-black/55 px-3 pb-3 pt-3 text-white">
                  <p className="text-xs font-bold">
                    Atlant Fortuna{" "}
                    <span className="font-normal text-white/70">
                      • {t("following")}
                    </span>
                  </p>
                  <p className="mt-1 max-h-20 w-full overflow-y-auto pr-1 text-[11px] leading-4 text-white/90">
                    {reel.caption}
                  </p>
                  <div className="mt-2 grid h-8 grid-cols-2 items-center border-t border-white/20 pt-1 text-xs">
                    <button
                      type="button"
                      aria-label="Like"
                      aria-pressed={likedReels.has(reel.id)}
                      onClick={() => {
                        setLikedReels((current) => {
                          const next = new Set(current);
                          if (next.has(reel.id)) {
                            next.delete(reel.id);
                          } else {
                            next.add(reel.id);
                          }
                          return next;
                        });
                      }}
                      className="mx-auto rounded-full p-1 transition-transform hover:bg-white/10 active:scale-90"
                    >
                      <Heart
                        className={`h-5 w-5 transition-colors ${
                          likedReels.has(reel.id)
                            ? "fill-red-500 text-red-500"
                            : "fill-white text-white"
                        }`}
                      />
                    </button>
                    <Play className="mx-auto h-4 w-4 fill-white" />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 h-1 w-20 -translate-x-1/2 rounded-full bg-white/80" />
        </div>
      </div>
    </div>
  );
}
