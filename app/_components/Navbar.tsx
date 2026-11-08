"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import WelcomeBadge from "./WelcomeBadge";

const links = [
  { href: "/#overview", label: "總覽" },
  { href: "/#features", label: "配備" },
  { href: "/#trims", label: "車型" },
  { href: "/#gallery", label: "展間" },
  { href: "/#finance", label: "購車方案" },
  { href: "/blog", label: "專欄" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => href === "/blog" && pathname.startsWith("/blog");

  // 開啟時鎖定背景捲動、Esc 關閉、放大到桌機寬度自動關閉
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onMq = () => mq.matches && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-white/80" />
          <span className="font-mono text-sm font-semibold tracking-widest text-white">BMW i7</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <WelcomeBadge />
          <nav className="flex items-center rounded-sm border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm px-3 py-1 font-mono text-xs transition-colors hover:bg-white/10 hover:text-white ${
                  isActive(link.href) ? "bg-white/10 text-white" : "text-neutral-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center rounded-sm border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <Link
              href="/#test-drive"
              className="inline-flex items-center gap-1 rounded-sm bg-white px-3 py-1 font-mono text-xs font-medium text-black"
            >
              預約試駕 <ChevronRight size={12} />
            </Link>
            <Link href="/#finance" className="px-3 py-1 font-mono text-xs text-neutral-300 hover:text-white">
              試算
            </Link>
          </div>
        </div>

        {/* 漢堡按鈕（< 1024px） */}
        <button
          type="button"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-my-2 -mr-2 rounded-sm p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 行動版選單：滿版下拉，含所有分頁 */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav
            className={`flex h-[calc(100dvh-61px)] flex-col overflow-y-auto border-t border-white/10 bg-black px-6 py-6 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-2 -ml-2">
              <WelcomeBadge />
            </div>
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`flex items-center justify-between border-b border-white/10 py-4 text-lg transition-all duration-300 ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                } ${isActive(link.href) ? "text-white" : "text-neutral-300"}`}
              >
                <span>{link.label}</span>
                <ChevronRight size={16} className="text-neutral-600" />
              </Link>
            ))}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <Link
                href="/#test-drive"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="rounded-sm bg-white px-4 py-3 text-center font-mono text-sm text-black"
              >
                預約試駕
              </Link>
              <Link
                href="/#finance"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="rounded-sm border border-white/20 px-4 py-3 text-center font-mono text-sm text-white"
              >
                試算月付
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
