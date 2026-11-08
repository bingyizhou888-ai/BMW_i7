import Image from "next/image";
import Parallax from "./Parallax";
import { trims } from "../_data/cars";

export default function ParallaxBanner() {
  const m70 = trims[2];
  return (
    <section className="relative h-[70vh] min-h-[420px] overflow-hidden border-y border-white/10 bg-black">
      <Parallax background range={20}>
        <Image
          src={m70.images.exterior2}
          alt="BMW i7 夜色中的車尾"
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover opacity-70"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
        <Parallax range={-10}>
          <p className="font-mono text-xs text-neutral-300">Silent Luxury</p>
          <p className="mt-4 max-w-xl text-3xl font-light leading-tight tracking-tight text-white sm:text-5xl">
            靜謐，
            <br />
            是最極致的奢華。
          </p>
        </Parallax>
      </div>
    </section>
  );
}
