"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");
const daysIn = (y: number, m: number) => new Date(y, m, 0).getDate(); // m: 1–12
const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

const selectClass =
  "w-full appearance-none rounded-sm border border-white/10 bg-black py-2.5 pl-3 pr-8 text-sm text-white focus:border-white/60 focus:outline-none disabled:opacity-40";

function Select(props: {
  id?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: number[];
  unit: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={props.id}
        aria-label={props.label}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => props.onChange(e.target.value)}
        className={selectClass}
      >
        <option value="">{props.unit}</option>
        {props.options.map((n) => (
          <option key={n} value={n}>
            {n} {props.unit}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}

/**
 * 年／月／日 下拉選單：只能選今天（含）之後、未來一年內的日期。
 * 送出時以隱藏欄位 name 提交 YYYY-MM-DD。
 */
export default function DateSelect({ id, name }: { id: string; name: string }) {
  const [today] = useState(() => {
    const t = new Date();
    return { y: t.getFullYear(), m: t.getMonth() + 1, d: t.getDate() };
  });
  const [y, setY] = useState("");
  const [m, setM] = useState("");
  const [d, setD] = useState("");

  const years = [today.y, today.y + 1];
  const minMonth = (yr: number) => (yr === today.y ? today.m : 1);
  const maxMonth = (yr: number) => (yr === today.y + 1 ? today.m : 12);
  const minDay = (yr: number, mo: number) => (yr === today.y && mo === today.m ? today.d : 1);

  // 變更年或月時，把超出範圍的月／日清空，避免出現 2/31 或過去日期
  function changeYear(v: string) {
    setY(v);
    if (!v) return;
    const yr = Number(v);
    if (m && (Number(m) < minMonth(yr) || Number(m) > maxMonth(yr))) {
      setM("");
      setD("");
    } else if (m && d) fixDay(yr, Number(m));
  }
  function changeMonth(v: string) {
    setM(v);
    if (v && y && d) fixDay(Number(y), Number(v));
  }
  function fixDay(yr: number, mo: number) {
    const day = Number(d);
    if (day > daysIn(yr, mo) || day < minDay(yr, mo)) setD("");
  }

  const yr = Number(y);
  const mo = Number(m);
  const value = y && m && d ? `${y}-${pad(mo)}-${pad(Number(d))}` : "";
  const weekday = value ? WEEK[new Date(yr, mo - 1, Number(d)).getDay()] : "";

  const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);

  return (
    <div>
      <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-2">
        <Select id={id} label="年" value={y} onChange={changeYear} options={years} unit="年" />
        <Select
          label="月"
          value={m}
          onChange={changeMonth}
          options={y ? range(minMonth(yr), maxMonth(yr)) : []}
          unit="月"
          disabled={!y}
        />
        <Select
          label="日"
          value={d}
          onChange={setD}
          options={y && m ? range(minDay(yr, mo), daysIn(yr, mo)) : []}
          unit="日"
          disabled={!y || !m}
        />
      </div>
      <input type="hidden" name={name} value={value} />
      <p className="mt-2 min-h-4 font-mono text-[11px] text-neutral-500">
        {value ? `已選擇 ${y} 年 ${mo} 月 ${Number(d)} 日（星期${weekday}）` : "請依序選擇年、月、日"}
      </p>
    </div>
  );
}
