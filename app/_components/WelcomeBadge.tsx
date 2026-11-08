"use client";

import { Hand, Pencil } from "lucide-react";
import { openWelcome, useVisitor } from "./visitorName";

/** 顯示「歡迎／歡迎回來，{稱呼}」，點擊可修改稱呼 */
export default function WelcomeBadge({ variant = "nav" }: { variant?: "nav" | "hero" }) {
  const visitor = useVisitor();
  if (!visitor?.name) return null;
  const greeting = visitor.isNew ? "歡迎" : "歡迎回來";

  if (variant === "hero") {
    return (
      <p className="animate-fade-up mb-6 flex items-center gap-2 text-lg text-white sm:text-xl">
        <Hand size={20} className="text-neutral-300" />
        {greeting}，<span className="font-medium">{visitor.name}</span>
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={openWelcome}
      title="修改稱呼"
      className="group inline-flex max-w-[12rem] items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-xs text-neutral-300 hover:bg-white/10 hover:text-white"
    >
      <Hand size={13} className="shrink-0" />
      <span className="truncate">
        {greeting}，{visitor.name}
      </span>
      <Pencil size={11} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
    </button>
  );
}
