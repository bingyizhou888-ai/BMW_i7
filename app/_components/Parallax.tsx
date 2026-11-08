"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 滾動視差：依父層在視窗中的位置平移內容。
 * - range：最大位移量（父層高度的 %）。背景用法時，內層會自動上下各延伸 range%，避免露出空白。
 * - 尊重 prefers-reduced-motion。
 */
export default function Parallax({
  range = 12,
  background = false,
  className = "",
  children,
}: {
  range?: number;
  background?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -100 || rect.top > vh + 100) return; // 不在視窗內就略過
      const d = rect.top + rect.height / 2 - vh / 2;
      const p = Math.max(-1, Math.min(1, d / (vh / 2 + rect.height / 2)));
      el.style.transform = `translate3d(0, ${(-p * range * rect.height) / 100}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [range]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: "transform",
        ...(background && {
          position: "absolute",
          left: 0,
          right: 0,
          top: `-${range}%`,
          height: `${100 + range * 2}%`,
        }),
      }}
    >
      {children}
    </div>
  );
}
