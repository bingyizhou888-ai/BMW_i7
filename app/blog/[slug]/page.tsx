import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Parallax from "../../_components/Parallax";
import PostCard from "../../_components/PostCard";
import { trims, formatNTD } from "../../_data/cars";
import { posts, getPost, formatDate } from "../../_data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post
    ? { title: `${post.title} | BMW i7 車型專欄`, description: post.excerpt }
    : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const trim = trims.find((t) => t.id === post.trimId)!;
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <main className="bg-black">
      {/* 封面（視差） */}
      <header className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Parallax background range={20}>
          <Image
            src={post.cover}
            alt={post.title}
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        <div className="relative mx-auto w-full max-w-3xl px-6 pt-36 pb-14">
          <Link href="/blog" className="inline-flex items-center gap-1 font-mono text-xs text-neutral-300 hover:text-white">
            <ArrowLeft size={12} /> 車型專欄
          </Link>
          <p className="mt-6 font-mono text-xs text-neutral-300">
            {trim.name} · {post.category}
          </p>
          <h1 className="mt-3 text-3xl font-light leading-tight tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 font-mono text-[11px] text-neutral-400">
            {formatDate(post.date)} · 閱讀時間約 {post.readMinutes} 分鐘
          </p>
        </div>
      </header>

      {/* 內文 */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed text-neutral-300">{post.excerpt}</p>

        {post.sections.map((s) => (
          <section key={s.heading} className="mt-14">
            <h2 className="text-2xl font-normal tracking-tight text-white">{s.heading}</h2>
            {s.body.map((para, i) => (
              <p key={i} className="mt-4 leading-[1.9] text-neutral-400">
                {para}
              </p>
            ))}
            {s.image && (
              <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm border border-white/10">
                <Parallax background range={10}>
                  <Image src={s.image} alt={s.heading} fill placeholder="blur" sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
                </Parallax>
              </figure>
            )}
          </section>
        ))}

        {/* 規格 + CTA */}
        <aside className="mt-16 rounded-sm border border-white/10 bg-neutral-950 p-6 sm:p-8">
          <p className="font-mono text-xs text-neutral-500">本文車型</p>
          <p className="mt-2 text-xl text-white">{trim.name}</p>
          <p className="font-mono text-xs text-neutral-500">{trim.tagline}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-4 sm:grid-cols-4">
            {[
              ["建議售價", formatNTD(trim.price)],
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
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/#finance-${trim.id}`}
              className="inline-flex items-center gap-1 rounded-sm bg-white px-4 py-2 font-mono text-xs text-black"
            >
              試算月付 <ChevronRight size={12} />
            </Link>
            <Link
              href={`/#showroom-${trim.id}`}
              className="inline-flex items-center gap-1 rounded-sm border border-white/20 px-4 py-2 font-mono text-xs text-white hover:bg-white/5"
            >
              看實車影像
            </Link>
            <Link
              href="/#test-drive"
              className="inline-flex items-center gap-1 rounded-sm border border-white/20 px-4 py-2 font-mono text-xs text-white hover:bg-white/5"
            >
              預約試駕
            </Link>
          </div>
        </aside>
      </article>

      {/* 延伸閱讀 */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-mono text-xs text-neutral-400">延伸閱讀</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-6">
            {others.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
