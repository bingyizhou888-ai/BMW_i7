import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { trims, formatNTD } from "../_data/cars";
import Parallax from "./Parallax";
import WelcomeBadge from "./WelcomeBadge";
import heroBg from "../../public/image/xdrive60-1-exterior.jpg";

export default function Hero() {
  return (
    <section id="overview" className="relative overflow-hidden bg-black">
      {/* 全幅背景 */}
      <Parallax background range={18}>
      <Image
        src={heroBg}
        alt="BMW i7 停放於金屬弧形展示空間前"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />

      <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-16 sm:pt-48">
        <div className="max-w-2xl">
          <WelcomeBadge variant="hero" />
          <p className="flex items-center gap-2 font-mono text-xs text-neutral-300">
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            全新 BMW i7 · 純電豪華旗艦
          </p>
          <h1 className="mt-5 text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl">
            純電豪華旗艦的
            <br />
            完整進化
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-300">
            揮別引擎聲浪，BMW i7 以近乎無聲的純電動力，包覆你於行政級豪華座艙之中。三種動力、三種個性，總有一部屬於你。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex">
              <a
                href="#test-drive"
                className="inline-flex items-center gap-1 rounded-l-sm bg-white px-4 py-2 font-mono text-xs font-medium text-black"
              >
                預約試駕 <ChevronRight size={12} />
              </a>
              <a
                href="#finance"
                className="inline-flex items-center gap-1 rounded-r-sm border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs text-white backdrop-blur hover:bg-white/10"
              >
                試算月付 <ChevronRight size={12} />
              </a>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              建議售價 {formatNTD(trims[0].price)} 起
            </span>
          </div>
        </div>

        {/* 三款車型圖片：同一水平、等寬等高對齊 */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {trims.map((t, i) => (
            <a key={t.id} href={`#showroom-${t.id}`} className="group flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10">
                <Image
                  src={i === 1 ? t.images.exterior2 : t.images.exterior}
                  alt={`${t.name} 外觀`}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-sm bg-black/60 px-2 py-0.5 font-mono text-[10px] text-neutral-200 backdrop-blur">
                  {t.mood}
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between font-mono text-xs">
                <span className="text-white">{t.name}</span>
                <span className="text-neutral-500">{formatNTD(t.price)} 起</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
