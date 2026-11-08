import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { trims, formatNTD } from "../_data/cars";

export default function Trims() {
  return (
    <section id="trims" className="scroll-mt-16 bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="車型與價格" title="三種動力，" muted="選擇最適合你的 i7。" />
        <p className="mt-4 font-mono text-xs text-neutral-500">
          參考建議售價與數據，實際配置與價格請洽授權經銷商。
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 lg:grid-cols-3">
          {trims.map((trim) => (
            <div
              key={trim.id}
              className={`flex flex-col ${trim.highlight ? "bg-neutral-900" : "bg-black"}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={trim.images.exterior}
                  alt={`${trim.name} 外觀`}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                {trim.highlight && (
                  <span className="absolute right-4 top-4 rounded-sm bg-white px-2 py-0.5 font-mono text-[10px] text-black">
                    最受歡迎
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-mono text-sm font-semibold text-white">{trim.name}</h3>
                <p className="mt-1 font-mono text-xs text-neutral-500">{trim.tagline}</p>

                <p className="mt-6 text-3xl font-light tracking-tight text-white">
                  {formatNTD(trim.price)} <span className="text-base text-neutral-400">起</span>
                </p>

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

                <ul className="mt-6 flex-1 space-y-3">
                  {trim.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-neutral-400">
                      <Check size={14} className="mt-0.5 shrink-0 text-neutral-300" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid grid-cols-2 gap-2">
                  <a
                    href={`#showroom-${trim.id}`}
                    className="inline-flex items-center justify-center gap-1 rounded-sm border border-white/20 px-3 py-2 font-mono text-xs text-white hover:bg-white/5"
                  >
                    看實車影像
                  </a>
                  <a
                    href={`#finance-${trim.id}`}
                    className={`inline-flex items-center justify-center gap-1 rounded-sm px-3 py-2 font-mono text-xs ${
                      trim.highlight ? "bg-white text-black" : "bg-white/90 text-black hover:bg-white"
                    }`}
                  >
                    試算購車 <ChevronRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
