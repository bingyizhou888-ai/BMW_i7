"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { CalendarCheck, Car, ChevronRight, FileSignature, KeyRound } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { trims, formatNTD, type Trim } from "../_data/cars";
import { useTrimHash } from "./useTrimHash";

const APR = 2.88; // 示範年利率（%）
const terms = [36, 48, 60, 72];

const steps = [
  { icon: Car, title: "選擇車型", desc: "比較三款動力與配備，挑選最適合的 i7。" },
  { icon: CalendarCheck, title: "預約試駕", desc: "展示中心專人安排，親自感受純電豪華。" },
  { icon: FileSignature, title: "方案與簽約", desc: "確認配置、付款與保險方案，線上即可完成。" },
  { icon: KeyRound, title: "尊榮交車", desc: "專屬交車禮遇與充電設備安裝諮詢。" },
];

function monthly(principal: number, months: number, apr: number) {
  const r = apr / 100 / 12;
  return r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
}

export default function Finance() {
  const [trimId, setTrimId] = useState<Trim["id"]>("xdrive60");
  const [downPct, setDownPct] = useState(30);
  const [term, setTerm] = useState(60);
  const trim = trims.find((t) => t.id === trimId)!;

  const selectTrim = useCallback((id: Trim["id"]) => setTrimId(id), []);
  useTrimHash("finance", "finance", selectTrim);

  const down = trim.price * (downPct / 100);
  const loan = trim.price - down;
  const pay = monthly(loan, term, APR);
  const total = down + pay * term;

  return (
    <section id="finance" className="scroll-mt-16 border-t border-white/10 bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="購車方案" title="入主 i7，" muted="比你想像得更輕鬆。" />

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 lg:grid-cols-[1.2fr_1fr]">
          {/* 試算輸入 */}
          <div className="min-w-0 bg-black p-5 sm:p-8">
            <p className="font-mono text-xs text-neutral-400">選擇車型</p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {trims.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={t.id === trimId}
                  onClick={() => setTrimId(t.id)}
                  className={`flex items-center overflow-hidden rounded-sm border text-left transition-all duration-300 sm:block ${
                    t.id === trimId
                      ? "border-white bg-white/5"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-28 shrink-0 sm:w-full">
                    <Image src={t.images.exterior} alt="" fill placeholder="blur" sizes="(min-width: 640px) 220px, 112px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 px-3 py-2 sm:p-2">
                    <p className="truncate font-mono text-xs text-white sm:text-[11px]">{t.name.replace("i7 ", "")}</p>
                    <p className="truncate font-mono text-[11px] text-neutral-500 sm:text-[10px]">{formatNTD(t.price)}</p>
                  </div>
                  <span
                    aria-hidden
                    className={`mr-3 h-2 w-2 shrink-0 rounded-full sm:hidden ${t.id === trimId ? "bg-white" : "bg-white/15"}`}
                  />
                </button>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <label htmlFor="down" className="font-mono text-xs text-neutral-400">頭期款比例</label>
                <span className="font-mono text-sm text-white">{downPct}%</span>
              </div>
              <input
                id="down"
                type="range"
                min={20}
                max={70}
                step={5}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="mt-3 w-full accent-white"
              />
            </div>

            <div className="mt-8">
              <p className="font-mono text-xs text-neutral-400">貸款期數</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {terms.map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={m === term}
                    onClick={() => setTerm(m)}
                    className={`rounded-sm border py-2.5 font-mono text-xs transition-colors ${
                      m === term ? "border-white bg-white text-black" : "border-white/15 text-neutral-300 hover:border-white/40"
                    }`}
                  >
                    {m} 期
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 試算結果 */}
          <div className="flex min-w-0 flex-col bg-neutral-950 p-5 sm:p-8">
            {/* 切換車型時淡入的車輛預覽 */}
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-sm border border-white/10">
              <Image
                key={trim.id}
                src={trim.images.exterior}
                alt={`${trim.name} 外觀`}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="animate-fade-zoom object-cover"
              />
              <span className="absolute left-3 top-3 rounded-sm bg-black/60 px-2 py-0.5 font-mono text-[10px] text-neutral-200 backdrop-blur">
                {trim.mood}
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-400">{trim.name} · 預估月付</p>
            <p
              key={`${trim.id}-${downPct}-${term}`}
              className="animate-fade-up mt-3 flex flex-wrap items-baseline gap-x-1 text-4xl font-light tracking-tight text-white sm:text-5xl"
            >
              {formatNTD(pay)}
              <span className="text-base text-neutral-500">/ 月</span>
            </p>
            <dl className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm">
              {[
                ["建議售價", formatNTD(trim.price)],
                [`頭期款（${downPct}%）`, formatNTD(down)],
                ["貸款金額", formatNTD(loan)],
                ["年利率（示範）", `${APR}%`],
                ["總付款金額", formatNTD(total)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-neutral-500">{k}</dt>
                  <dd className="text-right text-white tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#test-drive"
              className="mt-8 inline-flex items-center justify-center gap-1 rounded-sm bg-white px-4 py-2.5 font-mono text-xs font-medium text-black"
            >
              取得正式報價 <ChevronRight size={12} />
            </a>
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-neutral-600">
              試算結果僅供參考，實際利率、期數與核貸結果依金融機構審核為準。
            </p>
          </div>
        </div>

        {/* 購車流程 */}
        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="border-l border-white/15 pl-5">
              <p className="flex items-center gap-2 font-mono text-xs text-neutral-500">
                <Icon size={14} /> 0{i + 1}
              </p>
              <p className="mt-3 font-mono text-sm text-white">{title}</p>
              <p className="mt-1 text-sm text-neutral-500">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
