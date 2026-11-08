import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Parallax from "../_components/Parallax";
import PostCard from "../_components/PostCard";
import { trims } from "../_data/cars";
import { posts, formatDate } from "../_data/posts";

export const metadata: Metadata = {
  title: "車型專欄 | BMW i7（練習 Demo）",
  description: "i7 eDrive50、xDrive60、M70 xDrive 三款車型的深度文章。",
};

export default function BlogPage() {
  const [featured, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const featuredTrim = trims.find((t) => t.id === featured.trimId)!;

  return (
    <main className="bg-black">
      {/* 頁首（視差背景） */}
      <section className="relative overflow-hidden border-b border-white/10">
        <Parallax background range={18}>
          <Image
            src={trims[1].images.exterior2}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
        <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-16 sm:pt-44">
          <p className="flex items-center gap-2 font-mono text-xs text-neutral-300">
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            車型專欄 · Journal
          </p>
          <h1 className="mt-5 text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl">
            三款 i7，三種故事
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-300">
            從續航、後座到性能，深入了解每一款 i7 的個性，找到最適合你的那一部。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* 精選文章 */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-sm border border-white/10 bg-neutral-950 lg:grid-cols-[1.4fr_1fr]"
        >
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="font-mono text-[11px] text-neutral-500">
              最新文章 · {featuredTrim.name} · {formatDate(featured.date)}
            </p>
            <h2 className="mt-3 text-2xl leading-snug text-white sm:text-3xl">{featured.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">{featured.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-1 font-mono text-xs text-white">
              閱讀全文 <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-6">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
