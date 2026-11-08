import Image from "next/image";
import {
  Armchair,
  BatteryCharging,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Parallax from "./Parallax";
import SectionHeading from "./SectionHeading";
import { trims } from "../_data/cars";

const [e50, x60, m70] = trims;

const highlights = [
  {
    img: m70.images.exterior2,
    alt: "紅色尾燈點亮的 BMW 車尾",
    title: "第五代 eDrive 純電動力",
    desc: "整合馬達、變速機構與電力電子於一體，帶來即時扭力與近乎無聲的順暢加速。",
    chips: ["0–100 km/h 3.7s", "660 hp 最大馬力", "雙馬達 xDrive"],
    icon: Zap,
  },
  {
    img: e50.images.rear,
    alt: "淺色真皮座椅的車室",
    title: "Executive Lounge",
    desc: "可調式躺臥後座、腿托與按摩功能，長途旅程也保有行政艙般的從容。",
    chips: ["躺臥後座", "31 吋劇院螢幕", "Bowers & Wilkins 音響"],
    icon: Armchair,
  },
  {
    img: x60.images.cockpit,
    alt: "曲面雙螢幕數位座艙",
    title: "Curved Display + iDrive",
    desc: "一體曲面雙螢幕整合數位座艙，結合直覺化選單與個人化情境模式。",
    chips: ["曲面雙螢幕", "My Modes 情境", "智慧語音助理"],
    icon: MonitorSmartphone,
  },
];

const more = [
  { icon: ShieldCheck, title: "主動防護與駕駛輔助", desc: "城市與高速情境下的全面警示與支援。" },
  { icon: Sparkles, title: "水晶質感工藝", desc: "水晶風格控制旋鈕與 Interaction Bar 氛圍燈條。" },
  { icon: BatteryCharging, title: "高效快充", desc: "約 10 分鐘可補充最高約 160 km 續航。" },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-16 bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="配備亮點" title="每一處細節，" muted="都為豪華與效率而生。" />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {highlights.map(({ img, alt, title, desc, chips, icon: Icon }) => (
            <article key={title}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10">
                <Parallax background range={12}>
                  <Image
                    src={img}
                    alt={alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-black/45" />
                <div className="relative flex h-full flex-col items-center justify-center gap-2 p-6">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="flex w-52 items-center gap-2 rounded-sm border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-[11px] text-neutral-100 backdrop-blur"
                    >
                      <Icon size={12} className="text-neutral-400" /> {c}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="mt-5 font-mono text-sm font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-3">
          {more.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-black p-6">
              <Icon size={18} className="text-neutral-400" />
              <p className="mt-4 font-mono text-sm text-white">{title}</p>
              <p className="mt-1 text-sm text-neutral-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
