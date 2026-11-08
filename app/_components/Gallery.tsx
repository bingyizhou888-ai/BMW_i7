"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { trims, categories, type Category, type Trim } from "../_data/cars";
import { useTrimHash } from "./useTrimHash";

type View = Category | "exterior2";

export default function Gallery() {
  const [trimId, setTrimId] = useState<Trim["id"]>("xdrive60");
  const [view, setView] = useState<View>("exterior");
  const trim = trims.find((t) => t.id === trimId)!;

  const selectTrim = useCallback((id: Trim["id"]) => {
    setTrimId(id);
    setView("exterior");
  }, []);
  useTrimHash("showroom", "gallery", selectTrim);

  const category: Category = view === "exterior2" ? "exterior" : view;
  const views: { key: View; label: string }[] = [
    { key: "exterior", label: "外觀 I" },
    { key: "exterior2", label: "外觀 II" },
    { key: "rear", label: "後座內裝" },
    { key: "cockpit", label: "數位座艙" },
    { key: "charging", label: "充電體驗" },
  ];
  const src = (v: View) => (v === "exterior2" ? trim.images.exterior2 : trim.images[v]);

  return (
    <section id="gallery" className="scroll-mt-16 bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="線上展間" title="三款車型，" muted="三種專屬色調。" />

          {/* 車型切換 */}
          <div className="flex rounded-sm border border-white/10 bg-white/5 p-1">
            {trims.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={t.id === trimId}
                onClick={() => selectTrim(t.id)}
                className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
                  t.id === trimId ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                }`}
              >
                {t.name.replace("i7 ", "")}
              </button>
            ))}
          </div>
        </div>

        {/* 類別分頁 */}
        <div role="tablist" className="mt-10 flex gap-1 overflow-x-auto border-b border-white/10 pb-px">
          {categories.map((c) => (
            <button
              key={c.key}
              role="tab"
              type="button"
              aria-selected={c.key === category}
              onClick={() => setView(c.key)}
              className={`-mb-px shrink-0 border-b px-3 py-2 font-mono text-xs transition-colors ${
                c.key === category
                  ? "border-white text-white"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10">
            <Image
              key={`${trimId}-${view}`}
              src={src(view)}
              alt={`${trim.name} ${categories.find((c) => c.key === category)!.label}`}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-mono text-xs text-neutral-500">
              {trim.name} · {trim.mood}
            </p>
            <p className="mt-3 text-xl leading-snug text-white">{trim.captions[category]}</p>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-white/10 py-4">
              {[
                ["馬力", trim.power],
                ["0–100", trim.accel],
                ["WLTP", trim.range],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] text-neutral-500">{k}</dt>
                  <dd className="mt-1 text-sm text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex gap-2">
              <a
                href={`#finance-${trim.id}`}
                className="inline-flex items-center gap-1 rounded-sm bg-white px-3 py-1.5 font-mono text-xs text-black"
              >
                試算 {trim.name} <ChevronRight size={12} />
              </a>
              <a
                href="#test-drive"
                className="inline-flex items-center gap-1 rounded-sm border border-white/20 px-3 py-1.5 font-mono text-xs text-white hover:bg-white/5"
              >
                預約賞車
              </a>
            </div>
          </div>
        </div>

        {/* 縮圖列：同一水平、等高對齊 */}
        <div className="mt-6 grid grid-cols-5 gap-3">
          {views.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setView(v.key)}
              aria-label={v.label}
              className={`group relative aspect-[4/3] overflow-hidden rounded-sm border transition-colors ${
                v.key === view ? "border-white" : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src(v.key)}
                alt=""
                fill
                placeholder="blur"
                sizes="20vw"
                className="object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-1.5 pt-4 text-left font-mono text-[10px] text-white">
                {v.label}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-8 font-mono text-[11px] text-neutral-600">
          影像來源：Unsplash，部分為 BMW 其他車系示意，色調依車型風格挑選；正式上線請替換為 BMW 官方授權影像。
        </p>
      </div>
    </section>
  );
}
