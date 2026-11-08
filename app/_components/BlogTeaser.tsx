import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import PostCard from "./PostCard";
import { posts } from "../_data/posts";

export default function BlogTeaser() {
  return (
    <section id="blog" className="scroll-mt-16 border-t border-white/10 bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="車型專欄" title="三款 i7，" muted="三種故事。" />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 rounded-sm border border-white/20 px-3 py-1.5 font-mono text-xs text-white hover:bg-white/5"
          >
            看全部文章 <ChevronRight size={12} />
          </Link>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
