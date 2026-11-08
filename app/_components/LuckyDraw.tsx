"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, Gift, PartyPopper, X } from "lucide-react";

const WIN_RATE = 0.1; // 中獎機率 10%
const SEGMENTS = 10; // 轉盤 10 格，其中 1 格為中獎格（第 0 格）
const STORAGE_KEY = "i7-lucky-draw";
const SPIN_MS = 4500;

type Result = { win: boolean; code?: string; expires?: string; at: string };

/** 使用 crypto 產生 [0,1) 亂數，比 Math.random 更適合抽獎 */
function secureRandom() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 2 ** 32;
}

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const buf = new Uint32Array(6);
  crypto.getRandomValues(buf);
  return "I7-88-" + Array.from(buf, (n) => chars[n % chars.length]).join("");
}

function loadResult(): Result | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Result) : null;
  } catch {
    return null;
  }
}

function saveResult(r: Result) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
  } catch {
    /* 無痕模式等情況可能無法寫入，忽略 */
  }
}

const fmtDate = (d: Date) => `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;

export default function LuckyDraw() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  function open() {
    setResult(loadResult());
    setCopied(false);
    dialogRef.current?.showModal();
  }

  function close() {
    if (spinning) return;
    dialogRef.current?.close();
  }

  function spin() {
    if (spinning || result) return;
    const win = secureRandom() < WIN_RATE;
    // 中獎停在第 0 格；未中獎隨機停在 1–9 格
    const index = win ? 0 : 1 + Math.floor(secureRandom() * (SEGMENTS - 1));
    const seg = 360 / SEGMENTS;
    const jitter = (secureRandom() - 0.5) * seg * 0.6; // 停在格子內的隨機位置
    const target = 360 - (index * seg + seg / 2) + jitter;
    const base = rotation - (rotation % 360);
    setRotation(base + 360 * 6 + target);
    setSpinning(true);

    setTimeout(() => {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 2);
      const r: Result = win
        ? { win, code: makeCode(), expires: fmtDate(expires), at: new Date().toISOString() }
        : { win, at: new Date().toISOString() };
      saveResult(r);
      setResult(r);
      setSpinning(false);
    }, SPIN_MS);
  }

  async function copy() {
    if (!result?.code) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 剪貼簿不可用時忽略 */
    }
  }

  const seg = 360 / SEGMENTS;
  const wheelBg = `conic-gradient(${Array.from({ length: SEGMENTS }, (_, i) => {
    const color = i === 0 ? "#ffffff" : i % 2 ? "#171717" : "#262626";
    return `${color} ${i * seg}deg ${(i + 1) * seg}deg`;
  }).join(", ")})`;

  return (
    <>
      {/* 浮動按鈕 */}
      <button
        type="button"
        onClick={open}
        className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-3 font-mono text-xs font-medium text-black shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition-transform hover:-translate-y-0.5 sm:bottom-8 sm:right-8"
      >
        <span className="relative flex">
          <Gift size={16} className="transition-transform group-hover:rotate-12" />
          <span className="absolute -right-1 -top-1 h-2 w-2 animate-ping rounded-full bg-red-500" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </span>
        幸運抽獎
      </button>

      <dialog
        ref={dialogRef}
        onCancel={(e) => spinning && e.preventDefault()}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-sm border border-white/10 bg-neutral-950 p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-fade-up"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            aria-label="關閉"
            onClick={close}
            disabled={spinning}
            className="absolute right-4 top-4 rounded-sm p-1 text-neutral-400 hover:bg-white/10 hover:text-white disabled:opacity-30"
          >
            <X size={18} />
          </button>

          <p className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="h-1 w-1 rounded-full bg-neutral-400" />
            i7 車主限定 · 幸運轉盤
          </p>
          <h2 className="mt-3 text-2xl font-light tracking-tight">
            抽「2 年車內裝修 <span className="font-normal">88 折</span>」優惠券
          </h2>
          <p className="mt-2 text-sm text-neutral-500">中獎機率 10%，每人限抽一次。</p>

          {/* 轉盤 */}
          <div className="relative mx-auto mt-8 aspect-square w-full max-w-[280px]">
            {/* 指針 */}
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1">
              <div className="h-0 w-0 border-x-[10px] border-t-[18px] border-x-transparent border-t-red-500 drop-shadow" />
            </div>
            <div
              className="relative h-full w-full rounded-full border-4 border-white/15 shadow-[0_0_60px_rgba(255,255,255,0.08)]"
              style={{
                background: wheelBg,
                backgroundOrigin: "border-box",
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? `transform ${SPIN_MS}ms cubic-bezier(0.15, 0.85, 0.25, 1)` : "none",
              }}
            >
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <span
                  key={i}
                  className={`absolute left-1/2 top-1/2 -ml-6 w-12 text-center font-mono text-[10px] leading-tight ${
                    i === 0 ? "font-bold text-black" : "text-neutral-500"
                  }`}
                  style={{ transform: `rotate(${i * seg + seg / 2}deg) translateY(-105px) translateY(-50%)` }}
                >
                  {i === 0 ? "88折" : "再接再厲"}
                </span>
              ))}
            </div>
            {/* 中心按鈕 */}
            <button
              type="button"
              onClick={spin}
              disabled={spinning || !!result}
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-neutral-950 bg-white font-mono text-sm font-semibold text-black shadow-lg transition-transform enabled:hover:scale-105 disabled:bg-neutral-300"
            >
              {spinning ? "…" : result ? "已抽" : "開始"}
            </button>
          </div>

          {/* 結果 */}
          <div aria-live="polite" className="mt-8 min-h-[120px]">
            {result?.win && (
              <div className="animate-fade-up rounded-sm border border-dashed border-white/40 bg-white/5 p-5 text-center">
                <p className="flex items-center justify-center gap-1.5 font-mono text-xs text-neutral-400">
                  <PartyPopper size={14} /> 恭喜中獎
                </p>
                <p className="mt-1 text-lg">2 年車內裝修 88 折優惠券</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <code className="rounded-sm bg-black px-3 py-1.5 font-mono text-sm tracking-widest">{result.code}</code>
                  <button
                    type="button"
                    onClick={copy}
                    aria-label="複製優惠碼"
                    className="rounded-sm border border-white/20 p-2 hover:bg-white/10"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="mt-3 font-mono text-[10px] text-neutral-500">
                  有效期限至 {result.expires}，請截圖保存並於預約時出示。
                </p>
              </div>
            )}
            {result && !result.win && (
              <div className="animate-fade-up rounded-sm border border-white/10 p-5 text-center">
                <p className="text-lg">差一點點！</p>
                <p className="mt-1 text-sm text-neutral-500">這次沒有中獎，歡迎預約試駕，親自感受 i7。</p>
                <Link
                  href="/#test-drive"
                  onClick={() => dialogRef.current?.close()}
                  className="mt-4 inline-flex rounded-sm bg-white px-4 py-2 font-mono text-xs text-black"
                >
                  預約試駕
                </Link>
              </div>
            )}
            {!result && (
              <p className="text-center font-mono text-[10px] leading-relaxed text-neutral-600">
                示範活動：結果僅儲存於本機瀏覽器，優惠碼不具實際效力。
              </p>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
