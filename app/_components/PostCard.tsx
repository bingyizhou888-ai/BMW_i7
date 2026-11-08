import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trims } from "../_data/cars";
import { formatDate, type Post } from "../_data/posts";

export default function PostCard({ post }: { post: Post }) {
  const trim = trims.find((t) => t.id === post.trimId)!;
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-black/60 px-2 py-0.5 font-mono text-[10px] text-neutral-200 backdrop-blur">
          {trim.name}
        </span>
      </div>
      <p className="mt-4 font-mono text-[11px] text-neutral-500">
        {post.category} · {formatDate(post.date)} · {post.readMinutes} 分鐘
      </p>
      <h3 className="mt-2 flex items-start justify-between gap-3 text-lg leading-snug text-white">
        {post.title}
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
        />
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-500">{post.excerpt}</p>
    </Link>
  );
}
